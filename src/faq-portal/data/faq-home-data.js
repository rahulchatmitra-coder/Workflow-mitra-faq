export const HERO_TAGS = [
  { label: "AI Agents & OpenAI", keyword: "OpenAI", id: "OpenAI" },
  { label: "Webhook Triggers", keyword: "Webhooks", id: "Webhooks" },
  { label: "HubSpot CRM", keyword: "HubSpot", id: "HubSpot" },
  { label: "Slack Alerts", keyword: "Slack", id: "Slack" },
  { label: "WhatsApp Cloud API", keyword: "WhatsApp", id: "WhatsApp" },
  { label: "Google Sheets", keyword: "Google", id: "Google" },
];

export const HOME_FAQS = [
  {
    id: "faq-1",
    title: "What AI models does Workflow Mitra support for automation?",
    content:
      "Workflow Mitra supports OpenAI GPT-4o, Claude 3.5 Sonnet, Google Gemini 1.5 Pro, Groq Llama, and self-hosted Ollama models. You can use AI for content generation, email drafting, data extraction, sentiment analysis, and autonomous decision-making within workflows.",
  },
  {
    id: "faq-2",
    title: "How do I connect OpenAI API to create AI-powered workflows?",
    content:
      "Navigate to Credentials in Workflow Mitra, select OpenAI, and paste your API key (starts with sk-proj-). Once connected, you can add OpenAI nodes to workflows for GPT-4o chat completions, embeddings, image generation, and function calling with JSON schema enforcement.",
  },
  {
    id: "faq-3",
    title: "Can Workflow Mitra trigger automations from WhatsApp messages?",
    content:
      "Yes! Connect WhatsApp Cloud API via Meta Developer Portal. When a customer sends a message, Workflow Mitra can trigger workflows to respond with AI-generated replies, create CRM tickets, send order confirmations, or route to support teams automatically.",
  },
  {
    id: "faq-4",
    title: "Does Workflow Mitra support Shopify order automation?",
    content:
      "Absolutely! Connect Shopify webhooks to trigger workflows on new orders. Automatically generate invoices in Zoho Books, send WhatsApp confirmations to customers, create shipping labels via Shiprocket, and log order data to Google Sheets—all in one workflow.",
  },
  {
    id: "faq-5",
    title: "How does AI-powered lead scoring work in Workflow Mitra?",
    content:
      "Use OpenAI or Claude nodes to analyze lead data from forms or CRM webhooks. AI evaluates intent signals, company size, budget indicators, and engagement level, then outputs a lead score (1-100). High-scoring leads trigger instant Slack alerts to sales teams with priority routing.",
  },
  {
    id: "faq-6",
    title: "Can I build workflows that auto-reply to customer emails with AI?",
    content:
      "Yes! Set up Gmail or SMTP triggers to capture incoming emails. Pass email content to OpenAI/Claude for sentiment analysis and response generation. AI drafts contextual replies based on your brand voice, which can be sent automatically or queued for human approval before sending.",
  },
  {
    id: "faq-7",
    title: "How does Workflow Mitra route Facebook leads to HubSpot and Slack?",
    content:
      "Workflow Mitra captures incoming webhooks from Facebook Lead Ads, evaluates email filter logic (IF 1st Has an email), posts data to HubSpot CRM, assigns sales owners round-robin, and dispatches multi-channel alerts to Gmail, Slack, and Google Sheets simultaneously.",
  },
  {
    id: "faq-8",
    title: "What is the difference between Workflow Mitra and Zapier?",
    content:
      "Workflow Mitra offers visual canvas workflow building with native AI agent support (GPT-4o, Claude, Gemini), self-hosted deployment options, unlimited workflow executions, and built-in developer tools like webhooks, API testing, and custom code nodes. Zapier is task-based with execution limits and limited AI capabilities.",
  },
  {
    id: "faq-9",
    title: "How secure are API credentials stored in Workflow Mitra?",
    content:
      "All credentials are encrypted using AES-256 encryption at rest and TLS 1.3 in transit. Workflow Mitra uses vault-based credential management with role-based access control (RBAC). Credentials are never logged in execution history and can be rotated anytime without breaking workflows.",
  },
  {
    id: "faq-10",
    title: "Can Workflow Mitra parse PDF invoices and extract data automatically?",
    content:
      "Yes! Use AI Vision nodes (OpenAI GPT-4o Vision or Claude) to analyze PDF invoice images. AI extracts line items, totals, vendor details, PO numbers, and dates with 95%+ accuracy. Extracted data can be auto-populated into Zoho Books, QuickBooks, or Google Sheets for accounting automation.",
  },
  {
    id: "faq-11",
    title: "Does Workflow Mitra support multi-channel social media posting?",
    content:
      "Absolutely! Trigger workflows from RSS feeds or CMS webhooks. Use AI to rewrite blog posts in different tones, get human approval via Slack, then auto-post to LinkedIn, Facebook Pages, Twitter/X, Telegram channels, and Discord servers simultaneously with customized captions per platform.",
  },
  {
    id: "faq-12",
    title: "How do conditional IF/ELSE branches work in workflows?",
    content:
      "Add IF nodes to evaluate conditions like 'Has Email', 'Amount > 1000', or 'Sentiment = Positive'. Each branch can route to different actions. For example: High-value leads go to sales Slack channel, medium leads get email nurture, low leads go to general database—all automated based on your rules.",
  },
  {
    id: "faq-13",
    title: "Can I schedule workflows to run at specific times?",
    content:
      "Yes! Use Schedule triggers with cron expressions for recurring automation. Run daily reports at 9 AM, send weekly digest emails every Monday, auto-archive old CRM records monthly, or trigger AI content generation every 6 hours. Supports timezone-aware scheduling globally.",
  },
  {
    id: "faq-14",
    title: "Does Workflow Mitra integrate with Google Sheets for automation?",
    content:
      "Yes! Use Google Sheets as a trigger (on new row), data source, or destination. Automatically log leads, sync CRM data, create reports, or use sheets as a lightweight database. Supports OAuth authentication and Service Account for server-to-server automation without user login.",
  },
  {
    id: "faq-15",
    title: "Can I use Workflow Mitra for customer support ticket automation?",
    content:
      "Absolutely! Integrate with Zendesk, Freshdesk, or Intercom webhooks. When a ticket is created, AI analyzes sentiment and urgency, auto-categorizes the issue, suggests knowledge base articles, assigns to appropriate agents, and sends Slack notifications—reducing response time by 70%.",
  },
];
