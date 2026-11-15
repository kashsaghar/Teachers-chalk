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
        <p className="font-caveat text-2xl text-forest">let&apos;s talk</p>
        <h1 className="mt-1 font-heading text-3xl font-extrabold text-deep md:text-4xl">Book your free demo</h1>
        <p className="mt-3 text-base text-cocoa-muted">
          Tell us a bit about what you need and we&apos;ll get back to you on WhatsApp to schedule a free demo class.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <DemoForm />

        <div className="space-y-6">
          <div className="rounded-[26px] border border-line bg-white p-6 shadow-[0_18px_40px_rgba(71,60,51,.08)]">
            <h2 className="font-heading text-base font-bold text-cocoa">Reach us directly</h2>
            <div className="mt-4 space-y-3">
              <a href={site.phoneHref} className="flex items-center gap-3 text-sm text-cocoa hover:text-forest">
                <Phone className="h-4 w-4 text-forest" /> {site.phone}
              </a>
              <WhatsAppLink context="contact_page" className="flex items-center gap-3 text-sm text-cocoa hover:text-forest">
                <MessageCircle className="h-4 w-4 text-forest" /> WhatsApp
              </WhatsAppLink>
              {site.email && (
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-sm text-cocoa hover:text-forest">
                  <Mail className="h-4 w-4 text-forest" /> {site.email}
                </a>
              )}
              <a
                href={site.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-cocoa hover:text-forest"
              >
                <YoutubeIcon className="h-4 w-4 text-forest" /> YouTube
              </a>
            </div>
          </div>

          <div className="rounded-[26px] bg-sage-tint p-6">
            <h2 className="flex items-center gap-2 font-heading text-base font-bold text-deep">
              <Clock className="h-4 w-4" /> Class timings
            </h2>
            <p className="mt-2 text-sm text-cocoa-muted">
              All class times are set in Pakistan Standard Time (PKT, GMT+5). We&apos;ll help you find a slot that
              works for your time zone if you&apos;re joining from overseas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
