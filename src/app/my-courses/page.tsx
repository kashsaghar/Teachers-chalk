import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PlayCircle, ShieldAlert } from "lucide-react";
import { PortalHeader } from "@/components/portal/PortalHeader";
import { getCurrentProfile } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "My Courses | Teacher's Chalk",
};

type PrivateVideoRow = {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  level: string | null;
  required_tag: string;
};

export default async function MyCoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login?next=/my-courses");

  const admin = createAdminClient();
  const { data: videos } = profile.access_tags.length
    ? await admin
        .from("private_videos")
        .select("id, title, description, subject, level, required_tag")
        .in("required_tag", profile.access_tags)
        .order("created_at", { ascending: false })
    : { data: [] as PrivateVideoRow[] };

  return (
    <div className="bg-bg">
      <PortalHeader variant="student" title="My Courses" subtitle={`Signed in as ${profile.email}`} />

      <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6">
        {error === "forbidden" && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-coral">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            You don&apos;t have admin access, so you were brought here instead.
          </div>
        )}

        {!videos || videos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-mist p-12 text-center">
            <p className="text-base text-ink">No private lectures have been shared with you yet.</p>
            <p className="mt-2 text-sm text-slate">
              Once your teacher uploads a recording for your class, it will show up here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video: PrivateVideoRow) => (
              <Link
                key={video.id}
                href={`/my-courses/${video.id}`}
                className="group block rounded-2xl border border-border bg-white p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:-translate-y-0"
              >
                <PlayCircle className="h-8 w-8 text-primary" />
                <h3 className="mt-3 text-base font-bold text-ink">{video.title}</h3>
                {(video.subject || video.level) && (
                  <p className="mt-1 text-xs text-slate">
                    {[video.subject, video.level].filter(Boolean).join(" · ")}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
