import { DocArticle } from "@/types/docs";

export const WEBHOOKS_DOC: DocArticle = {
  slug: "/docs/webhooks",
  title: "Incoming & Outgoing Webhooks Integration",
  description: "Configure instant HTTP POST trigger endpoints, HMAC SHA-256 signature verification, custom JSON payloads, and response status codes.",
  category: "webhooks",
  prerequisites: [
    "Workflow Mitra Account",
    "Target Application Webhook Manager Access",
  ],
  readingTime: "5 min read",
  lastUpdated: "August 2026",
  overview: "Webhooks allow external applications (Stripe, GitHub, Shopify, Typeform, custom backends) to trigger real-time workflow automations in Workflow Mitra instantly.",
  steps: [
    {
      number: 1,
      title: "Generate Webhook Endpoint URL",
      description: "Create a Webhook Node in Workflow Mitra to receive your unique static production endpoint URL (e.g. `https://api.workflowmitra.com/v1/webhook/wh_xyz123`).",
      screenshotUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
      screenshotAlt: "Webhook Endpoint Generator",
      codeSnippet: `POST https://api.workflowmitra.com/v1/webhook/wh_xyz123`,
      codeLanguage: "http",
    },
    {
      number: 2,
      title: "Configure HMAC Signature Security",
      description: "Under Webhook Node Security, enable HMAC SHA-256 verification and enter your Webhook Signing Secret.",
      screenshotUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
      screenshotAlt: "HMAC Security Panel",
      codeSnippet: `// Signature Header Verification
X-Workflow-Mitra-Signature: sha256=7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069`,
      codeLanguage: "http",
      tip: "Enabling HMAC validation ensures unauthorized third parties cannot spam your workflow endpoint.",
    },
    {
      number: 3,
      title: "Test Payload Capture",
      description: "Click 'Listen for Event' and send a sample HTTP POST payload from Postman or your external service to automatically capture the JSON body schema.",
      screenshotUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      screenshotAlt: "Payload Inspection View",
    },
    {
      number: 4,
      title: "Set Custom Response Code & Body",
      description: "Configure your HTTP response payload (e.g. `200 OK` with `{ \"received\": true }` or `202 Accepted`).",
      screenshotUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
      screenshotAlt: "Response Configurator",
    },
  ],
  successMessage: "Webhook endpoint is live and listening! Events will instantly trigger automated workflows.",
  commonErrors: [
    {
      error: "401 Signature Verification Failed",
      resolution: "Ensure your signing secret matches the exact secret key configured in your sending application.",
    },
  ],
  faqs: [
    {
      question: "What is the maximum payload size supported?",
      answer: "Workflow Mitra webhooks support incoming JSON payloads up to 10MB per request.",
    },
  ],
  relatedArticles: [
    { title: "Visual Workflows Guide", slug: "/docs/workflows", description: "Learn how to parse webhook JSON data inside workflow nodes.", category: "workflows" },
  ],
  prevArticle: { title: "Visual Workflows Guide", slug: "/docs/workflows" },
  nextArticle: { title: "Troubleshooting FAQ", slug: "/docs/faq" },
};
