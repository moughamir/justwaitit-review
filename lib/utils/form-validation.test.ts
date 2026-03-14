import { describe, expect, it } from 'vitest';

import type { FormStep } from '@/lib/types/waitlist-form';

import { sanitizeEmail, validateStep } from '@/lib/utils/form-validation';

// ── Step fixtures ──────────────────────────────────────────────────────────────

const textStep: FormStep = {
  id: 1,
  title: 'Step 1',
  description: '',
  fields: [{ name: 'full_name', type: 'text', label: 'Name', required: true }],
};

const emailStep: FormStep = {
  id: 1,
  title: 'Step 1',
  description: '',
  fields: [{ name: 'email', type: 'email', label: 'Email', required: true }],
};

const optionalTextField: FormStep = {
  id: 1,
  title: 'Step 1',
  description: '',
  fields: [
    { name: 'company', type: 'text', label: 'Company', required: false },
  ],
};

// ── validateStep ───────────────────────────────────────────────────────────────

describe('validateStep', () => {
  // Behaviour 10
  it('returns { isValid: true, errors: {} } when all required fields are valid', () => {
    const result = validateStep(textStep, { full_name: 'Amina' });
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  // Behaviour 11
  it('returns isValid: false and includes the field name in errors when a required text field is empty string', () => {
    const result = validateStep(textStep, { full_name: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('full_name');
  });

  // Behaviour 12
  it('treats whitespace-only text as empty — fails required check', () => {
    const result = validateStep(textStep, { full_name: '   ' });
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('full_name');
  });

  // Behaviour 13
  it('fails a required text field with a single character (< 2 chars)', () => {
    const result = validateStep(textStep, { full_name: 'A' });
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('full_name');
  });

  // Behaviour 14
  it('passes a required email field with a valid email address', () => {
    const result = validateStep(emailStep, { email: 'user@example.com' });
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  // Behaviour 15
  it('fails a required email field with missing @ symbol', () => {
    const result = validateStep(emailStep, { email: 'userexample.com' });
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('email');
  });

  // Behaviour 16
  it('fails a required email field with no TLD (e.g. "user@domain")', () => {
    const result = validateStep(emailStep, { email: 'user@domain' });
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('email');
  });

  // Behaviour 17
  it('does NOT add an error for an optional field left empty', () => {
    const result = validateStep(optionalTextField, { company: '' });
    expect(result.isValid).toBe(true);
    expect(result.errors).not.toHaveProperty('company');
  });

  // Behaviour 18
  it('does NOT mutate the input formData object', () => {
    const formData = Object.freeze({ full_name: 'Amina' });
    expect(() =>
      validateStep(textStep, formData as Record<string, string>)
    ).not.toThrow();
    expect(formData).toEqual({ full_name: 'Amina' });
  });
});

// ── sanitizeEmail ──────────────────────────────────────────────────────────────

describe('sanitizeEmail', () => {
  // Behaviour 19
  it('trims leading whitespace', () => {
    expect(sanitizeEmail('  user@example.com')).toBe('user@example.com');
  });

  // Behaviour 20
  it('trims trailing whitespace', () => {
    expect(sanitizeEmail('user@example.com  ')).toBe('user@example.com');
  });

  // Behaviour 21
  it('converts uppercase to lowercase', () => {
    expect(sanitizeEmail('USER@EXAMPLE.COM')).toBe('user@example.com');
  });

  // Behaviour 22
  it('is idempotent — running it twice gives the same result as running it once', () => {
    const input = '  USER@EXAMPLE.COM  ';
    expect(sanitizeEmail(sanitizeEmail(input))).toBe(sanitizeEmail(input));
  });
});
