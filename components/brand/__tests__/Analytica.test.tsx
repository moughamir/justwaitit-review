import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock Next.js dynamic import
vi.mock('next/dynamic', () => ({
  default: (importFunc: any) => {
    const DynamicComponent = (props: any) => {
      const Mod = importFunc() as any;
      const Component = Mod.then ? null : importFunc;
      return Component ? <Component {...props} /> : null;
    };
    DynamicComponent.displayName = 'DynamicComponent';
    return DynamicComponent;
  },
}));

// Mock Vercel Analytics
vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => <div data-testid="analytics" />,
}));

// Mock Vercel Speed Insights
vi.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: () => <div data-testid="speed-insights" />,
}));

// Mock Next Third Parties Google Analytics
vi.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: () => <div data-testid="google-analytics" />,
}));

describe('AnaqioAnalytica', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the AnaqioAnalytica component', () => {
    render(<AnaqioAnalytica />);

    // Component should render without crashing
    expect(document.body).toBeInTheDocument();
  });

  it('should render Analytics component', () => {
    render(<AnaqioAnalytica />);

    expect(screen.getByTestId('analytics')).toBeInTheDocument();
  });

  it('should render SpeedInsights component', () => {
    render(<AnaqioAnalytica />);

    expect(screen.getByTestId('speed-insights')).toBeInTheDocument();
  });

  it('should render GoogleAnalytics when GA_ID is set', async () => {
    const originalGaId = process.env.NEXT_PUBLIC_GA_ID;
    process.env.NEXT_PUBLIC_GA_ID = 'GA-TEST-ID';

    // Need to re-import after setting env var
    vi.resetModules();

    const { AnaqioAnalytica: AnaqioAnalyticaWithGA } =
      await import('../Analytica');
    render(<AnaqioAnalyticaWithGA />);

    expect(screen.getByTestId('google-analytics')).toBeInTheDocument();

    // Restore
    process.env.NEXT_PUBLIC_GA_ID = originalGaId;
  });

  it('should not render GoogleAnalytics when GA_ID is not set', async () => {
    const originalGaId = process.env.NEXT_PUBLIC_GA_ID;
    delete process.env.NEXT_PUBLIC_GA_ID;

    vi.resetModules();

    const { AnaqioAnalytica: AnaqioAnalyticaWithoutGA } =
      await import('../Analytica');
    render(<AnaqioAnalyticaWithoutGA />);

    expect(screen.queryByTestId('google-analytics')).not.toBeInTheDocument();

    // Restore
    process.env.NEXT_PUBLIC_GA_ID = originalGaId;
  });

  it('should render all tracking components together', async () => {
    const originalGaId = process.env.NEXT_PUBLIC_GA_ID;
    process.env.NEXT_PUBLIC_GA_ID = 'GA-TEST-ID';

    vi.resetModules();

    const { AnaqioAnalytica: AnaqioAnalyticaAll } =
      await import('../Analytica');
    render(<AnaqioAnalyticaAll />);

    expect(screen.getByTestId('analytics')).toBeInTheDocument();
    expect(screen.getByTestId('speed-insights')).toBeInTheDocument();
    expect(screen.getByTestId('google-analytics')).toBeInTheDocument();

    // Restore
    process.env.NEXT_PUBLIC_GA_ID = originalGaId;
  });
});

// Import after mocks
import { AnaqioAnalytica } from '../Analytica';
