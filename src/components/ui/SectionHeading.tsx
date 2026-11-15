import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      {eyebrow && (
        <p className="font-caveat text-2xl text-accent-dark">{eyebrow}</p>
      )}
      <h2 className={cn("mt-1 text-[28px] font-bold leading-tight md:text-4xl", light ? "text-bg" : "text-ink")}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-3 text-base md:text-lg", light ? "text-bg/80" : "text-slate")}>{subtitle}</p>
      )}
    </div>
  );
}
