import { expect, test, mock, describe, beforeEach } from 'bun:test';
import { joinWaitlist } from '@/lib/actions/waitlist';

// Mock Supabase server client
const mockInsert = mock(() => Promise.resolve({ error: null }));
const mockFrom = mock(() => ({
  insert: mockInsert,
}));
const mockCreateClient = mock(() => Promise.resolve({ from: mockFrom }));

mock.module('@/lib/supabase/server', () => ({
  createClient: mockCreateClient,
}));

describe('joinWaitlist', () => {
  beforeEach(() => {
    mockInsert.mockClear();
    mockFrom.mockClear();
    mockCreateClient.mockClear();

    // Reset default mock behavior
    mockInsert.mockImplementation(() => Promise.resolve({ error: null }));
  });

  const createFormData = (data: Record<string, string>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  };

  const validData = {
    email: 'test@example.com',
    full_name: 'John Doe',
    role: 'Developer',
    company: 'Test Co',
    revenue_range: '$0 - $1M',
    aesthetic: 'minimal',
    source: 'home',
  };

  test('successfully joins waitlist', async () => {
    const formData = createFormData(validData);
    const result = await joinWaitlist(formData);

    expect(result.success).toBe(true);
    expect(result.message).toBe("You're on the list! We'll be in touch soon.");
    expect(mockInsert).toHaveBeenCalled();
  });

  test('returns validation error for invalid email', async () => {
    const formData = createFormData({ ...validData, email: 'invalid-email' });
    const result = await joinWaitlist(formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Please provide a valid email address.');
    expect(mockInsert).not.toHaveBeenCalled();
  });

  test('returns validation error for short name', async () => {
    const formData = createFormData({ ...validData, full_name: 'A' });
    const result = await joinWaitlist(formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Name is too short.');
    expect(mockInsert).not.toHaveBeenCalled();
  });

  test('handles duplicate email error (code 23505)', async () => {
    mockInsert.mockImplementation(() =>
      Promise.resolve({
        error: { code: '23505', message: 'duplicate key value' },
      })
    );

    const formData = createFormData(validData);
    const result = await joinWaitlist(formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('This email is already on the waitlist!');
  });

  test('handles generic Supabase insert error', async () => {
    mockInsert.mockImplementation(() =>
      Promise.resolve({
        error: { code: 'P0001', message: 'Internal Server Error' },
      })
    );

    const formData = createFormData(validData);
    const result = await joinWaitlist(formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Something went wrong. Please try again later.');
  });

  test('handles unexpected exceptions', async () => {
    mockCreateClient.mockImplementationOnce(() => {
      throw new Error('Unexpected error');
    });

    const formData = createFormData(validData);
    const result = await joinWaitlist(formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Something went wrong. Please try again later.');
  });
});
