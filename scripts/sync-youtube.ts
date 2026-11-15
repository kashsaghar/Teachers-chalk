/**
 * Regenerates src/data/videos.fallback.json.
 *
 * With YOUTUBE_API_KEY set: pulls every video via the YouTube Data API v3
 * (full pagination, real durations and view counts).
 *
 * Without a key: falls back to the channel's public RSS feed (no key
 * required), which only exposes the ~15 most recent uploads and no
 * durations/view counts. Good enough to seed a dev fallback; re-run with a
 * real key once one is available.
 *
 * Usage: npx tsx scripts/sync-youtube.ts
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fetchChannelVideos } from "../src/lib/youtubeApi";

const CHANNEL_ID = "UCOoTcsaHQTYlXO-ZBjnM5Dg";
const OUT_PATH = path.join(__dirname, "..", "src", "data", "videos.fallback.json");

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function fetchFromRss() {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
  if (!res.ok) throw new Error(`RSS feed request failed: ${res.status}`);
  const xml = await res.text();

  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1]);

  return entries.map((entry) => {
    const id = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? "";
    const title = decodeEntities(entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
    const publishedAt = entry.match(/<published>(.*?)<\/published>/)?.[1] ?? "";
    // hqdefault always exists; maxresdefault 404s for some videos, so don't force it here.
    const thumbnail = entry.match(/<media:thumbnail url="([^"]*)"/)?.[1] ?? "";
    const description = decodeEntities(
      entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] ?? ""
    ).trim();
    const views = entry.match(/<media:statistics views="(\d+)"/)?.[1];

    return {
      id,
      title,
      description,
      thumbnail,
      publishedAt,
      duration: "",
      ...(views ? { views: Number(views) } : {}),
    };
  });
}

async function main() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  let videos;

  if (apiKey) {
    console.log("YOUTUBE_API_KEY found — fetching the full channel via the Data API...");
    videos = await fetchChannelVideos(apiKey, CHANNEL_ID);
  } else {
    console.warn(
      "No YOUTUBE_API_KEY set — falling back to the public RSS feed (last ~15 uploads, no durations/views)."
    );
    videos = await fetchFromRss();
  }

  writeFileSync(OUT_PATH, JSON.stringify(videos, null, 2) + "\n");
  console.log(`Wrote ${videos.length} videos to ${path.relative(process.cwd(), OUT_PATH)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
