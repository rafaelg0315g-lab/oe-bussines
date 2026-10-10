import type { MetadataRoute } from "next";

/**
 * Domain is still not registered — kept configurable via NEXT_PUBLIC_SITE_URL.
 * Set it once the definitive domain is purchased (same value as layout.tsx).
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
