import { AnaqioTypographyLogo } from '@/components/ui/anaqio-typography-logo';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a08]">
      <AnaqioTypographyLogo className="w-64" variant="outline-fill" />
    </div>
  );
}
