// Metadata utility — Next.js Metadata type removed (not needed in Vite/React)
// This helper is preserved for reference but not used in Vite since
// react-helmet-async handles per-page metadata inline.

const SITE_URL = "https://workflowmitra-docs.vercel.app";

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
