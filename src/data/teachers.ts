import type { Subject } from "@/lib/tagVideo";
import type { Level } from "@/lib/tagVideo";

export type Teacher = {
  slug: string;
  name: string;
  photo?: string;
  subjects: Subject[];
  levels: Level[];
  qualifications: string;
  yearsExperience: number;
  bio: string;
  bestResults?: string;
};

// Empty until the client supplies real teacher profiles (spec section 15).
// Fill this in rather than inventing names/bios — the Teachers section and
// TeacherCard render a "coming soon" placeholder while this stays empty.
export const teachers: Teacher[] = [];
