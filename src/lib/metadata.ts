// Metadata utility for generating consistent meta tags across pages
// Uses environment variables for configuration

const SITE_URL = import.meta.env.VITE_APP_URL || "https://workflowmitra-docs.vercel.app";
const APP_URL = import.meta.env.VITE_APP_MAIN_URL || "https://app.workflowmitra.com";

export interface DocMetadata {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
}

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
}): DocMetadata {
  const fullUrl = `${SITE_URL}${path}`;

  return {
    title: `${title} | Workflow Mitra Help Center`,
    description,
    canonical: fullUrl,
    ogTitle: `${title} | Workflow Mitra Help Center`,
    ogDescription: description,
    path,
    type,
  };
}

export { SITE_URL, APP_URL };
