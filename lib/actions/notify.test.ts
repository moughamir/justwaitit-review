import { expect, test, mock, describe, beforeEach } from 'bun:test';

// Mock supabase client FIRST before importing anything else
const mockInsert = mock(() => Promise.resolve({ error: null }));
const mockFrom = mock(() => ({
  insert: mockInsert,
}));

mock.module('@/lib/supabase/server', () => ({
  createClient: async () => ({
    from: mockFrom,
  }),
}));

// Mock next/headers for createClient
mock.module('next/headers', () => ({
  cookies: async () => ({
    getAll: () => [],
    setAll: () => {},
  }),
}));

// NOW import the action
import { notifyMe } from './notify';

describe('notifyMe action', () => {
  beforeEach(() => {
    mockInsert.mockClear();

    // Default mock implementation
    mockInsert.mockImplementation(() => Promise.resolve({ error: null }));
  });

  test('successfully adds email to waitlist', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');

    const result = await notifyMe(formData);

    expect(result.success).toBe(true);
    expect(result.message).toContain("You're in");
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@example.com',
      })
    );
  });

  test('returns error for invalid email', async () => {
    const formData = new FormData();
    formData.append('email', 'invalid-email');

    const result = await notifyMe(formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Please provide a valid email address.');
    expect(mockInsert).not.toHaveBeenCalled();
  });

  test('handles duplicate email error (code 23505)', async () => {
    mockInsert.mockImplementation(() =>
      Promise.resolve({ error: { code: '23505' } })
    );

    const formData = new FormData();
    formData.append('email', 'duplicate@example.com');

    const result = await notifyMe(formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('This email is already on the list.');
  });

  test('handles generic database error', async () => {
    mockInsert.mockImplementation(() =>
      Promise.resolve({ error: { code: 'other', message: 'DB Error' } })
    );

    const formData = new FormData();
    formData.append('email', 'error@example.com');

    const result = await notifyMe(formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Something went wrong. Please try again.');
  });

  test('catches unexpected exceptions', async () => {
    mockInsert.mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const formData = new FormData();
    formData.append('email', 'exception@example.com');

    const result = await notifyMe(formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Something went wrong. Please try again.');
  });
});
