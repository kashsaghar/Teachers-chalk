"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { trackVideoPlay } from "@/lib/analytics";

export function LiteYoutubePlayer({
  id,
  title,
  subject,
  level,
}: {
  id: string;
  title: string;
  subject?: string;
  level?: string;
}) {
  return (
    <LiteYouTubeEmbed id={id} title={title} onPlay={() => trackVideoPlay({ videoId: id, subject, level })} />
  );
}
