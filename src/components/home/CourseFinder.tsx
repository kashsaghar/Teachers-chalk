"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { programs } from "@/data/programs";
import { subjects } from "@/data/subjects";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackCourseFinderComplete, trackWhatsAppClick } from "@/lib/analytics";

function Step({ step, label, active }: { step: number; label: string; active: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", active ? "text-primary" : "text-slate")}>
      <span
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
          active ? "bg-primary text-bg" : "bg-mist text-slate"
        )}
      >
        {step}
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}

export function CourseFinder() {
  const [programSlug, setProgramSlug] = useState<string | null>(null);
  const [board, setBoard] = useState<string | null>(null);
  const [subjectSlug, setSubjectSlug] = useState<string | null>(null);

  const program = programs.find((p) => p.slug === programSlug);
  const subject = subjects.find((s) => s.slug === subjectSlug);

  const step = !programSlug ? 1 : !board ? 2 : !subjectSlug ? 3 : 4;

  const reset = () => {
    setProgramSlug(null);
    setBoard(null);
    setSubjectSlug(null);
  };

  return (
    <section className="bg-mist py-16">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading eyebrow="3 quick steps" title="Find your course" />

        <Reveal className="mx-auto mt-10 max-w-2xl rounded-3xl border border-border bg-white p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Step step={1} label="Level" active={step >= 1} />
            <Step step={2} label="Board" active={step >= 2} />
            <Step step={3} label="Subject" active={step >= 3} />
          </div>

          <div className="mt-6">
            {step === 1 && (
              <div className="flex flex-wrap gap-2">
                {programs.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => {
                      setProgramSlug(p.slug);
                      setBoard(p.board);
                    }}
                    className="min-h-11 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink hover:border-primary hover:text-primary"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {step === 2 && program && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setBoard(program.board)}
                  className="min-h-11 rounded-full border border-primary bg-primary px-4 py-2 text-sm font-medium text-bg"
                >
                  {program.board}
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => {
                      setSubjectSlug(s.slug);
                      if (program && board) {
                        trackCourseFinderComplete({ level: program.label, board, subject: s.label });
                      }
                    }}
                    className="min-h-11 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink hover:border-primary hover:text-primary"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {step === 4 && program && subject && (
              <div className="rounded-2xl bg-mist p-5">
                <p className="text-sm text-slate">Your match</p>
                <h3 className="mt-1 text-lg font-bold text-ink">
                  {program.label} ({board}) · {subject.label}
                </h3>
                <p className="mt-1 text-sm text-ink/80">
                  Message us and we&apos;ll connect you with the right teacher for this subject.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button href={`/lectures?subject=${subject.slug}&level=${encodeURIComponent(program.label)}`} variant="secondary" className="border-primary text-primary">
                    View lectures
                  </Button>
                  <Button
                    href={getWhatsAppLink(
                      `Hi! I'd like to book a free demo for ${subject.label} (${program.label}, ${board}).`
                    )}
                    onClick={() => trackWhatsAppClick("course_finder")}
                  >
                    Book demo for this subject
                  </Button>
                </div>
                <button onClick={reset} className="mt-4 text-xs font-medium text-slate hover:text-primary">
                  Start over
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
