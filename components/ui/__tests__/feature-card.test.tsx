import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FeatureCard } from '../feature-card';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useReducedMotion: () => false,
}));

describe('FeatureCard', () => {
  it('should render with title and body', () => {
    render(
      <FeatureCard
        title="Test Feature"
        body="This is a test feature description"
      />
    );

    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test feature description')
    ).toBeInTheDocument();
  });

  it('should render with icon when provided', () => {
    const MockIcon = () => <svg data-testid="icon" />;

    render(
      <FeatureCard
        title="Feature with Icon"
        body="Description"
        icon={MockIcon}
      />
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should render with label when provided', () => {
    render(
      <FeatureCard title="Feature with Label" body="Description" label="01" />
    );

    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('should apply default variant styles', () => {
    const { container } = render(
      <FeatureCard
        title="Default Variant"
        body="Description"
        variant="default"
      />
    );

    expect(container.firstChild).toHaveClass('border-border/60');
    expect(container.firstChild).toHaveClass('bg-white/5');
  });

  it('should apply glass variant styles', () => {
    const { container } = render(
      <FeatureCard title="Glass Variant" body="Description" variant="glass" />
    );

    expect(container.firstChild).toHaveClass('border-white/[0.08]');
    expect(container.firstChild).toHaveClass('bg-white/[0.04]');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <FeatureCard
        title="Custom Class"
        body="Description"
        className="custom-test-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-test-class');
  });

  it('should have hover animation classes', () => {
    const { container } = render(
      <FeatureCard title="Hover Animation" body="Description" />
    );

    expect(container.firstChild).toHaveClass('hover:-translate-y-1');
    expect(container.firstChild).toHaveClass('hover:border-aq-blue/25');
  });
});
