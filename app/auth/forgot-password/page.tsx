import type { Metadata } from 'next';

import { ForgotPasswordForm } from '@/components/forgot-password-form';

export const metadata: Metadata = {
  title: 'Forgot Password — Anaqio',
  robots: 'noindex, nofollow',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
