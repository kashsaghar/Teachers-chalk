import { ShieldCheck, GraduationCap } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";

type PortalHeaderProps = {
  variant: "admin" | "student";
  title: string;
  subtitle?: string;
};

export function PortalHeader({ variant, title, subtitle }: PortalHeaderProps) {
  const isAdmin = variant === "admin";

  return (
    <div
      className={
        isAdmin
          ? "border-b border-ink bg-ink text-bg"
          : "border-b border-border bg-mist text-ink"
      }
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-6 md:px-6">
        <div>
          <p
            className={
              isAdmin
                ? "flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-coral"
                : "flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary"
            }
          >
            {isAdmin ? <ShieldCheck className="h-3.5 w-3.5" /> : <GraduationCap className="h-3.5 w-3.5" />}
            {isAdmin ? "Admin Panel" : "Student Portal"}
          </p>
          <h1 className={isAdmin ? "mt-1 text-2xl font-extrabold text-bg" : "mt-1 text-2xl font-extrabold text-ink"}>
            {title}
          </h1>
          {subtitle && (
            <p className={isAdmin ? "mt-1 text-sm text-bg/70" : "mt-1 text-sm text-slate"}>{subtitle}</p>
          )}
        </div>
        <LogoutButton dark={isAdmin} />
      </div>
    </div>
  );
}
