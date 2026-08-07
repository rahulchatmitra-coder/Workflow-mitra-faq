import { DocArticle } from "@/types/docs";

export const WORKFLOWS_DOC: DocArticle = {
  slug: "/docs/workflows",
  title: "Visual Workflow Automation Guide",
  description: "Master Workflow Mitra's visual drag-and-drop workflow canvas, node execution logic, data transformation expressions, and branch conditions.",
  category: "workflows",
  prerequisites: [
    "Workflow Mitra Workspace Access",
    "Configured Integration Credentials",
  ],
  readingTime: "6 min read",
  lastUpdated: "August 2026",
  overview: "Workflow Mitra empowers teams to build complex multi-step automations visually without writing custom code. Connect triggers, transformation nodes, AI reasoning steps, and action destinations seamlessly.",
  steps: [
    {
      number: 1,
      title: "Add a Trigger Node",
      description: "Start your workflow by dragging a Trigger Node onto the canvas (e.g. Schedule Cron, Webhook Trigger, or App Event).",
      screenshotUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      screenshotAlt: "Visual Workflow Trigger Node",
    },
    {
      number: 2,
      title: "Map Data Between Nodes",
      description: "Use handlebars syntax `{{ $json.body.email }}` or expressions to map input fields into downstream action nodes.",
      screenshotUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      screenshotAlt: "Data Mapping Inspector",
      codeSnippet: `// Dynamic handle expression
{
  "leadEmail": "{{ $json.body.customer.email }}",
  "score": "{{ $json.aiResponse.sentimentScore }}"
}`,
      codeLanguage: "json",
    },
    {
      number: 3,
      title: "Configure IF / Switch Logic Branches",
      description: "Add conditional branches to route execution based on dynamic data values (e.g. If lead score > 80 -> Send to HubSpot, else -> Log to Google Sheets).",
      screenshotUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
      screenshotAlt: "Branch Node Configuration",
    },
    {
      number: 4,
      title: "Execute Test Run & Deploy",
      description: "Click 'Test Workflow' to run step-by-step debug execution, inspect node inputs/outputs, and click 'Activate' to turn on production automation.",
      screenshotUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
      screenshotAlt: "Workflow Activation Output",
    },
  ],
  successMessage: "Visual Workflow deployed! Production execution logs will record every workflow invocation.",
  commonErrors: [
    {
      error: "UNMAPPED_NODE_VARIABLE",
      resolution: "Ensure previous nodes have finished executing during test run so schema fields can be automatically populated.",
    },
  ],
  faqs: [
    {
      question: "What is the maximum execution runtime per node?",
      answer: "Standard nodes timeout after 30 seconds. Long-running AI batch nodes support up to 300 seconds execution time.",
    },
  ],
  relatedArticles: [
    { title: "Webhooks Integration", slug: "/docs/webhooks", description: "Trigger workflows from incoming HTTP POST webhooks.", category: "webhooks" },
    { title: "OpenAI API Credentials", slug: "/docs/credentials/openai", description: "Inject AI decision nodes into visual canvas.", category: "credentials" },
  ],
  prevArticle: { title: "HTTP Request Custom Auth", slug: "/docs/credentials/http-request" },
  nextArticle: { title: "Webhooks Integration", slug: "/docs/webhooks" },
};
