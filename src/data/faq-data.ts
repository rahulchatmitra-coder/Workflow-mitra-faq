import { DocArticle } from "@/types/docs";

export const FAQ_DOC: DocArticle = {
  slug: "/docs/faq",
  title: "Frequently Asked Questions & Troubleshooting",
  description: "Find comprehensive solutions to common questions, security queries, rate limits, credential encryption, and workflow debugging.",
  category: "faq",
  prerequisites: [],
  readingTime: "5 min read",
  lastUpdated: "August 2026",
  overview: "Explore categorized answers regarding platform architecture, credential safety, rate limit strategies, static site export, and integration troubleshooting.",
  steps: [],
  successMessage: "Have additional questions? Contact the Workflow Mitra developer support team.",
  faqs: [
    {
      question: "How are API credentials and tokens secured?",
      answer: "All integration credentials (API keys, OAuth tokens, SMTP passwords) are encrypted client-side and inside secure storage vaults using industry-standard AES-256-GCM encryption. Keys are never logged in raw text.",
    },
    {
      question: "Can Workflow Mitra be deployed as a completely static website?",
      answer: "Yes! Workflow Mitra Documentation is built using Next.js 15 App Router with full static HTML export (`output: export`). It can be hosted for free on Vercel, Cloudflare Pages, GitHub Pages, or Netlify with zero server costs.",
    },
    {
      question: "How do rate limit retries work in automated workflows?",
      answer: "If an external API (like OpenAI or HubSpot) returns an HTTP 429 Rate Limit error, Workflow Mitra automatically executes exponential backoff retries (e.g. 1s, 2s, 4s, 8s) up to 5 attempts before flagging an error node.",
    },
    {
      question: "What IP addresses should I whitelist in my firewall?",
      answer: "Whitelist static egress IPs: `34.120.10.5` and `34.120.10.6` for custom database/SMTP server connections.",
    },
    {
      question: "Can I trigger workflows directly from custom frontend web apps?",
      answer: "Yes! Use Webhook POST triggers with CORS headers or Bearer tokens to invoke workflows directly from your React, Vue, Next.js, or mobile applications.",
    },
  ],
  relatedArticles: [
    { title: "Documentation Overview", slug: "/docs", description: "Return to main documentation overview page.", category: "credentials" },
  ],
  prevArticle: { title: "Webhooks Integration", slug: "/docs/webhooks" },
  nextArticle: { title: "Documentation Overview", slug: "/docs" },
};
