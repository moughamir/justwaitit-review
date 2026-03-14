import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { PWAInstallPrompt } from '../PWAInstallPrompt';

describe('PWAInstallPrompt', () => {
  let originalAddEventListener: typeof window.addEventListener;
  let originalRemoveEventListener: typeof window.removeEventListener;

  beforeEach(() => {
    vi.clearAllMocks();
    originalAddEventListener = window.addEventListener;
    originalRemoveEventListener = window.removeEventListener;
  });

  afterEach(() => {
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;
  });

  it('should not render initially', () => {
    render(<PWAInstallPrompt />);

    expect(screen.queryByText(/Install ANAQIO/i)).not.toBeInTheDocument();
  });

  it('should render after showPrompt becomes true', () => {
    // Mock setTimeout to run immediately
    vi.useFakeTimers();

    render(<PWAInstallPrompt />);

    // Fast-forward to after the 8 second delay
    act(() => {
      vi.advanceTimersByTime(8000);
    });

    // Should now show the prompt
    expect(screen.getByText(/Install ANAQIO/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Access our AI Fashion Studio/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Later')).toBeInTheDocument();
    expect(screen.getByText('Install')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('should have install button', async () => {
    vi.useFakeTimers();

    render(<PWAInstallPrompt />);

    act(() => {
      vi.advanceTimersByTime(8000);
    });

    const installButton = screen.getByText('Install');
    expect(installButton).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('should have dismiss button', async () => {
    vi.useFakeTimers();

    render(<PWAInstallPrompt />);

    act(() => {
      vi.advanceTimersByTime(8000);
    });

    const dismissButton = screen.getByText('Later');
    expect(dismissButton).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('should have proper styling classes', async () => {
    vi.useFakeTimers();

    render(<PWAInstallPrompt />);

    act(() => {
      vi.advanceTimersByTime(8000);
    });

    const container = screen.getByText(/Install ANAQIO/i).closest('div');
    expect(container).toHaveClass('fixed');
    expect(container).toHaveClass('z-[100]');
    expect(container).toHaveClass('backdrop-blur');

    vi.useRealTimers();
  });

  it('should handle install button click', async () => {
    vi.useFakeTimers();

    const mockPrompt = vi.fn();
    const mockUserChoice = vi.fn().mockResolvedValue({ outcome: 'accepted' });

    // Mock the beforeinstallprompt event
    const mockEvent = {
      preventDefault: vi.fn(),
      prompt: mockPrompt,
      userChoice: mockUserChoice,
    };

    render(<PWAInstallPrompt />);

    // Trigger the event manually
    act(() => {
      window.dispatchEvent(new CustomEvent('beforeinstallprompt', mockEvent));
    });

    act(() => {
      vi.advanceTimersByTime(8000);
    });

    await waitFor(() => {
      expect(screen.getByText('Install')).toBeInTheDocument();
    });

    const installButton = screen.getByText('Install');
    await userEvent.click(installButton);

    expect(mockPrompt).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('should handle dismiss button click', async () => {
    vi.useFakeTimers();

    render(<PWAInstallPrompt />);

    act(() => {
      vi.advanceTimersByTime(8000);
    });

    await waitFor(() => {
      expect(screen.getByText('Later')).toBeInTheDocument();
    });

    const dismissButton = screen.getByText('Later');
    await userEvent.click(dismissButton);

    // Should hide the prompt
    await waitFor(() => {
      expect(screen.queryByText(/Install ANAQIO/i)).not.toBeInTheDocument();
    });

    vi.useRealTimers();
  });

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<PWAInstallPrompt />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'beforeinstallprompt',
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });
});
