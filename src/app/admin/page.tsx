import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth";
import { PortalHeader } from "@/components/portal/PortalHeader";
import { StudentsPanel } from "@/components/admin/StudentsPanel";
import { VideosPanel } from "@/components/admin/VideosPanel";

export const metadata: Metadata = {
  title: "Admin | Teacher's Chalk",
};

export default async function AdminPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login?next=/admin");
  if (profile.role !== "admin") redirect("/my-courses?error=forbidden");

  return (
    <div className="bg-bg">
      <PortalHeader variant="admin" title="Admin" subtitle={`Signed in as ${profile.email}`} />

      <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <StudentsPanel />
          <VideosPanel />
        </div>
      </div>
    </div>
  );
}
