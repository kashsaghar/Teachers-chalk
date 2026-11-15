import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SubjectCard } from "@/components/ui/SubjectCard";
import { VideoGrid } from "@/components/lectures/VideoGrid";
import { programs } from "@/data/programs";
import { subjects } from "@/data/subjects";
import { getAllVideos } from "@/lib/youtube";
import { getWhatsAppLink } from "@/lib/whatsapp";
import type { Level } from "@/lib/tagVideo";

export const revalidate = 86400;

export async function generateStaticParams() {
  return programs.map((p) => ({ program: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ program: string }>;
}): Promise<Metadata> {
  const { program: slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) return {};

  return {
    title: `${program.label} Online Tuition (${program.board}) | Teacher's Chalk`,
    description: `Online ${program.label} tuition on the ${program.board} board: Physics, Maths, Chemistry, Computer Science and Commerce.`,
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ program: string }>;
}) {
  const { program: slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  const videos = await getAllVideos();
  const programVideos =
    program.slug === "edexcel"
      ? videos.filter((v) => v.board === "Edexcel")
      : videos.filter((v) => v.level === (program.label as Level));

  const programSubjects = subjects.filter((s) => program.subjectSlugs.includes(s.slug));

  return (
    <div>
      <section className="bg-primary py-14 text-bg">
        <div className="mx-auto max-w-[1200px] px-4 text-center md:px-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-coral">{program.board}</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{program.label}</h1>
          <p className="mt-3 text-bg/80">
            Online {program.label} tuition on the {program.board} board, with live classes, notes and past-paper
            practice.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-bg/70">
            <CalendarDays className="h-4 w-4" /> Exam sessions: May/June and Oct/Nov
          </div>
          <Button href={getWhatsAppLink(`Hi! I'd like to book a free demo for ${program.label}.`)} className="mt-5">
            Book Free Demo
          </Button>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold text-ink">Subjects offered</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {programSubjects.map((s) => (
              <SubjectCard key={s.slug} subject={s} videoCount={videos.filter((v) => v.subject === s.videoSubject).length} />
            ))}
          </div>
        </section>

        {programVideos.length > 0 && (
          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-ink">{program.label} lectures</h2>
              <a
                href={`/lectures?level=${encodeURIComponent(program.label)}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                View all →
              </a>
            </div>
            <VideoGrid videos={programVideos.slice(0, 8)} />
          </section>
        )}

        <section className="rounded-2xl bg-mist p-8 text-center">
          <h2 className="text-xl font-bold text-ink">Ready to start {program.label}?</h2>
          <Button href={getWhatsAppLink(`Hi! I'd like to book a free demo for ${program.label}.`)} className="mt-4">
            Book Free Demo
          </Button>
        </section>
      </div>
    </div>
  );
}
