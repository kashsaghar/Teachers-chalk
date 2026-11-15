import type { Board, Level } from "@/lib/tagVideo";

export const LEVEL_OPTIONS: { slug: string; value: Level }[] = [
  { slug: "o-level", value: "O Level" },
  { slug: "a-level", value: "A Level" },
  { slug: "igcse", value: "IGCSE" },
  { slug: "gcse", value: "GCSE" },
  { slug: "as", value: "AS" },
  { slug: "a2", value: "A2" },
];

export const BOARD_OPTIONS: { slug: string; value: Board }[] = [
  { slug: "caie", value: "CAIE" },
  { slug: "edexcel", value: "Edexcel" },
];

export type SortOption = "newest" | "oldest" | "most-viewed";

export const SORT_OPTIONS: { slug: SortOption; label: string }[] = [
  { slug: "newest", label: "Newest" },
  { slug: "oldest", label: "Oldest" },
  { slug: "most-viewed", label: "Most viewed" },
];
