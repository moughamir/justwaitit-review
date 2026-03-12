import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="noise-overlay relative flex min-h-screen flex-col bg-background">
      <nav className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between p-8">
        <Link
          href="/"
          className="text-brand-gradient font-display text-xl font-bold tracking-tighter"
        >
          anaqio
        </Link>
      </nav>

      <main className="relative z-10 flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="relative z-10 p-8 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          &copy; 2026 Anaqio Studio &middot; All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
