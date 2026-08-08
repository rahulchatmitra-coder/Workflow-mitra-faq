export interface HeroTag {
  label: string;
  keyword: string;
}

export interface HomeFaqItem {
  id: string;
  title: string;
  content: string;
}

export const HERO_TAGS: HeroTag[] = [
  { label: "🤖 AI Agents & OpenAI", keyword: "OpenAI" },
  { label: "⚡ Webhook Triggers", keyword: "Webhooks" },
  { label: "💼 HubSpot CRM", keyword: "HubSpot" },
  { label: "💬 Slack Alerts", keyword: "Slack" },
  { label: "📲 WhatsApp Cloud API", keyword: "WhatsApp" },
  { label: "📊 Google Sheets", keyword: "Google" },
];

export const HOME_FAQS = [
  {
    id: "faq-1",
    title: "How does Workflow Mitra route Facebook leads to HubSpot, Slack & Google Sheets?",
    content:
      "Workflow Mitra captures incoming webhooks from Facebook Lead Ads, evaluates email filter logic (IF 1st Has an email), posts data to HubSpot CRM, assigns sales owners round-robin, and dispatches multi-channel alerts to Gmail, Slack, and Google Sheets simultaneously.",
  },
  {
    id: "faq-2",
    title: "How does the Driver.js interactive guided tour work?",
    content:
      "Clicking 'Start Guide' launches Driver.js, which smoothly highlights each step on the visual canvas—from Facebook Webhook, IF filter, HubSpot App Request, Team Assignment, to Gmail, Slack, and Sheets actions—with step-by-step visual popovers.",
  },
  {
    id: "faq-3",
    title: "Can I simulate live execution on the canvas?",
    content:
      "Yes! Click the '▶ Run' button on the bottom canvas control bar to launch a live visual simulation of the lead routing pipeline in real time.",
  },
];
