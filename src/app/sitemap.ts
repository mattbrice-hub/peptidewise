import type { MetadataRoute } from "next";
import { peptides } from "@/data/peptides";
import { articles } from "@/data/articles";
import { researchStudies } from "@/data/research";

const PRODUCTION_DOMAIN = "https://peptidewise.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${PRODUCTION_DOMAIN}`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${PRODUCTION_DOMAIN}/peptides`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${PRODUCTION_DOMAIN}/stacks`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${PRODUCTION_DOMAIN}/symptom-checker`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${PRODUCTION_DOMAIN}/learn`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${PRODUCTION_DOMAIN}/research`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${PRODUCTION_DOMAIN}/about`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const peptidePages: MetadataRoute.Sitemap = peptides.map((p) => ({
    url: `${PRODUCTION_DOMAIN}/peptides/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    ...(p.lastUpdated && { lastModified: new Date(p.lastUpdated) }),
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${PRODUCTION_DOMAIN}/learn/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: new Date(a.modifiedDate ?? a.publishedAt),
  }));

  const researchPages: MetadataRoute.Sitemap = researchStudies.map((s) => ({
    url: `${PRODUCTION_DOMAIN}/research/${s.pmid}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...peptidePages, ...articlePages, ...researchPages];
}
