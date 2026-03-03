import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { InfoIcon, User, Terminal } from "lucide-react";
import { Suspense } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio Overview — Anaqio",
  robots: "noindex, nofollow",
};

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-aq-blue" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-aq-blue">
            Workspace Dashboard
          </span>
        </div>
        <h1 className="text-4xl font-bold font-display tracking-tight">Studio Overview</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 noise-overlay border-white/5 bg-secondary/10">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4 text-aq-blue" />
              <CardTitle className="text-sm uppercase tracking-widest font-bold opacity-60">System Claims</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-xs font-mono p-6 rounded-2xl bg-aq-ink border border-white/5 max-h-[400px] overflow-auto text-aq-blue/80 scrollbar-thin scrollbar-thumb-aq-blue/20">
              <Suspense fallback={<div className="animate-pulse text-muted-foreground italic">Decrypting claims...</div>}>
                <UserDetails />
              </Suspense>
            </pre>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="border-white/5 bg-aq-blue/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <InfoIcon className="w-4 h-4 text-aq-blue" />
                <CardTitle className="text-sm font-bold uppercase tracking-widest">Access Level</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed font-body">
                You are currently viewing the <span className="text-foreground font-semibold">Anaqio Studio Alpha</span>. 
                Features like Lookbook Gen and Virtual Try-On are being enabled progressively.
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/5 bg-secondary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-aq-purple" />
                <CardTitle className="text-sm font-bold uppercase tracking-widest">Account Status</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-foreground">Verified Member</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}