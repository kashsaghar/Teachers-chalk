import { Sparkles, Video } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="overflow-hidden bg-primary text-bg">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-20 md:px-6 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <Badge variant="coral">{site.announcementText}</Badge>
          <h1 className="max-w-xl text-[36px] font-extrabold leading-tight md:text-[56px]">
            New Session. Bigger Goals. <span className="chalk-underline">Better Results.</span>
          </h1>
          <p className="max-w-xl text-base text-bg/80 md:text-lg">
            Expert online tuition for O Level, A Level, IGCSE &amp; Edexcel: Physics, Maths, Chemistry,
            Computer Science and Commerce.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={getWhatsAppLink()} variant="primary" size="lg">
              Book Free Demo
            </Button>
            <Button href="/lectures" variant="secondary" size="lg" className="text-bg border-bg/40">
              Watch Free Lectures
            </Button>
          </div>
          <p className="text-sm text-bg/70">Group &amp; one-on-one · Flexible scheduling · Experienced teachers</p>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -top-4 right-10 flex items-center gap-2 rounded-2xl bg-bg px-4 py-3 text-ink shadow-lg animate-fade-up">
            <Video className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">Live online classes</span>
          </div>
          <div className="absolute bottom-6 left-0 flex items-center gap-2 rounded-2xl bg-accent px-4 py-3 text-ink shadow-lg">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold">Free demo</span>
          </div>
          <div className="mx-auto flex h-80 w-full max-w-sm items-center justify-center rounded-3xl bg-primary-light/60">
            <span className="font-caveat text-3xl text-bg/70">Your chalkboard, online.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
