import type { Subject as VideoSubject } from "@/lib/tagVideo";

export type Subject = {
  slug: string;
  label: string;
  /** Matches the Video.subject tag produced by lib/tagVideo.ts */
  videoSubject: VideoSubject;
  /** General overview topics, not tied to a specific level/syllabus code — confirm exact per-level mapping with the client. */
  topics: string[];
};

export const subjects: Subject[] = [
  {
    slug: "physics",
    label: "Physics",
    videoSubject: "Physics",
    topics: ["Mechanics", "Waves & Light", "Electricity & Magnetism", "Thermal Physics", "Atomic & Nuclear Physics"],
  },
  {
    slug: "maths",
    label: "Mathematics",
    videoSubject: "Maths",
    topics: ["Algebra", "Geometry & Trigonometry", "Calculus", "Statistics & Probability", "Number & Mensuration"],
  },
  {
    slug: "chemistry",
    label: "Chemistry",
    videoSubject: "Chemistry",
    topics: ["Atomic Structure & Bonding", "Stoichiometry", "Organic Chemistry", "Acids, Bases & Salts", "Electrochemistry"],
  },
  {
    slug: "computer-science",
    label: "Computer Science",
    videoSubject: "Computer Science",
    topics: ["Algorithms & Programming", "Data Representation", "Computer Systems", "Networks", "Databases"],
  },
  {
    slug: "commerce",
    label: "Commerce",
    videoSubject: "Commerce",
    topics: ["Accounting Principles", "Business Studies", "Economics Fundamentals", "Financial Statements", "Markets & Trade"],
  },
];
