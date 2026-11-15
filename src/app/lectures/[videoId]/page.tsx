import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { VideoGrid } from "@/components/lectures/VideoGrid";
import { LiteYoutubePlayer } from "@/components/lectures/LiteYoutubePlayer";
import { linkify } from "@/lib/linkify";
import { getAllVideos, getVideoById, getRelatedVideos } from "@/lib/youtube";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const revalidate = 86400;

function durationToIso(duration: string): string | undefined {
  const [mm, ss] = duration.split(":").map(Number);
  if (Number.isNaN(mm) || Number.isNaN(ss)) return undefined;
  return `PT${mm}M${ss}S`;
}

export async function generateStaticParams() {
  const videos = await getAllVideos();
  return videos.map((video) => ({ videoId: video.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ videoId: string }>;
}): Promise<Metadata> {
  const { videoId } = await params;
  const video = await getVideoById(videoId);
  if (!video) return {};

  return {
    title: `${video.title} | Teacher's Chalk Lectures`,
    description: video.description.slice(0, 160),
    openGraph: {
      title: video.title,
      description: video.description.slice(0, 160),
      images: video.thumbnail ? [video.thumbnail] : undefined,
    },
  };
}

export default async function LecturePage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = await params;
  const video = await getVideoById(videoId);
  if (!video) notFound();

  const related = await getRelatedVideos(video);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail ? [video.thumbnail] : undefined,
    uploadDate: video.publishedAt,
    duration: durationToIso(video.duration),
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
        <LiteYoutubePlayer id={video.id} title={video.title} subject={video.subject} level={video.level} />
      </div>

      <h1 className="mt-6 text-2xl font-extrabold text-ink md:text-3xl">{video.title}</h1>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {video.subject && <Badge variant="mist">{video.subject}</Badge>}
        {video.level && <Badge variant="mist">{video.level}</Badge>}
        {video.board && <Badge variant="mist">{video.board}</Badge>}
        <span className="text-sm text-slate">
          {new Date(video.publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        {typeof video.views === "number" && (
          <span className="text-sm text-slate">· {video.views.toLocaleString()} views</span>
        )}
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          Watch on YouTube
        </a>
      </div>

      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink/90">
        {linkify(video.description)}
      </p>

      <div className="mt-8 rounded-2xl bg-mist p-6 text-center">
        <p className="text-base font-semibold text-ink">
          Want the full course with notes and tests? Book a free demo
        </p>
        <Button
          href={getWhatsAppLink(`Hi! I just watched "${video.title}" and I'd like to book a free demo class.`)}
          className="mt-4"
        >
          Book Free Demo
        </Button>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-ink">Related lectures</h2>
            <Link href="/lectures" className="text-sm font-medium text-primary hover:underline">
              View all lectures →
            </Link>
          </div>
          <VideoGrid videos={related} />
        </div>
      )}
    </div>
  );
}
