"use client";

import Link from "next/link";
import { Mail, MessageCircle, PenTool, Phone } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { AuthNavLink } from "@/components/auth/AuthNavLink";
import { useAuthStatus } from "@/lib/useAuthStatus";
import { programs } from "@/data/programs";
import { subjects } from "@/data/subjects";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

const quickLinks = [
  { label: "Lectures", href: "/lectures" },
  { label: "Teachers", href: "/teachers" },
  { label: "Results", href: "/results" },
  { label: "FAQ", href: "/faq" },
];

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-butter">{title}</h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function SocialButton({
  href,
  label,
  className,
  children,
  onClick,
}: {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-cream transition-colors hover:bg-white/20 ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

export function Footer() {
  const auth = useAuthStatus();

  return (
    <footer className="relative overflow-hidden rounded-t-[56px] bg-deep text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 z-0 h-72 w-72 rounded-full bg-forest opacity-40"
      />
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <PenTool className="h-6 w-6" />
              <span className="font-heading text-lg font-extrabold">{site.name}</span>
            </div>
            <p className="mt-3 text-sm text-cream/70">{site.tagline}</p>
          </div>

          <FooterColumn title="Programs">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link href={`/programs/${p.slug}`} className="text-sm text-cream/80 hover:text-cream">
                  {p.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Subjects">
            {subjects.map((s) => (
              <li key={s.slug}>
                <Link href={`/subjects/${s.slug}`} className="text-sm text-cream/80 hover:text-cream">
                  {s.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Quick links">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-cream/80 hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <AuthNavLink {...auth} className="flex items-center gap-1.5 text-sm text-cream/80 hover:text-cream" />
            </li>
          </FooterColumn>

          <FooterColumn title="Contact">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-2 text-sm text-cream/80 hover:text-cream">
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
            </li>
            <li>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("footer")}
                className="flex items-center gap-2 text-sm text-cream/80 hover:text-cream"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm text-cream/80 hover:text-cream">
                  <Mail className="h-4 w-4" /> {site.email}
                </a>
              </li>
            )}
            <li className="flex gap-2 pt-1">
              <SocialButton href={site.youtubeUrl} label="YouTube" className="bg-butter text-cocoa hover:bg-peach">
                <YoutubeIcon className="h-4 w-4" />
              </SocialButton>
              <SocialButton href={site.instagramUrl} label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </SocialButton>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/15 pt-6 text-xs text-cream/60 md:flex-row">
          <p>
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
