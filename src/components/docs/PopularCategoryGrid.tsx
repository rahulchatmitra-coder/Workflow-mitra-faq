"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Bot,
  BrainCircuit,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Clock,
  Calendar,
  X,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTextColor } from "@/context/TextColorContext";

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  icon: React.ElementType;
  readTime: string;
  lastUpdated: string;
  summary: string;
  content: {
    intro: string;
    features: string[];
    dashboardInfo: string;
    approvalTime: string;
    proTip: string;
    appLinkText: string;
    appLinkUrl: string;
    phoneAccess: string;
    multipleAccounts: string;
    migrationSteps: string[];
    faqs: { q: string; a: string }[];
  };
}

export function PopularCategoryGrid() {
  const { currentColor } = useTextColor();
  const [selectedArticle, setSelectedArticle] = React.useState<ArticleItem | null>(null);
  const [feedbackGiven, setFeedbackGiven] = React.useState<boolean>(false);

  const articles: ArticleItem[] = [
    {
      id: "ai-agents-guide",
      title: "Essential Guide to OpenAI GPT-4o Autonomous AI Agents",
      category: "AI Agents",
      categorySlug: "ai-agents",
      icon: Bot,
      readTime: "3 min read",
      lastUpdated: "11.02.2025",
      summary:
        "Learn how to configure AI Agent nodes in Workflow Mitra to autonomously parse incoming lead webhooks, extract JSON schemas, write dynamic email responses, and trigger CRM updates with zero human intervention.",
      content: {
        intro:
          "Autonomous AI Agents in Workflow Mitra combine deep LLM reasoning (OpenAI GPT-4o, Claude 3.5 Sonnet, Gemini Pro) with visual automation nodes to make intelligent execution decisions in real-time.",
        features: [
          "Autonomous lead qualification using dynamic system prompts",
          "Structured JSON outputs with strict schema enforcement",
          "Multi-modal capabilities for analyzing PDF invoices and images",
          "Automated sentiment scoring & high-priority ticket routing",
          "Encrypted API key vault with zero raw key client exposure",
        ],
        dashboardInfo:
          "With Workflow Mitra's drag-and-drop AI node builder, you can connect GPT-4o agents directly into your existing webhooks, HubSpot CRM, Slack channels, and Google Sheets without writing complex Python code.",
        approvalTime:
          "AI Agent nodes execute within 300ms to 1.2s depending on model context length and tool calling configurations.",
        proTip:
          "Use a low temperature setting (0.1 to 0.3) for deterministic JSON data extraction, and higher temperature (0.7) for creative sales email drafting.",
        appLinkText: "Configure your first AI Agent on Workflow Mitra",
        appLinkUrl: "https://app.workflowmitra.com/",
        phoneAccess:
          "Yes! Monitor AI agent execution runs, prompt logs, and real-time response outputs directly from your smartphone or desktop browser.",
        multipleAccounts:
          "Operating multiple organization API keys? Workflow Mitra allows sub-team key scoping so sales, support, and ops teams use isolated OpenAI quotas.",
        migrationSteps: [
          "Drag the OpenAI GPT-4o node onto your workflow canvas",
          "Enter your encrypted API key from the Credentials Vault",
          "Define your System Prompt (e.g., 'You are a lead qualification assistant')",
          "Connect input variables {{webhook.email_body}} and map AI output to CRM actions",
        ],
        faqs: [
          {
            q: "Which AI models are supported in Workflow Mitra?",
            a: "Workflow Mitra natively supports OpenAI (GPT-4o, GPT-4o-mini), Anthropic (Claude 3.5 Sonnet), and Google Gemini 1.5 Pro.",
          },
          {
            q: "Is my customer data safe with AI Agent nodes?",
            a: "Yes! All API requests use zero-data-retention Enterprise endpoints, ensuring your proprietary data is never used to train public LLM models.",
          },
          {
            q: "Can AI Agents call external APIs autonomously?",
            a: "Absolutely! Enable 'Tool Calling' on the AI Agent node to let GPT-4o query databases, search webhooks, or trigger sub-workflows.",
          },
        ],
      },
    },
    {
      id: "ai-lead-routing",
      title: "How to Automate AI Email & Webhook Lead Routing",
      category: "AI Pipelines",
      categorySlug: "ai-lead-routing",
      icon: BrainCircuit,
      readTime: "4 min read",
      lastUpdated: "10.02.2025",
      summary:
        "Build self-healing AI automation pipelines that categorize incoming lead emails, generate AI draft replies, update HubSpot deals, and dispatch instant team alerts on Slack.",
      content: {
        intro:
          "Manual lead qualification wastes precious sales velocity. AI Lead Routing pipelines analyze lead intent, company size, and budget in under 500ms to route high-intent leads instantly.",
        features: [
          "Instant intent classification of inbound contact form submissions",
          "AI-generated personalized email response drafts sent via Gmail",
          "Automated round-robin sales owner assignment based on lead score",
          "Rich Slack team dispatches formatted with Block Kit AI summaries",
        ],
        dashboardInfo:
          "Workflow Mitra processes thousands of webhook lead payloads per second with automatic rate-limiting, deduplication, and exponential backoff retry logic.",
        approvalTime:
          "Lead classification and routing complete in under 800ms from the instant a user submits a form.",
        proTip:
          "Add a conditional IF node after the AI classifier (`IF ai_score > 80`) to instantly trigger SMS/WhatsApp alerts for VIP leads.",
        appLinkText: "Build your AI Lead Routing pipeline now",
        appLinkUrl: "https://app.workflowmitra.com/",
        phoneAccess:
          "Receive real-time mobile push dispatches and instant AI lead executive summaries on Slack or Telegram.",
        multipleAccounts:
          "Route leads dynamically to different regional sales teams based on AI location detection.",
        migrationSteps: [
          "Connect your Facebook Lead Ads or Custom Webhook trigger node",
          "Pass input payload to the AI Intent Classifier node",
          "Branch pipeline: High Intent ➔ HubSpot Deal + Slack Alert, Low Intent ➔ Email Nurture",
          "Test workflow execution with live sample data",
        ],
        faqs: [
          {
            q: "Can AI Lead Routing detect spam submissions?",
            a: "Yes! The AI classifier identifies dummy emails, bot submissions, and test messages, filtering them out before hitting your CRM.",
          },
          {
            q: "How does round-robin owner assignment work?",
            a: "Workflow Mitra maintains a active sales rep queue, assigning qualified leads evenly while checking rep availability.",
          },
        ],
      },
    },
    {
      id: "ai-vision-pdf",
      title: "How to Parse Invoices & PDFs using AI Vision Nodes",
      category: "AI Vision",
      categorySlug: "ai-vision",
      icon: FileCheck,
      readTime: "3 min read",
      lastUpdated: "08.02.2025",
      summary:
        "Automate document workflows by extracting line items, totals, tax IDs, and vendor details from PDF receipts and invoices directly into Google Sheets & ERP systems.",
      content: {
        intro:
          "Stop manual data entry. AI Vision nodes in Workflow Mitra process unstructured multi-page PDFs, scanned receipts, and image documents without requiring rigid regex templates.",
        features: [
          "Extract line-item details, subtotals, tax IDs, and due dates",
          "Multi-lingual Optical Character Recognition (OCR) support",
          "Automatic validation against existing Purchase Order numbers",
          "Direct tabular sync into Google Sheets, Airtable, and ERPs",
        ],
        dashboardInfo:
          "Workflow Mitra converts incoming PDF attachments into high-resolution vision tensors, extracting 100% accurate key-value pairs in seconds.",
        approvalTime:
          "PDF parsing takes 1.5 to 3 seconds per document depending on file size and page count.",
        proTip: "Use structured JSON output definitions to enforce consistent date formats (`YYYY-MM-DD`) and clean floating-point currency numbers.",
        appLinkText: "Try AI PDF Vision Parsing on Workflow Mitra",
        appLinkUrl: "https://app.workflowmitra.com/",
        phoneAccess: "Snap photos of physical paper receipts on your phone and trigger instant AI parsing via mobile web.",
        multipleAccounts: "Process invoices across multiple corporate entities with isolated audit logs.",
        migrationSteps: [
          "Set up Gmail or Cloud Storage trigger for incoming invoice files",
          "Attach the PDF to the AI Vision Parser node",
          "Define target schema fields: Vendor, Invoice Number, Amount, Due Date",
          "Map extracted fields to Google Sheets append action",
        ],
        faqs: [
          {
            q: "Can AI Vision handle handwritten receipts?",
            a: "Yes! Advanced vision models recognize handwritten text, stamp marks, and signatures with high precision.",
          },
          {
            q: "What happens if a required field is missing from the invoice?",
            a: "The AI node marks missing fields as null and routes the document to an Exception Review queue.",
          },
        ],
      },
    },
    {
      id: "ai-self-healing",
      title: "Building Self-Healing Workflows with AI Retry Logic",
      category: "AI Infrastructure",
      categorySlug: "ai-infrastructure",
      icon: ShieldCheck,
      readTime: "5 min read",
      lastUpdated: "05.02.2025",
      summary:
        "Leverage AI error-handling nodes to automatically diagnose API failures, retry broken webhooks with corrected payloads, and alert developers with root-cause analysis.",
      content: {
        intro:
          "Traditional automations break when third-party APIs change schemas or return unexpected error formats. Self-healing AI workflows inspect error tracebacks, fix payload formatting issues, and resume execution automatically.",
        features: [
          "Automatic error traceback analysis & instant root-cause diagnosis",
          "Smart payload auto-repair for malformed JSON inputs",
          "Exponential backoff & rate-limit handling for 429/503 HTTP errors",
          "Real-time developer alerts on Slack and Discord with suggested fixes",
        ],
        dashboardInfo:
          "Workflow Mitra includes built-in circuit breakers that prevent infinite retry loops while giving developers complete visibility into self-healing events.",
        approvalTime: "AI self-healing resolution occurs automatically in under 1 second.",
        proTip: "Configure fallback action branches to notify engineering teams on Slack only if auto-repair attempts exceed 3 retries.",
        appLinkText: "Enable Self-Healing AI Workflows now",
        appLinkUrl: "https://app.workflowmitra.com/",
        phoneAccess: "Inspect live error logs and execution tracebacks on any device.",
        multipleAccounts: "Global error monitoring across all enterprise workflow environments.",
        migrationSteps: [
          "Toggle 'Enable AI Self-Healing' on your API Request nodes",
          "Set maximum retry attempts (e.g. 3 retries)",
          "Configure fallback alerting destination (Slack #dev-alerts)",
          "Simulate a broken API payload to verify auto-repair execution",
        ],
        faqs: [
          {
            q: "Does self-healing increase API cost?",
            a: "Self-healing only invokes lightweight AI diagnostic models when an error actually occurs, keeping operational costs minimal.",
          },
          {
            q: "Can I inspect what changes the AI made to repair the payload?",
            a: "Yes! Every repaired execution includes a diff comparison in the Workflow Mitra audit log.",
          },
        ],
      },
    },
  ];

  const handleOpenArticle = (art: ArticleItem) => {
    setSelectedArticle(art);
    setFeedbackGiven(false);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* SECTION HEADER: WORKFLOW MITRA FAQ GUIDE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center pb-8"
      >
        <h2 className={`text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-300 ${currentColor.textClass}`}>
          Workflow Mitra FAQ Guide
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
          Essential guides for configuring AI Agents, GPT-4o prompt nodes, webhook lead pipelines, and self-healing automations.
        </p>
      </motion.div>

      {/* 4 ARTICLE CARDS GRID WITH STAGGER ANIMATIONS */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {articles.map((art, index) => {
          const IconComp = art.icon;
          return (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08, type: "spring", stiffness: 260, damping: 20 }}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => handleOpenArticle(art)}
              className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-zinc-900 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-100 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between pb-4">
                  <Badge
                    variant="outline"
                    className="border-zinc-300 text-zinc-800 dark:border-zinc-700 dark:text-zinc-200 text-xs font-bold px-3 py-1 rounded-full"
                  >
                    {art.category}
                  </Badge>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white transition-transform group-hover:scale-110">
                    <IconComp className="h-5 w-5" />
                  </div>
                </div>

                <h3 className={`text-xl font-bold tracking-tight leading-snug transition-colors duration-300 ${currentColor.textClass}`}>
                  {art.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-normal line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {art.readTime}
                  </span>
                  <span>•</span>
                  <span>Updated {art.lastUpdated}</span>
                </div>
                <div className={`flex items-center gap-1 font-bold transition-all duration-300 group-hover:translate-x-1 ${currentColor.textClass}`}>
                  <span>Read Guide</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ARTICLE READER MODAL WITH CLEAN BREADCRUMB */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseArticle}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseArticle}
                className="absolute right-5 top-5 rounded-full p-2.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Clean Breadcrumb: Home > Title */}
              <nav className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-4 flex-wrap">
                <a href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Home
                </a>
                <ChevronRight className="h-3 w-3" />
                <span className={`font-bold truncate max-w-sm ${currentColor.textClass}`}>
                  {selectedArticle.title}
                </span>
              </nav>

              {/* Title & Metadata */}
              <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${currentColor.textClass}`}>
                {selectedArticle.title}
              </h1>

              <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {selectedArticle.readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Last updated: {selectedArticle.lastUpdated}
                </span>
              </div>

              {/* Article Content Body */}
              <div className="mt-6 space-y-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-normal">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  What is {selectedArticle.category}?
                </h3>
                <p>{selectedArticle.content.intro}</p>

                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
                    Key Platform Capabilities:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    {selectedArticle.content.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${currentColor.textClass}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p>{selectedArticle.content.dashboardInfo}</p>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  How long does AI execution take?
                </h3>
                <p>{selectedArticle.content.approvalTime}</p>

                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-medium">
                  <strong>Pro Tip:</strong> {selectedArticle.content.proTip}
                </div>

                <div className="pt-2">
                  <a
                    href={selectedArticle.content.appLinkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 font-bold hover:underline ${currentColor.textClass}`}
                  >
                    <span>{selectedArticle.content.appLinkText}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Can I monitor AI execution on mobile?
                </h3>
                <p>{selectedArticle.content.phoneAccess}</p>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Can I operate multiple API keys & sub-teams?
                </h3>
                <p>{selectedArticle.content.multipleAccounts}</p>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Step-by-Step Configuration Flow:
                </h3>
                <ol className="list-decimal list-inside space-y-1.5 pl-2 font-mono text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
                  {selectedArticle.content.migrationSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white pt-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {selectedArticle.content.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                        {faq.q}
                      </h4>
                      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Call to Action Box */}
                <div className="mt-8 rounded-3xl border border-zinc-900 bg-zinc-900 p-6 sm:p-8 text-center text-white dark:border-zinc-700 dark:bg-zinc-900 shadow-xl">
                  <Sparkles className="mx-auto h-8 w-8 text-white mb-2" />
                  <h3 className="text-xl sm:text-2xl font-black">
                    Ready to Build Autonomous AI Workflows?
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                    Get started with Workflow Mitra visual AI nodes today and automate your complex business processes.
                  </p>
                  <a
                    href="https://app.workflowmitra.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-xs sm:text-sm font-extrabold text-zinc-900 shadow-lg hover:bg-zinc-100 transition-all cursor-pointer"
                  >
                    <span>Start Building Now</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </div>

                {/* Was this article helpful? Widget */}
                <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                    Was this article helpful?
                  </h4>

                  {feedbackGiven ? (
                    <div className="mt-3 flex items-center gap-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      <Sparkles className="h-4 w-4" />
                      <span>Thank you for your feedback! 🎉</span>
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => setFeedbackGiven(true)}
                        className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>Yes</span>
                      </button>
                      <button
                        onClick={() => setFeedbackGiven(true)}
                        className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                      >
                        <ThumbsDown className="h-4 w-4" />
                        <span>No</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
