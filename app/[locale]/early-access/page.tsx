import { EarlyAccessContent } from './early-access-content';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Early Access — Anaqio',
  description:
    "Join the waitlist for early access to Anaqio's AI Visual Studio. Be the first to experience the future of fashion commerce.",
};

export default function EarlyAccessPage() {
  return <EarlyAccessContent />;
}
