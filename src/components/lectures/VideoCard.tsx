"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Video } from "@/types/video";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function VideoCard({
  video,
  onOpen,
}: {
  video: Video;
  onOpen?: (video: Video) => void;
}) {
  return (
    <Link
      href={`/lectures/${video.id}`}
      onClick={(e) => {
        if (onOpen) {
          e.preventDefault();
          onOpen(video);
        }
      }}
      className="group block overflow-hidden rounded-2xl border border-border bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:-translate-y-0"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-mist">
        {video.thumbnail && (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/20">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bg/90 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Play className="h-5 w-5" fill="currentColor" />
          </span>
        </div>
        {video.duration && (
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {video.duration}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3
          title={video.title}
          className="line-clamp-2 min-h-[2.75rem] text-sm font-semibold text-ink"
        >
          {video.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {video.subject && <Badge variant="mist">{video.subject}</Badge>}
          {video.level && <Badge variant="mist">{video.level}</Badge>}
        </div>
        <p className="mt-2 text-xs text-slate">{formatDate(video.publishedAt)}</p>
      </div>
    </Link>
  );
}
