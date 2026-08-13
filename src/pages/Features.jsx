import { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  GitBranch, Globe, Clock, Bot, Wand2, History,
  MessagesSquare, Database, LogIn, SlidersHorizontal, Filter, Bell,
  RefreshCw, CheckCircle, ShieldCheck, Lock, Boxes,
} from 'lucide-react'
import PageSeo from '../components/PageSeo'
import NodeChain from '../components/NodeChain'
import FlowCanvas from '../components/FlowCanvas'
import DeferredHomeSection from '../components/DeferredHomeSection'
import FlowMitraLogo from '../components/FlowMitraLogo'
import { DocsNodeIcon, nodeDiscBg } from '../components/docs/icons/docsNodeIcons'
import { MODELS, MODEL_PROVIDERS } from '../data/aiSectionData'
import { useCanvasStep } from '../utils/useCanvasStep'
import '../styles/CanvasPanel.css'
import './Features.css'

const AgentsShowcase = lazy(() => import('../components/AgentsShowcase'))

const HERO_NODES = {
  n1: { type: 'webhook-trigger', label: 'New Lead' },
  n2: { type: 'ai', label: 'Classify' },
  n3: { type: 'if', label: 'Qualified?' },
  n4: { type: 'slack', label: 'Notify Sales' },
  n5: { type: 'whatsapp', label: 'Follow Up' },
}
const HERO_TAGS = { n4: 'Yes', n5: 'No' }
const HERO_PAYLOADS = ['{ company: "Acme" }', 'score: 0.92', 'qualified → Slack', 'not yet → WhatsApp']

const OVERVIEW_GROUPS = [
  { title: 'Build', items: [
    { label: 'Visual workflow builder', href: '#builder' },
    { label: 'Triggers & actions', href: '#triggers-actions' },
    { label: 'Conditions & logic', href: '#conditions-logic' },
  ] },
  { title: 'Connect', items: [
    { label: 'Integrations', href: '#integrations' },
    { label: 'Webhooks & HTTP/API', href: '#webhooks-apis' },
  ] },
  { title: 'Automate', items: [
    { label: 'Scheduling', href: '#scheduling' },
    { label: 'Execution & monitoring', href: '#execution' },
    { label: 'Data processing', href: '#data-processing' },
  ] },
  { title: 'Accelerate', items: [
    { label: 'AI automation', href: '#ai-automation' },
    { label: 'Templates', href: '#templates' },
    { label: 'Expert help', href: '#expert-help' },
  ] },
]

const TRIGGER_ACTION_EXAMPLES = [
  { trigger: 'webhook-trigger', triggerLabel: 'Webhook received', action: 'app-request', actionLabel: 'Process the data' },
  { trigger: 'google-sheets', triggerLabel: 'New row in a sheet', action: 'slack', actionLabel: 'Notify your team' },
  { trigger: 'schedule', triggerLabel: 'Scheduled time', action: 'google-sheets', actionLabel: 'Run a report' },
  { trigger: 'shopify', triggerLabel: 'Order placed', action: 'whatsapp', actionLabel: 'Send a confirmation' },
]

const INTEGRATION_LOGOS = ['whatsapp', 'slack', 'telegram', 'gmail', 'google-sheets', 'shopify', 'http-request', 'ai-agent']
const INTEGRATION_LABELS = { whatsapp: 'WhatsApp', slack: 'Slack', telegram: 'Telegram', gmail: 'Gmail', 'google-sheets': 'Google Sheets', shopify: 'Shopify', 'http-request': 'HTTP Request', 'ai-agent': 'AI Agent' }

