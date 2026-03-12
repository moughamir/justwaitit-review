'use client';

import { useTranslations } from 'next-intl';
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
import { Link, useRouter } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const t = useTranslations('auth.signup');
  const tLogin = useTranslations('auth.login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push('/auth/sign-up-success');
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
            {t('title')}
          </CardTitle>
          <CardDescription className="font-body">{t('desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="relative z-10 flex flex-col gap-6">
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="font-body text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {tLogin('email.label')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={tLogin('email.placeholder')}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-white/10 bg-background/50"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="password"
                  className="font-body text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {tLogin('password.label')}
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-white/10 bg-background/50"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="repeat-password"
                  className="font-body text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t('passwordRepeat')}
                </Label>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
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
                {isLoading ? t('submitPending') : t('submit')}
              </Button>
            </div>
            <div className="mt-6 text-center font-body text-sm text-muted-foreground">
              {t('loginIntro')}{' '}
              <Link
                href="/auth/login"
                className="font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-aq-blue"
              >
                {t('loginLink')}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
