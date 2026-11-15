import type { Metadata } from "next";
import { FAQSection } from "@/components/home/FAQSection";

export const metadata: Metadata = {
  title: "FAQ | Teacher's Chalk",
  description: "Answers to common questions about Teacher's Chalk online tuition: demos, fees, boards, time zones and more.",
};

export default function FaqPage() {
  return <FAQSection />;
}
