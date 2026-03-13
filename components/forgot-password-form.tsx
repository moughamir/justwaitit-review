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
import { Link } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const t = useTranslations('auth.forgot');
  const tLogin = useTranslations('auth.login');
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
              {t('success.title')}
            </CardTitle>
            <CardDescription className="pt-2 font-body">
              {t('success.desc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              {t('success.msg')}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="noise-overlay border-white/5">
          <CardHeader>
            <CardTitle className="font-display text-3xl font-bold tracking-tight">
              {t('title')}
            </CardTitle>
            <CardDescription className="pt-2 font-body">
              {t('desc')}
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
                  {isLoading ? t('submitPending') : t('submit')}
                </Button>
              </div>
              <div className="mt-6 text-center font-body text-sm">
                <Link
                  href="/auth/login"
                  className="font-semibold text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  {t('back')}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
