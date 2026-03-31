import type { MetadataRoute } from "next";

const PRODUCTION_DOMAIN = "https://peptidewise.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${PRODUCTION_DOMAIN}/sitemap.xml`,
  };
}
