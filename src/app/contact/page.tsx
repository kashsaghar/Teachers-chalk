import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, Clock } from "lucide-react";
import { DemoForm } from "@/components/contact/DemoForm";
import { YoutubeIcon } from "@/components/ui/BrandIcons";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & Book a Free Demo | Teacher's Chalk",
  description: "Book a free demo class for O Level, A Level, IGCSE, GCSE or Edexcel tuition. Message us on WhatsApp or use the form.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold text-ink md:text-4xl">Book your free demo</h1>
        <p className="mt-3 text-base text-slate">
          Tell us a bit about what you need and we&apos;ll get back to you on WhatsApp to schedule a free demo class.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <DemoForm />

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-white p-6">
            <h2 className="text-base font-bold text-ink">Reach us directly</h2>
            <div className="mt-4 space-y-3">
              <a href={site.phoneHref} className="flex items-center gap-3 text-sm text-ink hover:text-primary">
                <Phone className="h-4 w-4 text-primary" /> {site.phone}
              </a>
              <WhatsAppLink context="contact_page" className="flex items-center gap-3 text-sm text-ink hover:text-primary">
                <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp
              </WhatsAppLink>
              {site.email && (
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-sm text-ink hover:text-primary">
                  <Mail className="h-4 w-4 text-primary" /> {site.email}
                </a>
              )}
              <a
                href={site.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-ink hover:text-primary"
              >
                <YoutubeIcon className="h-4 w-4 text-primary" /> YouTube
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-mist p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-ink">
              <Clock className="h-4 w-4" /> Class timings
            </h2>
            <p className="mt-2 text-sm text-slate">
              All class times are set in Pakistan Standard Time (PKT, GMT+5). We&apos;ll help you find a slot that
              works for your time zone if you&apos;re joining from overseas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
