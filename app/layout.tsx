// Root layout — thin shell required by Next.js.
// All page content, fonts, and providers live in app/[locale]/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
