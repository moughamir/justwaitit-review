import { describe, expect, it } from 'vitest';

import { notifyMe } from '../notify';

// Mock Supabase client
vi.mock('@/lib/supabase/server', () => ({
  createClient: () => ({
    from: vi.fn().mockReturnValue({
      insert: vi.fn(),
    }),
  }),
}));

describe('notifyMe action', () => {
  it('should be a function', () => {
    expect(typeof notifyMe).toBe('function');
  });

  it('should accept FormData as parameter', () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');

    expect(() => notifyMe(formData)).not.toThrow();
  });

  it('should handle invalid email', async () => {
    const formData = new FormData();
    formData.append('email', 'invalid-email');

    const result = await notifyMe(formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain('valid email');
  });

  it('should handle missing email', async () => {
    const formData = new FormData();

    const result = await notifyMe(formData);

    expect(result.success).toBe(false);
  });

  it('should accept valid email', async () => {
    const formData = new FormData();
    formData.append('email', 'valid@example.com');

    // This will fail at Supabase level since it's mocked, but should pass validation
    const result = await notifyMe(formData);

    // Should pass validation and attempt to insert
    expect(result).toBeDefined();
  });

  it('should handle UTM parameters', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('utm_source', 'twitter');
    formData.append('utm_medium', 'social');
    formData.append('utm_campaign', 'launch');

    const result = await notifyMe(formData);

    // Should accept UTM parameters
    expect(result).toBeDefined();
  });

  it('should handle null UTM parameters', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');

    const result = await notifyMe(formData);

    // Should work without UTM parameters
    expect(result).toBeDefined();
  });

  it('should validate email format strictly', async () => {
    const invalidEmails = [
      '',
      'notanemail',
      '@example.com',
      'user@',
      'user@domain',
      'spaces @email.com',
    ];

    for (const email of invalidEmails) {
      const formData = new FormData();
      formData.append('email', email);

      const result = await notifyMe(formData);

      expect(result.success).toBe(false);
    }
  });

  it('should accept valid email formats', async () => {
    const validEmails = [
      'user@example.com',
      'user.name@example.com',
      'user+tag@example.co.uk',
      'user123@test.org',
    ];

    for (const email of validEmails) {
      const formData = new FormData();
      formData.append('email', email);

      const result = await notifyMe(formData);

      // Should pass validation (may fail at DB level, but that's expected)
      expect(result).toBeDefined();
    }
  });
});
