'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push('/protected');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="noise-overlay border-white/5">
        <CardHeader>
          <CardTitle className="font-display text-3xl font-bold">
            Welcome back
          </CardTitle>
          <CardDescription className="font-body">
            Sign in to your anaqio studio account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="relative z-10 flex flex-col gap-6">
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="font-body text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Email
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label
                    htmlFor="password"
                    className="font-body text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Password
                  </Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-xs font-semibold text-aq-blue transition-colors hover:text-aq-purple"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-white/10 bg-background/50"
                />
              </div>
              {error && (
                <p className="text-xs font-medium text-destructive">{error}</p>
              )}
              <Button
                type="submit"
                variant="brand"
                className="h-11 w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Sign In'}
              </Button>
            </div>
            <div className="mt-6 text-center font-body text-sm text-muted-foreground">
              New to anaqio?{' '}
              <Link
                href="/auth/sign-up"
                className="font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-aq-blue"
              >
                Create an account
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
