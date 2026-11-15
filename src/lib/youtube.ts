import "server-only";
import type { Video, VideoOverrides } from "@/types/video";
import { fetchChannelVideos } from "@/lib/youtubeApi";
import { tagVideo } from "@/lib/tagVideo";
import fallbackVideos from "@/data/videos.fallback.json";
import overrides from "@/data/video-overrides.json";

const CHANNEL_ID = "UCOoTcsaHQTYlXO-ZBjnM5Dg";
export const VIDEOS_REVALIDATE_SECONDS = 86400;

function applyOverridesAndTags(raw: Omit<Video, "level" | "board" | "subject" | "topic" | "teacher">[]): Video[] {
  const typedOverrides = overrides as VideoOverrides;

  return raw
    .filter((video) => !typedOverrides[video.id]?.hidden)
    .map((video) => {
      const override = typedOverrides[video.id];
      const autoTags = tagVideo(video.title, video.description);

      return {
        ...video,
        level: override?.level ?? autoTags.level,
        board: override?.board ?? autoTags.board,
        subject: override?.subject ?? autoTags.subject,
        topic: override?.topic ?? autoTags.topic,
        teacher: override?.teacher,
      };
    });
}

async function getVideosFromApi(): Promise<Video[] | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  try {
    const raw = await fetchChannelVideos(apiKey, CHANNEL_ID, VIDEOS_REVALIDATE_SECONDS);
    return applyOverridesAndTags(raw);
  } catch (error) {
    console.error("[youtube] Falling back to videos.fallback.json:", error);
    return null;
  }
}

function getVideosFromFallback(): Video[] {
  return applyOverridesAndTags(fallbackVideos as Omit<Video, "level" | "board" | "subject" | "topic" | "teacher">[]);
}

export async function getAllVideos(): Promise<Video[]> {
  const fromApi = await getVideosFromApi();
  const videos = fromApi ?? getVideosFromFallback();

  return [...videos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getVideoById(id: string): Promise<Video | undefined> {
  const videos = await getAllVideos();
  return videos.find((video) => video.id === id);
}

export async function getRelatedVideos(video: Video, limit = 6): Promise<Video[]> {
  const videos = await getAllVideos();
  return videos
    .filter((v) => v.id !== video.id && (v.subject === video.subject || v.level === video.level))
    .slice(0, limit);
}
