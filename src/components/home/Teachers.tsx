import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeacherCard } from "@/components/ui/TeacherCard";
import { Reveal } from "@/components/ui/Reveal";
import { teachers } from "@/data/teachers";

export function Teachers() {
  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="The people behind the chalk" title="Meet the teachers" align="left" />
          <Link
            href="/teachers"
            className="inline-flex shrink-0 items-center rounded-full border-[1.5px] border-cocoa px-6 py-3 text-sm font-bold text-cocoa transition-colors hover:bg-cocoa hover:text-cream"
          >
            All teachers
          </Link>
        </div>

        <Reveal className="mt-10">
          {teachers.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teachers.slice(0, 5).map((teacher) => (
                <TeacherCard key={teacher.slug} teacher={teacher} />
              ))}
            </div>
          ) : (
            <div className="rounded-[32px] bg-sage-tint p-10 text-center text-sm text-cocoa-muted">
              Teacher profiles coming soon.
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
