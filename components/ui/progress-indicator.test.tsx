import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProgressIndicator } from '@/components/ui/progress-indicator';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
      <span {...props}>{children}</span>
    ),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 {...props}>{children}</h2>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useReducedMotion: () => false,
  useScroll: () => ({ scrollYProgress: { on: vi.fn(), get: () => 0 } }),
  useTransform: (_: unknown, __: unknown, output: unknown[]) => output[0],
}));

describe('ProgressIndicator', () => {
  // Behaviour 45
  it('renders exactly totalSteps step indicator elements', () => {
    render(<ProgressIndicator currentStep={2} totalSteps={3} />);
    const dots = screen.getAllByRole('button', { hidden: true });
    expect(dots).toHaveLength(3);
  });

  // Behaviour 46
  it('the indicator at index (currentStep - 1) has an active visual class or aria attribute', () => {
    render(<ProgressIndicator currentStep={2} totalSteps={3} />);
    const dots = screen.getAllByRole('button', { hidden: true });
    // Index 1 (second dot) should be current
    expect(dots[1]).toHaveClass('bg-aq-blue');
    expect(dots[1]).toHaveAttribute('aria-current', 'step');
  });

  // Behaviour 47
  it('indicators at indices below (currentStep - 1) have a completed class or attribute', () => {
    render(<ProgressIndicator currentStep={3} totalSteps={3} />);
    const dots = screen.getAllByRole('button', { hidden: true });
    // First two dots should be completed
    expect(dots[0]).toHaveClass('bg-aq-blue');
    expect(dots[1]).toHaveClass('bg-aq-blue');
  });

  // Behaviour 48
  it('indicators at indices above (currentStep - 1) have neither active nor completed state', () => {
    render(<ProgressIndicator currentStep={1} totalSteps={3} />);
    const dots = screen.getAllByRole('button', { hidden: true });
    // Second and third dots should be upcoming (not active/completed)
    expect(dots[1]).toHaveClass('bg-muted-foreground/20');
    expect(dots[2]).toHaveClass('bg-muted-foreground/20');
  });

  // Behaviour 49
  it('the container has aria-valuenow equal to currentStep', () => {
    render(<ProgressIndicator currentStep={2} totalSteps={3} />);
    const container = screen.getByRole('progressbar');
    expect(container).toHaveAttribute('aria-valuenow', '2');
  });

  // Behaviour 50
  it('the container has aria-valuemax equal to totalSteps', () => {
    render(<ProgressIndicator currentStep={2} totalSteps={5} />);
    const container = screen.getByRole('progressbar');
    expect(container).toHaveAttribute('aria-valuemax', '5');
  });
});
