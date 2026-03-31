import type { Metadata } from "next";

export const PRODUCTION_DOMAIN = "https://peptidewise.vercel.app";

export const SITE_NAME = "PeptideWise";

export const DEFAULT_DESCRIPTION =
  "Evidence-based peptide therapy education by Dr. Patrick Taylor, MD. Research-backed information on BPC-157, semaglutide, tirzepatide, and 15+ therapeutic peptides.";

interface BuildMetaOptions {
  title: string;
  description: string;
  path?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  images?: { url: string; alt: string; width?: number; height?: number }[];
  noIndex?: boolean;
}

export function buildMeta({
  title,
  description,
  path = "",
  ogType = "website",
  publishedTime,
  modifiedTime,
  images,
  noIndex = false,
}: BuildMetaOptions): Metadata {
  const url = `${PRODUCTION_DOMAIN}${path}`;
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;

  const ogImages = images ?? [
    {
      url: `${PRODUCTION_DOMAIN}/images/dr-taylor.jpg`,
      alt: "Dr. Patrick Taylor, MD — PeptideWise",
      width: 400,
      height: 400,
    },
  ];

  return {
    title: fullTitle,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: ogType,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ogImages.map((img) => img.url),
    },
  };
}
