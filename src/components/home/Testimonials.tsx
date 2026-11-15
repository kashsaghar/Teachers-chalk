import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const track = testimonials.length > 0 ? [...testimonials, ...testimonials] : [];

  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[44px] bg-sage p-8 md:p-12">
          <div className="pointer-events-none absolute -right-14 -top-16 h-56 w-56 rounded-full bg-sage/60" aria-hidden="true" />

          <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="font-caveat text-2xl font-semibold text-deep">report cards we love</p>
              <h2 className="mt-1 font-heading text-4xl font-extrabold tracking-tight text-deep md:text-5xl">
                Results that speak
              </h2>
              <p className="mt-2 max-w-md text-base text-deep/80">
                Real grades from real students. Shared with their permission.
              </p>
            </div>
            <div
              className="tc-stamp-loop flex h-[140px] w-[140px] flex-none flex-col items-center justify-center rounded-full border-[6px] border-stamp bg-cream/40 font-heading font-extrabold text-stamp"
              aria-hidden="true"
            >
              <span className="text-5xl leading-none">A*</span>
              <span className="mt-1 text-[10px] tracking-[2px]">EXCELLENT</span>
            </div>
          </div>

          <Reveal className="relative mt-10">
            {track.length > 0 ? (
              <div className="overflow-hidden">
                <div className="tc-marquee-track flex w-max gap-5">
                  {track.map((t, i) => (
                    <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-[28px] bg-cream/70 p-10 text-center text-sm text-deep/80">
                Student results and testimonials coming soon.
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
