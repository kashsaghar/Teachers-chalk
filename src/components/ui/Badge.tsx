import { cn } from "@/lib/utils";

type Variant = "coral" | "mist";

const variantClasses: Record<Variant, string> = {
  coral: "bg-coral text-bg",
  mist: "bg-mist text-primary",
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
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
