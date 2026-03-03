import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background flex flex-col noise-overlay">
      <nav className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50">
        <Link href="/" className="text-xl font-bold font-display tracking-tighter text-brand-gradient">
          anaqio
        </Link>
      </nav>
      
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      <footer className="p-8 text-center relative z-10">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-semibold">
          &copy; 2026 Anaqio Studio &middot; All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
