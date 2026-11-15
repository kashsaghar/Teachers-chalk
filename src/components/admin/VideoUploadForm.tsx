"use client";

import { useState } from "react";
import { Upload as TusUpload } from "tus-js-client";
import { Button } from "@/components/ui/Button";
import { subjects } from "@/data/subjects";
import { LEVEL_OPTIONS } from "@/lib/filters";

export function VideoUploadForm({ onUploaded }: { onUploaded: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [requiredTag, setRequiredTag] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setStatus("uploading");
    setProgress(0);
    setError(null);

    try {
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, subject, level, requiredTag }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create video");

      const { upload } = data as {
        upload: {
          endpoint: string;
          libraryId: string;
          videoId: string;
          authorizationSignature: string;
          authorizationExpire: number;
        };
      };

      const tusUpload = new TusUpload(file, {
        endpoint: upload.endpoint,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        headers: {
          AuthorizationSignature: upload.authorizationSignature,
          AuthorizationExpire: String(upload.authorizationExpire),
          VideoId: upload.videoId,
          LibraryId: upload.libraryId,
        },
        metadata: {
          filetype: file.type,
          title,
        },
        onError: (err) => {
          setStatus("error");
          setError(err.message);
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          setProgress(Math.round((bytesUploaded / bytesTotal) * 100));
        },
        onSuccess: () => {
          setStatus("done");
          setTitle("");
          setDescription("");
          setSubject("");
          setLevel("");
          setRequiredTag("");
          setFile(null);
          onUploaded();
        },
      });

      tusUpload.start();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl bg-mist p-4">
      <input
        type="text"
        required
        placeholder="Video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-xl border border-border px-3 py-2 text-sm focus:border-primary"
      />
      <textarea
        placeholder="Description (optional)"
        rows={2}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-xl border border-border px-3 py-2 text-sm focus:border-primary"
      />
      <div className="grid grid-cols-2 gap-3">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="rounded-xl border border-border px-3 py-2 text-sm focus:border-primary"
        >
          <option value="">Subject</option>
          {subjects.map((s) => (
            <option key={s.slug} value={s.label}>
              {s.label}
            </option>
          ))}
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="rounded-xl border border-border px-3 py-2 text-sm focus:border-primary"
        >
          <option value="">Level</option>
          {LEVEL_OPTIONS.map((opt) => (
            <option key={opt.slug} value={opt.value}>
              {opt.value}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        required
        placeholder="Required access tag (e.g. physics-o-level)"
        value={requiredTag}
        onChange={(e) => setRequiredTag(e.target.value)}
        className="w-full rounded-xl border border-border px-3 py-2 text-sm focus:border-primary"
      />
      <input
        type="file"
        accept="video/*"
        required
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="w-full text-sm"
      />

      <Button type="submit" size="md" disabled={status === "uploading"}>
        {status === "uploading" ? `Uploading... ${progress ?? 0}%` : "Upload video"}
      </Button>

      {status === "done" && <p className="text-sm text-primary">Upload complete.</p>}
      {error && <p className="text-sm text-coral">{error}</p>}
    </form>
  );
}
