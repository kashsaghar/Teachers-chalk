import Image from "next/image";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
      <Quote className="h-6 w-6 text-accent" />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/90">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-4 flex items-center gap-3">
        {testimonial.photo && (
          <Image
            src={testimonial.photo}
            alt={testimonial.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
          <p className="text-xs text-slate">
            {testimonial.subject} · {testimonial.level} · Grade {testimonial.grade}
          </p>
        </div>
      </div>
    </div>
  );
}
