import { SignUpForm } from "@/components/sign-up-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up — Anaqio",
  robots: "noindex, nofollow",
};

export default function SignUpPage() {
  return <SignUpForm />;
}