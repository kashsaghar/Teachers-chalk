import "server-only";
import { createHash } from "node:crypto";

const API_BASE = "https://video.bunnycdn.com";

function libraryId(): string {
  return process.env.BUNNY_STREAM_LIBRARY_ID!;
}

function apiKey(): string {
  return process.env.BUNNY_STREAM_API_KEY!;
}

function tokenAuthKey(): string {
  return process.env.BUNNY_STREAM_TOKEN_AUTH_KEY!;
}

/** Step 1 of uploading: creates the video object in Bunny and returns its guid. */
export async function createBunnyVideo(title: string): Promise<string> {
  const res = await fetch(`${API_BASE}/library/${libraryId()}/videos`, {
    method: "POST",
    headers: {
      AccessKey: apiKey(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error(`Bunny create-video failed: ${res.status} ${await res.text()}`);
  }

  const data = (await res.json()) as { guid: string };
  return data.guid;
}

export async function deleteBunnyVideo(videoId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/library/${libraryId()}/videos/${videoId}`, {
    method: "DELETE",
    headers: { AccessKey: apiKey() },
  });

  if (!res.ok && res.status !== 404) {
    throw new Error(`Bunny delete-video failed: ${res.status} ${await res.text()}`);
  }
}

/**
 * Step 2: a short-lived, video-scoped signature the browser can use to
 * upload the file directly to Bunny via TUS, without ever seeing the real
 * API key. See https://bunny.net/docs/reference/tus-resumable-uploads
 */
export function getTusUploadAuth(videoId: string, expiresInSeconds = 86400) {
  const expirationTime = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const signature = createHash("sha256")
    .update(`${libraryId()}${apiKey()}${expirationTime}${videoId}`)
    .digest("hex");

  return {
    endpoint: `${API_BASE}/tusupload`,
    libraryId: libraryId(),
    videoId,
    authorizationSignature: signature,
    authorizationExpire: expirationTime,
  };
}

/**
 * A signed, expiring embed URL for private playback.
 * See https://bunny.net/docs/stream-embed-token-authentication
 */
export function getSignedEmbedUrl(videoId: string, expiresInSeconds = 3600): string {
  const expires = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const token = createHash("sha256")
    .update(`${tokenAuthKey()}${videoId}${expires}`)
    .digest("hex");

  return `https://player.mediadelivery.net/embed/${libraryId()}/${videoId}?token=${token}&expires=${expires}`;
}
