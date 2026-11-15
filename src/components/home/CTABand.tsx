"use client";

import { GraduationCap, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

export function CTABand() {
  return (
    <section className="bg-cream py-16">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[48px] bg-butter px-6 py-16 text-center md:px-12">
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-peach opacity-70" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-12 left-32 h-28 w-28 rounded-full bg-sage opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-10 right-24 hidden h-36 w-36 rounded-full bg-butter-tint opacity-80 md:block" aria-hidden="true" />
        <Send
          aria-hidden="true"
          className="tc-bob pointer-events-none absolute left-16 top-28 hidden h-12 w-12 -rotate-45 text-cream md:block"
        />

        <div className="relative hidden flex-col items-center md:absolute md:right-10 md:top-8 md:flex">
          <div className="relative h-28 w-28">
            <div className="tc-spin-slow absolute inset-0 rounded-full border-2 border-dashed border-cream/50 bg-deep" />
            <span className="absolute inset-0 flex items-center justify-center">
              <GraduationCap className="h-9 w-9 text-cream" />
            </span>
          </div>
          <span className="mt-2 rounded-full bg-deep px-3 py-1 text-[11px] font-bold tracking-wide text-cream">
            New session · May/June 2027
          </span>
        </div>

        <div className="relative z-10">
          <p className="font-caveat text-2xl font-semibold text-cocoa">your future won&apos;t wait</p>
          <h2 className="mx-auto mt-1 max-w-xl font-heading text-3xl font-extrabold text-deep md:text-5xl">
            Book your free demo today
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={getWhatsAppLink()}
              variant="primary"
              size="lg"
              className="relative tc-ring-pulse"
              onClick={() => trackWhatsAppClick("cta_band")}
            >
              Chat on WhatsApp
            </Button>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-base font-bold text-cocoa"
            >
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
