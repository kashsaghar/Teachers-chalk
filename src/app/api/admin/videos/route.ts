import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { createBunnyVideo, getTusUploadAuth } from "@/lib/bunnyStream";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("private_videos")
    .select("id, title, subject, level, required_tag, bunny_video_id, created_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ videos: data });
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { title, description, subject, level, requiredTag } = body as {
    title?: string;
    description?: string;
    subject?: string;
    level?: string;
    requiredTag?: string;
  };

  if (!title || !requiredTag) {
    return NextResponse.json({ error: "title and requiredTag are required" }, { status: 400 });
  }

  const bunnyVideoId = await createBunnyVideo(title);

  const supabase = createAdminClient();
  const { data: row, error } = await supabase
    .from("private_videos")
    .insert({
      title,
      description: description || null,
      subject: subject || null,
      level: level || null,
      required_tag: requiredTag,
      bunny_video_id: bunnyVideoId,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const upload = getTusUploadAuth(bunnyVideoId);

  return NextResponse.json({ videoRowId: row.id, bunnyVideoId, upload });
}
