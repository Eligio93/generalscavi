import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

type Props = {
  params: Promise<{ webpage: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { webpage: webpageSlug } = await params;
  const client = createClient();
  const webpage = await client.getByUID("webpage", webpageSlug);

  return {
    title: webpage.data.meta_title || "GeneralScavi",
    description: webpage.data.meta_description || "",
    openGraph: {
      title: webpage.data.meta_title || "GeneralScavi",
      description: webpage.data.meta_description || "",
      images: webpage.data.meta_image?.url
        ? [{ url: webpage.data.meta_image.url }]
        : [],
    },
  };
}

export default async function WebPage({ params }: Props) {
  const { webpage: webpageSlug } = await params;
  const client = createClient();
  const webpage = await client.getByUID("webpage", webpageSlug);

  return <SliceZone slices={webpage.data.slices} components={components} />;
}
