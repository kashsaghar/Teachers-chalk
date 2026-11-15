import { Suspense } from "react";
import type { Metadata } from "next";
import { LecturesExplorer } from "@/components/lectures/LecturesExplorer";
import { getAllVideos } from "@/lib/youtube";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Free Video Lectures | Teacher's Chalk",
  description:
    "Every past-paper solution and lecture from the Teacher's Chalk YouTube channel, filterable by level, board and subject.",
};

export default async function LecturesPage() {
  const videos = await getAllVideos();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-ink md:text-4xl">Free Video Lectures</h1>
        <p className="mt-2 text-base text-slate">
          Past-paper solutions and concept lectures, straight from our YouTube channel.
        </p>
        <p className="mt-1 text-sm font-medium text-primary">{videos.length} videos available</p>
      </div>

      <Suspense>
        <LecturesExplorer videos={videos} />
      </Suspense>
    </div>
  );
}
