import type { Metadata } from "next";
import { CookiePolicyContent } from "./cookies-content";

export const metadata: Metadata = {
  title: "Cookie Policy — Anaqio",
  description:
    "Anaqio's Cookie Policy. Learn how we use cookies to improve your experience in our AI virtual studio.",
};

export default function CookiePolicyPage() {
  return <CookiePolicyContent />;
}