import type { Metadata } from "next";
import { TeacherCard } from "@/components/ui/TeacherCard";
import { Button } from "@/components/ui/Button";
import { teachers } from "@/data/teachers";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Our Teachers | Teacher's Chalk",
  description: "Meet the subject specialists teaching O Level, A Level, IGCSE, GCSE and Edexcel online at Teacher's Chalk.",
};

export default function TeachersPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold text-ink md:text-4xl">Meet the teachers</h1>
        <p className="mt-3 text-base text-slate">
          A separate specialist for every subject, not generalists.
        </p>
      </div>

      <div className="mt-10">
        {teachers.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.slug} teacher={teacher} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-mist p-12 text-center">
            <p className="text-base text-ink">Teacher profiles are coming soon.</p>
            <p className="mt-2 text-sm text-slate">
              Want to know who&apos;ll be teaching before that? Message us and we&apos;ll introduce you.
            </p>
            <Button href={getWhatsAppLink("Hi! Could you tell me more about your teachers?")} className="mt-4">
              Ask on WhatsApp
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
