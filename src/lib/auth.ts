import "server-only";
import { createClient } from "@/lib/supabase/server";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: "student" | "admin";
  access_tags: string[];
};

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, access_tags")
    .eq("id", user.id)
    .single();

  return (profile as Profile | null) ?? null;
}

/** For API routes: returns the admin's profile, or null if not an admin. */
export async function requireAdmin(): Promise<Profile | null> {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") return null;
  return profile;
}
