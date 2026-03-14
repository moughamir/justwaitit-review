import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { LoginForm } from '../login-form';

import { createClient } from '@/lib/supabase/client';

// Mock the Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}));

describe('LoginForm', () => {
  let mockSignInWithPassword: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockSignInWithPassword = vi.fn();
    vi.mocked(createClient).mockReturnValue({
      auth: {
        signInWithPassword: mockSignInWithPassword,
      },
    } as any);
  });

  it('should render the login form correctly', () => {
    render(<LoginForm />);

    // next-intl is mocked to return the translation key
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();

    // Using placeholder since labels are returned as translation keys
    expect(
      screen.getByPlaceholderText('email.placeholder')
    ).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
  });

  it('should handle successful login', async () => {
    const user = userEvent.setup();
    mockSignInWithPassword.mockResolvedValueOnce({ error: null });

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('email.placeholder');
    // We can't query by placeholder for password because it's not defined,
    // but we can query by type or id. The Label component renders the i18n key 'password.label'
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'securepassword');

    // Bypass native validation by submitting the form directly
    fireEvent.submit(submitButton.closest('form')!);

    expect(screen.getByText('submitPending')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'securepassword',
      });
    });
  });

  it('should display error message on login failure', async () => {
    const user = userEvent.setup();
    mockSignInWithPassword.mockResolvedValueOnce({
      error: new Error('Invalid login credentials'),
    });

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('email.placeholder');
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(emailInput, 'wrong@example.com');
    await user.type(passwordInput, 'wrongpass');

    fireEvent.submit(submitButton.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('Invalid login credentials')).toBeInTheDocument();
    });

    // Should reset loading state
    expect(screen.getByText('submit')).toBeInTheDocument();
  });
});
