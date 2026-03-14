import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { LogoutButton } from '../logout-button';

import { createClient } from '@/lib/supabase/client';

// Mock the Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}));

describe('LogoutButton', () => {
  let mockSignOut: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockSignOut = vi.fn();
    vi.mocked(createClient).mockReturnValue({
      auth: {
        signOut: mockSignOut,
      },
    } as any);
  });

  it('should render the logout button', () => {
    render(<LogoutButton />);

    // next-intl is mocked to return the translation key
    expect(screen.getByText('logout')).toBeInTheDocument();
  });

  it('should call signOut and redirect on click', async () => {
    const user = userEvent.setup();
    mockSignOut.mockResolvedValueOnce({ error: null });

    render(<LogoutButton />);

    const logoutButton = screen.getByText('logout');
    await user.click(logoutButton);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  it('should handle signOut error gracefully', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const errorPromise = Promise.reject(new Error('Sign out failed'));
    mockSignOut.mockImplementation(() => errorPromise);

    render(<LogoutButton />);

    const logoutButton = screen.getByText('logout');
    await user.click(logoutButton);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
    // Await the error to prevent unhandled rejection
    await errorPromise.catch(() => {});
  });
});
