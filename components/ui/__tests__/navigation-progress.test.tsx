import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NavigationProgress, NAV_START_EVENT } from '../NavigationProgress';

describe('NavigationProgress', () => {
  it('should render the NavigationProgress component', () => {
    render(<NavigationProgress />);

    // Component should render without crashing
    expect(document.body).toBeInTheDocument();
  });

  it('should export NAV_START_EVENT constant', () => {
    expect(NAV_START_EVENT).toBeDefined();
    expect(typeof NAV_START_EVENT).toBe('string');
  });

  it('should have correct event name format', () => {
    expect(NAV_START_EVENT).toMatch(/nav:start/i);
  });
});
