'use client';

import { type ComponentPropsWithoutRef } from 'react';

type ScrollLinkProps = ComponentPropsWithoutRef<'a'> & {
  targetId: string;
};

/**
 * Semantic anchor for in-page scroll navigation.
 * Renders as `<a href="#id">` for keyboard/screen-reader accessibility
 * and intercepts click for smooth scrolling. Compose with Button asChild:
 *
 * @example
 * <Button variant="hero" asChild>
 *   <ScrollLink targetId="waitlist">Join Waitlist</ScrollLink>
 * </Button>
 */
export function ScrollLink({ targetId, children, ...props }: ScrollLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      {...props}
      onClick={(e) => {
        e.preventDefault();
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: 'smooth' });
        props.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
