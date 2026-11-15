import type { Level, Subject } from "@/lib/tagVideo";

export type Testimonial = {
  id: string;
  name: string; // first name or initials only, per spec section 8.1
  subject: Subject;
  level: Level;
  grade: string;
  quote: string;
  photo?: string;
  year?: number;
};

// Empty until the client supplies real student results and consent to show
// them (spec section 15). Do not invent quotes/grades here — the
// Testimonials section renders a "coming soon" placeholder while this stays
// empty.
export const testimonials: Testimonial[] = [];
