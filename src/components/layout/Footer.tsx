"use client";

import Link from "next/link";
import { Mail, MessageCircle, PenTool, Phone } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
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
  { label: "Student Login", href: "/login" },
];

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-bg/60">{title}</h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-bg">
      <div className="mx-auto max-w-[1200px] px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <PenTool className="h-6 w-6" />
              <span className="text-lg font-extrabold">{site.name}</span>
            </div>
            <p className="mt-3 text-sm text-bg/70">{site.tagline}</p>
          </div>

          <FooterColumn title="Programs">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link href={`/programs/${p.slug}`} className="text-sm text-bg/80 hover:text-bg">
                  {p.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Subjects">
            {subjects.map((s) => (
              <li key={s.slug}>
                <Link href={`/subjects/${s.slug}`} className="text-sm text-bg/80 hover:text-bg">
                  {s.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Quick links">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-bg/80 hover:text-bg">
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-2 text-sm text-bg/80 hover:text-bg">
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
            </li>
            <li>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("footer")}
                className="flex items-center gap-2 text-sm text-bg/80 hover:text-bg"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm text-bg/80 hover:text-bg">
                  <Mail className="h-4 w-4" /> {site.email}
                </a>
              </li>
            )}
            <li>
              <a
                href={site.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-bg/80 hover:text-bg"
              >
                <YoutubeIcon className="h-4 w-4" /> YouTube
              </a>
            </li>
            <li>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-bg/80 hover:text-bg"
              >
                <InstagramIcon className="h-4 w-4" /> Instagram
              </a>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-bg/15 pt-6 text-xs text-bg/60 md:flex-row">
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
