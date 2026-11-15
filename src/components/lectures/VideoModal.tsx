"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { LiteYoutubePlayer } from "@/components/lectures/LiteYoutubePlayer";
import type { Video } from "@/types/video";

export function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[26px] bg-cream"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line p-3">
          <p className="truncate pr-4 text-sm font-semibold text-cocoa">{video.title}</p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-sage-tint"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="aspect-video w-full bg-black">
          <LiteYoutubePlayer id={video.id} title={video.title} subject={video.subject} level={video.level} />
        </div>

        <div className="space-y-3 p-4">
          <div className="flex flex-wrap gap-1.5">
            {video.subject && <Badge variant="mist">{video.subject}</Badge>}
            {video.level && <Badge variant="mist">{video.level}</Badge>}
            {video.board && <Badge variant="mist">{video.board}</Badge>}
          </div>
          <div className="flex items-center justify-between text-sm">
            <Link href={`/lectures/${video.id}`} className="font-medium text-forest hover:underline">
              Open full page
            </Link>
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cocoa-muted hover:text-forest hover:underline"
            >
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
