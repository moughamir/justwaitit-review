"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a08] flex items-center justify-center px-6">
      <div className="max-w-md w-full glass-strong p-12 rounded-[2.5rem] border-white/5 text-center space-y-8">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto text-destructive">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-display italic tracking-tight">Something went wrong</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Our virtual studio hit an unexpected error. We&apos;ve been notified and are working on it.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => reset()}
            variant="brand"
            className="h-12 rounded-xl font-bold"
          >
            Try again
          </Button>
          <Button
            onClick={() => window.location.href = "/"}
            variant="ghost"
            className="text-xs uppercase tracking-widest font-bold opacity-60 hover:opacity-100"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
