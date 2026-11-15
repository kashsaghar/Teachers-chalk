"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { VideoUploadForm } from "@/components/admin/VideoUploadForm";

type PrivateVideo = {
  id: string;
  title: string;
  subject: string | null;
  level: string | null;
  required_tag: string;
};

export function VideosPanel() {
  const [videos, setVideos] = useState<PrivateVideo[] | null>(null);

  const loadVideos = async () => {
    const res = await fetch("/api/admin/videos");
    const data = await res.json();
    if (res.ok) setVideos(data.videos);
  };

  useEffect(() => {
    let ignore = false;

    (async () => {
      const res = await fetch("/api/admin/videos");
      const data = await res.json();
      if (!ignore && res.ok) setVideos(data.videos);
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video? This also removes it from Bunny Stream.")) return;
    await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
    loadVideos();
  };

  return (
    <section className="rounded-2xl border border-border bg-white p-6">
      <h2 className="text-lg font-bold text-ink">Private Videos</h2>

      <div className="mt-4">
        <VideoUploadForm onUploaded={loadVideos} />
      </div>

      <div className="mt-6 space-y-3">
        {videos === null && <p className="text-sm text-slate">Loading...</p>}
        {videos?.length === 0 && <p className="text-sm text-slate">No private videos yet.</p>}
        {videos?.map((video) => (
          <div key={video.id} className="flex items-center justify-between rounded-xl border border-border p-3">
            <div>
              <p className="text-sm font-semibold text-ink">{video.title}</p>
              <p className="text-xs text-slate">
                {[video.subject, video.level].filter(Boolean).join(" · ")} · tag: {video.required_tag}
              </p>
            </div>
            <button
              onClick={() => handleDelete(video.id)}
              aria-label={`Delete ${video.title}`}
              className="flex h-11 w-11 items-center justify-center rounded-full text-coral hover:bg-mist"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
