import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ProgressIndicator } from '../progress-indicator';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('ProgressIndicator', () => {
  const defaultProps = {
    currentStep: 2,
    totalSteps: 4,
  };

  it('should render the correct number of steps', () => {
    render(<ProgressIndicator {...defaultProps} />);

    const steps = screen.getAllByRole('progressbar');
    expect(steps).toHaveLength(1);

    // Check that all dots are rendered
    const dots = document.querySelectorAll('[aria-label^="Step"]');
    expect(dots).toHaveLength(4);
  });

  it('should mark completed steps correctly', () => {
    render(<ProgressIndicator {...defaultProps} />);

    const dots = document.querySelectorAll('[aria-label^="Step"]');

    // First step should be completed (stepNumber < currentStep)
    expect(dots[0]).toHaveClass('bg-aq-blue');
    expect(dots[0]).toHaveClass('cursor-pointer');
  });

  it('should mark current step correctly', () => {
    render(<ProgressIndicator {...defaultProps} />);

    const dots = document.querySelectorAll('[aria-label^="Step"]');

    // Second step should be current (stepNumber === currentStep)
    expect(dots[1]).toHaveClass('bg-aq-blue');
    expect(dots[1]).toHaveClass('shadow-lg');
    expect(dots[1]).toHaveAttribute('aria-current', 'step');
  });

  it('should mark upcoming steps correctly', () => {
    render(<ProgressIndicator {...defaultProps} />);

    const dots = document.querySelectorAll('[aria-label^="Step"]');

    // Third and fourth steps should be upcoming
    expect(dots[2]).toHaveClass('bg-muted-foreground/20');
    expect(dots[3]).toHaveClass('bg-muted-foreground/20');
  });

  it('should call onStepClick when clicking on a step', () => {
    const onStepClickMock = vi.fn();

    render(
      <ProgressIndicator {...defaultProps} onStepClick={onStepClickMock} />
    );

    const dots = document.querySelectorAll('[aria-label^="Step"]');

    // Click on first step
    fireEvent.click(dots[0]);

    expect(onStepClickMock).toHaveBeenCalledWith(1);
  });

  it('should not allow clicking when onStepClick is not provided', () => {
    render(<ProgressIndicator {...defaultProps} />);

    const dots = document.querySelectorAll('[aria-label^="Step"]');

    // First dot should be disabled (cursor-default)
    expect(dots[0]).toHaveClass('cursor-default');
  });

  it('should allow clicking when onStepClick is provided', () => {
    const onStepClickMock = vi.fn();

    render(
      <ProgressIndicator {...defaultProps} onStepClick={onStepClickMock} />
    );

    const dots = document.querySelectorAll('[aria-label^="Step"]');

    // Dots should be clickable
    expect(dots[0]).toHaveClass('cursor-pointer');
  });

  it('should have connecting lines between steps', () => {
    render(<ProgressIndicator {...defaultProps} />);

    // Should have 3 connecting lines for 4 steps
    const lines = document.querySelectorAll('.h-0\\.5');
    expect(lines).toHaveLength(3);
  });

  it('should mark connecting lines as completed or not', () => {
    render(<ProgressIndicator {...defaultProps} />);

    const lines = document.querySelectorAll('.h-0\\.5');

    // First line should be completed (between step 1 and 2)
    expect(lines[0]).toHaveClass('bg-aq-blue');

    // Second line should not be completed (between step 2 and 3)
    expect(lines[1]).toHaveClass('bg-muted-foreground/20');
  });

  it('should have correct aria attributes', () => {
    render(<ProgressIndicator {...defaultProps} />);

    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).toHaveAttribute('aria-valuenow', '2');
    expect(progressbar).toHaveAttribute('aria-valuemin', '1');
    expect(progressbar).toHaveAttribute('aria-valuemax', '4');
  });

  it('should enlarge current step', () => {
    render(<ProgressIndicator {...defaultProps} />);

    const dots = document.querySelectorAll('[aria-label^="Step"]');

    // Current step (step 2) should be larger
    expect(dots[1]).toHaveClass('h-4');
    expect(dots[1]).toHaveClass('w-4');
  });
});
