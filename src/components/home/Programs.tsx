import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { programs } from "@/data/programs";

const CARD_STYLES: Record<string, { bg: string; text: string; tape: string; arrowBg: string; arrowText: string }> = {
  "o-level": { bg: "bg-butter", text: "text-cocoa", tape: "bg-cream/70", arrowBg: "bg-cocoa", arrowText: "text-butter" },
  "a-level": { bg: "bg-forest", text: "text-cream", tape: "bg-cream/60", arrowBg: "bg-butter", arrowText: "text-cocoa" },
  igcse: { bg: "bg-peach", text: "text-cocoa", tape: "bg-cream/70", arrowBg: "bg-cocoa", arrowText: "text-peach" },
  gcse: { bg: "bg-sage", text: "text-deep", tape: "bg-cream/70", arrowBg: "bg-deep", arrowText: "text-sage" },
  edexcel: { bg: "bg-white border border-line", text: "text-cocoa", tape: "bg-butter/70", arrowBg: "bg-forest", arrowText: "text-cream" },
};

export function Programs() {
  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="text-center">
          <p className="font-caveat text-2xl text-forest">choose your path</p>
          <h2 className="mt-1 font-heading text-[32px] font-extrabold tracking-tight text-deep md:text-[48px]">
            Pick your{" "}
            <span className="relative inline-block">
              program
              <svg
                aria-hidden="true"
                viewBox="0 0 220 70"
                className="pointer-events-none absolute -left-4 -top-3 h-[70px] w-[220px]"
              >
                <path
                  className="tc-draw"
                  d="M110 5 C 190 4, 214 28, 204 48 C 190 68, 46 70, 16 50 C -4 36, 20 8, 122 8"
                  fill="none"
                  stroke="var(--color-peach)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-cocoa-muted">
            Cambridge and Edexcel boards, taught by subject specialists who know the exam inside out.
          </p>
        </div>

        <Reveal className="mt-14 flex flex-wrap justify-center gap-6">
          {programs.map((program, i) => {
            const style = CARD_STYLES[program.slug] ?? CARD_STYLES.edexcel;
            return (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className={cn(
                  "tc-swing group relative block w-[200px] rounded-[22px] p-6 shadow-[0_18px_30px_rgba(71,60,51,0.12)] transition-transform duration-300 hover:-translate-y-2",
                  style.bg,
                  style.text
                )}
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <span
                  aria-hidden="true"
                  className={cn("absolute -top-3 left-1/2 h-5 w-14 -translate-x-1/2 rotate-[-3deg] rounded-sm", style.tape)}
                />
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream font-heading text-lg font-extrabold text-deep">
                  {program.label.charAt(0)}
                </span>
                <h3 className="mt-4 font-heading text-2xl font-extrabold">{program.label}</h3>
                <p className="mt-1 text-sm opacity-90">{program.board}</p>
                <span
                  className={cn(
                    "absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
                    style.arrowBg
                  )}
                >
                  <ArrowUpRight className={cn("h-4 w-4", style.arrowText)} />
                </span>
              </Link>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
