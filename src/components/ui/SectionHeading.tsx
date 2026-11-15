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
        <p className="font-caveat text-2xl font-semibold text-forest md:text-[28px]">{eyebrow}</p>
      )}
      <h2
        className={cn(
          "mt-1 font-heading text-[28px] font-extrabold leading-tight tracking-tight md:text-4xl",
          light ? "text-cream" : "text-deep"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-3 text-base md:text-lg", light ? "text-cream/80" : "text-cocoa-muted")}>{subtitle}</p>
      )}
    </div>
  );
}
