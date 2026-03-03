import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Suspense } from "react";
import { AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication Error — Anaqio",
  robots: "noindex, nofollow",
};

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-destructive">Error Details</p>
        <p className="text-sm text-muted-foreground font-mono">
          {params?.error || "unspecified_authentication_error"}
        </p>
      </div>
    </div>
  );
}

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  return (
    <Card className="noise-overlay border-white/5">
      <CardHeader>
        <CardTitle className="text-3xl font-bold font-display tracking-tight">System Error</CardTitle>
        <CardDescription className="font-body pt-2">
          An issue occurred during authentication.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Suspense fallback={<div className="h-20 animate-pulse bg-secondary/20 rounded-xl" />}>
          <ErrorContent searchParams={searchParams} />
        </Suspense>
        <p className="text-sm text-muted-foreground font-body leading-relaxed">
          Please try signing in again or contact our support team if the problem persists.
        </p>
      </CardContent>
    </Card>
  );
}