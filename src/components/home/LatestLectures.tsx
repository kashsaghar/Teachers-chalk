import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoGrid } from "@/components/lectures/VideoGrid";
import { Reveal } from "@/components/ui/Reveal";
import type { Video } from "@/types/video";

export function LatestLectures({ videos }: { videos: Video[] }) {
  const latest = videos.slice(0, 8);
  if (latest.length === 0) return null;

  return (
    <section className="bg-mist py-16">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading eyebrow="Fresh off the camera" title="Latest lectures" />
        <Reveal className="mt-10">
          <VideoGrid videos={latest} />
        </Reveal>
        <div className="mt-8 text-center">
          <Link href="/lectures" className="text-sm font-semibold text-primary hover:underline">
            View all lectures →
          </Link>
        </div>
      </div>
    </section>
  );
}
