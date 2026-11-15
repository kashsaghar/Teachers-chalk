import { SectionHeading } from "@/components/ui/SectionHeading";
import { SubjectCard } from "@/components/ui/SubjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { subjects } from "@/data/subjects";
import type { Video } from "@/types/video";

const DOODLES = [
  { text: "E = mc²", className: "left-[8%] top-0 text-peach tc-bob" },
  { text: "H₂O", className: "right-[10%] top-2 text-sage tc-bob-slow" },
  { text: "</>", className: "left-[28%] top-16 text-butter tc-bob-fast" },
];

export function Subjects({ videos }: { videos: Video[] }) {
  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="relative">
          {DOODLES.map((d) => (
            <span
              key={d.text}
              aria-hidden="true"
              className={cn("pointer-events-none absolute hidden font-caveat text-3xl md:block", d.className)}
            >
              {d.text}
            </span>
          ))}
          <SectionHeading eyebrow="Our classrooms" title="Subjects we teach" />
        </div>
        <Reveal className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {subjects.map((subject, index) => (
            <SubjectCard
              key={subject.slug}
              subject={subject}
              index={index}
              videoCount={videos.filter((v) => v.subject === subject.videoSubject).length}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
