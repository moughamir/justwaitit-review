import type { Metadata } from 'next';

import { UpdatePasswordForm } from '@/components/update-password-form';

export const metadata: Metadata = {
  title: 'Update Password — Anaqio',
  robots: 'noindex, nofollow',
};

export default function UpdatePasswordPage() {
  return <UpdatePasswordForm />;
}
