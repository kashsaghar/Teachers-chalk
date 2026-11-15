"use client";

import { useState } from "react";
import { Hand, Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { faq } from "@/data/faq";

function AccordionItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn("rounded-[26px] p-5 transition-shadow", open ? "bg-white shadow-lg" : "bg-faq-row")}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-semibold text-deep">{question}</span>
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300",
            open ? "rotate-45 bg-forest text-white" : "bg-cream text-cocoa"
          )}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      {open && <p className="mt-3 pr-10 text-sm leading-relaxed text-cocoa-muted">{answer}</p>}
    </div>
  );
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream py-16 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-[1100px] px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.7fr] lg:items-start">
          <div>
            <p className="font-caveat text-2xl font-semibold text-forest">raise your hand</p>
            <h2 className="mt-1 font-heading text-4xl font-extrabold tracking-tight text-deep md:text-5xl">
              Questions parents ask
            </h2>
            <p className="mt-3 max-w-sm text-base text-cocoa-muted">
              Can&apos;t find yours? Message us and a teacher will reply.
            </p>
            <div className="mt-8 flex h-32 w-32 items-center justify-center rounded-full bg-sage-tint">
              <Hand className="h-12 w-12 text-forest" />
            </div>
          </div>

          <Reveal className="flex flex-col gap-3">
            {faq.map((item, i) => (
              <AccordionItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
