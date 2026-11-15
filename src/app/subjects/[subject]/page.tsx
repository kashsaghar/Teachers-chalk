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
      <section className="relative overflow-hidden bg-deep py-14 text-cream">
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-forest opacity-40" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-butter opacity-20" />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center md:px-6">
          <h1 className="font-heading text-3xl font-extrabold md:text-4xl">{subject.label}</h1>
          <p className="mt-3 text-cream/80">Online tuition for O Level, A Level, IGCSE, GCSE & Edexcel (CAIE and Edexcel)</p>
          <Button href={getWhatsAppLink(`Hi! I'd like to book a free demo for ${subject.label}.`)} className="mt-5">
            Book Free Demo
          </Button>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
        {subjectTeachers.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-xl font-bold text-cocoa">Your teacher</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {subjectTeachers.map((t) => (
                <TeacherCard key={t.slug} teacher={t} />
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-xl font-bold text-cocoa">Topics covered</h2>
          <p className="mb-4 text-sm text-cocoa-muted">
            A general overview — exact coverage depends on your specific level and syllabus.
          </p>
          <div className="flex flex-wrap gap-2">
            {subject.topics.map((topic) => (
              <span key={topic} className="rounded-full bg-sage-tint px-4 py-2 text-sm text-deep">
                {topic}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-heading text-xl font-bold text-cocoa">What&apos;s included</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {WHATS_INCLUDED.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-2xl border border-line bg-white px-4 py-3">
                <CheckCircle2 className="h-4 w-4 text-forest" />
                <span className="text-sm text-cocoa">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {subjectVideos.length > 0 && (
          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-cocoa">{subject.label} lectures</h2>
              <a href={`/lectures?subject=${subject.slug}`} className="text-sm font-medium text-forest hover:underline">
                View all →
              </a>
            </div>
            <VideoGrid videos={subjectVideos.slice(0, 8)} />
          </section>
        )}

        {subjectTestimonials.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-xl font-bold text-cocoa">What students say</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {subjectTestimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </section>
        )}

        <section className="rounded-[32px] bg-butter p-8 text-center">
          <h2 className="font-heading text-xl font-bold text-cocoa">Ready to start {subject.label}?</h2>
          <Button
            href={getWhatsAppLink(`Hi! I'd like to book a free demo for ${subject.label}.`)}
            className="mt-4"
          >
            Book Free Demo
          </Button>
        </section>

        <div className="mt-12">
          <h2 className="mb-4 font-heading text-xl font-bold text-cocoa">Other subjects</h2>
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
