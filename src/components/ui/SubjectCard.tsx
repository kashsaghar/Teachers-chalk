import Link from "next/link";
import { Atom, Calculator, FlaskConical, Cpu, Briefcase, type LucideIcon } from "lucide-react";
import type { Subject } from "@/data/subjects";

const ICONS: Record<string, LucideIcon> = {
  physics: Atom,
  maths: Calculator,
  chemistry: FlaskConical,
  "computer-science": Cpu,
  commerce: Briefcase,
};

export function SubjectCard({ subject, videoCount }: { subject: Subject; videoCount: number }) {
  const Icon = ICONS[subject.slug] ?? Atom;

  return (
    <Link
      href={`/subjects/${subject.slug}`}
      className="group block rounded-2xl border border-border bg-white p-6 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:-translate-y-0"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mist text-primary transition-colors duration-200 group-hover:bg-accent group-hover:text-ink">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-base font-bold text-ink">{subject.label}</h3>
      <p className="mt-1 text-xs text-slate">{videoCount} lecture{videoCount === 1 ? "" : "s"}</p>
      <span className="mt-3 inline-block text-sm font-medium text-primary">View lectures →</span>
    </Link>
  );
}
