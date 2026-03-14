import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { BackButton } from '../back-button';

import { useRouter } from '@/i18n/routing';

describe('BackButton', () => {
  const mockBack = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockImplementation(
      () =>
        ({
          push: vi.fn(),
          replace: vi.fn(),
          prefetch: vi.fn(),
          back: mockBack,
          forward: vi.fn(),
          refresh: vi.fn(),
        }) as any
    );
  });

  it('should render the back button with default label', () => {
    render(<BackButton />);

    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render with custom label', () => {
    render(<BackButton label="Go Back" />);

    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('should call router.back on click', () => {
    render(<BackButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockBack).toHaveBeenCalled();
  });

  it('should render with arrow icon', () => {
    render(<BackButton />);

    // ArrowLeft icon should be present
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<BackButton className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('should have hover animation class on arrow', () => {
    render(<BackButton />);

    const arrow = document.querySelector('svg');
    expect(arrow).toHaveClass('group-hover:-translate-x-1');
  });
});
