import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TeacherCard } from "@/components/ui/TeacherCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { VideoGrid } from "@/components/lectures/VideoGrid";
import { SubjectCard } from "@/components/ui/SubjectCard";
import { subjects } from "@/data/subjects";
import { teachers } from "@/data/teachers";
import { testimonials } from "@/data/testimonials";
import { getAllVideos } from "@/lib/youtube";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/data/site";

export const revalidate = 86400;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const WHATS_INCLUDED = ["Live online classes", "Structured notes", "Past-paper practice", "Regular tests"];

export async function generateStaticParams() {
  return subjects.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject: slug } = await params;
  const subject = subjects.find((s) => s.slug === slug);
  if (!subject) return {};

  return {
    title: `${subject.label} Tuition Online | Teacher's Chalk`,
    description: `Online ${subject.label} tuition for O Level, A Level, IGCSE and Edexcel, with live classes, notes, past papers and free video lectures.`,
  };
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: slug } = await params;
  const subject = subjects.find((s) => s.slug === slug);
  if (!subject) notFound();

  const videos = await getAllVideos();
  const subjectVideos = videos.filter((v) => v.subject === subject.videoSubject);
  const subjectTeachers = teachers.filter((t) => t.subjects.includes(subject.videoSubject));
  const subjectTestimonials = testimonials.filter((t) => t.subject === subject.videoSubject);

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${subject.label} Tuition`,
    description: `Online ${subject.label} tuition for O Level, A Level, IGCSE and Edexcel, with live classes, notes, past papers and free video lectures.`,
    provider: {
      "@type": "EducationalOrganization",
      name: site.name,
      url: siteUrl,
    },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <section className="bg-primary py-14 text-bg">
        <div className="mx-auto max-w-[1200px] px-4 text-center md:px-6">
          <h1 className="text-3xl font-extrabold md:text-4xl">{subject.label}</h1>
          <p className="mt-3 text-bg/80">Online tuition for O Level, A Level, IGCSE, GCSE & Edexcel (CAIE and Edexcel)</p>
          <Button href={getWhatsAppLink(`Hi! I'd like to book a free demo for ${subject.label}.`)} className="mt-5">
            Book Free Demo
          </Button>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
        {subjectTeachers.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold text-ink">Your teacher</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {subjectTeachers.map((t) => (
                <TeacherCard key={t.slug} teacher={t} />
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold text-ink">Topics covered</h2>
          <p className="mb-4 text-sm text-slate">
            A general overview — exact coverage depends on your specific level and syllabus.
          </p>
          <div className="flex flex-wrap gap-2">
            {subject.topics.map((topic) => (
              <span key={topic} className="rounded-full bg-mist px-4 py-2 text-sm text-ink">
                {topic}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold text-ink">What&apos;s included</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {WHATS_INCLUDED.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm text-ink">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {subjectVideos.length > 0 && (
          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-ink">{subject.label} lectures</h2>
              <a href={`/lectures?subject=${subject.slug}`} className="text-sm font-medium text-primary hover:underline">
                View all →
              </a>
            </div>
            <VideoGrid videos={subjectVideos.slice(0, 8)} />
          </section>
        )}

        {subjectTestimonials.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold text-ink">What students say</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {subjectTestimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </section>
        )}

        <section className="rounded-2xl bg-mist p-8 text-center">
          <h2 className="text-xl font-bold text-ink">Ready to start {subject.label}?</h2>
          <Button
            href={getWhatsAppLink(`Hi! I'd like to book a free demo for ${subject.label}.`)}
            className="mt-4"
          >
            Book Free Demo
          </Button>
        </section>

        <div className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-ink">Other subjects</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {subjects
              .filter((s) => s.slug !== subject.slug)
              .map((s) => (
                <SubjectCard key={s.slug} subject={s} videoCount={videos.filter((v) => v.subject === s.videoSubject).length} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
