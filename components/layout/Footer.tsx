import Link from 'next/link';

import { AnaqioTypographyLogo } from '@/components/ui/anaqio-typography-logo';
import InstagramIcon from '@/components/ui/icons/instagram';
import LinkedinIcon from '@/components/ui/icons/linkedin';
import NewTwitterIcon from '@/components/ui/icons/NewTwitter';
import PinterestIcon from '@/components/ui/icons/pinterest';
import TiktokIcon from '@/components/ui/icons/tiktok';
import YoutubeIcon from '@/components/ui/icons/youtube';

const socialLinks = [
  { href: 'https://x.com/anaqio', label: 'X (Twitter)', Icon: NewTwitterIcon },
  {
    href: 'https://instagram.com/anaqio',
    label: 'Instagram',
    Icon: InstagramIcon,
  },
  { href: 'https://tiktok.com/@anaqio', label: 'TikTok', Icon: TiktokIcon },
  {
    href: 'https://linkedin.com/company/anaqio',
    label: 'LinkedIn',
    Icon: LinkedinIcon,
  },
  { href: 'https://youtube.com/@anaqio', label: 'YouTube', Icon: YoutubeIcon },
  {
    href: 'https://pinterest.com/anaqio',
    label: 'Pinterest',
    Icon: PinterestIcon,
  },
];

const footerColumns = [
  {
    title: 'Platform',
    links: [
      { label: 'AI Studio', href: '/early-access' },
      { label: 'Lookbook Generator', href: '/early-access' },
      { label: 'Virtual Try-On', href: '/early-access' },
      { label: 'Pricing', href: '/early-access' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Brand', href: '/brand' },
      { label: 'Blog', href: '/blog' },
      { label: 'Help Center', href: '/help' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Early Access', href: '/early-access', badge: 'JOIN' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Legal Mentions', href: '/legal-mentions' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
];

export function Footer() {
  return (
    <div className="bg-aq-ink px-4 pt-20">
      <footer className="mx-auto w-full max-w-[1350px] overflow-hidden rounded-tl-3xl rounded-tr-3xl bg-white px-4 pt-8 text-aq-ink sm:px-8 md:px-16 lg:px-28 lg:pt-12">
        {/* ── Top Section ─────────────────────────────────────── */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:gap-12 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-3">
            <Link href="/" aria-label="Anaqio Home" className="block">
              <AnaqioTypographyLogo className="w-40" />
            </Link>

            <p className="max-w-96 font-serif text-sm/6 text-neutral-600">
              Your Digital Atelier. Create stunning lookbooks, swap backgrounds,
              and generate editorial visuals — powered by AI, designed for
              Moroccan fashion brands.
            </p>

            {/* Social Icons */}
            <div className="flex gap-5 md:gap-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-neutral-500 transition-colors duration-200 hover:text-aq-ink"
                >
                  <s.Icon width={20} height={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 items-start gap-8 md:grid-cols-3 md:gap-12 lg:col-span-3 lg:gap-28">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-sm font-medium">{col.title}</h3>
                <ul className="space-y-3 text-sm text-neutral-800">
                  {col.links.map((link) => (
                    <li key={link.label} className="flex items-center gap-2">
                      <Link
                        href={link.href}
                        className="transition-colors duration-200 hover:text-neutral-600"
                      >
                        {link.label}
                      </Link>
                      {link.badge && (
                        <span className="rounded-full border border-aq-blue/40 bg-aq-blue/5 px-2 py-0.5 text-[11px] text-aq-blue">
                          {link.badge}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ──────────────────────────────────────── */}
        <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-neutral-300 pt-4">
          <p className="text-sm text-neutral-600">
            {'\u00A9'} {new Date().getFullYear()} Anaqio
          </p>
          <p className="text-sm text-neutral-600">All rights reserved.</p>
        </div>

        {/* ── Giant Outlined Brand Text ───────────────────────── */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-full max-h-64 w-full max-w-3xl rounded-full bg-aq-blue/5 blur-[100px]" />
          <h2
            aria-hidden="true"
            className="mt-6 text-center font-display font-extrabold leading-[0.7] text-transparent [-webkit-text-stroke:1px_#D4D4D4] [font-size:clamp(3rem,15vw,15rem)]"
          >
            ANAQIO
          </h2>
        </div>
      </footer>
    </div>
  );
}
