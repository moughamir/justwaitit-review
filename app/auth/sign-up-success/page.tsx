import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Successful — Anaqio",
  robots: "noindex, nofollow",
};

export default function SignUpSuccessPage() {
  return (
    <Card className="noise-overlay border-white/5">
      <CardHeader>
        <CardTitle className="text-3xl font-bold font-display tracking-tight text-brand-gradient">
          Registration Success
        </CardTitle>
        <CardDescription className="font-body pt-2">Check your email to confirm</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed font-body">
          You&apos;ve successfully joined the anaqio studio. We&apos;ve sent a verification link 
          to your inbox. Please confirm your email to activate your account.
        </p>
      </CardContent>
    </Card>
  );
}