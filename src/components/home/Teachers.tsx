import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeacherCard } from "@/components/ui/TeacherCard";
import { Reveal } from "@/components/ui/Reveal";
import { teachers } from "@/data/teachers";

export function Teachers() {
  return (
    <section className="bg-mist py-16">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading eyebrow="The people behind the chalk" title="Meet the teachers" />

        <Reveal className="mt-10">
          {teachers.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {teachers.slice(0, 5).map((teacher) => (
                <TeacherCard key={teacher.slug} teacher={teacher} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center text-sm text-slate">
              Teacher profiles coming soon.
            </div>
          )}
        </Reveal>

        <div className="mt-8 text-center">
          <Link href="/teachers" className="text-sm font-semibold text-primary hover:underline">
            Meet the full team →
          </Link>
        </div>
      </div>
    </section>
  );
}
