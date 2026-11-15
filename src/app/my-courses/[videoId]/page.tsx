import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCurrentProfile } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSignedEmbedUrl } from "@/lib/bunnyStream";

export default async function PrivateLecturePage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = await params;
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  const admin = createAdminClient();
  const { data: video } = await admin
    .from("private_videos")
    .select("id, title, description, bunny_video_id, required_tag")
    .eq("id", videoId)
    .single();

  if (!video) notFound();
  if (!profile.access_tags.includes(video.required_tag)) notFound();

  const embedUrl = getSignedEmbedUrl(video.bunny_video_id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <Link href="/my-courses" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to my courses
      </Link>

      <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl bg-black">
        <iframe
          src={embedUrl}
          title={video.title}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          className="h-full w-full"
        />
      </div>

      <h1 className="mt-6 text-2xl font-extrabold text-ink">{video.title}</h1>
      {video.description && <p className="mt-2 whitespace-pre-line text-sm text-slate">{video.description}</p>}
    </div>
  );
}