const DIALABLE_PROVIDER_KEYS = ['openai', 'anthropic', 'gemini', 'groq', 'ollama']
const AI_CAPABILITIES = [
  { icon: Bot, title: 'Multiple providers', desc: 'Call OpenAI, Claude, Gemini, Groq, or a self-hosted Ollama model — including open models like Llama, Mistral, DeepSeek and Qwen served through them.' },
  { icon: Wand2, title: 'AI Agent with tools', desc: 'An AI Agent node can use the other steps in your workflow as tools, scoped to only the fields you allow it to fill in.' },
  { icon: History, title: 'Memory', desc: 'Give an agent memory so it keeps context across a conversation instead of starting fresh every message.' },
  { icon: MessagesSquare, title: 'Chatbots on the canvas', desc: 'Build a WhatsApp or chat-based AI assistant on the same trigger → action → logic canvas as everything else — no separate wizard.' },
]

const DATA_PIPELINE = [
  { icon: LogIn, label: 'Input' },
  { icon: SlidersHorizontal, label: 'Transform' },
  { icon: Filter, label: 'Filter' },
  { icon: GitBranch, label: 'Route' },
  { icon: Database, label: 'Store' },
  { icon: Bell, label: 'Notify' },
]

const EXECUTION_STEPS = [
  { label: 'Webhook received', status: 'done' },
  { label: 'Update CRM', status: 'done' },
  { label: 'Send Slack message', status: 'retry' },
  { label: 'Send WhatsApp follow-up', status: 'done' },
]

const RELIABILITY_ITEMS = [
  { icon: RefreshCw, title: 'Automatic retry', desc: 'If a step fails from something temporary, WorkflowMitra retries it with backoff before giving up.' },
  { icon: GitBranch, title: 'Error branch', desc: "Route a failure down its own path instead of stopping the whole workflow." },
  { icon: History, title: 'Replay', desc: 'Re-run a failed execution from its original input once the problem is fixed.' },
  { icon: ShieldCheck, title: 'Crash-safe recovery', desc: 'If a worker restarts mid-run, the execution recovers automatically — nothing is silently lost.' },
]

const SECURITY_ITEMS = [
  { icon: Lock, title: 'Encrypted credentials', desc: 'API keys, AI provider keys and webhook secrets are encrypted at rest (AES-256-GCM), not stored in plain text.' },
  { icon: ShieldCheck, title: 'Never exposed', desc: 'Secrets are decrypted only in memory at execution time and are never returned by the API.' },
  { icon: Boxes, title: 'Workspace isolation', desc: "One workspace's workflows, credentials and data are never visible to another." },
]

const VALUE_CHIPS = ['Visual builder', 'Integrations', 'Logic', 'Scheduling', 'AI', 'Templates', 'Expert help']

const FAQ_ITEMS = [
  { q: 'What is WorkflowMitra?', a: 'A no-code workflow automation platform. You connect triggers, actions, logic, integrations and AI on a visual canvas — and our automation experts can help if you get stuck.' },
  { q: 'What can I automate with WorkflowMitra?', a: 'Anything you can describe as an event and a set of steps — lead handling, order processing, support ticket routing, scheduled reports, and multi-app data syncing.' },
  { q: 'Is WorkflowMitra suitable for non-technical users?', a: 'Yes. The visual builder needs no coding to get started. Conditions, HTTP/API access and AI are there for advanced workflows when you need them.' },
  { q: 'Does WorkflowMitra support AI automation?', a: 'Yes. The AI Agent node can call OpenAI, Claude, Gemini, Groq or a self-hosted Ollama model, use other workflow steps as tools, and you can build full chat-based assistants on the canvas.' },
  { q: 'Can I connect my existing apps?', a: 'Yes — native integrations today include WhatsApp, Slack, Telegram, Gmail, Google Sheets and Shopify, with HTTP/API requests to reach anything else that has an API.' },
  { q: 'Does WorkflowMitra support webhooks and APIs?', a: 'Yes. Webhook triggers start a workflow from an external event, and the HTTP/API action node can call any API, with timeouts, retries and OAuth2 support.' },
  { q: 'Can I schedule workflows?', a: 'Yes. Run a workflow on a recurring schedule, or trigger it from polling sources like Gmail, RSS or a spreadsheet.' },
  { q: 'Can I start from templates?', a: "Yes. Templates give you a working workflow to customize instead of starting from a blank canvas — browse them on the Templates page." },
  { q: 'Can WorkflowMitra experts help me build workflows?', a: 'Yes. Tell us what you want to automate and our automation experts can help you design and build it.' },
]

