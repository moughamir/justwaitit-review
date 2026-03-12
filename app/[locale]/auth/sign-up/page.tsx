import type { Metadata } from 'next';

import { SignUpForm } from '@/components/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign Up — Anaqio',
  robots: 'noindex, nofollow',
};

export default function SignUpPage() {
  return <SignUpForm />;
}
