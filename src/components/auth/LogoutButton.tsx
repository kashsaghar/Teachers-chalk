"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function LogoutButton({ dark = false }: { dark?: boolean }) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className={cn(
        "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
        dark
          ? "border-bg/30 text-bg hover:border-bg hover:bg-bg/10"
          : "border-border text-ink hover:border-primary hover:text-primary"
      )}
    >
      <LogOut className="h-4 w-4" /> Sign out
    </button>
  );
}
