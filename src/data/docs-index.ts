import { SearchResultItem } from "@/types/docs";

export const DOCS_SEARCH_INDEX: SearchResultItem[] = [
  {
    title: "Workflow Mitra Help Center",
    slug: "/",
    category: "Getting Started",
    description: "Welcome to Workflow Mitra single-page help center and visual integration walkthrough.",
    snippet: "Interactive Driver.js guided tour, secret key inputs, step-by-step configuration, and verification banner.",
  },
  {
    title: "Step 1: Obtain Credentials",
    slug: "/#tour-step-1",
    category: "Guide Step",
    description: "Locate your integration API key or OAuth secret token from your platform dashboard.",
    snippet: "Credentials generation, API keys, secret tokens.",
  },
  {
    title: "Step 2: Configure Node",
    slug: "/#tour-step-2",
    category: "Guide Step",
    description: "Paste credentials into the Workflow Mitra node configuration panel.",
    snippet: "Node parameters, field mapping, secret storage.",
  },
  {
    title: "Step 3: Test Connection",
    slug: "/#tour-step-3",
    category: "Guide Step",
    description: "Click 'Test Connection' to verify authentication & API permissions.",
    snippet: "Authentication verification, HTTP status 200 OK.",
  },
  {
    title: "Step 4: Save & Activate",
    slug: "/#tour-step-4",
    category: "Guide Step",
    description: "Save your credentials securely and activate automated workflow execution.",
    snippet: "AES-256 encryption, active production trigger.",
  },
];
