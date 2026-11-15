import { cn } from "@/lib/utils";

type Variant = "coral" | "mist";

const variantClasses: Record<Variant, string> = {
  coral: "bg-peach-tint text-stamp",
  mist: "bg-sage-tint text-deep",
};

export function Badge({
  children,
  variant = "mist",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
