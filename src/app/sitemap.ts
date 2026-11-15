import type { MetadataRoute } from "next";
import { programs } from "@/data/programs";
import { subjects } from "@/data/subjects";
import { getAllVideos } from "@/lib/youtube";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const videos = await getAllVideos();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/lectures`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/teachers`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/results`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/faq`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const programRoutes: MetadataRoute.Sitemap = programs.map((p) => ({
    url: `${siteUrl}/programs/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const subjectRoutes: MetadataRoute.Sitemap = subjects.map((s) => ({
    url: `${siteUrl}/subjects/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const videoRoutes: MetadataRoute.Sitemap = videos.map((v) => ({
    url: `${siteUrl}/lectures/${v.id}`,
    lastModified: v.publishedAt,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...programRoutes, ...subjectRoutes, ...videoRoutes];
}
