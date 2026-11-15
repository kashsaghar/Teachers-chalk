import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Programs } from "@/components/home/Programs";
import { CourseFinder } from "@/components/home/CourseFinder";
import { Subjects } from "@/components/home/Subjects";
import { LatestLectures } from "@/components/home/LatestLectures";
import { WhyUs } from "@/components/home/WhyUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Teachers } from "@/components/home/Teachers";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABand } from "@/components/home/CTABand";
import { FAQSection } from "@/components/home/FAQSection";
import { getAllVideos } from "@/lib/youtube";

export const revalidate = 86400;

export default async function Home() {
  const videos = await getAllVideos();

  return (
    <>
      <Hero />
      <Stats />
      <Programs />
      <CourseFinder />
      <Subjects videos={videos} />
      <LatestLectures videos={videos} />
      <WhyUs />
      <HowItWorks />
      <Teachers />
      <Testimonials />
      <CTABand />
      <FAQSection />
    </>
  );
}
