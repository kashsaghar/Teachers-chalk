"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function StatItem({
  label,
  value,
  suffix,
  icon,
  iconBg = "bg-butter",
  delay = 0,
}: {
  label: string;
  value: number | null;
  suffix?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value === null) return;
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (prefersReducedMotion) {
          setCount(value);
          return;
        }

        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.round(progress * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="tc-pop flex items-center gap-4" style={{ animationDelay: `${delay}s` }}>
      {icon && (
        <span className={cn("flex h-16 w-16 shrink-0 items-center justify-center rounded-full", iconBg)}>
          {icon}
        </span>
      )}
      <div className="text-left">
        <p className="font-heading text-3xl font-extrabold leading-none text-cream md:text-4xl">
          {value === null ? "—" : `${count}${suffix ?? ""}`}
        </p>
        <p className="mt-1 text-sm text-cream/80">{label}</p>
      </div>
    </div>
  );
}
