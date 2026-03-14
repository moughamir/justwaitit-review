import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ScrollLink } from '../scroll-link';

describe('ScrollLink', () => {
  it('should render an anchor tag with the correct href', () => {
    render(<ScrollLink targetId="target-section">Go to Target</ScrollLink>);
    const link = screen.getByRole('link', { name: /go to target/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#target-section');
  });

  it('should call scrollIntoView on click', async () => {
    const user = userEvent.setup();
    const mockScrollIntoView = vi.fn();

    // Mock document.getElementById
    const originalGetElementById = document.getElementById;
    document.getElementById = vi.fn().mockReturnValue({
      scrollIntoView: mockScrollIntoView,
    });

    render(<ScrollLink targetId="target-section">Go to Target</ScrollLink>);
    const link = screen.getByRole('link', { name: /go to target/i });

    await user.click(link);

    expect(document.getElementById).toHaveBeenCalledWith('target-section');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    // Restore original
    document.getElementById = originalGetElementById;
  });

  it('should call custom onClick handler if provided', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    // Mock document.getElementById to prevent errors
    const originalGetElementById = document.getElementById;
    document.getElementById = vi.fn().mockReturnValue({
      scrollIntoView: vi.fn(),
    });

    render(
      <ScrollLink targetId="target-section" onClick={mockOnClick}>
        Go to Target
      </ScrollLink>
    );
    const link = screen.getByRole('link', { name: /go to target/i });

    await user.click(link);

    expect(mockOnClick).toHaveBeenCalled();

    // Restore original
    document.getElementById = originalGetElementById;
  });
});
