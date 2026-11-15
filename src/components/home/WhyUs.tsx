import { Users, CalendarClock, GraduationCap, FileText, LineChart, PlayCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const FEATURES = [
  { icon: Users, title: "Group & one-on-one sessions", desc: "Learn in a small group or get fully individual attention — your choice." },
  { icon: CalendarClock, title: "Flexible scheduling", desc: "Class times built around your school day and time zone." },
  { icon: GraduationCap, title: "Experienced subject specialists", desc: "Separate teachers for each subject, not generalists." },
  { icon: FileText, title: "Notes & past-paper practice", desc: "Structured notes plus regular past-paper walkthroughs." },
  { icon: LineChart, title: "Regular tests & progress updates", desc: "Know exactly where you stand before the real exam." },
  { icon: PlayCircle, title: "Recorded lectures to revise anytime", desc: "Our full YouTube library is free to rewatch whenever you need it." },
];

export function WhyUs() {
  return (
    <section className="bg-bg py-16">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading eyebrow="Why families choose us" title="Why Teacher's Chalk" />
        <Reveal className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-white p-6">
              <f.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-3 text-base font-bold text-ink">{f.title}</h3>
              <p className="mt-1 text-sm text-slate">{f.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
