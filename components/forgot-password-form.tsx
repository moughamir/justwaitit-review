"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {success ? (
        <Card className="noise-overlay border-white/5">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-display tracking-tight">Check Your Inbox</CardTitle>
            <CardDescription className="font-body pt-2">Password reset instructions sent</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed font-body">
              If you have an account registered with that email, you will receive
              a link to securely reset your credentials shortly.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="noise-overlay border-white/5">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-display tracking-tight">Recover Access</CardTitle>
            <CardDescription className="font-body pt-2">
              Enter your email to receive recovery instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6 relative z-10">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="font-body text-xs uppercase tracking-widest text-muted-foreground">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50 border-white/10"
                  />
                </div>
                {error && <p className="text-xs font-medium text-destructive">{error}</p>}
                <Button type="submit" variant="brand" className="w-full h-11" disabled={isLoading}>
                  {isLoading ? "Sending Link..." : "Recover Password"}
                </Button>
              </div>
              <div className="mt-6 text-center text-sm font-body">
                <Link
                  href="/auth/login"
                  className="text-muted-foreground hover:text-foreground font-semibold underline underline-offset-4 transition-colors"
                >
                  Back to Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