function BranchIcon({ type, size = 22 }) {
  return (
    <span className="ft-branch-disc" style={{ background: nodeDiscBg(type) }}>
      <DocsNodeIcon type={type} size={Math.round(size * 0.5)} mono />
    </span>
  )
}

function Features() {
  const heroStep = useCanvasStep(5, 1400, 2)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="ft-page">
      <PageSeo
        title="Workflow Automation Features | WorkflowMitra"
        description="Explore WorkflowMitra features for visual workflow automation, integrations, AI-powered workflows, scheduling, webhooks, templates and more."
        path="/features"
      />

      {/* 1 — Hero */}
      <section className="ft-hero" id="hero">
        <div className="container">
          <p className="ft-eyebrow">Product</p>
          <h1 className="ft-hero-title">Powerful automation. Without the complexity.</h1>
          <p className="ft-hero-subtitle">
            Build visual workflows, connect your tools, and automate repetitive work — with conditions, APIs and AI when you need them.
          </p>
          <div className="ft-hero-cta">
            <a href="https://app.workflowmitra.com/signup" className="btn btn-primary btn-large">
              Start Building Free
            </a>
            <Link to="/automation-help" className="btn btn-secondary btn-large">
              Get Help Building My Workflow
            </Link>
          </div>

          <div className="ft-hero-visual">
            <div className="canvas-panel">
              <div className="browser-bar">
                <span className="browser-dot" style={{ background: '#ff5f57' }} />
                <span className="browser-dot" style={{ background: '#febc2e' }} />
                <span className="browser-dot" style={{ background: '#28c840' }} />
                <span className="browser-url">app.workflowmitra.com/workflows/lead-routing</span>
                <span className="live-pill">running</span>
              </div>
              <div className="canvas-panel-body">
                <div className="canvas-panel-dotgrid" aria-hidden="true" />
                <FlowCanvas nodes={HERO_NODES} tags={HERO_TAGS} payloads={HERO_PAYLOADS} step={heroStep} />
              </div>
            </div>
            <div className="ft-float-chip ft-float-chip-a"><RefreshCw size={14} strokeWidth={2.2} aria-hidden="true" />Retries automatically</div>
            <div className="ft-float-chip ft-float-chip-b"><Bot size={14} strokeWidth={2.2} aria-hidden="true" />5 AI providers</div>
          </div>
        </div>
      </section>

      {/* 2 — Feature Overview */}
      <section className="ft-overview-section" id="overview">
        <div className="container">
          <div className="ft-overview-grid">
            {OVERVIEW_GROUPS.map((g) => (
              <div className="ft-overview-group" key={g.title}>
                <h2>{g.title}</h2>
                <ul>
                  {g.items.map((item) => (
                    <li key={item.label}><a href={item.href}>{item.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Visual Workflow Builder */}
      <section className="ft-section-header-wrap" id="builder">
        <div className="container">
          <div className="ft-section-header">
            <h2 className="ft-section-title">Build workflows visually</h2>
            <p className="ft-section-subtitle">Connect triggers, actions and logic on a visual canvas instead of writing everything from scratch. Drag in a step, wire it up, and watch it run.</p>
          </div>
        </div>
      </section>
      <DeferredHomeSection minHeight={600}>
        <Suspense fallback={null}>
          <AgentsShowcase />
        </Suspense>
      </DeferredHomeSection>

      {/* 4 — Triggers & Actions */}
      <section className="ft-triggers-section" id="triggers-actions">
        <div className="container">
          <div className="ft-section-header">
            <h2 className="ft-section-title">Start with an event. Automate what happens next.</h2>
            <p className="ft-section-subtitle">Every workflow is a trigger, followed by the actions you want it to take.</p>
          </div>
          <div className="ft-trigger-grid">
            {TRIGGER_ACTION_EXAMPLES.map((ex) => (
              <div className="ft-trigger-row" key={ex.triggerLabel}>
                <div className="ft-trigger-cell">
                  <BranchIcon type={ex.trigger} />
                  <span>{ex.triggerLabel}</span>
                </div>
                <span className="ft-trigger-arrow" aria-hidden="true">→</span>
                <div className="ft-trigger-cell">
                  <BranchIcon type={ex.action} />
                  <span>{ex.actionLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Conditions & Logic */}
      <section className="ft-logic-section" id="conditions-logic">
        <div className="container">
          <div className="ft-section-header">
            <h2 className="ft-section-title">Handle real business logic</h2>
            <p className="ft-section-subtitle">Branch into as many routes as you need, each with its own AND/OR rules — not just a single yes/no.</p>
          </div>
          <div className="ft-branch-diagram">
            <div className="ft-branch-node">
              <BranchIcon type="webhook-trigger" size={32} />
              <span>New Lead</span>
            </div>
            <span className="ft-branch-connector" aria-hidden="true" />
            <div className="ft-branch-node">
              <BranchIcon type="if" size={32} />
              <span>Qualified?</span>
            </div>
            <div className="ft-branch-fork">
              <div className="ft-branch-path">
                <span className="ft-branch-label ft-branch-label-yes">Yes</span>
                <div className="ft-branch-node">
                  <BranchIcon type="slack" />
                  <span>Notify Sales</span>
                </div>
              </div>
              <div className="ft-branch-path">
                <span className="ft-branch-label ft-branch-label-no">No</span>
                <div className="ft-branch-node">
                  <BranchIcon type="assign" />
                  <span>Add to Nurture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Integrations */}
      <section className="ft-integrations-section" id="integrations">
        <div className="container">
          <div className="ft-section-header">
            <h2 className="ft-section-title">Connect the tools your business already uses.</h2>
            <p className="ft-section-subtitle">8 native integrations today, with HTTP/API requests to reach almost anything else.</p>
          </div>
          <div className="ft-integrations-grid">
            {INTEGRATION_LOGOS.map((type) => (
              <div className="ft-integration-tile" key={type}>
                <BranchIcon type={type} size={32} />
                <span>{INTEGRATION_LABELS[type]}</span>
              </div>
            ))}
          </div>
          <div className="ft-integrations-cta">
            <Link to="/integrations" className="btn btn-secondary">Explore Integrations →</Link>
          </div>
        </div>
      </section>

      {/* 7 — Webhooks & APIs */}
      <section className="ft-webhooks-section" id="webhooks-apis">
        <div className="container">
          <div className="ft-section-header">
            <h2 className="ft-section-title">Connect almost any system you need.</h2>
            <p className="ft-section-subtitle">Use webhooks and HTTP/API requests to connect WorkflowMitra with systems outside your native integrations.</p>
          </div>
          <div className="ft-webhook-flow">
            <div className="ft-webhook-step"><Globe size={20} strokeWidth={1.75} aria-hidden="true" /><span>External App</span></div>
            <span className="ft-webhook-arrow" aria-hidden="true">↓</span>
            <div className="ft-webhook-step"><BranchIcon type="webhook-trigger" /><span>Webhook</span></div>
            <span className="ft-webhook-arrow" aria-hidden="true">↓</span>
            <div className="ft-webhook-step ft-webhook-brand"><FlowMitraLogo size="sm" variant="icon" /><span>WorkflowMitra</span></div>
            <span className="ft-webhook-arrow" aria-hidden="true">↓</span>
            <div className="ft-webhook-step"><BranchIcon type="http-request" /><span>HTTP/API</span></div>
            <span className="ft-webhook-arrow" aria-hidden="true">↓</span>
            <div className="ft-webhook-step"><Globe size={20} strokeWidth={1.75} aria-hidden="true" /><span>Your System</span></div>
          </div>
        </div>
      </section>

      {/* 8 — Scheduling */}
      <section className="ft-scheduling-section" id="scheduling">
        <div className="container">
          <div className="ft-section-header">
            <h2 className="ft-section-title">Automate work on your schedule.</h2>
            <p className="ft-section-subtitle">Run a workflow daily, weekly, or on a custom recurrence — no one has to remember to click run.</p>
          </div>
          <div className="ft-schedule-flow">
            <div className="ft-schedule-step"><Clock size={20} strokeWidth={1.75} aria-hidden="true" /><span>09:00</span></div>
            <span className="ft-schedule-arrow" aria-hidden="true">→</span>
            <div className="ft-schedule-step"><span>Workflow starts</span></div>
            <span className="ft-schedule-arrow" aria-hidden="true">→</span>
            <div className="ft-schedule-step"><span>Process data</span></div>
            <span className="ft-schedule-arrow" aria-hidden="true">→</span>
            <div className="ft-schedule-step"><span>Send result</span></div>
          </div>
        </div>
      </section>

      {/* 9 — AI-powered Automation */}
      <section className="ft-ai-section" id="ai-automation">
        <div className="container">
          <div className="ft-section-header">
            <h2 className="ft-section-title">Powerful AI automation without the complexity.</h2>
            <p className="ft-section-subtitle">WorkflowMitra combines workflow automation with AI-powered steps — on the same canvas as everything else.</p>
          </div>
          <div className="ft-ai-providers">
            {MODELS.filter((m) => DIALABLE_PROVIDER_KEYS.includes(m.key)).map((m) => (
              <span className="ft-ai-provider" key={m.key} title={m.key}>
                <m.Icon size={28} />
              </span>
            ))}
          </div>
          <p className="ft-ai-providers-caption">{MODEL_PROVIDERS.join(' · ')} — plus open models served through them.</p>
          <div className="ft-ai-grid">
            {AI_CAPABILITIES.map((c) => (
              <div className="ft-ai-card" key={c.title}>
                <span className="ft-ai-icon" aria-hidden="true"><c.icon size={22} strokeWidth={1.75} /></span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Data Processing */}
      <section className="ft-data-section" id="data-processing">
        <div className="container">
          <div className="ft-section-header">
            <h2 className="ft-section-title">Move data where it needs to go.</h2>
            <p className="ft-section-subtitle">Reshape, filter and route data mid-workflow, or store it in a built-in data store — no external database required.</p>
          </div>
          <div className="ft-pipeline">
            {DATA_PIPELINE.map((step, i) => (
              <div className="ft-pipeline-item" key={step.label}>
                <div className="ft-pipeline-icon"><step.icon size={20} strokeWidth={1.75} aria-hidden="true" /></div>
                <span>{step.label}</span>
                {i < DATA_PIPELINE.length - 1 && <span className="ft-pipeline-arrow" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — Templates */}
      <section className="ft-templates-section" id="templates">
        <div className="container">
          <div className="ft-templates-inner">
            <div className="ft-templates-text">
              <h2 className="ft-section-title">Start with a workflow instead of a blank canvas.</h2>
              <p className="ft-section-subtitle">Don't build everything from scratch. Start from a workflow that already matches your use case and customize it.</p>
              <Link to="/templates" className="btn btn-secondary">Explore Templates →</Link>
            </div>
            <div className="ft-templates-example">
              <span className="ft-templates-example-label">Example</span>
              <NodeChain nodes={['webhook-trigger', 'hubspot', 'whatsapp']} size={40} gap={20} />
            </div>
          </div>
        </div>
      </section>

      {/* 12 — Workflow Execution & Monitoring */}
      <section className="ft-execution-section" id="execution">
        <div className="container">
          <div className="ft-section-header">
            <h2 className="ft-section-title">What happens after you turn it on?</h2>
            <p className="ft-section-subtitle">Every run is recorded step by step, so you always know what happened.</p>
          </div>
          <div className="ft-execution-card">
            {EXECUTION_STEPS.map((s) => (
              <div className="ft-execution-row" key={s.label}>
                {s.status === 'retry'
                  ? <RefreshCw size={16} strokeWidth={2} className="ft-execution-icon-retry" aria-hidden="true" />
                  : <CheckCircle size={16} strokeWidth={2} className="ft-execution-icon-done" aria-hidden="true" />}
                <span>{s.label}</span>
                <span className="ft-execution-status">{s.status === 'retry' ? 'retrying' : 'success'}</span>
              </div>
            ))}
            <p className="ft-execution-footer">Every run is recorded — replay it anytime from its original input.</p>
          </div>
        </div>
      </section>

      {/* 13 — Reliability / Error Handling */}
      <section className="ft-reliability-section" id="reliability">
        <div className="container">
          <div className="ft-section-header">
            <h2 className="ft-section-title">Built to keep running when things go wrong.</h2>
          </div>
          <div className="ft-reliability-grid">
            {RELIABILITY_ITEMS.map((r) => (
              <div className="ft-reliability-card" key={r.title}>
                <span className="ft-reliability-icon" aria-hidden="true"><r.icon size={20} strokeWidth={1.75} /></span>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14 — Security / Credentials */}
      <section className="ft-security-section" id="security">
        <div className="container">
          <div className="ft-section-header">
            <h2 className="ft-section-title">Your credentials, encrypted.</h2>
          </div>
          <div className="ft-security-grid">
            {SECURITY_ITEMS.map((s) => (
              <div className="ft-security-card" key={s.title}>
                <span className="ft-security-icon" aria-hidden="true"><s.icon size={20} strokeWidth={1.75} /></span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15 — Expert Support */}
      <section className="ft-expert-section" id="expert-help">
        <div className="container">
          <div className="ft-expert-inner">
            <h2 className="ft-section-title">Powerful enough for advanced workflows. Supported when you need help.</h2>
            <p className="ft-section-subtitle">Build it yourself, or get help from WorkflowMitra automation experts.</p>
            <Link to="/automation-help" className="btn btn-primary btn-large">Get Help Building My Workflow</Link>
          </div>
        </div>
      </section>

      {/* 16 — Feature Comparison / Value */}
      <section className="ft-value-section" id="value">
        <div className="container">
          <div className="ft-section-header">
            <h2 className="ft-section-title">One platform for your automation workflow.</h2>
          </div>
          <div className="ft-value-chips">
            {VALUE_CHIPS.map((c, i) => (
              <span key={c} className="ft-value-chip-group">
                <span className="ft-value-chip">{c}</span>
                {i < VALUE_CHIPS.length - 1 && <span className="ft-value-plus" aria-hidden="true">+</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 17 — FAQ */}
      <section className="ft-faq-section" id="faq" itemScope itemType="https://schema.org/FAQPage">
        <div className="container">
          <div className="ft-section-header">
            <h2 className="ft-section-title">Frequently asked questions</h2>
          </div>
          <div className="ft-faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <div
                className={`ft-faq-item ${openFaq === i ? 'open' : ''}`}
                key={item.q}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  className="ft-faq-trigger"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span itemProp="name">{item.q}</span>
                  <span className="ft-faq-chevron" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div
                  className="ft-faq-answer"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                  role="region"
                  hidden={openFaq !== i}
                >
                  <p itemProp="text">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 18 — Final CTA */}
      <section className="ft-cta-section" id="final-cta">
        <div className="container">
          <div className="ft-cta-content">
            <h2>Start simple. Automate more.</h2>
            <p>Build your first workflow today, or let our automation experts help you get started.</p>
            <div className="ft-cta-actions">
              <a href="https://app.workflowmitra.com/signup" className="btn btn-primary btn-large">
                Start Building Free
              </a>
              <Link to="/automation-help" className="btn btn-secondary btn-large">
                Get Help Building My Workflow
              </Link>
            </div>
            <p className="ft-cta-links">
              See <Link to="/pricing">pricing</Link>, browse <Link to="/templates">templates</Link>, or explore <Link to="/integrations">integrations</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features
