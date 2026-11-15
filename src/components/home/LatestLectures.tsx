import Link from "next/link";
import { Send } from "lucide-react";
import { VideoGrid } from "@/components/lectures/VideoGrid";
import { Reveal } from "@/components/ui/Reveal";
import type { Video } from "@/types/video";

const TOP_WAVE = "M0 70 C 220 0, 420 0, 640 40 S 1060 80, 1280 10 V 70 Z";
const BOTTOM_WAVE = "M0 0 C 260 60, 520 70, 760 30 S 1120 0, 1280 50 V 0 Z";

export function LatestLectures({ videos }: { videos: Video[] }) {
  const latest = videos.slice(0, 8);
  if (latest.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-cream py-16 md:py-20">
      <svg
        aria-hidden="true"
        className="absolute left-0 top-0 h-10 w-full md:h-14"
        viewBox="0 0 1280 70"
        preserveAspectRatio="none"
      >
        <path d={TOP_WAVE} fill="var(--color-deep)" />
      </svg>
      <div className="absolute inset-x-0 top-10 bottom-10 bg-deep md:top-14 md:bottom-14" />
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-10 w-full md:h-14"
        viewBox="0 0 1280 70"
        preserveAspectRatio="none"
      >
        <path d={BOTTOM_WAVE} fill="var(--color-deep)" />
      </svg>

      <Send
        aria-hidden="true"
        className="tc-bob pointer-events-none absolute right-10 top-20 hidden h-10 w-10 -rotate-45 text-butter/70 md:block"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-xs font-bold text-cream">
              <span className="h-2 w-2 animate-pulse rounded-full bg-peach" />
              New on YouTube
            </div>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-cream md:text-[42px]">
              Free lectures,{" "}
              <span className="font-caveat text-4xl font-bold text-butter md:text-5xl">anytime</span>
            </h2>
            <p className="mt-2 max-w-md text-sm text-cream/75 md:text-base">
              Every lecture from our YouTube channel, sorted by subject and level.
            </p>
          </div>
          <Link
            href="/lectures"
            className="inline-flex items-center gap-3 rounded-full bg-butter py-2.5 pl-6 pr-2.5 text-sm font-bold text-cocoa transition-transform hover:-translate-y-0.5"
          >
            View all lectures
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cocoa text-butter">
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </div>

        {/* TODO(style): no subject-filter state exists for the homepage preview grid today (filtering only lives on /lectures), so presentational-only pills were intentionally left out rather than faking interactivity. */}

        <Reveal className="mt-10">
          <VideoGrid videos={latest} />
        </Reveal>

        <p className="mt-8 text-center font-caveat text-xl text-cream/70">
          titles and thumbnails load straight from your YouTube channel
        </p>
      </div>
    </section>
  );
}
