import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-bg py-16">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading eyebrow="Real results" title="Results & testimonials" />

        <Reveal className="mt-10">
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-mist p-10 text-center text-sm text-slate">
              Student results and testimonials coming soon.
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
