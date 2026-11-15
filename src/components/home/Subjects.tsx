import { SectionHeading } from "@/components/ui/SectionHeading";
import { SubjectCard } from "@/components/ui/SubjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { subjects } from "@/data/subjects";
import type { Video } from "@/types/video";

export function Subjects({ videos }: { videos: Video[] }) {
  return (
    <section className="bg-bg py-16">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading eyebrow="Pick a subject" title="Subjects we teach" />
        <Reveal className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.slug}
              subject={subject}
              videoCount={videos.filter((v) => v.subject === subject.videoSubject).length}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
