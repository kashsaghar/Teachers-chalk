"use client";

import { track } from "@vercel/analytics";

export function trackWhatsAppClick(context: string) {
  track("whatsapp_click", { context });
}

export function trackDemoFormSubmit(details: { level?: string; board?: string; subjects?: string }) {
  track("demo_form_submit", details);
}

export function trackVideoPlay(details: { videoId: string; subject?: string; level?: string }) {
  track("video_play", details);
}

export function trackCourseFinderComplete(details: { level: string; board: string; subject: string }) {
  track("course_finder_complete", details);
}
