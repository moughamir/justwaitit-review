import type { Metadata } from 'next';

import { LoginForm } from '@/components/login-form';

export const metadata: Metadata = {
  title: 'Login — Anaqio',
  robots: 'noindex, nofollow',
};

export default function LoginPage() {
  return <LoginForm />;
}
