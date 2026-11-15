import Link from "next/link";
import { ArrowUpRight, Atom, Calculator, FlaskConical, Cpu, Briefcase, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Subject } from "@/data/subjects";

const ICONS: Record<string, LucideIcon> = {
  physics: Atom,
  maths: Calculator,
  chemistry: FlaskConical,
  "computer-science": Cpu,
  commerce: Briefcase,
};

const CARD_STYLES = [
  { bg: "bg-white border border-line", text: "text-cocoa", iconBg: "bg-sage-tint", iconText: "text-forest", arrowBg: "bg-forest", arrowText: "text-cream" },
  { bg: "bg-butter", text: "text-cocoa", iconBg: "bg-cream", iconText: "text-cocoa", arrowBg: "bg-cocoa", arrowText: "text-butter" },
  { bg: "bg-forest", text: "text-cream", iconBg: "bg-cream", iconText: "text-forest", arrowBg: "bg-butter", arrowText: "text-cocoa" },
  { bg: "bg-peach", text: "text-cocoa", iconBg: "bg-cream", iconText: "text-cocoa", arrowBg: "bg-cocoa", arrowText: "text-peach" },
  { bg: "bg-white border border-line", text: "text-cocoa", iconBg: "bg-butter-tint", iconText: "text-cocoa", arrowBg: "bg-forest", arrowText: "text-cream" },
];

export function SubjectCard({
  subject,
  videoCount,
  index = 0,
}: {
  subject: Subject;
  videoCount: number;
  index?: number;
}) {
  const Icon = ICONS[subject.slug] ?? Atom;
  const style = CARD_STYLES[index % CARD_STYLES.length];
  const dropped = index === 1 || index === 3;

  return (
    <Link
      href={`/subjects/${subject.slug}`}
      className={cn(
        "group relative block rounded-[30px] p-6 text-center shadow-[0_12px_28px_rgba(71,60,51,0.08)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_28px_50px_rgba(71,60,51,0.18)] motion-reduce:hover:-translate-y-0",
        style.bg,
        style.text,
        dropped && "sm:translate-y-6"
      )}
    >
      <span
        className={cn(
          "mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-full transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110",
          style.iconBg
        )}
      >
        <Icon className={cn("h-8 w-8", style.iconText)} />
      </span>
      <h3 className="mt-4 font-heading text-lg font-extrabold">{subject.label}</h3>
      <div className="mt-5 flex items-center justify-between">
        <span className={cn("text-xs font-bold", style.text === "text-cream" ? "text-cream/90" : "text-cocoa-muted")}>
          {videoCount} lecture{videoCount === 1 ? "" : "s"}
        </span>
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
            style.arrowBg
          )}
        >
          <ArrowUpRight className={cn("h-4 w-4", style.arrowText)} />
        </span>
      </div>
    </Link>
  );
}
