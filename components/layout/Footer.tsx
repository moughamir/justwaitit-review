import Link from "next/link";


export function Footer() {
  return (
    <footer className="w-full border-t border-border/30 py-12 px-4 snap-start bg-background/50 backdrop-blur-sm relative z-10">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-10">
        <div className="flex flex-col items-center sm:items-start gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-sm font-bold tracking-tighter font-display">ANAQIO™</p>
            <p className="text-xs text-muted-foreground/80 font-serif italic">
              Your Digital Atelier. Create. Style. Launch.
            </p>
            <p className="text-[10px] text-muted-foreground/50 font-body">
              {"\u00A9"} 2026 Anaqio. All rights reserved.
            </p>
          </div>

        </div>

        <nav aria-label="Footer Navigation" className="grid grid-cols-2 sm:flex items-center gap-x-10 gap-y-6 text-center sm:text-left">
          <Link
            href="/brand"
            className="text-[10px] font-bold text-muted-foreground hover:text-aq-blue transition-colors duration-200 uppercase tracking-[0.2em]"
          >
            Brand
          </Link>
          <Link
            href="/legal-mentions"
            className="text-[10px] font-bold text-muted-foreground hover:text-aq-blue transition-colors duration-200 uppercase tracking-[0.2em]"
          >
            Legal
          </Link>
          <Link
            href="/terms"
            className="text-[10px] font-bold text-muted-foreground hover:text-aq-blue transition-colors duration-200 uppercase tracking-[0.2em]"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-[10px] font-bold text-muted-foreground hover:text-aq-blue transition-colors duration-200 uppercase tracking-[0.2em]"
          >
            Privacy
          </Link>
          <Link
            href="/cookies"
            className="text-[10px] font-bold text-muted-foreground hover:text-aq-blue transition-colors duration-200 uppercase tracking-[0.2em]"
          >
            Cookies
          </Link>
        </nav>
      </div>
    </footer>
  );
}
