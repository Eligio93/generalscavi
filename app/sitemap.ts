import { createClient } from "@/prismicio";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const client = createClient();
  const webpages = await client.getAllByType("webpage");
  const projectsPages = await client.getAllByType("project");

  const homepageMapObject = {
    url: `${siteUrl}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
  };

  const webpageMapObjects = webpages.map((webpage) => ({
    url: `${siteUrl}/${webpage.uid}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
  }));

  const projectMapObjects = projectsPages.map((project) => ({
    url: `${siteUrl}/progetti/${project.uid}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
  }));

  return [homepageMapObject, ...webpageMapObjects, ...projectMapObjects];
}
