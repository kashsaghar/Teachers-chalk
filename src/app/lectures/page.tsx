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
    <div>
      <section className="relative overflow-hidden bg-deep pb-16 pt-14 text-cream">
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 text-center md:px-6">
          <h1 className="font-heading text-3xl font-extrabold md:text-4xl">Free Video Lectures</h1>
          <p className="mt-3 text-base text-cream/80">
            Past-paper solutions and concept lectures, straight from our YouTube channel.
          </p>
          <p className="mt-1 text-sm font-semibold text-butter">{videos.length} videos available</p>
        </div>
        <svg
          aria-hidden="true"
          viewBox="0 0 1280 70"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-10 w-full md:h-14"
        >
          <path d="M0 0 C 260 60, 520 70, 760 30 S 1120 0, 1280 50 V 70 H 0 Z" className="fill-cream" />
        </svg>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
        <Suspense>
          <LecturesExplorer videos={videos} />
        </Suspense>
      </div>
    </div>
  );
}
