import Image from "next/image";
import type { Testimonial } from "@/data/testimonials";

const CARD_STYLES = ["bg-cream", "bg-butter-tint", "bg-white", "bg-peach-tint"];

function seedFor(id: string) {
  return id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const seed = seedFor(testimonial.id);
  const bg = CARD_STYLES[seed % CARD_STYLES.length];
  const rotate = seed % 2 === 0 ? "-rotate-2" : "rotate-2";

  return (
    <div
      className={`flex h-full w-[260px] flex-none flex-col rounded-[24px] p-5 text-cocoa shadow-[0_14px_26px_rgba(47,82,64,0.18)] ${bg} ${rotate}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {testimonial.photo && (
            <Image
              src={testimonial.photo}
              alt={testimonial.name}
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
            />
          )}
          <span className="text-sm font-bold">{testimonial.name}</span>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cocoa font-heading text-base font-extrabold text-butter">
          {testimonial.grade}
        </span>
      </div>
      <p className="mt-1 text-xs opacity-75">
        {testimonial.level} {testimonial.subject}
        {testimonial.year ? ` · ${testimonial.year}` : ""}
      </p>
      <p className="mt-3 font-caveat text-xl leading-tight">&ldquo;{testimonial.quote}&rdquo;</p>
    </div>
  );
}
