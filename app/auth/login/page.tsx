import { LoginForm } from "@/components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — Anaqio",
  robots: "noindex, nofollow",
};

export default function LoginPage() {
  return <LoginForm />;
}