"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { programs } from "@/data/programs";
import { subjects } from "@/data/subjects";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackCourseFinderComplete, trackWhatsAppClick } from "@/lib/analytics";

function Step({ step, label, active }: { step: number; label: string; active: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", active ? "text-deep" : "text-cocoa-muted")}>
      <span
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
          active ? "bg-forest text-cream" : "bg-sage-tint text-cocoa-muted"
        )}
      >
        {step}
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}

function Pill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5",
        active
          ? "bg-forest text-cream"
          : "border border-line bg-cream text-cocoa hover:border-forest hover:text-forest"
      )}
    >
      {children}
    </button>
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
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <Reveal className="mx-auto grid max-w-4xl overflow-hidden rounded-[36px] bg-white shadow-[0_24px_60px_rgba(71,60,51,0.10)] md:grid-cols-[1.3fr_1fr]">
          <div
            className="relative px-6 py-8 md:px-10 md:py-10"
            style={{
              backgroundImage: "repeating-linear-gradient(white 0 37px, var(--color-sage-tint) 37px 38px)",
            }}
          >
            <span className="absolute left-7 top-0 bottom-0 hidden w-[2px] bg-peach md:left-10 md:block" aria-hidden="true" />
            {[18, 40, 62].map((top) => (
              <span
                key={top}
                aria-hidden="true"
                className="absolute left-2.5 hidden h-3 w-3 rounded-full border border-line bg-cream md:block"
                style={{ top: `${top}px` }}
              />
            ))}

            <p className="font-caveat text-2xl text-forest">find your course in 3 taps</p>
            <h2 className="mt-1 font-heading text-[28px] font-extrabold text-deep md:text-[32px]">
              What are you studying?
            </h2>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Step step={1} label="Level" active={step >= 1} />
              <Step step={2} label="Board" active={step >= 2} />
              <Step step={3} label="Subject" active={step >= 3} />
            </div>

            <div className="mt-6">
              {step === 1 && (
                <div className="flex flex-wrap gap-2">
                  {programs.map((p) => (
                    <Pill
                      key={p.slug}
                      onClick={() => {
                        setProgramSlug(p.slug);
                        setBoard(p.board);
                      }}
                    >
                      {p.label}
                    </Pill>
                  ))}
                </div>
              )}

              {step === 2 && program && (
                <div className="flex flex-wrap gap-2">
                  <Pill active onClick={() => setBoard(program.board)}>
                    {program.board}
                  </Pill>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-wrap gap-2">
                  {subjects.map((s) => (
                    <Pill
                      key={s.slug}
                      onClick={() => {
                        setSubjectSlug(s.slug);
                        if (program && board) {
                          trackCourseFinderComplete({ level: program.label, board, subject: s.label });
                        }
                      }}
                    >
                      {s.label}
                    </Pill>
                  ))}
                </div>
              )}

              {step === 4 && (
                <button onClick={reset} className="text-xs font-semibold text-cocoa-muted hover:text-forest">
                  Start over
                </button>
              )}
            </div>
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden bg-deep p-8 text-cream md:p-10">
            <svg
              aria-hidden="true"
              viewBox="0 0 110 110"
              className="tc-spin-slow pointer-events-none absolute -right-6 -top-6 h-28 w-28"
            >
              <circle cx="55" cy="55" r="54" fill="var(--color-butter)" />
              <circle cx="55" cy="55" r="20" fill="var(--color-deep)" />
            </svg>

            {step === 4 && program && subject ? (
              <div className="tc-pop relative rounded-[28px] bg-cream p-6 text-cocoa">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-butter-tint px-3 py-1 text-xs font-semibold">{program.label}</span>
                  <span className="rounded-full bg-sage-tint px-3 py-1 text-xs font-semibold text-deep">{board}</span>
                </div>
                <h3 className="mt-3 font-heading text-2xl font-extrabold text-deep">
                  {program.label} {subject.label}
                </h3>
                <p className="mt-2 text-sm text-cocoa-muted">
                  Message us and we&apos;ll connect you with the right teacher for this subject.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <Button
                    href={`/lectures?subject=${subject.slug}&level=${encodeURIComponent(program.label)}`}
                    variant="secondary"
                  >
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
              </div>
            ) : (
              <div className="relative text-center">
                <p className="font-heading text-xl font-extrabold">Your match</p>
                <p className="mt-2 text-sm text-cream/80">
                  Pick a level, board and subject to see your teacher match here.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
