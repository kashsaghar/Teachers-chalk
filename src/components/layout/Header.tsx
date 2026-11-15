"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, MessageCircle, PenTool, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AuthNavLink } from "@/components/auth/AuthNavLink";
import { useAuthStatus } from "@/lib/useAuthStatus";
import { programs } from "@/data/programs";
import { subjects } from "@/data/subjects";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Teachers", href: "/teachers" },
  { label: "Results", href: "/results" },
  { label: "Contact", href: "/contact" },
];

function NavDropdown({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-medium text-cocoa hover:bg-sage-tint"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-40 min-w-48 rounded-2xl border border-line bg-cream p-2 shadow-[0_18px_40px_rgba(71,60,51,0.14)]">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-xl px-3 py-2 text-sm text-cocoa hover:bg-sage-tint">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const auth = useAuthStatus();
  const isStudent = auth.status === "student";

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-stamp px-4 py-2 text-center text-xs font-medium text-white md:text-sm">
        <Link href="/contact" className="hover:underline">
          {site.announcementText} →
        </Link>
      </div>

      <div className="bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-deep px-4 py-2 text-cream"
          >
            <PenTool className="h-5 w-5" />
            <span className="font-heading text-base font-extrabold">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full bg-white p-1.5 shadow-[0_10px_30px_rgba(71,60,51,0.08)] lg:flex">
            <NavDropdown
              label="Programs"
              items={programs.map((p) => ({ href: `/programs/${p.slug}`, label: p.label }))}
            />
            <NavDropdown
              label="Subjects"
              items={subjects.map((s) => ({ href: `/subjects/${s.slug}`, label: s.label }))}
            />
            {isStudent ? (
              <NavDropdown
                label="Lectures"
                items={[
                  { href: "/lectures", label: "Free Lectures" },
                  { href: "/my-courses", label: "My Courses" },
                ]}
              />
            ) : (
              <Link
                href="/lectures"
                className="rounded-full px-4 py-2.5 text-sm font-medium text-cocoa hover:bg-sage-tint"
              >
                Lectures
              </Link>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2.5 text-sm font-medium text-cocoa hover:bg-sage-tint"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <AuthNavLink
              {...auth}
              className="flex items-center gap-1.5 text-sm font-medium text-cocoa hover:text-forest"
            />
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              onClick={() => trackWhatsAppClick("header_icon")}
              className="flex h-11 w-11 items-center justify-center rounded-full text-forest hover:bg-sage-tint"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <Button href="/contact" variant="primary">
              Book Free Demo
            </Button>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full text-cocoa lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-cream transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-deep px-4 py-2 text-cream"
            onClick={() => setMobileOpen(false)}
          >
            <PenTool className="h-5 w-5" />
            <span className="font-heading text-base font-extrabold">{site.name}</span>
          </Link>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full text-cocoa hover:bg-sage-tint"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cocoa-muted">Programs</p>
          <ul className="mb-6 space-y-1">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/programs/${p.slug}`}
                  className="block rounded-full px-4 py-2.5 text-base text-cocoa hover:bg-sage-tint"
                  onClick={() => setMobileOpen(false)}
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cocoa-muted">Subjects</p>
          <ul className="mb-6 space-y-1">
            {subjects.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/subjects/${s.slug}`}
                  className="block rounded-full px-4 py-2.5 text-base text-cocoa hover:bg-sage-tint"
                  onClick={() => setMobileOpen(false)}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="space-y-1">
            <li>
              <Link
                href="/lectures"
                className="block rounded-full px-4 py-2.5 text-base font-medium text-cocoa hover:bg-sage-tint"
                onClick={() => setMobileOpen(false)}
              >
                Lectures
              </Link>
            </li>
            {isStudent && (
              <li>
                <Link
                  href="/my-courses"
                  className="block rounded-full px-4 py-2.5 text-base font-medium text-cocoa hover:bg-sage-tint"
                  onClick={() => setMobileOpen(false)}
                >
                  My Courses
                </Link>
              </li>
            )}
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-full px-4 py-2.5 text-base font-medium text-cocoa hover:bg-sage-tint"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <AuthNavLink
                {...auth}
                className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-base font-medium text-cocoa hover:bg-sage-tint"
                onNavigate={() => setMobileOpen(false)}
              />
            </li>
          </ul>
        </nav>

        <div className="border-t border-line p-4">
          <Button href="/contact" variant="primary" size="lg" className="w-full">
            Book Free Demo
          </Button>
        </div>
      </div>
    </header>
  );
}
