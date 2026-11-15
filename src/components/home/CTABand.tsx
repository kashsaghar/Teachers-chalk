"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

export function CTABand() {
  return (
    <section className="bg-accent py-14">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 px-4 text-center md:px-6">
        <h2 className="max-w-xl text-2xl font-extrabold text-ink md:text-3xl">
          Your future won&apos;t wait. Book your free demo class today.
        </h2>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            href={getWhatsAppLink()}
            variant="secondary"
            className="border-ink text-ink"
            onClick={() => trackWhatsAppClick("cta_band")}
          >
            Chat on WhatsApp
          </Button>
          <a href={site.phoneHref} className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
