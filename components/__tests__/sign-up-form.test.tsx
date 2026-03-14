import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { SignUpForm } from '../sign-up-form';

import { createClient } from '@/lib/supabase/client';

// Mock the Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}));

describe('SignUpForm', () => {
  let mockSignUp: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockSignUp = vi.fn();
    vi.mocked(createClient).mockReturnValue({
      auth: {
        signUp: mockSignUp,
      },
    } as any);
  });

  it('should render the sign up form correctly', () => {
    render(<SignUpForm />);

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('email.placeholder')
    ).toBeInTheDocument();
    expect(screen.getByText('password.label')).toBeInTheDocument();
    expect(screen.getByText('passwordRepeat')).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
    expect(screen.getByText('loginIntro')).toBeInTheDocument();
    expect(screen.getByText('loginLink')).toBeInTheDocument();
  });

  it('should handle successful sign up', async () => {
    const user = userEvent.setup();
    mockSignUp.mockResolvedValueOnce({ error: null });

    render(<SignUpForm />);

    const emailInput = screen.getByPlaceholderText('email.placeholder');
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const repeatPasswordInput = document.getElementById(
      'repeat-password'
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'securepassword123');
    await user.type(repeatPasswordInput, 'securepassword123');

    fireEvent.submit(submitButton.closest('form')!);

    expect(screen.getByText('submitPending')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'securepassword123',
        options: {
          emailRedirectTo: expect.any(String),
        },
      });
    });
  });

  it('should display error when passwords do not match', async () => {
    const user = userEvent.setup();

    render(<SignUpForm />);

    const emailInput = screen.getByPlaceholderText('email.placeholder');
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const repeatPasswordInput = document.getElementById(
      'repeat-password'
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'password123');
    await user.type(repeatPasswordInput, 'differentpassword');

    fireEvent.submit(submitButton.closest('form')!);

    expect(
      await screen.findByText('Passwords do not match')
    ).toBeInTheDocument();
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('should display error on sign up failure', async () => {
    const user = userEvent.setup();
    mockSignUp.mockResolvedValueOnce({
      error: new Error('User already registered'),
    });

    render(<SignUpForm />);

    const emailInput = screen.getByPlaceholderText('email.placeholder');
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const repeatPasswordInput = document.getElementById(
      'repeat-password'
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(emailInput, 'existing@example.com');
    await user.type(passwordInput, 'securepassword123');
    await user.type(repeatPasswordInput, 'securepassword123');

    fireEvent.submit(submitButton.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('User already registered')).toBeInTheDocument();
    });
  });

  it('should handle generic error messages', async () => {
    const user = userEvent.setup();
    mockSignUp.mockRejectedValueOnce(new Error('Network error'));

    render(<SignUpForm />);

    const emailInput = screen.getByPlaceholderText('email.placeholder');
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const repeatPasswordInput = document.getElementById(
      'repeat-password'
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'securepassword123');
    await user.type(repeatPasswordInput, 'securepassword123');

    fireEvent.submit(submitButton.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('should disable submit button while loading', async () => {
    const user = userEvent.setup();
    mockSignUp.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<SignUpForm />);

    const emailInput = screen.getByPlaceholderText('email.placeholder');
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const repeatPasswordInput = document.getElementById(
      'repeat-password'
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'securepassword123');
    await user.type(repeatPasswordInput, 'securepassword123');

    fireEvent.submit(submitButton.closest('form')!);

    expect(submitButton).toBeDisabled();
  });
});
