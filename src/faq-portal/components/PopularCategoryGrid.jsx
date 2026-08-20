import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  X,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import { Openai, Claude, GeminiLogo, GroqLogo } from './svgs'

export function PopularCategoryGrid() {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [feedbackGiven, setFeedbackGiven] = useState(false)

  const articles = [
    {
      id: 'ai-agents-guide',
      title: 'Essential Guide to OpenAI GPT-4o Autonomous AI Agents',
      category: 'AI Agents',
      categorySlug: 'ai-agents',
      icon: Openai,
      readTime: '3 min read',
      lastUpdated: '11.02.2025',
      summary:
        'Learn how to configure AI Agent nodes in Workflow Mitra to autonomously parse incoming lead webhooks, extract JSON schemas, write dynamic email responses, and trigger CRM updates with zero human intervention.',
      content: {
        intro:
          'Autonomous AI Agents in Workflow Mitra combine deep LLM reasoning (OpenAI GPT-4o, Claude 3.5 Sonnet, Gemini Pro) with visual automation nodes to make intelligent execution decisions in real-time.',
        features: [
          'Autonomous lead qualification using dynamic system prompts',
          'Structured JSON outputs with strict schema enforcement',
          'Multi-modal capabilities for analyzing PDF invoices and images',
          'Automated sentiment scoring & high-priority ticket routing',
          'Encrypted API key vault with zero raw key client exposure',
        ],
        dashboardInfo:
          "With Workflow Mitra's drag-and-drop AI node builder, you can connect GPT-4o agents directly into your existing webhooks, HubSpot CRM, Slack channels, and Google Sheets without writing complex Python code.",
        approvalTime:
          'AI Agent nodes execute within 300ms to 1.2s depending on model context length and tool calling configurations.',
        proTip:
          'Use a low temperature setting (0.1 to 0.3) for deterministic JSON data extraction, and higher temperature (0.7) for creative sales email drafting.',
        appLinkText: 'Configure your first AI Agent on Workflow Mitra',
        appLinkUrl: 'https://app.workflowmitra.com/',
        phoneAccess:
          'Yes! Monitor AI agent execution runs, prompt logs, and real-time response outputs directly from your smartphone or desktop browser.',
        multipleAccounts:
          'Operating multiple organization API keys? Workflow Mitra allows sub-team key scoping so sales, support, and ops teams use isolated OpenAI quotas.',
        migrationSteps: [
          'Drag the OpenAI GPT-4o node onto your workflow canvas',
          'Enter your encrypted API key from the Credentials Vault',
          'Define your System Prompt (e.g., "You are a lead qualification assistant")',
          'Connect input variables {{webhook.email_body}} and map AI output to CRM actions',
        ],
        faqs: [
          {
            q: 'Which AI models are supported in Workflow Mitra?',
            a: 'Workflow Mitra natively supports OpenAI (GPT-4o, GPT-4o-mini), Anthropic (Claude 3.5 Sonnet), and Google Gemini 1.5 Pro.',
          },
          {
            q: 'Is my customer data safe with AI Agent nodes?',
            a: 'Yes! All API requests use zero-data-retention Enterprise endpoints, ensuring your proprietary data is never used to train public LLM models.',
          },
          {
            q: 'Can AI Agents call external APIs autonomously?',
            a: 'Absolutely! Enable "Tool Calling" on the AI Agent node to let GPT-4o query databases, search webhooks, or trigger sub-workflows.',
          },
        ],
      },
    },
    {
      id: 'ai-lead-routing',
      title: 'How to Automate AI Email & Webhook Lead Routing',
      category: 'AI Pipelines',
      categorySlug: 'ai-lead-routing',
      icon: Claude,
      readTime: '4 min read',
      lastUpdated: '10.02.2025',
      summary:
        'Build self-healing AI automation pipelines that categorize incoming lead emails, generate AI draft replies, update HubSpot deals, and dispatch instant team alerts on Slack.',
      content: {
        intro:
          'Manual lead qualification wastes precious sales velocity. AI Lead Routing pipelines analyze lead intent, company size, and budget in under 500ms to route high-intent leads instantly.',
        features: [
          'Instant intent classification of inbound contact form submissions',
          'AI-generated personalized email response drafts sent via Gmail',
          'Automated round-robin sales owner assignment based on lead score',
          'Rich Slack team dispatches formatted with Block Kit AI summaries',
        ],
        dashboardInfo:
          'Workflow Mitra processes thousands of webhook lead payloads per second with automatic rate-limiting, deduplication, and exponential backoff retry logic.',
        approvalTime:
          'Lead classification and routing complete in under 800ms from the instant a user submits a form.',
        proTip:
          'Add a conditional IF node after the AI classifier (`IF ai_score > 80`) to instantly trigger SMS/WhatsApp alerts for VIP leads.',
        appLinkText: 'Build your AI Lead Routing pipeline now',
        appLinkUrl: 'https://app.workflowmitra.com/',
        phoneAccess:
          'Receive real-time mobile push dispatches and instant AI lead executive summaries on Slack or Telegram.',
        multipleAccounts:
          'Route leads dynamically to different regional sales teams based on AI location detection.',
        migrationSteps: [
          'Connect your Facebook Lead Ads or Custom Webhook trigger node',
          'Pass input payload to the AI Intent Classifier node',
          'Branch pipeline: High Intent ➔ HubSpot Deal + Slack Alert, Low Intent ➔ Email Nurture',
          'Test workflow execution with live sample data',
        ],
        faqs: [
          {
            q: 'Can this replace traditional lead scoring algorithms?',
            a: 'Yes! LLMs analyze nuance and context far better than static point systems, understanding company urgency and pain points instantly.',
          },
          {
            q: 'What happens if our CRM API rate limits during high traffic?',
            a: 'Workflow Mitra queues executions automatically in an encrypted dead-letter queue and retries with exponential backoff.',
          },
        ],
      },
    },
    {
      id: 'ai-vision-invoices',
      title: 'How to Parse Invoices & PDFs using AI Vision Nodes',
      category: 'AI Vision',
      categorySlug: 'ai-vision-invoices',
      icon: GeminiLogo,
      readTime: '5 min read',
      lastUpdated: '09.02.2025',
      summary:
        'Automate document workflows by extracting line items, totals, tax IDs, and vendor details from PDF receipts and image files directly into Google Sheets and ERP systems.',
      content: {
        intro:
          'Legacy OCR breaks when invoice templates change. Workflow Mitra AI Vision uses multimodal LLMs (GPT-4o Vision & Gemini 1.5 Pro) to understand any invoice format with 99%+ field accuracy.',
        features: [
          'Zero-template configuration: handles any vendor invoice or receipt format',
          'Extract line item tables, VAT/GST taxes, PO numbers, and due dates',
          'Automatic currency conversion and vendor matching in accounting software',
          'Direct export to Google Sheets, Zoho Books, QuickBooks, and PostgreSQL',
        ],
        dashboardInfo:
          'Attach incoming email triggers (e.g., invoices@yourcompany.com) or S3/Google Drive upload folders to parse files the instant they land.',
        approvalTime:
          'Multimodal parsing finishes in ~1.8 seconds per multi-page document.',
        proTip:
          'Add a human-in-the-loop Slack approval node for invoices exceeding $5,000 before marking them paid in your ERP.',
        appLinkText: 'Try AI Invoice Parser Workflow',
        appLinkUrl: 'https://app.workflowmitra.com/',
        phoneAccess:
          'Snap photo receipts on mobile and forward via WhatsApp to trigger immediate AI expense logging.',
        multipleAccounts:
          'Segregate corporate entities with dedicated accounting software credentials and tenant isolations.',
        migrationSteps: [
          'Configure Gmail trigger filtering for attachments with ".pdf" or ".png"',
          'Add the AI Multimodal Vision node with JSON output schema',
          'Map extracted line items to Google Sheets "Append Row" node',
          'Trigger payment reconciliation webhook to your accounting tool',
        ],
        faqs: [
          {
            q: 'Does it support handwritten receipts or blurred images?',
            a: 'Yes, GPT-4o Vision has industry-leading visual comprehension and can decipher handwritten totals and low-resolution receipts accurately.',
          },
          {
            q: 'Can it process multi-page PDF documents?',
            a: 'Yes, the node automatically splits PDF pages, evaluates table continuation, and compiles a single consolidated JSON record.',
          },
        ],
      },
    },
    {
      id: 'self-healing-workflows',
      title: 'Building Self-Healing Workflows with AI Retry Logic',
      category: 'AI Infrastructure',
      categorySlug: 'self-healing-workflows',
      icon: GroqLogo,
      readTime: '5 min read',
      lastUpdated: '09.02.2025',
      summary:
        'Leverage AI error-handling nodes to automatically diagnose API failures, repair broken payloads with corrected payloads, and alert developers with root-cause analysis.',
      content: {
        intro:
          'When third-party APIs change schemas or return 4xx/5xx errors, traditional workflows fail silently. Self-healing workflows use AI to inspect error responses, patch payloads, and re-execute safely.',
        features: [
          'Automated error diagnosis: AI analyzes stack traces and API error responses',
          'Dynamic payload self-correction for missing or malformed fields',
          'Configurable circuit breakers to prevent runaway billing on external APIs',
          'Slack/Discord developer incident dispatches with root cause analysis',
        ],
        dashboardInfo:
          'Turn on "Enable AI Self-Healing Fallback" on any canvas node to automatically route execution failures to diagnostic AI nodes.',
        approvalTime:
          'Error analysis and recovery payload generation execute in under 350ms via high-throughput Groq Llama endpoints.',
        proTip:
          'Use the Dead-Letter Queue viewer in the Workflow Mitra execution log to inspect AI-repaired runs alongside original failed payloads.',
        appLinkText: 'Explore Self-Healing Workflows',
        appLinkUrl: 'https://app.workflowmitra.com/',
        phoneAccess:
          'Receive instant incident resolution summaries and post-mortem logs directly to your phone via Telegram or Slack.',
        multipleAccounts:
          'Configure separate error dispatch channels per workspace environment (staging vs production).',
        migrationSteps: [
          'Enable "Catch Errors" on any critical third-party API node',
          'Route the error output branch to the AI Diagnostic Inspector node',
          'Let AI mutate the request payload according to the API error message',
          'Retry the target node with the corrected payload',
        ],
        faqs: [
          {
            q: 'Will AI retry dangerous actions like charging a credit card twice?',
            a: 'No! You configure idempotency keys and safe-retry policies so payment and destructive endpoints require human approval.',
          },
          {
            q: 'Can I see the exact modifications AI made to the failed payload?',
            a: 'Yes, the execution log displays a clear diff view showing original input, API error message, and AI-corrected payload.',
          },
        ],
      },
    },
  ]

  const handleOpenArticle = (art) => {
    setSelectedArticle(art)
    setFeedbackGiven(false)
  }

  const handleCloseArticle = () => {
    setSelectedArticle(null)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 space-y-8"
      style={{ maxWidth: '1024px', margin: '0 auto', padding: '64px 20px', display: 'flex', flexDirection: 'column', gap: '32px' }}
    >
      {/* SECTION HEADER: WORKFLOW MITRA FAQ GUIDE */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.025em', color: '#09090b', margin: '0 0 10px' }}>
          Workflow Mitra FAQ Guide
        </h2>
        <p style={{ fontSize: '15px', color: '#71717a', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
          Essential guides for configuring AI Agents, GPT-4o prompt nodes, webhook lead pipelines, and self-healing automations.
        </p>
      </div>

      {/* 4 ARTICLE CARDS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {articles.map((art, index) => {
          const IconComp = art.icon
          return (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              onClick={() => handleOpenArticle(art)}
              style={{
                borderRadius: '24px',
                border: '2px solid #e4e4e7',
                background: '#ffffff',
                padding: '28px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              className="wm-guide-card-exact"
            >
              <div>
                {/* Card Top: Category Pill + Icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      borderRadius: '9999px',
                      border: '1px solid #d4d4d8',
                      background: 'transparent',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#27272a',
                    }}
                  >
                    {art.category}
                  </span>

                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '14px',
                      background: '#f4f4f5',
                      border: '1px solid #e4e4e7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                    }}
                  >
                    <IconComp style={{ width: '24px', height: '24px' }} />
                  </div>
                </div>

                {/* Card Title */}
                <h3
                  style={{
                    fontSize: '19px',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.35,
                    color: '#09090b',
                    margin: '0 0 10px',
                  }}
                >
                  {art.title}
                </h3>

                {/* Card Summary */}
                <p
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 1.6,
                    color: '#71717a',
                    margin: 0,
                    fontWeight: 400,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {art.summary}
                </p>
              </div>

              {/* Card Bottom: Read Time & Read Guide Link */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '18px',
                  marginTop: '22px',
                  borderTop: '1px solid #f4f4f5',
                  fontSize: '12px',
                  color: '#71717a',
                  fontWeight: 500,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} />
                    {art.readTime}
                  </span>
                  <span>•</span>
                  <span>Updated {art.lastUpdated}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 800, color: '#09090b' }}>
                  <span>Read Guide</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ARTICLE READER MODAL WITH CLEAN BREADCRUMB */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="wm-modal-overlay" onClick={handleCloseArticle}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="wm-modal-card"
              style={{ maxWidth: '800px', maxHeight: '88vh', overflowY: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseArticle}
                className="wm-modal-close-btn"
                title="Close"
              >
                <X size={18} />
              </button>

              {/* Breadcrumb */}
              <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#71717a', marginBottom: '16px', fontWeight: 500 }}>
                <a href="/" style={{ color: '#71717a', textDecoration: 'none' }}>Home</a>
                <ChevronRight size={12} />
                <span style={{ fontWeight: 700, color: '#09090b' }}>{selectedArticle.title}</span>
              </nav>

              {/* Title & Metadata */}
              <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#09090b', margin: '0 0 14px', lineHeight: 1.25 }}>
                {selectedArticle.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#71717a', paddingBottom: '18px', borderBottom: '1px solid #e4e4e7', marginBottom: '24px', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} />
                  {selectedArticle.readTime}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} />
                  Last updated: {selectedArticle.lastUpdated}
                </span>
                <span>•</span>
                <span style={{ fontWeight: 700, color: '#09090b' }}>{selectedArticle.category}</span>
              </div>

              {/* Content Body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', fontSize: '14.5px', lineHeight: '1.7', color: '#3f3f46' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#09090b', margin: 0 }}>
                  What is {selectedArticle.category}?
                </h3>
                <p style={{ margin: 0 }}>{selectedArticle.content.intro}</p>

                {/* Key Capabilities Box */}
                <div style={{ borderRadius: '16px', background: '#f4f4f5', border: '1px solid #e4e4e7', padding: '20px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#09090b', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={15} color="#f59e0b" />
                    Key Platform Capabilities:
                  </h4>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedArticle.content.features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px' }}>
                        <CheckCircle2 size={16} color="#09090b" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p style={{ margin: 0 }}>{selectedArticle.content.dashboardInfo}</p>

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#09090b', margin: 0 }}>
                  How long does AI execution take?
                </h3>
                <p style={{ margin: 0 }}>{selectedArticle.content.approvalTime}</p>

                {/* Pro Tip Box */}
                <div style={{ borderRadius: '14px', background: '#fffbeb', border: '1px solid #fde68a', padding: '16px', fontSize: '13.5px', color: '#92400e', fontWeight: 500 }}>
                  <strong>Pro Tip: </strong>
                  {selectedArticle.content.proTip}
                </div>

                {/* Direct App Link */}
                <div>
                  <a
                    href={selectedArticle.content.appLinkUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 800, color: '#09090b', textDecoration: 'underline' }}
                  >
                    <span>{selectedArticle.content.appLinkText}</span>
                    <ExternalLink size={15} />
                  </a>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#09090b', margin: 0 }}>
                  Can I monitor AI execution on mobile?
                </h3>
                <p style={{ margin: 0 }}>{selectedArticle.content.phoneAccess}</p>

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#09090b', margin: 0 }}>
                  Can I operate multiple API keys & sub-teams?
                </h3>
                <p style={{ margin: 0 }}>{selectedArticle.content.multipleAccounts}</p>

                {/* Step by Step Flow */}
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#09090b', margin: 0 }}>
                  Step-by-Step Configuration Flow:
                </h3>
                <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedArticle.content.migrationSteps.map((step, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '13.5px', fontFamily: 'monospace' }}>
                      <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#09090b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>
                        {idx + 1}
                      </span>
                      <span style={{ marginTop: '2px' }}>{step}</span>
                    </li>
                  ))}
                </ol>

                {/* Article Specific FAQs */}
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#09090b', margin: '8px 0 0' }}>
                  Frequently Asked Questions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedArticle.content.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      style={{ borderRadius: '14px', border: '1px solid #e4e4e7', background: '#ffffff', padding: '16px' }}
                    >
                      <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#09090b', margin: 0 }}>
                        {faq.q}
                      </h4>
                      <p style={{ fontSize: '13px', color: '#71717a', margin: '6px 0 0' }}>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Call to Action Banner Box */}
                <div style={{ marginTop: '16px', borderRadius: '24px', background: '#09090b', color: '#ffffff', padding: '32px 24px', textAlign: 'center', boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15)' }}>
                  <Sparkles size={28} color="#ffffff" style={{ margin: '0 auto 8px' }} />
                  <h3 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 8px' }}>
                    Ready to Build Autonomous AI Workflows?
                  </h3>
                  <p style={{ fontSize: '13px', color: '#a1a1aa', maxWidth: '440px', margin: '0 auto 20px' }}>
                    Get started with Workflow Mitra visual AI nodes today and automate your complex business processes.
                  </p>
                  <a
                    href="https://app.workflowmitra.com/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '16px', background: '#ffffff', color: '#09090b', fontSize: '13px', fontWeight: 900, textDecoration: 'none', boxShadow: '0 4px 16px rgba(255, 255, 255, 0.2)' }}
                  >
                    <span>Start Building Now</span>
                    <ArrowRight size={15} />
                  </a>
                </div>

                {/* Was this article helpful? Widget */}
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', border: '1px solid #e4e4e7', background: '#f4f4f5', padding: '24px', textAlign: 'center' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#09090b', margin: 0 }}>
                    Was this article helpful?
                  </h4>

                  {feedbackGiven ? (
                    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#059669' }}>
                      <Sparkles size={16} />
                      <span>Thank you for your feedback! 🎉</span>
                    </div>
                  ) : (
                    <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setFeedbackGiven(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '12px', border: '1px solid #d4d4d8', background: '#ffffff', fontSize: '12px', fontWeight: 700, color: '#09090b', cursor: 'pointer' }}
                      >
                        <ThumbsUp size={14} />
                        <span>Yes</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFeedbackGiven(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '12px', border: '1px solid #d4d4d8', background: '#ffffff', fontSize: '12px', fontWeight: 700, color: '#09090b', cursor: 'pointer' }}
                      >
                        <ThumbsDown size={14} />
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
    </motion.section>
  )
}
