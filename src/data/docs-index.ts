import { SearchResultItem } from "@/types/docs";
import { PROVIDER_LIST } from "@/data/credentials-data";

const CORE_DOC_ITEMS: SearchResultItem[] = [
  {
    title: "Workflow Mitra Help Center",
    slug: "/",
    category: "Getting Started",
    description: "Welcome to Workflow Mitra help center and visual integration walkthrough.",
    snippet: "Interactive guided tour, secret key inputs, step-by-step configuration.",
  },
  {
    title: "Credentials Vault & Integrations Overview",
    slug: "/credentials",
    category: "Credentials",
    description: "Browse all active pre-built integration connectors for AI Models, CRMs, Databases, Communication, and E-commerce.",
    snippet: "AES-256 encrypted key storage, OAuth 2.0 flows, and API keys.",
  },
];

// Include ONLY active, non-upcoming providers that have actual routes (/credentials/:providerId)
const ACTIVE_PROVIDERS = PROVIDER_LIST.filter((provider) => !provider.isUpcoming);

const PROVIDER_DOC_ITEMS: SearchResultItem[] = ACTIVE_PROVIDERS.flatMap((provider) => {
  const mainItem: SearchResultItem = {
    title: `${provider.name} Credentials Guide`,
    slug: `/credentials/${provider.id}`,
    category: provider.category,
    description: provider.description,
    snippet: `${provider.badge} • ${provider.category} active connector for Workflow Mitra.`,
  };

  const subItems: SearchResultItem[] = (provider.subProviders || []).map((sub) => ({
    title: `${provider.name} - ${sub.name} Gateway`,
    slug: `/credentials/${provider.id}`,
    category: provider.category,
    description: sub.description,
    snippet: `${sub.badge} • Connect ${sub.name} with Workflow Mitra.`,
  }));

  return [mainItem, ...subItems];
});

export const DOCS_SEARCH_INDEX: SearchResultItem[] = [
  ...CORE_DOC_ITEMS,
  ...PROVIDER_DOC_ITEMS,
];
