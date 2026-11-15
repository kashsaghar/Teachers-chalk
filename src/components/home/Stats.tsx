import { BookOpen, Clock, GraduationCap, Users } from "lucide-react";
import { StatItem } from "@/components/ui/StatItem";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { stats } from "@/data/stats";

const ICON_BG = ["bg-butter", "bg-sage", "bg-peach", "bg-cream"];
const ICON_TEXT = ["text-cocoa", "text-deep", "text-cocoa", "text-forest"];
const ICONS = [Clock, Users, null, BookOpen];

export function Stats() {
  return (
    <section className="bg-cream py-10 md:py-14">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <Reveal className="relative overflow-hidden rounded-[40px] bg-deep px-6 py-10 md:px-10 md:py-12">
          <GraduationCap
            aria-hidden="true"
            className="tc-bob pointer-events-none absolute -right-3 -top-6 h-14 w-14 text-butter/60"
          />
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <StatItem
                  key={stat.label}
                  {...stat}
                  delay={i * 0.12}
                  iconBg={ICON_BG[i % ICON_BG.length]}
                  icon={
                    Icon ? (
                      <Icon className={cn("h-7 w-7", ICON_TEXT[i % ICON_TEXT.length])} />
                    ) : (
                      <span className={cn("font-heading text-xl font-extrabold", ICON_TEXT[i % ICON_TEXT.length])}>
                        A*
                      </span>
                    )
                  }
                />
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
