import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-body noise-overlay selection:bg-aq-blue/20 flex flex-col">
      <nav className="border-b border-border/50 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold font-display tracking-tighter text-brand-gradient">
            anaqio
          </Link>
          <div className="flex items-center gap-6">
            <Suspense fallback={<div className="w-20 h-8 bg-secondary/50 rounded-lg animate-pulse" />}>
              <AuthButton />
            </Suspense>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 lg:p-12 relative z-10">
        {children}
      </main>

      <footer className="border-t border-border/50 py-12 bg-secondary/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
            &copy; 2026 Anaqio Studio &middot; Virtual Workspace
          </p>
          <div className="flex gap-8">
            <Link href="/terms" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
