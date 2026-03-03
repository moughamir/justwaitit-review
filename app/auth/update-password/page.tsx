import { UpdatePasswordForm } from "@/components/update-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Password — Anaqio",
  robots: "noindex, nofollow",
};

export default function UpdatePasswordPage() {
  return <UpdatePasswordForm />;
}