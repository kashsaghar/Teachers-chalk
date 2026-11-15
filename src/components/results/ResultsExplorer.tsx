"use client";

import { useMemo, useState } from "react";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { Button } from "@/components/ui/Button";
import { subjects } from "@/data/subjects";
import { testimonials } from "@/data/testimonials";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function ResultsExplorer() {
  const [subjectSlug, setSubjectSlug] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const years = useMemo(
    () => Array.from(new Set(testimonials.map((t) => t.year).filter((y): y is number => !!y))).sort((a, b) => b - a),
    []
  );

  const subjectValue = subjects.find((s) => s.slug === subjectSlug)?.videoSubject ?? null;

  const filtered = testimonials.filter((t) => {
    if (subjectValue && t.subject !== subjectValue) return false;
    if (year && t.year !== year) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setSubjectSlug(null)}
          className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium ${
            subjectSlug === null ? "border-forest bg-forest text-cream" : "border-line bg-white text-cocoa"
          }`}
        >
          All subjects
        </button>
        {subjects.map((s) => (
          <button
            key={s.slug}
            onClick={() => setSubjectSlug(s.slug)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium ${
              subjectSlug === s.slug ? "border-forest bg-forest text-cream" : "border-line bg-white text-cocoa"
            }`}
          >
            {s.label}
          </button>
        ))}

        {years.length > 0 && (
          <select
            value={year ?? ""}
            onChange={(e) => setYear(e.target.value ? Number(e.target.value) : null)}
            className="rounded-full border border-line bg-white px-4 py-2 text-sm text-cocoa"
          >
            <option value="">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mt-10">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        ) : (
          <div className="rounded-[26px] bg-sage-tint p-12 text-center">
            <p className="text-base text-cocoa">Results and testimonials are coming soon.</p>
            <p className="mt-2 text-sm text-cocoa-muted">
              Ask us directly about recent results for your subject and level.
            </p>
            <Button href={getWhatsAppLink("Hi! Could you share some recent results for this subject?")} className="mt-4">
              Ask on WhatsApp
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
