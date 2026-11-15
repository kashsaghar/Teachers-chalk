import type { Video } from "@/types/video";

const API_BASE = "https://www.googleapis.com/youtube/v3";

export function uploadsPlaylistId(channelId: string): string {
  return channelId.replace(/^UC/, "UU");
}

export function parseIsoDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = Number(match?.[1] ?? 0);
  const minutes = Number(match?.[2] ?? 0);
  const seconds = Number(match?.[3] ?? 0);

  const mm = hours > 0 ? String(hours * 60 + minutes).padStart(2, "0") : String(minutes);
  const ss = String(seconds).padStart(2, "0");
  return `${mm}:${ss}`;
}

function bestThumbnail(thumbnails: Record<string, { url: string }> | undefined): string {
  return (
    thumbnails?.maxres?.url ?? thumbnails?.high?.url ?? thumbnails?.medium?.url ?? thumbnails?.default?.url ?? ""
  );
}

type PlaylistItemsResponse = {
  nextPageToken?: string;
  items: Array<{
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: Record<string, { url: string }>;
      resourceId: { videoId: string };
    };
    contentDetails?: { videoPublishedAt?: string };
  }>;
};

type VideosResponse = {
  items: Array<{
    id: string;
    contentDetails: { duration: string };
    statistics?: { viewCount?: string };
    status?: { privacyStatus: string };
  }>;
};

async function fetchJson<T>(url: string, revalidate?: number): Promise<T> {
  const res = await fetch(url, revalidate !== undefined ? { next: { revalidate } } : undefined);
  if (!res.ok) {
    throw new Error(`YouTube API request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchAllPlaylistItems(
  apiKey: string,
  playlistId: string,
  revalidate?: number
) {
  const items: PlaylistItemsResponse["items"] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(`${API_BASE}/playlistItems`);
    url.searchParams.set("part", "snippet,contentDetails");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", apiKey);
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const data = await fetchJson<PlaylistItemsResponse>(url.toString(), revalidate);
    items.push(...data.items);
    pageToken = data.nextPageToken;
  } while (pageToken);

  return items;
}

export async function fetchVideoDetails(apiKey: string, ids: string[], revalidate?: number) {
  const details = new Map<string, { duration: string; views?: number; isPrivate: boolean }>();

  for (let i = 0; i < ids.length; i += 50) {
    const chunk = ids.slice(i, i + 50);
    const url = new URL(`${API_BASE}/videos`);
    url.searchParams.set("part", "contentDetails,statistics,status");
    url.searchParams.set("id", chunk.join(","));
    url.searchParams.set("key", apiKey);

    const data = await fetchJson<VideosResponse>(url.toString(), revalidate);
    for (const item of data.items) {
      details.set(item.id, {
        duration: parseIsoDuration(item.contentDetails.duration),
        views: item.statistics?.viewCount ? Number(item.statistics.viewCount) : undefined,
        isPrivate: item.status?.privacyStatus !== "public",
      });
    }
  }

  return details;
}

/** Fetches every public video from the channel's uploads playlist. Requires YOUTUBE_API_KEY. */
export async function fetchChannelVideos(
  apiKey: string,
  channelId: string,
  revalidate?: number
): Promise<Omit<Video, "level" | "board" | "subject" | "topic" | "teacher">[]> {
  const playlistId = uploadsPlaylistId(channelId);
  const playlistItems = await fetchAllPlaylistItems(apiKey, playlistId, revalidate);
  const ids = playlistItems.map((item) => item.snippet.resourceId.videoId);
  const details = await fetchVideoDetails(apiKey, ids, revalidate);

  return playlistItems
    .map((item) => {
      const id = item.snippet.resourceId.videoId;
      const detail = details.get(id);
      if (!detail || detail.isPrivate) return null;

      return {
        id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: bestThumbnail(item.snippet.thumbnails),
        publishedAt: item.snippet.publishedAt,
        duration: detail.duration,
        views: detail.views,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
}
