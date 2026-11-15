"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, MessageCircle, PenTool, User, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { programs } from "@/data/programs";
import { subjects } from "@/data/subjects";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Lectures", href: "/lectures" },
  { label: "Teachers", href: "/teachers" },
  { label: "Results", href: "/results" },
  { label: "Contact", href: "/contact" },
];

function NavDropdown({
  label,
  items,
  basePath,
}: {
  label: string;
  items: { slug: string; label: string }[];
  basePath: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 py-2 text-sm font-medium text-ink hover:text-primary"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-40 min-w-48 rounded-2xl border border-border bg-bg p-2 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`${basePath}/${item.slug}`}
              className="block rounded-xl px-3 py-2 text-sm text-ink hover:bg-mist"
            >
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

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-coral px-4 py-2 text-center text-xs font-medium text-bg md:text-sm">
        <Link href="/contact" className="hover:underline">
          {site.announcementText} →
        </Link>
      </div>

      <div className="border-b border-border bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <PenTool className="h-6 w-6" />
            <span className="text-lg font-extrabold">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            <NavDropdown label="Programs" items={programs} basePath="/programs" />
            <NavDropdown label="Subjects" items={subjects} basePath="/subjects" />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-sm font-medium text-ink hover:text-primary"
            >
              <User className="h-4 w-4" /> Student Login
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              onClick={() => trackWhatsAppClick("header_icon")}
              className="flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-mist"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <Button href="/contact" variant="primary">
              Book Free Demo
            </Button>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-bg transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-primary" onClick={() => setMobileOpen(false)}>
            <PenTool className="h-6 w-6" />
            <span className="text-lg font-extrabold">{site.name}</span>
          </Link>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate">Programs</p>
          <ul className="mb-6 space-y-1">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/programs/${p.slug}`}
                  className="block rounded-xl px-2 py-2 text-base text-ink hover:bg-mist"
                  onClick={() => setMobileOpen(false)}
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate">Subjects</p>
          <ul className="mb-6 space-y-1">
            {subjects.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/subjects/${s.slug}`}
                  className="block rounded-xl px-2 py-2 text-base text-ink hover:bg-mist"
                  onClick={() => setMobileOpen(false)}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-2 py-2 text-base font-medium text-ink hover:bg-mist"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-xl px-2 py-2 text-base font-medium text-ink hover:bg-mist"
                onClick={() => setMobileOpen(false)}
              >
                <User className="h-4 w-4" /> Student Login
              </Link>
            </li>
          </ul>
        </nav>

        <div className="border-t border-border p-4">
          <Button href="/contact" variant="primary" size="lg" className="w-full">
            Book Free Demo
          </Button>
        </div>
      </div>
    </header>
  );
}
