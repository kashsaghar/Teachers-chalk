import { Users, CalendarClock, GraduationCap, FileText, LineChart, PlayCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const FEATURES = [
  { icon: Users, title: "Group & one-on-one sessions", desc: "Learn in a small group or get fully individual attention — your choice." },
  { icon: CalendarClock, title: "Flexible scheduling", desc: "Class times built around your school day and time zone." },
  { icon: GraduationCap, title: "Experienced subject specialists", desc: "Separate teachers for each subject, not generalists." },
  { icon: FileText, title: "Notes & past-paper practice", desc: "Structured notes plus regular past-paper walkthroughs." },
  { icon: LineChart, title: "Regular tests & progress updates", desc: "Know exactly where you stand before the real exam." },
  { icon: PlayCircle, title: "Recorded lectures to revise anytime", desc: "Our full YouTube library is free to rewatch whenever you need it." },
];

const TILE_STYLES = [
  "sm:col-span-2 lg:col-span-2 bg-forest text-cream",
  "bg-butter text-cocoa",
  "bg-white text-cocoa border border-line",
  "bg-white text-cocoa border border-line",
  "bg-peach text-cocoa",
  "sm:col-span-2 lg:col-span-2 bg-deep text-cream",
];

const ICON_WRAP_STYLES = [
  "bg-butter text-cocoa",
  "bg-cream text-cocoa",
  "bg-peach-tint text-cocoa",
  "bg-sage-tint text-forest",
  "bg-cream text-cocoa",
  "bg-peach text-cocoa",
];

export function WhyUs() {
  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading eyebrow="Why families choose us" title="Why Teacher's Chalk" />
        <Reveal className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={cn(
                "tc-wiggle-hover rounded-[32px] p-7 transition-transform duration-300 hover:-translate-y-2",
                TILE_STYLES[i]
              )}
            >
              <span className={cn("tc-wiggle-target flex h-14 w-14 items-center justify-center rounded-full", ICON_WRAP_STYLES[i])}>
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-heading text-xl font-extrabold">{f.title}</h3>
              <p className="mt-1 text-sm opacity-90">{f.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
