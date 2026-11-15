import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { programs } from "@/data/programs";

export function Programs() {
  return (
    <section className="bg-bg py-16">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading eyebrow="Choose your path" title="Programs we teach" />
        <Reveal className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {programs.map((program) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="group rounded-2xl border border-border bg-white p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:-translate-y-0"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-coral">{program.board}</p>
              <h3 className="mt-2 text-lg font-bold text-ink">{program.label}</h3>
              <p className="mt-1 text-xs text-slate">{program.subjectSlugs.length} subjects available</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
