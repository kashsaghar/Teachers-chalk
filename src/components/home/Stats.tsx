import { StatItem } from "@/components/ui/StatItem";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/data/stats";

export function Stats() {
  return (
    <section className="border-b border-border bg-bg">
      <Reveal className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-4 py-12 md:px-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </Reveal>
    </section>
  );
}
