import { MarqueeTickerAtom } from '@/components/atoms/MarqueeTickerAtom';
import { MARQUEE_ITEMS } from '@/lib/data/marquee-content';

interface MarqueeSectionProps {
  background?: string;
}

export function MarqueeSection({
  background = 'bg-foreground/5',
}: MarqueeSectionProps) {
  return (
    <section aria-hidden="true" className="w-full py-0">
      <MarqueeTickerAtom items={MARQUEE_ITEMS} background={background} />
    </section>
  );
}
