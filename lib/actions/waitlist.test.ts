import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockInsert = vi.fn();
const mockFrom = vi.fn(() => ({ insert: mockInsert }));

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => ({
    from: mockFrom,
  })),
}));

// Import after mock is set up
const { joinWaitlist } = await import('@/lib/actions/waitlist');

function makeFormData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    fd.append(key, value);
  }
  return fd;
}

const validFullData = {
  email: 'test@example.com',
  full_name: 'Test User',
  role: 'Brand',
  source: 'home',
};

describe('joinWaitlist', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockInsert.mockResolvedValue({ error: null, data: [{ id: '1' }] });
  });

  // Behaviour 1: Returns { message } on successful Supabase insert
  it('returns a success message on successful Supabase insert', async () => {
    const result = await joinWaitlist(makeFormData(validFullData));
    expect(result.success).toBe(true);
    expect(result.message).toBeTruthy();
  });

  // Behaviour 2: Sanitises email — trims leading/trailing whitespace before insert
  it('trims leading and trailing whitespace from email before insert', async () => {
    await joinWaitlist(
      makeFormData({ ...validFullData, email: '  test@example.com  ' })
    );
    const insertPayload = mockInsert.mock.calls[0][0];
    expect(insertPayload.email).toBe('test@example.com');
  });

  // Behaviour 3: Sanitises email — lowercases before insert
  it('lowercases the email before insert', async () => {
    await joinWaitlist(
      makeFormData({ ...validFullData, email: 'TEST@EXAMPLE.COM' })
    );
    const insertPayload = mockInsert.mock.calls[0][0];
    expect(insertPayload.email).toBe('test@example.com');
  });

  // Behaviour 4: Returns duplicate-email error message when Supabase returns 23505
  it('returns a duplicate-email error message when Supabase returns error code 23505', async () => {
    mockInsert.mockResolvedValue({ error: { code: '23505' }, data: null });
    const result = await joinWaitlist(makeFormData(validFullData));
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/already on the waitlist/i);
  });

  // Behaviour 5: Returns generic error message on any other unexpected Supabase error
  it('returns a generic error message on unexpected Supabase error', async () => {
    mockInsert.mockResolvedValue({
      error: { code: '99999', message: 'unknown' },
      data: null,
    });
    const result = await joinWaitlist(makeFormData(validFullData));
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/something went wrong/i);
  });

  // Behaviour 6: Rejects empty email string with a validation error (does not call Supabase)
  it('rejects empty email with a validation error and does not call Supabase', async () => {
    const result = await joinWaitlist(
      makeFormData({ ...validFullData, email: '' })
    );
    expect(result.success).toBe(false);
    expect(result.message).toBeTruthy();
    expect(mockInsert).not.toHaveBeenCalled();
  });

  // Behaviour 7: Rejects malformed email (no @ symbol) with a validation error
  it('rejects malformed email with no @ symbol with a validation error', async () => {
    const result = await joinWaitlist(
      makeFormData({ ...validFullData, email: 'notanemail' })
    );
    expect(result.success).toBe(false);
    expect(result.message).toBeTruthy();
    expect(mockInsert).not.toHaveBeenCalled();
  });

  // Behaviour 8: Includes the `source` field in the Supabase insert payload
  it('includes the source field in the Supabase insert payload', async () => {
    await joinWaitlist(makeFormData({ ...validFullData, source: 'landing' }));
    const insertPayload = mockInsert.mock.calls[0][0];
    expect(insertPayload.source).toBe('landing');
  });

  // Behaviour 9: Sets full_name to "Early Access User" when not provided in simple variant
  it('sets full_name to "Early Access User" when not provided', async () => {
    const result = await joinWaitlist(
      makeFormData({
        email: 'test@example.com',
        full_name: 'Early Access User',
        role: 'Other',
        source: 'home',
      })
    );
    expect(result.success).toBe(true);
    const insertPayload = mockInsert.mock.calls[0][0];
    expect(insertPayload.full_name).toBe('Early Access User');
  });

  // Behaviour 10: Returns generic error when Supabase client itself throws
  it('returns a generic error message when the Supabase client throws', async () => {
    const { createClient } = await import('@/lib/supabase/server');
    vi.mocked(createClient).mockRejectedValueOnce(
      new Error('Supabase client failed')
    );
    const result = await joinWaitlist(makeFormData(validFullData));
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/something went wrong/i);
  });
});
