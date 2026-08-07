import * as React from "react";

interface SEOJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}

export function SEOJsonLd({
  title,
  description,
  url,
  datePublished = "2026-01-01",
  dateModified = "2026-08-07",
}: SEOJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Organization",
      name: "Workflow Mitra Documentation Team",
      url: "https://workflowmitra-docs.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Workflow Mitra",
      logo: {
        "@type": "ImageObject",
        url: "https://workflowmitra-docs.vercel.app/images/logo.png",
      },
    },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
