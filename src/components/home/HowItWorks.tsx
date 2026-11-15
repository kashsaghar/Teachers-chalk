import { MessageCircle, Video, ListChecks, TrendingUp, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  { icon: MessageCircle, title: "Message us on WhatsApp" },
  { icon: Video, title: "Attend a free demo" },
  { icon: ListChecks, title: "Pick a group or one-on-one plan" },
  { icon: TrendingUp, title: "Start classes and track progress" },
];

const CIRCLE_BG = ["bg-forest text-cream", "bg-butter text-cocoa", "bg-peach text-cocoa", "bg-sage text-deep"];

const PATH_D = "M 40 150 C 280 20, 420 260, 600 140 S 900 30, 1140 150";

const POSITIONS = [
  { left: "0%", top: "48%" },
  { left: "28%", top: "82%" },
  { left: "56%", top: "6%" },
  { left: "88%", top: "48%" },
];

export function HowItWorks() {
  return (
    <section className="bg-deep py-16 text-cream md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading eyebrow="Getting started" title="How it works" light />

        {/* Desktop: steps along a curved flight path */}
        <div className="relative mt-16 hidden md:block" style={{ height: 300 }}>
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <path d={PATH_D} fill="none" stroke="var(--color-sand)" strokeWidth="3" strokeDasharray="10 10" strokeLinecap="round" opacity={0.6} />
          </svg>
          <div
            aria-hidden="true"
            className="tc-fly-path absolute left-0 top-0 text-cream"
            style={{ offsetPath: `path('${PATH_D}')` }}
          >
            <Send className="h-7 w-7 -rotate-45" />
          </div>

          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="tc-bob absolute w-[220px] -translate-x-1/2 text-center"
              style={{ left: POSITIONS[i].left, top: POSITIONS[i].top, animationDelay: `${i * 0.4}s` }}
            >
              <span
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-deep font-heading text-3xl font-extrabold shadow-lg ${CIRCLE_BG[i]}`}
              >
                {i + 1}
              </span>
              <p className="mt-3 text-base font-bold">{step.title}</p>
            </div>
          ))}
        </div>

        {/* Mobile/tablet: simple stepper, no path/plane to avoid overflow */}
        <Reveal className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:hidden">
          {STEPS.map((step, i) => (
            <div key={step.title} className="rounded-[24px] bg-forest/20 p-6 text-center">
              <span className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full font-heading text-xl font-extrabold ${CIRCLE_BG[i]}`}>
                {i + 1}
              </span>
              <p className="mt-3 text-sm font-semibold">{step.title}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
