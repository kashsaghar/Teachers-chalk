export type Program = {
  slug: string;
  label: string;
  board: "CAIE" | "Edexcel";
  // Defaults to all 5 subjects; confirm the real per-program split with the client.
  subjectSlugs: string[];
};

const ALL_SUBJECTS = ["physics", "maths", "chemistry", "computer-science", "commerce"];

export const programs: Program[] = [
  { slug: "o-level", label: "O Level", board: "CAIE", subjectSlugs: ALL_SUBJECTS },
  { slug: "a-level", label: "A Level", board: "CAIE", subjectSlugs: ALL_SUBJECTS },
  { slug: "igcse", label: "IGCSE", board: "CAIE", subjectSlugs: ALL_SUBJECTS },
  { slug: "gcse", label: "GCSE", board: "Edexcel", subjectSlugs: ALL_SUBJECTS },
  { slug: "edexcel", label: "Edexcel", board: "Edexcel", subjectSlugs: ALL_SUBJECTS },
];
