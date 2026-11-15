import { MessageCircle, Video, ListChecks, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  { icon: MessageCircle, title: "Message us on WhatsApp" },
  { icon: Video, title: "Attend a free demo" },
  { icon: ListChecks, title: "Pick a group or one-on-one plan" },
  { icon: TrendingUp, title: "Start classes and track progress" },
];

export function HowItWorks() {
  return (
    <section className="bg-primary py-16 text-bg">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading eyebrow="Getting started" title="How it works" light />
        <Reveal className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="rounded-2xl bg-primary-light/60 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-ink">
                <step.icon className="h-6 w-6" />
              </div>
              <p className="mt-3 text-xs font-semibold text-bg/60">Step {i + 1}</p>
              <p className="mt-1 text-sm font-semibold">{step.title}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
