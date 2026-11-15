import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import type { Teacher } from "@/data/teachers";
import { subjects } from "@/data/subjects";

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  const subjectSlug = subjects.find((s) => s.videoSubject === teacher.subjects[0])?.slug ?? "";
  return (
    <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
      <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-mist">
        {teacher.photo ? (
          <Image src={teacher.photo} alt={teacher.name} width={80} height={80} className="h-full w-full object-cover" />
        ) : (
          <GraduationCap className="h-8 w-8 text-primary" />
        )}
      </div>
      <h3 className="mt-4 text-base font-bold text-ink">{teacher.name}</h3>
      <p className="text-sm text-slate">{teacher.subjects.join(", ")}</p>
      <p className="mt-1 text-xs text-slate">
        {teacher.qualifications} · {teacher.yearsExperience}+ years
      </p>
      <p className="mt-3 text-sm text-ink/80">{teacher.bio}</p>
      <Link
        href={subjectSlug ? `/lectures?subject=${subjectSlug}` : "/lectures"}
        className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
      >
        View lectures →
      </Link>
    </div>
  );
}
