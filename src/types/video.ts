import type { Board, Level, Subject } from "@/lib/tagVideo";

export type Video = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  views?: number;
  level?: Level;
  board?: Board;
  subject?: Subject;
  topic?: string;
  teacher?: string;
};

export type VideoOverride = Partial<Pick<Video, "level" | "board" | "subject" | "topic" | "teacher">> & {
  hidden?: boolean;
};

export type VideoOverrides = Record<string, VideoOverride>;
