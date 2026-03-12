import { InfoIcon, User, Terminal } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import type { Metadata } from 'next';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Studio Overview — Anaqio',
  robots: 'noindex, nofollow',
};

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect('/auth/login');
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-aq-blue" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aq-blue">
            Workspace Dashboard
          </span>
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Studio Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="noise-overlay border-white/5 bg-secondary/10 lg:col-span-2">
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-aq-blue" />
              <CardTitle className="text-sm font-bold uppercase tracking-widest opacity-60">
                System Claims
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="scrollbar-thin scrollbar-thumb-aq-blue/20 max-h-[400px] overflow-auto rounded-2xl border border-white/5 bg-aq-ink p-6 font-mono text-xs text-aq-blue/80">
              <Suspense
                fallback={
                  <div className="animate-pulse italic text-muted-foreground">
                    Decrypting claims...
                  </div>
                }
              >
                <UserDetails />
              </Suspense>
            </pre>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="border-white/5 bg-aq-blue/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <InfoIcon className="h-4 w-4 text-aq-blue" />
                <CardTitle className="text-sm font-bold uppercase tracking-widest">
                  Access Level
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                You are currently viewing the{' '}
                <span className="font-semibold text-foreground">
                  Anaqio Studio Alpha
                </span>
                . Features like Lookbook Gen and Virtual Try-On are being
                enabled progressively.
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/5 bg-secondary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-aq-purple" />
                <CardTitle className="text-sm font-bold uppercase tracking-widest">
                  Account Status
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                  Verified Member
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
