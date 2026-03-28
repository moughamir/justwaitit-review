import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { joinWaitlist } from '@/lib/actions/waitlist';
import { createClient } from '@/lib/supabase/server';

// Mock Supabase server client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

// Mock next/server's after() — no-op in test env (don't execute the callback)
vi.mock('next/server', () => ({
  after: vi.fn(),
}));

describe('joinWaitlist action', () => {
  let mockInsert: ReturnType<typeof vi.fn>;
  let mockFrom: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Setup Supabase mocks
    mockInsert = vi.fn();
    mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });

    vi.mocked(createClient).mockResolvedValue({
      from: mockFrom,
    } as any);

    // Suppress console noise in tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should validate missing required fields', async () => {
    const formData = new FormData();
    // Missing email, full_name, role

    const result = await joinWaitlist(formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain('valid email');
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it('should validate short full_name', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('full_name', 'A'); // Too short
    formData.append('role', 'Brand');

    const result = await joinWaitlist(formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Name is too short.');
  });

  it('should validate missing role', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('full_name', 'John Doe');
    formData.append('role', ''); // Empty role

    const result = await joinWaitlist(formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Please select your role.');
  });

  it('should handle successful waitlist insertion', async () => {
    mockInsert.mockResolvedValue({ error: null });

    const formData = new FormData();
    formData.append('email', 'TEST@example.com');
    formData.append('full_name', ' John Doe ');
    formData.append('role', 'Brand');
    formData.append('company', ' ACME ');
    formData.append('aesthetic', 'Minimalist');

    const result = await joinWaitlist(formData);

    expect(result.success).toBe(true);
    expect(result.message).toContain("You're on the list!");

    // Verify insertion parameters
    expect(mockFrom).toHaveBeenCalledWith('waitlist');
    expect(mockInsert).toHaveBeenCalledWith({
      email: 'test@example.com',
      full_name: 'John Doe',
      role: 'Brand',
      company: 'ACME',
      preferences: { aesthetic: 'Minimalist' },
      source: 'home',
      utm_source: undefined,
      utm_medium: undefined,
      utm_campaign: undefined,
      utm_content: undefined,
      utm_term: undefined,
      referrer: undefined,
    });
  });

  it('should handle duplicate email error (code 23505)', async () => {
    mockInsert.mockResolvedValue({
      error: { code: '23505', message: 'Duplicate key' },
    });

    const formData = new FormData();
    formData.append('email', 'duplicate@example.com');
    formData.append('full_name', 'Jane Doe');
    formData.append('role', 'Stylist');

    const result = await joinWaitlist(formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('This email is already on the waitlist!');
  });

  it('should handle generic database errors', async () => {
    mockInsert.mockResolvedValue({
      error: { code: '500', message: 'Generic error' },
    });

    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('full_name', 'Jane Doe');
    formData.append('role', 'Stylist');

    const result = await joinWaitlist(formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe(
      'Something went wrong. Please try again later.'
    );
    expect(console.error).toHaveBeenCalled();
  });

  it('should handle catastrophic exceptions (e.g. client failure)', async () => {
    vi.mocked(createClient).mockRejectedValue(
      new Error('Supabase client failed')
    );

    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('full_name', 'Jane Doe');
    formData.append('role', 'Stylist');

    const result = await joinWaitlist(formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe(
      'Something went wrong. Please try again later.'
    );
    expect(console.error).toHaveBeenCalled();
  });

  it('includes source field in inserted row', async () => {
    mockInsert.mockResolvedValue({ error: null });

    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('full_name', 'Jane Doe');
    formData.append('role', 'Brand');
    formData.append('source', 'hero');

    await joinWaitlist(formData);

    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ source: 'hero' })
    );
  });

  it('defaults source to "home" when not provided', async () => {
    mockInsert.mockResolvedValue({ error: null });

    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('full_name', 'Jane Doe');
    formData.append('role', 'Brand');

    await joinWaitlist(formData);

    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ source: 'home' })
    );
  });

  it('lowercases email in the insert payload', async () => {
    mockInsert.mockResolvedValue({ error: null });

    const formData = new FormData();
    formData.append('email', 'UPPER@EXAMPLE.COM');
    formData.append('full_name', 'Jane Doe');
    formData.append('role', 'Brand');

    await joinWaitlist(formData);

    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'upper@example.com' })
    );
  });

  it('normalizes empty or whitespace-only optional fields to null', async () => {
    mockInsert.mockResolvedValue({ error: null });

    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('full_name', 'Jane Doe');
    formData.append('role', 'Brand');
    formData.append('company', '   '); // Whitespace-only
    formData.append('revenue_range', ''); // Empty string

    await joinWaitlist(formData);

    // company and revenue_range are omitted from the payload when empty/whitespace
    const insertArg = mockInsert.mock.calls[0][0];
    expect(insertArg).not.toHaveProperty('company');
    expect(insertArg).not.toHaveProperty('revenue_range');
  });
});
