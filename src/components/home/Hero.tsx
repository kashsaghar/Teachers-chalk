import { Atom, Calculator, Cpu, FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

const HERO_LINES = ["New session.", "Bigger goals.", "Better results."];

const FLOAT_BADGES = [
  { label: "Physics", icon: Atom, className: "left-2 top-16 md:left-10 md:top-20 tc-bob" },
  { label: "Chemistry", icon: FlaskConical, className: "right-2 top-6 md:right-12 md:top-10 tc-bob-slow" },
  { label: "Maths", icon: Calculator, className: "right-10 bottom-0 md:right-24 md:bottom-4 tc-bob-fast" },
  { label: "CS", icon: Cpu, className: "left-10 bottom-2 md:left-28 md:bottom-6 tc-bob-slow" },
];

const MARQUEE_ITEMS = ["O Level", "A Level", "IGCSE", "GCSE", "Edexcel", "Group and one-on-one"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-sage opacity-35" aria-hidden="true" />
      <div className="pointer-events-none absolute left-16 top-10 hidden h-28 w-28 rounded-full bg-forest opacity-90 md:block" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 top-16 h-72 w-72 rounded-full bg-butter opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute right-24 top-64 hidden h-24 w-24 rounded-full bg-peach md:block" aria-hidden="true" />
      <div className="pointer-events-none absolute left-20 bottom-28 hidden h-16 w-16 rounded-full bg-sand md:block" aria-hidden="true" />

      <Reveal className="relative z-10 mx-auto flex max-w-[860px] flex-col items-center px-4 pt-16 pb-10 text-center md:px-6 md:pt-20">
        <Badge variant="coral">{site.announcementText}</Badge>

        <h1 className="mt-6 font-heading text-[36px] font-extrabold leading-[1.05] tracking-tight text-deep md:text-[64px] lg:text-[84px]">
          {HERO_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <span
                className="inline-block animate-[tc-line-rise_0.9s_cubic-bezier(0.2,0.9,0.2,1)_both] motion-reduce:animate-none"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {i === HERO_LINES.length - 1 ? (
                  <span className="relative inline-block">
                    {line}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 300 20"
                      className="absolute -bottom-3 left-0 h-3 w-full md:-bottom-4"
                      preserveAspectRatio="none"
                    >
                      <path
                        className="tc-draw"
                        d="M4 12 C 90 4, 200 2, 296 10"
                        fill="none"
                        stroke="var(--color-peach)"
                        strokeWidth="7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-xl text-base text-cocoa-muted md:text-lg">
          Expert online tuition for O Level, A Level, IGCSE &amp; Edexcel: Physics, Maths, Chemistry,
          Computer Science and Commerce.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={getWhatsAppLink()} variant="primary" size="lg">
            Book Free Demo
          </Button>
          <Button href="/lectures" variant="secondary" size="lg">
            Watch Free Lectures
          </Button>
        </div>

        <p className="mt-4 text-sm text-cocoa-muted">
          Group &amp; one-on-one · Flexible scheduling · Experienced teachers
        </p>
      </Reveal>

      <div className="relative z-10 mx-auto hidden max-w-[1200px] px-4 md:block md:px-6">
        <div className="relative h-56">
          {FLOAT_BADGES.map(({ label, icon: Icon, className }) => (
            <div
              key={label}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full bg-white text-xs font-bold text-deep shadow-[0_16px_36px_rgba(71,60,51,0.14)]",
                className
              )}
            >
              <Icon className="h-6 w-6 text-forest" />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-6 overflow-hidden md:mt-10">
        <div className="-mx-6 -rotate-[1.5deg] bg-deep py-3 md:py-4">
          <div className="tc-marquee-track flex w-max gap-10 whitespace-nowrap">
            {[0, 1].map((rep) => (
              <div key={rep} className="flex items-center gap-10 pl-10 font-heading text-lg font-bold text-cream md:text-xl">
                {MARQUEE_ITEMS.map((item) => (
                  <span key={item} className="flex items-center gap-10">
                    {item}
                    <span className="text-butter">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
