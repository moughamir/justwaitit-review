import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { UpdatePasswordForm } from '../update-password-form';

import { createClient } from '@/lib/supabase/client';

// Mock the Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}));

describe('UpdatePasswordForm', () => {
  let mockUpdateUser: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockUpdateUser = vi.fn();
    vi.mocked(createClient).mockReturnValue({
      auth: {
        updateUser: mockUpdateUser,
      },
    } as any);
  });

  it('should render the update password form correctly', () => {
    render(<UpdatePasswordForm />);

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
  });

  it('should handle successful password update', async () => {
    const user = userEvent.setup();
    mockUpdateUser.mockResolvedValueOnce({ error: null });

    render(<UpdatePasswordForm />);

    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(passwordInput, 'newSecurePassword123');
    fireEvent.submit(submitButton.closest('form')!);

    expect(screen.getByText('submitPending')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        password: 'newSecurePassword123',
      });
    });
  });

  it('should display error on password update failure', async () => {
    const user = userEvent.setup();
    mockUpdateUser.mockResolvedValueOnce({
      error: new Error('Password too weak'),
    });

    render(<UpdatePasswordForm />);

    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(passwordInput, 'weak');
    fireEvent.submit(submitButton.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('Password too weak')).toBeInTheDocument();
    });
  });

  it('should handle generic error messages', async () => {
    const user = userEvent.setup();
    mockUpdateUser.mockRejectedValueOnce(new Error('Network error'));

    render(<UpdatePasswordForm />);

    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(passwordInput, 'newSecurePassword123');
    fireEvent.submit(submitButton.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('should disable submit button while loading', async () => {
    const user = userEvent.setup();
    mockUpdateUser.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<UpdatePasswordForm />);

    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await user.type(passwordInput, 'newSecurePassword123');
    fireEvent.submit(submitButton.closest('form')!);

    expect(submitButton).toBeDisabled();
  });
});
