import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SocialLinks } from '../SocialLinks';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('SocialLinks', () => {
  it('should render the SocialLinks component', () => {
    render(<SocialLinks />);

    // Should render social links container
    expect(document.querySelector('nav')).toBeInTheDocument();
  });

  it('should render social link icons', () => {
    render(<SocialLinks />);

    // Should have multiple links (at least Twitter/X, LinkedIn, etc.)
    const links = document.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should have proper accessibility attributes', () => {
    render(<SocialLinks />);

    const nav = document.querySelector('nav');
    expect(nav).toHaveAttribute('aria-label');
  });
});
