import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { joinWaitlist } from '../waitlist';

import { createClient } from '@/lib/supabase/server';

// Mock Supabase server client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
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

    // Suppress console.error in tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
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
    formData.append('email', ' TEST@example.com '); // Testing sanitization
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
      revenue_range: null,
      preferences: { aesthetic: 'Minimalist' },
      source: 'home',
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
});
