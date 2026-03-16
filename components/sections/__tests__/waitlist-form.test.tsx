import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { WaitlistForm } from '../waitlist-form';

import { joinWaitlist } from '@/lib/actions/waitlist';

// Mock the server action
vi.mock('@/lib/actions/waitlist', () => ({
  joinWaitlist: vi.fn(),
}));

// Mock framer-motion to avoid animation delays in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...(actual as any),
    AnimatePresence: ({ children }: any) => <>{children}</>,
    motion: {
      ...(actual as any).motion,
      div: ({ children, className, ...props }: any) => (
        <div className={className} data-testid="motion-div" {...props}>
          {children}
        </div>
      ),
      p: ({ children, className, ...props }: any) => (
        <p className={className} data-testid="motion-p" {...props}>
          {children}
        </p>
      ),
    },
  };
});

describe('WaitlistForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Simple Variant', () => {
    it('should render the simple form correctly', () => {
      render(<WaitlistForm source="test" variant="simple" />);

      expect(
        screen.getByPlaceholderText('professional@email.com')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /get access/i })
      ).toBeInTheDocument();
    });

    it('should submit the simple form and show success state', async () => {
      const user = userEvent.setup();
      vi.mocked(joinWaitlist).mockResolvedValueOnce({
        success: true,
        message: 'Successfully joined!',
      });

      render(<WaitlistForm source="test" variant="simple" />);

      const input = screen.getByPlaceholderText('professional@email.com');
      const button = screen.getByRole('button', { name: /get access/i });

      await user.type(input, 'test@example.com');
      // Bypass native validation by submitting the form directly
      fireEvent.submit(button.closest('form')!);

      await waitFor(() => {
        expect(joinWaitlist).toHaveBeenCalled();
      });

      // Verify the success message is displayed
      expect(
        await screen.findByText("You're on the list!")
      ).toBeInTheDocument();
      expect(screen.getByText('Successfully joined!')).toBeInTheDocument();
    });

    it('should show error message on simple form submission failure', async () => {
      const user = userEvent.setup();
      vi.mocked(joinWaitlist).mockResolvedValueOnce({
        success: false,
        message: 'Email already exists',
      });

      render(<WaitlistForm source="test" variant="simple" />);

      const input = screen.getByPlaceholderText('professional@email.com');
      const button = screen.getByRole('button', { name: /get access/i });

      await user.type(input, 'test@example.com');
      fireEvent.submit(button.closest('form')!);

      // Verify error message is displayed below the form
      expect(
        await screen.findByText('Email already exists')
      ).toBeInTheDocument();
    });
  });

  describe('Full Variant', () => {
    it('should render the first step of the full form', () => {
      render(<WaitlistForm source="test" variant="full" />);

      // Step 1 title from FULL_VARIANT_STEPS
      expect(screen.getByText('Identity')).toBeInTheDocument();
      expect(
        screen.getByText("Let's start with the basics")
      ).toBeInTheDocument();

      // Step 1 fields
      expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('professional@email.com')
      ).toBeInTheDocument();

      expect(
        screen.getByRole('button', { name: /continue/i })
      ).toBeInTheDocument();
    });

    it('should prevent advancing if validation fails', async () => {
      render(<WaitlistForm source="test" variant="full" />);

      const continueButton = screen.getByRole('button', { name: /continue/i });

      // Submit empty form, bypassing native HTML5 validation
      fireEvent.submit(continueButton.closest('form')!);

      // Should show specific validation errors
      expect(await screen.findByText('Name is required')).toBeInTheDocument();
      expect(await screen.findByText('Email is required')).toBeInTheDocument();

      // Should still be on Step 1
      expect(screen.getByText('Identity')).toBeInTheDocument();
    });
  });
});
