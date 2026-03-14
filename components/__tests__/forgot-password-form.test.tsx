import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { ForgotPasswordForm } from '../forgot-password-form';

import { createClient } from '@/lib/supabase/client';

// Mock the Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}));

describe('ForgotPasswordForm', () => {
  let mockResetPasswordForEmail: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockResetPasswordForEmail = vi.fn();
    vi.mocked(createClient).mockReturnValue({
      auth: {
        resetPasswordForEmail: mockResetPasswordForEmail,
      },
    } as any);
  });

  it('should render the forgot password form correctly', () => {
    render(<ForgotPasswordForm />);

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('email.placeholder')
    ).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
    expect(screen.getByText('back')).toBeInTheDocument();
  });

  it('should handle successful password reset request', async () => {
    const user = userEvent.setup();
    mockResetPasswordForEmail.mockResolvedValueOnce({ error: null });

    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText('email.placeholder');
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(emailInput, 'user@example.com');
    fireEvent.submit(submitButton.closest('form')!);

    expect(screen.getByText('submitPending')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockResetPasswordForEmail).toHaveBeenCalledWith(
        'user@example.com',
        {
          redirectTo: expect.stringContaining('/auth/update-password'),
        }
      );
    });

    // Should show success message
    expect(await screen.findByText('success.title')).toBeInTheDocument();
    expect(screen.getByText('success.desc')).toBeInTheDocument();
    expect(screen.getByText('success.msg')).toBeInTheDocument();
  });

  it('should display error on password reset failure', async () => {
    const user = userEvent.setup();
    mockResetPasswordForEmail.mockResolvedValueOnce({
      error: new Error('User not found'),
    });

    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText('email.placeholder');
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(emailInput, 'nonexistent@example.com');
    fireEvent.submit(submitButton.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('User not found')).toBeInTheDocument();
    });

    // Should not show success state
    expect(screen.queryByText('success.title')).not.toBeInTheDocument();
  });

  it('should handle generic error messages', async () => {
    const user = userEvent.setup();
    mockResetPasswordForEmail.mockRejectedValueOnce(new Error('Network error'));

    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText('email.placeholder');
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(emailInput, 'user@example.com');
    fireEvent.submit(submitButton.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('should disable submit button while loading', async () => {
    const user = userEvent.setup();
    mockResetPasswordForEmail.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText('email.placeholder');
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(emailInput, 'user@example.com');
    fireEvent.submit(submitButton.closest('form')!);

    expect(submitButton).toBeDisabled();
  });

  it('should show success state and not allow resubmission', async () => {
    const user = userEvent.setup();
    mockResetPasswordForEmail.mockResolvedValueOnce({ error: null });

    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText('email.placeholder');
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(emailInput, 'user@example.com');
    fireEvent.submit(submitButton.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('success.title')).toBeInTheDocument();
    });

    // Form should not be visible after success
    expect(
      screen.queryByPlaceholderText('email.placeholder')
    ).not.toBeInTheDocument();
  });
});
