"use client";

import { useEffect, useRef, useState } from "react";

export function StatItem({ label, value, suffix }: { label: string; value: number | null; suffix?: string }) {
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
    <div ref={ref} className="text-center">
      <p className="text-3xl font-extrabold text-primary md:text-4xl">
        {value === null ? "—" : `${count}${suffix ?? ""}`}
      </p>
      <p className="mt-1 text-sm text-slate">{label}</p>
    </div>
  );
}
