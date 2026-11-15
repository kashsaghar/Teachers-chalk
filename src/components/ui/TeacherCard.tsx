import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import type { Teacher } from "@/data/teachers";
import { subjects } from "@/data/subjects";

const BLOB_COLORS: Record<string, string> = {
  Physics: "bg-forest",
  Maths: "bg-butter",
  Chemistry: "bg-peach",
  "Computer Science": "bg-sage",
  Commerce: "bg-sand",
};

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  const subjectSlug = subjects.find((s) => s.videoSubject === teacher.subjects[0])?.slug ?? "";
  const blob = BLOB_COLORS[teacher.subjects[0]] ?? "bg-sand";
  const ringLabel = teacher.subjects[0]?.slice(0, 4).toUpperCase() ?? "TC";

  return (
    <div className="text-center">
      <div className="relative mx-auto h-[150px] w-[150px]">
        <div className={`tc-morph absolute inset-0 ${blob}`} aria-hidden="true" />
        <div className="absolute inset-[14px] flex items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-sand bg-cream">
          {teacher.photo ? (
            <Image src={teacher.photo} alt={teacher.name} width={120} height={120} className="h-full w-full object-cover" />
          ) : (
            <GraduationCap className="h-9 w-9 text-forest" />
          )}
        </div>
        <div className="absolute -bottom-1 -right-1 h-14 w-14">
          <div className="tc-spin-slow absolute inset-0 rounded-full border-2 border-dashed border-butter bg-cocoa" />
          <span className="absolute inset-0 flex items-center justify-center font-heading text-[10px] font-extrabold tracking-wide text-butter">
            {ringLabel}
          </span>
        </div>
      </div>

      <h3 className="mt-5 font-heading text-lg font-extrabold text-deep">{teacher.name}</h3>
      <p className="text-sm text-cocoa-muted">{teacher.subjects.join(", ")}</p>
      <p className="mt-1 text-xs text-cocoa-muted">{teacher.yearsExperience}+ years experience</p>
      <span className="mt-3 inline-block rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-cocoa">
        {teacher.qualifications}
      </span>
      <p className="mt-3 text-sm text-cocoa/80">{teacher.bio}</p>
      <Link
        href={subjectSlug ? `/lectures?subject=${subjectSlug}` : "/lectures"}
        className="mt-4 inline-block text-sm font-semibold text-forest hover:underline"
      >
        View lectures →
      </Link>
    </div>
  );
}
