import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

async function getTags(supabase: ReturnType<typeof createAdminClient>, id: string): Promise<string[]> {
  const { data } = await supabase.from("profiles").select("access_tags").eq("id", id).single();
  return data?.access_tags ?? [];
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const { tag } = (await request.json()) as { tag?: string };
  if (!tag) return NextResponse.json({ error: "tag is required" }, { status: 400 });

  const supabase = createAdminClient();
  const current = await getTags(supabase, id);
  const next = current.includes(tag) ? current : [...current, tag];

  const { error } = await supabase.from("profiles").update({ access_tags: next }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ access_tags: next });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const { tag } = (await request.json()) as { tag?: string };
  if (!tag) return NextResponse.json({ error: "tag is required" }, { status: 400 });

  const supabase = createAdminClient();
  const current = await getTags(supabase, id);
  const next = current.filter((t) => t !== tag);

  const { error } = await supabase.from("profiles").update({ access_tags: next }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ access_tags: next });
}
