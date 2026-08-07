import { Metadata } from "next";

const SITE_URL = "https://workflowmitra-docs.vercel.app";

export function generateDocMetadata({
  title,
  description,
  path = "",
  type = "article",
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
}): Metadata {
  const fullUrl = `${SITE_URL}${path}`;

  return {
    title: `${title} | Workflow Mitra Help Center`,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: `${title} | Workflow Mitra Help Center`,
      description,
      url: fullUrl,
      siteName: "Workflow Mitra Documentation",
      locale: "en_US",
      type,
      images: [
        {
          url: `${SITE_URL}/images/og-banner.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Workflow Mitra Help Center`,
      description,
      images: [`${SITE_URL}/images/og-banner.png`],
      creator: "@WorkflowMitra",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
