import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const homepage = await client.getSingle("homepage");

  return {
    title: homepage.data.meta_title || "GeneralScavi",
    description: homepage.data.meta_description || "",
    openGraph: {
      title: homepage.data.meta_title || "GeneralScavi",
      description: homepage.data.meta_description || "",
      images: homepage.data.meta_image?.url
        ? [{ url: homepage.data.meta_image.url }]
        : [],
    },
  };
}

export default async function Home() {
  const client = createClient();
  const homepage = await client.getSingle("homepage");

  return (
    <SliceZone
      slices={homepage.data.slices}
      components={components}
      context={{ isHomePage: true }}
    />
  );
}
