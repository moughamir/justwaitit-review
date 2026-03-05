'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('');
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
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {success ? (
        <Card className="noise-overlay border-white/5">
          <CardHeader>
            <CardTitle className="font-display text-3xl font-bold tracking-tight">
              Check Your Inbox
            </CardTitle>
            <CardDescription className="pt-2 font-body">
              Password reset instructions sent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              If you have an account registered with that email, you will
              receive a link to securely reset your credentials shortly.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="noise-overlay border-white/5">
          <CardHeader>
            <CardTitle className="font-display text-3xl font-bold tracking-tight">
              Recover Access
            </CardTitle>
            <CardDescription className="pt-2 font-body">
              Enter your email to receive recovery instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
              <div className="relative z-10 flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    className="font-body text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-white/10 bg-background/50"
                  />
                </div>
                {error && (
                  <p className="text-xs font-medium text-destructive">
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  variant="brand"
                  className="h-11 w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending Link...' : 'Recover Password'}
                </Button>
              </div>
              <div className="mt-6 text-center font-body text-sm">
                <Link
                  href="/auth/login"
                  className="font-semibold text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
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
