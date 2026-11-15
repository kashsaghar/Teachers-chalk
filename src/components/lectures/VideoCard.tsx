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
      className="group block overflow-hidden rounded-[26px] bg-cream shadow-[0_18px_40px_rgba(71,60,51,0.1)] transition-transform duration-200 hover:-translate-y-2 motion-reduce:hover:-translate-y-0"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-[22px] m-2 bg-sage-tint">
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
          <span className="tc-ring-pulse flex h-12 w-12 items-center justify-center rounded-full bg-butter text-cocoa shadow-[0_10px_24px_rgba(71,60,51,0.2)]">
            <Play className="h-5 w-5" fill="currentColor" />
          </span>
        </div>
        {video.duration && (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/80 px-2.5 py-1 text-xs font-medium text-white">
            {video.duration}
          </span>
        )}
      </div>

      <div className="px-4 pb-4 pt-2">
        <h3
          title={video.title}
          className="line-clamp-2 min-h-[2.75rem] text-sm font-semibold text-cocoa"
        >
          {video.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {video.subject && <Badge variant="mist">{video.subject}</Badge>}
          {video.level && <Badge variant="coral">{video.level}</Badge>}
        </div>
        <p className="mt-2 text-xs text-cocoa-muted">{formatDate(video.publishedAt)}</p>
      </div>
    </Link>
  );
}
