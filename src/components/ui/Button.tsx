import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "cta";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-forest text-white shadow-[0_12px_30px_rgba(71,116,74,0.28)] hover:bg-deep",
  secondary:
    "bg-white border-[1.5px] border-cocoa text-cocoa hover:bg-cream",
  ghost: "bg-transparent text-inherit hover:bg-black/5",
  cta: "bg-butter text-cocoa shadow-[0_12px_30px_rgba(254,200,104,0.35)] hover:bg-peach",
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-[30px] py-[17px] text-base",
};

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors duration-200 min-h-11",
    variantClasses[variant],
    sizeClasses[size],
    disabled && "pointer-events-none cursor-not-allowed opacity-50",
    className
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          onClick={onClick}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
