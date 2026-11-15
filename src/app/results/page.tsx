import type { Metadata } from "next";
import { ResultsExplorer } from "@/components/results/ResultsExplorer";

export const metadata: Metadata = {
  title: "Results & Testimonials | Teacher's Chalk",
  description: "Real student results and testimonials from Teacher's Chalk students across O Level, A Level, IGCSE, GCSE and Edexcel.",
};

export default function ResultsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-caveat text-2xl text-forest">report cards we love</p>
        <h1 className="mt-1 font-heading text-3xl font-extrabold text-deep md:text-4xl">Results & testimonials</h1>
        <p className="mt-3 text-base text-cocoa-muted">Filter by subject or year to see how our students have done.</p>
      </div>

      <div className="mt-10">
        <ResultsExplorer />
      </div>
    </div>
  );
}
