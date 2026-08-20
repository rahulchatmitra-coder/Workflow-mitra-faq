import { lazy, Suspense, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HeroAnimated from '../components/HeroAnimated'
import NodeChain from '../components/NodeChain'
import DeferredHomeSection from '../components/DeferredHomeSection'
import PageSeo from '../components/PageSeo'
import { Sparkles, ArrowRight, CheckCircle2, Zap, Users, CreditCard, Layers, Bot, Play, XCircle, Clock, AlertCircle, ChevronRight, ChevronDown, TrendingUp, Headphones, ShoppingBag, MousePointerClick, Coins, Cpu, Network, HelpCircle, MessageCircle } from 'lucide-react'
import { SiZapier, SiMake, SiN8N } from 'react-icons/si'
import './Home.css'

const AgentsShowcase = lazy(() => import('../components/AgentsShowcase'))
const IntegrationsShowcase = lazy(() => import('../components/IntegrationsShowcase'))
const AIAgentsFeatureSection = lazy(() => import('../components/AIAgentsFeatureSection'))
const OnboardingSection = lazy(() => import('../credentials-portal/OnboardingSection'))

const TEMPLATES = [
  {
    id: 6,
    category: 'Lead capture',
    title: 'Lead → WhatsApp in 5 seconds',
    description: 'A form submission is categorised by AI, saved to HubSpot, answered on WhatsApp, then handed to the next salesperson in the rota.',
    chain: ['webhook-trigger', 'ai', 'hubspot', 'whatsapp'],
    steps: 5,
  },
  {
    id: 2,
    category: 'E-commerce',
    title: 'Paid order → invoice → WhatsApp',
    description: 'A paid Shopify order raises a Zoho Books invoice, confirms on WhatsApp, books the shipment and logs the order to a sheet.',
    chain: ['shopify', 'zoho', 'whatsapp', 'google-sheets'],
    steps: 5,
  },
  {
    id: 4,
    category: 'AI',
    title: 'AI drafts, you approve',
    description: 'Incoming support emails are read by an AI, a drafted response is generated, and a notification is sent to Slack with an Approve button.',
    chain: ['email', 'ai', 'slack', 'gmail'],
    steps: 4,
  },
  {
    id: 1,
    category: 'Lead capture',
    title: 'Facebook Ads → CRM + SMS',
    description: 'New leads from Facebook Lead Ads are validated, added to your CRM, and sent a personalised welcome SMS within 60 seconds.',
    chain: ['facebook', 'hubspot', 'sms'],
    steps: 3,
  },
  {
    id: 3,
    category: 'E-commerce',
    title: 'Abandoned cart recovery',
    description: 'When a cart is abandoned for 1 hour, check if the customer has purchased before, then send a personalised WhatsApp message with a dynamic discount code.',
    chain: ['shopify', 'condition', 'whatsapp'],
    steps: 4,
  },
  {
    id: 5,
    category: 'Internal ops',
    title: 'Google Sheets to database sync',
    description: 'Every night, read new rows from a shared Google Sheet, validate the data, transform formats, and upsert into PostgreSQL.',
    chain: ['schedule', 'google-sheets', 'database'],
    steps: 3,
  },
]

const HOW_STEPS = [
  { num: '1', title: 'Choose what starts your workflow', desc: 'Pick a trigger — a form submission, a new order, a scheduled time, or a webhook from any app.' },
  { num: '2', title: 'Add the actions you need', desc: 'Tell WorkflowMitra what to do: send a message, update a record, call an API, run an AI step, or add conditions.' },
  { num: '3', title: 'Connect your apps', desc: 'Link the tools your business already uses — CRM, messaging, spreadsheets, payment gateways, and more.' },
  { num: '4', title: 'Test before you go live', desc: 'Run the workflow once to verify every step works. Fix anything before it handles real data.' },
  { num: '5', title: 'Turn it on and walk away', desc: 'The workflow runs automatically whenever the trigger fires. You get back the hours you used to spend on repetitive work.' },
]

const BEFORE_STEPS = [
  { step: '01', title: 'Lead arrives via website form', desc: 'Sits unread in employee inbox for hours waiting for manual review.', tag: 'Manual Delay' },
  { step: '02', title: 'Employee manually opens email', desc: 'Copy-pastes customer name, phone & email into a spreadsheet.', tag: 'Manual Entry' },
  { step: '03', title: 'Logs into CRM & creates contact', desc: 'Risk of typos, duplicate records, and forgotten notes.', tag: 'Typo Risk' },
  { step: '04', title: 'Pings sales team on Slack / WhatsApp', desc: 'Waits for someone on the team to manually claim the lead.', tag: 'Team Bottleneck' },
  { step: '05', title: 'Drafts manual follow-up reminder', desc: 'Sets calendar reminders manually or forgets to follow up.', tag: 'Missed Follow-up' },
  { step: '06', title: 'Sends confirmation email / message', desc: 'Takes 15–45 minutes while the prospect has already moved on.', tag: 'Lost Lead' },
]

const AFTER_STEPS = [
  { step: '01', title: 'Instant Webhook Trigger', desc: 'Form submission triggers WorkflowMitra pipeline in under 0.2s.', tag: 'Instant Trigger' },
  { step: '02', title: 'Automated CRM & Contact Sync', desc: 'Instantly enriches, deduplicates, and logs contact in HubSpot CRM.', tag: '100% Accurate' },
  { step: '03', title: 'AI Scoring & Round-Robin Routing', desc: 'Claude AI scores lead urgency and assigns to next available rep.', tag: 'AI Qualified' },
  { step: '04', title: 'Instant WhatsApp Outreach', desc: 'Personalized WhatsApp welcome message & brochure sent instantly.', tag: '< 2s Response' },
  { step: '05', title: 'Team Slack Alert & Task Schedule', desc: 'Sales rep gets instant ping with prospect brief and next steps.', tag: '24/7 Autopilot' },
]

const CATEGORIES = ['All', 'Lead capture', 'E-commerce', 'AI', 'Customer support']

const STACKED_USE_CASES = [
  {
    id: 'growth-sales',
    category: 'Growth & Sales',
    badge: 'High-Velocity Pipeline',
    title: 'Lead Capture → Instant AI Qualification → CRM Sync',
    desc: 'Stop losing inbound leads to slow response times. When a new prospect fills a form, AI analyzes intent, categorizes budget, pushes data to HubSpot, and pings your SDR on Slack with a drafted reply.',
    link: '/solutions/sales',
    accent: '#059669',
    nodes: [
      { step: '01 Trigger', label: 'Lead Inbound', app: 'Facebook / Form' },
      { step: '02 AI Logic', label: 'Score & Qualify', app: 'Claude 3.5 Sonnet' },
      { step: '03 Sync CRM', label: 'Create Deal', app: 'HubSpot CRM' },
      { step: '04 Outreach', label: 'Instant Alert', app: 'WhatsApp & Slack' },
    ],
    stats: [
      { label: 'Response Time', value: '< 2.0s', highlight: true },
      { label: 'Pipeline Ops', value: '100% Autopilot' },
      { label: 'Conversion Lift', value: '+34%' },
    ],
  },
  {
    id: 'customer-support',
    category: 'Customer Support',
    badge: '24/7 Autonomous Triage',
    title: 'Autonomous Support Ticket Triage & SLA Escalation',
    desc: 'Parse incoming support tickets across email, WhatsApp, and chat. AI categorizes urgency, drafts verified replies from your knowledge base, and escalates complex issues directly to Slack channels.',
    link: '/solutions/support',
    accent: '#2563eb',
    nodes: [
      { step: '01 Trigger', label: 'New Ticket', app: 'Zendesk / Email' },
      { step: '02 AI Logic', label: 'Sentiment & Triage', app: 'Claude AI Engine' },
      { step: '03 KB Search', label: 'Documentation Match', app: 'Notion Database' },
      { step: '04 Action', label: 'Auto-Reply / Alert', app: 'Slack Escalation' },
    ],
    stats: [
      { label: 'First Response', value: 'Instant', highlight: true },
      { label: 'Resolution Rate', value: '72% Automated' },
      { label: 'Escalation Speed', value: '< 5s to Team' },
    ],
  },
  {
    id: 'ecommerce-ops',
    category: 'E-Commerce Ops',
    badge: 'Fulfillment Autopilot',
    title: 'Multi-Channel Order Routing & Inventory Sync',
    desc: 'Automate post-purchase fulfillment from order receipt to tracking delivery. Automatically generate GST invoices in Zoho Books, update Shopify inventory, and send personalized WhatsApp shipping updates.',
    link: '/solutions/operations',
    accent: '#7c3aed',
    nodes: [
      { step: '01 Trigger', label: 'New Order Paid', app: 'Shopify Store' },
      { step: '02 Finance', label: 'GST Invoice Generated', app: 'Zoho Books' },
      { step: '03 Inventory', label: 'Stock Decrement', app: 'PostgreSQL DB' },
      { step: '04 Customer', label: 'WhatsApp Tracking', app: 'WhatsApp Cloud API' },
    ],
    stats: [
      { label: 'Order Processing', value: 'Zero Touch', highlight: true },
      { label: 'Fulfillment Speed', value: 'Real-Time' },
      { label: 'Support Inquiries', value: '-65% Reduced' },
    ],
  },
  {
    id: 'sales-meetings',
    category: 'Sales & Meetings',
    badge: 'Deal Velocity',
    title: 'Meeting Booked → Research Dossier → Follow-Up Automation',
    desc: 'When a prospect schedules a demo on Cal.com, AI runs web research on their company, creates a customized briefing doc in Google Docs, and drafts personalized follow-up templates ready for the call.',
    link: '/solutions/sales',
    accent: '#0284c7',
    nodes: [
      { step: '01 Trigger', label: 'Demo Booked', app: 'Cal.com / Calendly' },
      { step: '02 Research', label: 'Company Deep-Dive', app: 'AI Web Agent' },
      { step: '03 CRM Deal', label: 'Stage Advance', app: 'Salesforce' },
      { step: '04 Calendar', label: 'Prep Briefing', app: 'Google Docs' },
    ],
    stats: [
      { label: 'Prep Time Saved', value: '25 Min / Call', highlight: true },
      { label: 'SDR Efficiency', value: '3x Capacity' },
      { label: 'Show-Up Rate', value: '94% Attended' },
    ],
  },
]

const USE_CASES = [
  { title: 'Lead Management', desc: 'Capture, qualify, and route leads to your sales team automatically.', link: '/solutions/marketing', icon: '📥' },
  { title: 'Sales Follow-up', desc: 'Never miss a follow-up. Automated reminders, messages, and CRM updates.', link: '/solutions/sales', icon: '🤝' },
  { title: 'Marketing Automation', desc: 'Trigger campaigns, segment audiences, and track engagement without manual work.', link: '/solutions/marketing', icon: '📣' },
  { title: 'Customer Support', desc: 'Route tickets, send acknowledgements, and escalate urgent issues automatically.', link: '/solutions/support', icon: '🎧' },
  { title: 'E-commerce Operations', desc: 'From order confirmation to shipping updates — automate the entire post-purchase flow.', link: '/solutions/operations', icon: '🛒' },
  { title: 'Business Operations', desc: 'Sync data between tools, generate reports, and keep your team aligned.', link: '/solutions/operations', icon: '⚙️' },
]

const COMPARISON_MATRIX = [
  {
    feature: 'Starter Price & Included Tasks',
    description: 'Entry-level price point and monthly execution volume',
    wm: '₹999 / mo (10,000 tasks)',
    wmBadge: 'Best Value',
    zapier: '$29.99 / mo (750 tasks)',
    make: '$9.00 / mo (1,000 ops)',
    n8n: '$20 / mo + Compute',
  },
  {
    feature: 'Cost for 10,000 Executions',
    description: 'What you actually pay when your business scales',
    wm: '₹999 / mo (Included)',
    wmBadge: 'Save ~80%',
    zapier: '₹12,000+ ($140+/mo)',
    make: '₹3,500+ ($40+/mo)',
    n8n: '₹2,500+ ($30+/mo)',
  },
  {
    feature: 'Autonomous AI (Claude & GPT-4o)',
    description: 'Native AI reasoning, content extraction, and triage nodes',
    wm: 'Built-in Native AI Nodes',
    wmGood: true,
    zapier: 'Expensive Add-on ($$$)',
    make: 'Manual HTTP API setup',
    n8n: 'Manual LangChain setup',
  },
  {
    feature: 'Setup & Learning Curve',
    description: 'Time needed to go from zero to live automated workflow',
    wm: '5 Mins (Visual & No-Code)',
    wmGood: true,
    zapier: 'Moderate',
    make: 'Steep router mazes',
    n8n: 'High (DevOps & code)',
  },
  {
    feature: '1-on-1 Human Automation Help',
    description: 'Real engineers to map, build, and debug workflows with you',
    wm: 'Included with Experts',
    wmGood: true,
    zapier: 'Community forum only',
    make: 'Hire expensive agency',
    n8n: 'Self-serve docs only',
  },
  {
    feature: 'Hosting, Maintenance & SLA',
    description: 'Server uptime, updates, auto-retries, and enterprise SLA',
    wm: '100% Managed (99.8% SLA)',
    wmGood: true,
    zapier: 'Cloud Managed',
    make: 'Cloud Managed',
    n8n: 'Self-Hosted Overhead',
  },
  {
    feature: 'Active Automated Workflows',
    description: 'Number of active workflows you can run simultaneously',
    wm: 'Unlimited Active Workflows',
    wmGood: true,
    zapier: 'Restricted on base tiers',
    make: 'Unlimited',
    n8n: 'Unlimited',
  },
]

const WHY_ITEMS = [
  {
    icon: 'easy',
    roleTag: 'For Founders & Ops',
    label: 'Easy & No-Code',
    desc: 'Visual drag-and-drop workflow building without writing a single line of code or script.',
    benefit: 'Live in under 5 minutes',
    accent: '#2563eb',
    bg: '#eff6ff',
  },
  {
    icon: 'affordable',
    roleTag: 'For CFOs & Scaling Teams',
    label: 'Transparent & Affordable',
    desc: '10,000 tasks for ₹999/mo with zero per-step penalties. Save up to 80% vs legacy tools.',
    benefit: 'Save up to 80% on costs',
    accent: '#059669',
    bg: '#ecfdf5',
  },
  {
    icon: 'expert',
    roleTag: 'For Growing Businesses',
    label: '1-on-1 Expert Help',
    desc: 'Real automation engineers audit, map, build, and troubleshoot custom workflows with you.',
    benefit: 'Zero guesswork or hiring',
    accent: '#d97706',
    bg: '#fffbeb',
  },
  {
    icon: 'powerful',
    roleTag: 'For High-Velocity Teams',
    label: 'Autonomous AI Agents',
    desc: 'Native Claude 3.5 & GPT-4o reasoning, condition branches, and automatic error retries.',
    benefit: 'AI reasoning built-in',
    accent: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    icon: 'flexible',
    roleTag: 'For Tech & Architects',
    label: 'Universal App Reach',
    desc: 'Connect 37+ SaaS tools or integrate any custom REST API via Webhooks and OAuth.',
    benefit: '37+ Apps & Webhooks',
    accent: '#0284c7',
    bg: '#f0f9ff',
  },
]

const FAQ_ITEMS = [
  {
    q: 'What is WorkflowMitra?',
    a: 'WorkflowMitra is a no-code workflow automation platform. It lets you connect your business apps, automate repetitive tasks, and build multi-step workflows — without writing code. If you need help, our automation experts can assist you.',
  },
  {
    q: 'Is WorkflowMitra suitable for non-technical users?',
    a: 'Yes. WorkflowMitra is designed for people who want automation but don\'t have a technical background. You choose a trigger, add actions, connect your apps, and turn the workflow on. No coding or scripting required.',
  },
  {
    q: 'What can I automate with WorkflowMitra?',
    a: 'Common automations include lead capture and follow-up, e-commerce order processing, customer support ticket routing, marketing campaigns, appointment scheduling, data syncing between tools, and AI-powered content workflows.',
  },
  {
    q: 'Is WorkflowMitra an alternative to Zapier?',
    a: 'Yes. WorkflowMitra offers multi-step workflow automation similar to Zapier, with a focus on simplicity, affordability, and expert support. If you find Zapier\'s per-task pricing expensive or its interface overwhelming, WorkflowMitra is worth trying.',
  },
  {
    q: 'Is WorkflowMitra an alternative to Make?',
    a: 'Yes. Like Make (formerly Integromat), WorkflowMitra provides visual workflow building with conditions, loops, and error handling. WorkflowMitra is designed to be easier to learn, and our automation experts are available if you need help.',
  },
  {
    q: 'Is WorkflowMitra an alternative to n8n?',
    a: 'Yes. WorkflowMitra provides a managed automation platform with a visual editor, similar to n8n. You get the power of a workflow engine without needing to self-host, manage infrastructure, or write code.',
  },
  {
    q: 'Can WorkflowMitra experts help me build a workflow?',
    a: 'Yes. Tell us what you want to automate, and our automation experts can help you understand the workflow, design the steps, and build it. This is one of WorkflowMitra\'s key differentiators — you don\'t have to figure everything out alone.',
  },
  {
    q: 'How much does WorkflowMitra cost?',
    a: 'WorkflowMitra starts at ₹999/month for the Starter plan, which includes 10,000 credits, unlimited active workflows, and up to 5 team seats. Higher plans are available as your needs grow. All plans include a free trial.',
  },
]

function Home() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')
  const [openFaq, setOpenFaq] = useState(null)
  const [activeUseCase, setActiveUseCase] = useState(0)

  return (
    <div className="home-page">
      <PageSeo
        title="WorkflowMitra — Workflow Automation Platform | No-Code AI Workflows"
        description="Build powerful workflow automations without code. Connect your apps, automate repetitive work, and get help from automation experts when you need it."
        path="/"
      />

      {/* 1 — Hero */}
      <HeroAnimated />

      {/* 2 — Trust / Positioning Strip (Ultra-Modern AI Automation Strip) */}
      <section className="wm-trust-section" aria-label="Key benefits">
        <div className="wm-trust-container">
          
          {/* Top Centered Headline */}
          <div className="wm-trust-header">
            <h2 className="wm-trust-headline">
              Built for people who want automation — not an automation degree.
            </h2>
          </div>

          {/* 4 Premium Value Cards Grid */}
          <div className="wm-trust-cards-grid">
            
            {/* Card 1: Easy to Use */}
            <div className="wm-trust-card wm-trust-card-orange">
              <div className="wm-trust-card-top">
                <div className="wm-trust-icon-disc disc-orange">
                  <Sparkles size={18} />
                </div>
                <span className="wm-trust-card-pill pill-orange">Visual Canvas</span>
              </div>
              <h3 className="wm-trust-card-title">Easy to use</h3>
              <p className="wm-trust-card-desc">No coding or scripting required. Pre-built drag-and-drop workflow nodes.</p>
            </div>

            {/* Card 2: Affordable */}
            <div className="wm-trust-card wm-trust-card-emerald">
              <div className="wm-trust-card-top">
                <div className="wm-trust-icon-disc disc-emerald">
                  <CreditCard size={18} />
                </div>
                <span className="wm-trust-card-pill pill-emerald">From ₹999/mo</span>
              </div>
              <h3 className="wm-trust-card-title">Fair &amp; Affordable</h3>
              <p className="wm-trust-card-desc">Includes 10,000 credits, unlimited active workflows &amp; 5 team seats.</p>
            </div>

            {/* Card 3: Expert Assistance */}
            <div className="wm-trust-card wm-trust-card-indigo">
              <div className="wm-trust-card-top">
                <div className="wm-trust-icon-disc disc-indigo">
                  <Users size={18} />
                </div>
                <span className="wm-trust-card-pill pill-indigo">1-on-1 Help</span>
              </div>
              <h3 className="wm-trust-card-title">Expert Assistance</h3>
              <p className="wm-trust-card-desc">Real automation engineers help you audit, design, and launch live.</p>
            </div>

            {/* Card 4: Powerful Workflows */}
            <div className="wm-trust-card wm-trust-card-purple">
              <div className="wm-trust-card-top">
                <div className="wm-trust-icon-disc disc-purple">
                  <Zap size={18} />
                </div>
                <span className="wm-trust-card-pill pill-purple">AI + Logic</span>
              </div>
              <h3 className="wm-trust-card-title">Powerful Workflows</h3>
              <p className="wm-trust-card-desc">Branching rules, Claude AI agents, loops, routing &amp; 37+ integrations.</p>
            </div>

          </div>

        </div>
      </section>

      {/* 3 — How It Works (Ultra-Modern Connected AI Workflow Rail) */}
      <section className="wm-how-section" id="how-it-works">
        <div className="wm-how-container">
          
          {/* Centered Section Header */}
          <div className="wm-how-header">
            <h2 className="wm-how-title">
              From trigger to autopilot in 5 simple steps.
            </h2>
            <p className="wm-how-subtitle">
              Connect your favorite business apps, inject AI intelligence, and let your workflows run 24/7 — without writing a single line of code.
            </p>
          </div>

          {/* Continuous Flow Pipeline Rail */}
          <div className="wm-how-rail-wrapper">
            
            {/* The Horizontal Glowing Data Flow Wire (Desktop) */}
            <div className="wm-how-flow-wire" aria-hidden="true">
              <div className="wm-how-wire-pulse" />
            </div>

            {/* 5-Step Floating Interactive Cards Grid */}
            <div className="wm-how-pipeline-grid">
              
              {/* Step 1: Trigger */}
              <div className="wm-how-step-card step-orange">
                <div className="wm-how-card-glow-bg glow-orange" />
                <div className="wm-how-card-header">
                  <div className="wm-how-node-avatar disc-orange">
                    <Zap size={18} />
                    <span className="wm-how-node-seq">01</span>
                  </div>
                  <div className="wm-how-node-status">
                    <span className="wm-how-status-live" />
                    <span>Trigger</span>
                  </div>
                </div>

                <div className="wm-how-card-content">
                  <h3 className="wm-how-card-title">Choose what starts your workflow</h3>
                  <p className="wm-how-card-desc">
                    Pick a trigger — form submission, new Stripe order, scheduled cron, or webhook from any app.
                  </p>
                </div>

                <div className="wm-how-card-footer">
                  <div className="wm-how-meta-chip chip-orange">
                    <span className="chip-dot" />
                    <span>Instant Webhook / Polling</span>
                  </div>
                </div>
              </div>

              {/* Step 2: AI & Logic */}
              <div className="wm-how-step-card step-indigo">
                <div className="wm-how-card-glow-bg glow-indigo" />
                <div className="wm-how-card-header">
                  <div className="wm-how-node-avatar disc-indigo">
                    <Bot size={18} />
                    <span className="wm-how-node-seq">02</span>
                  </div>
                  <div className="wm-how-node-status">
                    <span className="wm-how-status-live" style={{ background: '#6366f1' }} />
                    <span>AI Logic</span>
                  </div>
                </div>

                <div className="wm-how-card-content">
                  <h3 className="wm-how-card-title">Add the actions you need</h3>
                  <p className="wm-how-card-desc">
                    Send WhatsApp notifications, update HubSpot records, run Claude AI triage, or branch rules.
                  </p>
                </div>

                <div className="wm-how-card-footer">
                  <div className="wm-how-meta-chip chip-indigo">
                    <span className="chip-dot" style={{ background: '#6366f1' }} />
                    <span>Claude / OpenAI Agents</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Integrations */}
              <div className="wm-how-step-card step-emerald">
                <div className="wm-how-card-glow-bg glow-emerald" />
                <div className="wm-how-card-header">
                  <div className="wm-how-node-avatar disc-emerald">
                    <Layers size={18} />
                    <span className="wm-how-node-seq">03</span>
                  </div>
                  <div className="wm-how-node-status">
                    <span className="wm-how-status-live" style={{ background: '#10b981' }} />
                    <span>Connected</span>
                  </div>
                </div>

                <div className="wm-how-card-content">
                  <h3 className="wm-how-card-title">Connect your tools</h3>
                  <p className="wm-how-card-desc">
                    Securely authenticate WhatsApp, Google Sheets, Zoho, Shopify, Slack, and 37+ popular SaaS apps.
                  </p>
                </div>

                <div className="wm-how-card-footer">
                  <div className="wm-how-meta-chip chip-emerald">
                    <span className="chip-dot" style={{ background: '#10b981' }} />
                    <span>Zero-Code OAuth &amp; API</span>
                  </div>
                </div>
              </div>

              {/* Step 4: Sandbox Testing */}
              <div className="wm-how-step-card step-blue">
                <div className="wm-how-card-glow-bg glow-blue" />
                <div className="wm-how-card-header">
                  <div className="wm-how-node-avatar disc-blue">
                    <Play size={18} />
                    <span className="wm-how-node-seq">04</span>
                  </div>
                  <div className="wm-how-node-status">
                    <span className="wm-how-status-live" style={{ background: '#3b82f6' }} />
                    <span>Sandbox</span>
                  </div>
                </div>

                <div className="wm-how-card-content">
                  <h3 className="wm-how-card-title">Test before you go live</h3>
                  <p className="wm-how-card-desc">
                    Execute a simulation run with test payloads. Inspect output logs &amp; debug in real-time.
                  </p>
                </div>

                <div className="wm-how-card-footer">
                  <div className="wm-how-meta-chip chip-blue">
                    <span className="chip-dot" style={{ background: '#3b82f6' }} />
                    <span>1-Click Test Execution</span>
                  </div>
                </div>
              </div>

              {/* Step 5: Autopilot */}
              <div className="wm-how-step-card step-purple">
                <div className="wm-how-card-glow-bg glow-purple" />
                <div className="wm-how-card-header">
                  <div className="wm-how-node-avatar disc-purple">
                    <CheckCircle2 size={18} />
                    <span className="wm-how-node-seq">05</span>
                  </div>
                  <div className="wm-how-node-status">
                    <span className="wm-how-status-live" style={{ background: '#a855f7' }} />
                    <span>Autopilot</span>
                  </div>
                </div>

                <div className="wm-how-card-content">
                  <h3 className="wm-how-card-title">Turn it on &amp; scale</h3>
                  <p className="wm-how-card-desc">
                    Toggle active and let WorkflowMitra handle operations 24/7 with enterprise reliability.
                  </p>
                </div>

                <div className="wm-how-card-footer">
                  <div className="wm-how-meta-chip chip-purple">
                    <span className="chip-dot" style={{ background: '#a855f7' }} />
                    <span>99.8% SLA &amp; Auto-Retry</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Interactive CTA Note */}
          <div className="wm-how-bottom-cta">
            <a href="https://app.workflowmitra.com/signup" className="wm-how-cta-pill">
              <span>Start building your first workflow for free</span>
              <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </section>

      {/* 4 — Interactive Workflow Showcase (Left Canvas + Right Selection) */}
      <DeferredHomeSection minHeight={580}>
        <Suspense fallback={<div className="section-placeholder" style={{ minHeight: 580 }} />}>
          <AgentsShowcase />
        </Suspense>
      </DeferredHomeSection>

      {/* 5 — Before vs After (Ultra-Colorful Visual Comparison) */}
      <DeferredHomeSection minHeight={520}>
        <section className="before-after-section" id="comparison">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">One trigger. Everything else handled.</h2>
              <p className="section-subtitle">See how a single automated workflow replaces hours of painful manual steps.</p>
            </div>

            <div className="wm-ba-comparison-grid">
              
              {/* Column 1: Without WorkflowMitra (Manual Chaos) */}
              <div className="wm-ba-card wm-ba-manual">
                <div className="wm-ba-card-header">
                  <div className="wm-ba-badge-row">
                    <span className="wm-ba-status-badge badge-red">
                      <span className="wm-ba-pulse-red" />
                      <span>Manual Process</span>
                    </span>
                    <span className="wm-ba-time-pill pill-red">
                      <Clock size={12} />
                      <span>~15 Mins / Lead</span>
                    </span>
                  </div>
                  <h3 className="wm-ba-card-title text-red">Without WorkflowMitra</h3>
                  <p className="wm-ba-card-desc">Repetitive copy-pasting across fragmented browser tabs and spreadsheets.</p>
                </div>

                <div className="wm-ba-steps-list">
                  {BEFORE_STEPS.map((item, i) => (
                    <div className="wm-ba-step-row row-manual" key={i}>
                      <div className="wm-ba-step-icon-wrap icon-red">
                        <XCircle size={16} />
                      </div>
                      <div className="wm-ba-step-body">
                        <div className="wm-ba-step-top">
                          <span className="wm-ba-step-num">Step {item.step}</span>
                          <span className="wm-ba-step-tag tag-red">{item.tag}</span>
                        </div>
                        <h4 className="wm-ba-step-heading">{item.title}</h4>
                        <p className="wm-ba-step-sub">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="wm-ba-card-footer footer-red">
                  <div className="wm-ba-footer-icon">
                    <AlertCircle size={18} color="#ef4444" />
                  </div>
                  <div className="wm-ba-footer-text">
                    <span className="wm-ba-footer-highlight">~15 minutes per lead, every time</span>
                    <span className="wm-ba-footer-sub">High human error risk · Missed follow-ups · Frustrated team</span>
                  </div>
                </div>
              </div>

              {/* Column 2: With WorkflowMitra (Automated Autopilot) */}
              <div className="wm-ba-card wm-ba-automated">
                <div className="wm-ba-card-header">
                  <div className="wm-ba-badge-row">
                    <span className="wm-ba-status-badge badge-green">
                      <span className="wm-ba-pulse-green" />
                      <span>100% Autopilot</span>
                    </span>
                    <span className="wm-ba-time-pill pill-green">
                      <Zap size={12} />
                      <span>&lt; 2s Instant</span>
                    </span>
                  </div>
                  <h3 className="wm-ba-card-title text-green">With WorkflowMitra</h3>
                  <p className="wm-ba-card-desc">One trigger automatically executes your entire business pipeline in parallel.</p>
                </div>

                <div className="wm-ba-steps-list">
                  {AFTER_STEPS.map((item, i) => (
                    <div className="wm-ba-step-row row-automated" key={i}>
                      <div className="wm-ba-step-icon-wrap icon-green">
                        <CheckCircle2 size={16} />
                      </div>
                      <div className="wm-ba-step-body">
                        <div className="wm-ba-step-top">
                          <span className="wm-ba-step-num num-green">Step {item.step}</span>
                          <span className="wm-ba-step-tag tag-green">{item.tag}</span>
                        </div>
                        <h4 className="wm-ba-step-heading">{item.title}</h4>
                        <p className="wm-ba-step-sub">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="wm-ba-card-footer footer-green">
                  <div className="wm-ba-footer-icon">
                    <Sparkles size={18} color="#10b981" />
                  </div>
                  <div className="wm-ba-footer-text">
                    <span className="wm-ba-footer-highlight text-emerald">Instant &amp; error-free — every single time</span>
                    <span className="wm-ba-footer-sub">Zero manual effort · Instant WhatsApp outreach · 99.8% SLA</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </DeferredHomeSection>

      {/* 6 — AI-powered Automation */}
      <DeferredHomeSection minHeight={600}>
        <Suspense fallback={null}>
          <AIAgentsFeatureSection />
        </Suspense>
      </DeferredHomeSection>

      {/* 7 — Affordability (Ultra-Modern AI Automation Pricing & Value Showcase) */}
      <DeferredHomeSection minHeight={460}>
        <section className="afford-section" id="pricing-overview">
          <div className="container">
            <div className="wm-afford-card-wrapper">
              
              {/* Left Value & Feature Deck */}
              <div className="wm-afford-text-col">
                <h2 className="wm-afford-title">
                  Powerful automation without unnecessary cost
                </h2>
                <p className="wm-afford-subtitle">
                  WorkflowMitra is designed to give small businesses, startups, agencies, and growing teams access to serious workflow automation — without enterprise pricing. Start free, upgrade when you need more capacity.
                </p>

                <div className="wm-afford-perks-list">
                  <div className="wm-afford-perk-item">
                    <div className="wm-afford-check-disc">
                      <CheckCircle2 size={16} color="#059669" />
                    </div>
                    <span><strong>10,000 monthly credits</strong> &middot; Multi-step execution included</span>
                  </div>
                  <div className="wm-afford-perk-item">
                    <div className="wm-afford-check-disc">
                      <CheckCircle2 size={16} color="#059669" />
                    </div>
                    <span><strong>Unlimited active workflows</strong> &middot; No artificial limits</span>
                  </div>
                  <div className="wm-afford-perk-item">
                    <div className="wm-afford-check-disc">
                      <CheckCircle2 size={16} color="#059669" />
                    </div>
                    <span><strong>Up to 5 team seats</strong> &middot; Collaborate without per-seat fees</span>
                  </div>
                  <div className="wm-afford-perk-item">
                    <div className="wm-afford-check-disc">
                      <CheckCircle2 size={16} color="#059669" />
                    </div>
                    <span><strong>Real human expert help</strong> &middot; 1-on-1 assistance when you need it</span>
                  </div>
                </div>

                <div className="wm-afford-cta-row">
                  <Link to="/pricing" className="wm-afford-see-pricing-btn">
                    <span>See All Plans &amp; Pricing</span>
                    <ArrowRight size={16} />
                  </Link>
                  <span className="wm-afford-guarantee">
                    <Sparkles size={14} color="#09090b" />
                    <span>Free 14-day trial &middot; No credit card required</span>
                  </span>
                </div>
              </div>

              {/* Right Interactive AI Automation Tier Card */}
              <div className="wm-afford-card-col">
                <div className="wm-afford-pricing-card">
                  <div className="wm-afford-badge-row">
                    <span className="wm-afford-popular-pill">
                      <Sparkles size={12} />
                      <span>Starter Plan</span>
                    </span>
                    <span className="wm-afford-save-chip">Best Value</span>
                  </div>

                  <div className="wm-afford-price-block">
                    <div className="wm-afford-amount-wrap">
                      <span className="wm-afford-currency">₹</span>
                      <span className="wm-afford-price-num">999</span>
                    </div>
                    <span className="wm-afford-frequency">/month</span>
                  </div>

                  <p className="wm-afford-tier-desc">
                    Everything you need to automate core sales, CRM, and ops workflows on autopilot.
                  </p>

                  <div className="wm-afford-specs-box">
                    <div className="wm-afford-spec-row">
                      <span className="spec-label">Monthly Credits</span>
                      <span className="spec-val">10,000 tasks</span>
                    </div>
                    <div className="wm-afford-spec-row">
                      <span className="spec-label">Workflows</span>
                      <span className="spec-val">Unlimited</span>
                    </div>
                    <div className="wm-afford-spec-row">
                      <span className="spec-label">Team Members</span>
                      <span className="spec-val">5 Included</span>
                    </div>
                    <div className="wm-afford-spec-row">
                      <span className="spec-label">Execution Speed</span>
                      <span className="spec-val">&lt; 0.2s Real-time</span>
                    </div>
                  </div>

                  <a href="https://app.workflowmitra.com/signup" className="wm-afford-primary-btn">
                    <span>Start Free 14-Day Trial</span>
                    <ArrowRight size={15} />
                  </a>

                  <span className="wm-afford-disclaimer">Instant access &middot; No credit card needed</span>
                </div>
              </div>

            </div>
          </div>
        </section>
      </DeferredHomeSection>

      {/* 8 — Expert Help (Ultra-Clean & Centered) */}
      <section className="expert-section" id="expert-help">
        <div className="container">
          <div className="section-header expert-header-centered">
            <h2 className="section-title expert-main-title">
              Don't know how to build your workflow?
            </h2>
            <p className="section-subtitle expert-main-subtitle">
              Tell us what you want to automate. Our automation engineers will map, design, and build the custom workflow for your business.
            </p>
          </div>

          <div className="expert-steps-grid">
            <div className="expert-step-card">
              <div className="expert-step-badge">01</div>
              <h3 className="expert-step-title">Tell us what you need</h3>
              <p className="expert-step-desc">Describe the manual process or business bottleneck you want to automate.</p>
            </div>

            <div className="expert-step-card">
              <div className="expert-step-badge">02</div>
              <h3 className="expert-step-title">We map the workflow</h3>
              <p className="expert-step-desc">Our experts audit your stack and architect the optimal triggers, filters, and AI steps.</p>
            </div>

            <div className="expert-step-card">
              <div className="expert-step-badge">03</div>
              <h3 className="expert-step-title">We build &amp; test together</h3>
              <p className="expert-step-desc">We build the integration pipelines, run sandbox test executions, and ensure zero error rates.</p>
            </div>

            <div className="expert-step-card">
              <div className="expert-step-badge">04</div>
              <h3 className="expert-step-title">You automate &amp; scale</h3>
              <p className="expert-step-desc">Turn it on live and let WorkflowMitra handle repetitive operations 24/7 on autopilot.</p>
            </div>
          </div>

          <div className="expert-cta-centered">
            <Link to="/contact" className="expert-cta-btn">
              <span>Get Help Building My Workflow</span>
              <span className="expert-btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9 — Use Cases (Vertical Overlapping Sticky Card Stack) */}
      <section className="use-cases-section" id="use-cases">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Automation for every part of your business</h2>
            <p className="section-subtitle">Real workflows that solve real problems — from first lead to fulfilled order.</p>
          </div>

          {/* Vertical Overlapping Sticky Card Stack */}
          <div className="wm-sticky-stack-container">
            {STACKED_USE_CASES.map((uc, index) => (
              <div
                key={uc.id}
                id={`stack-card-${uc.id}`}
                className="wm-sticky-stack-card"
                style={{
                  '--stack-idx': index,
                  zIndex: index + 1,
                }}
              >
                {/* Left Column: Clear Value, Heading, Metrics & CTA */}
                <div className="wm-stack-card-left">
                  <div className="wm-stack-rec-tag">
                    <span className="wm-tag-dot" style={{ background: uc.accent }} />
                    <span>{uc.badge}</span>
                  </div>

                  <h3 className="wm-stack-card-heading">{uc.category}</h3>
                  <h4 className="wm-stack-card-subheading">{uc.title}</h4>
                  
                  <blockquote className="wm-stack-card-quote">
                    "{uc.desc}"
                  </blockquote>

                  {/* 3 Real-World Impact Metrics */}
                  <div className="wm-stack-metrics-row">
                    {uc.stats.map((st, sIdx) => (
                      <div className="wm-stack-metric-pill" key={sIdx}>
                        <span className="metric-val">{st.value}</span>
                        <span className="metric-lbl">{st.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* High-Contrast Pill CTA with Circular Arrow */}
                  <div className="wm-stack-card-cta">
                    <Link to={uc.link} className="wm-stack-cta-btn">
                      <span>Explore {uc.category} Workflows</span>
                      <span className="wm-cta-circle-arrow">
                        <ArrowRight size={14} />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Right Column: AI Automation Multi-Tile Visual Collage */}
                <div className="wm-stack-card-right">
                  <div className="wm-stack-visual-panel">
                    
                    {/* Top Tile: AI Agent Header & Live Telemetry Badge */}
                    <div className="wm-visual-top-bar">
                      <div className="wm-visual-agent-badge">
                        <span className="wm-pulse-dot" style={{ background: uc.accent }} />
                        <span className="wm-agent-title">AI Automation Agent Active</span>
                      </div>
                      <span className="wm-visual-speed-chip">24/7 Autopilot</span>
                    </div>

                    {/* Middle Tile: Live 4-Step Pipeline Flow */}
                    <div className="wm-visual-pipeline-box">
                      <div className="wm-pipeline-box-label">
                        <Sparkles size={12} color="#059669" />
                        <span>Real-Time Execution Pipeline</span>
                      </div>
                      <div className="wm-visual-nodes-chain">
                        {uc.nodes.map((node, nIdx) => (
                          <div className="wm-visual-node-item" key={nIdx}>
                            <div className="wm-vnode-card">
                              <span className="wm-vnode-step">{node.step}</span>
                              <span className="wm-vnode-label">{node.label}</span>
                              <span className="wm-vnode-app">{node.app}</span>
                            </div>
                            {nIdx < uc.nodes.length - 1 && (
                              <div className="wm-vnode-arrow" aria-hidden="true">
                                <ArrowRight size={13} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Tile: Live Telemetry Event Logs (Overlapping Sub-Card) */}
                    <div className="wm-visual-console-card">
                      <div className="wm-console-header">
                        <span className="wm-console-dot-green" />
                        <span className="wm-console-status">System Telemetry &middot; Live Stream</span>
                        <span className="wm-console-latency">&lt; 0.2s Execution</span>
                      </div>
                      <div className="wm-console-logs">
                        <div className="wm-log-row">
                          <CheckCircle2 size={13} color="#10b981" />
                          <span>100% Data Integrity Verified &middot; Zero Data Loss</span>
                        </div>
                        <div className="wm-log-row">
                          <Zap size={13} color="#f59e0b" />
                          <span>Trigger Received &middot; Claude AI Scored &amp; Routed Instantly</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10 — Integrations */}
      <DeferredHomeSection minHeight={520}>
        <Suspense fallback={null}>
          <IntegrationsShowcase />
        </Suspense>
      </DeferredHomeSection>

      {/* 11 — Templates */}
      <DeferredHomeSection minHeight={540}>
        <section className="templates-section">
          <div className="container">
            <div className="section-header">
              <div className="section-heading-group">
                <h2 className="section-title">Start from a workflow that already works</h2>
                <p className="section-subtitle">Open a template, connect your accounts, and run it — no coding required.</p>
              </div>
              <div className="template-tabs" role="tablist" aria-label="Template categories">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={activeTab === cat}
                    className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
                    onClick={() => setActiveTab(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="templates-grid">
              {TEMPLATES.filter(t => activeTab === 'All' || t.category.toLowerCase() === activeTab.toLowerCase()).map((template) => (
                <div key={template.id} className="template-card" onClick={() => navigate(`/template/${template.id}`)}>
                  <div className="template-header">
                    <div className="template-apps">
                      <NodeChain nodes={template.chain} size={40} gap={20} />
                    </div>
                  </div>
                  <div className="template-content">
                    <span className="template-category">{template.category}</span>
                    <h3 className="template-title">{template.title}</h3>
                    <p className="template-description">{template.description}</p>
                    <div className="template-footer">
                      <span className="template-meta">{template.steps} steps</span>
                      <button className="btn-use" onClick={(e) => { e.stopPropagation(); navigate(`/template/${template.id}`); }}>
                        Use
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="templates-more">
              <Link to="/templates" className="wm-templates-all-btn">
                <span>Explore All Templates</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </DeferredHomeSection>

      {/* 12 — Competitor Alternative (Modern Comparison Table) */}
      <DeferredHomeSection minHeight={580}>
        <section className="alt-section" id="alternatives">
          <div className="container">
            <div className="section-header alt-header-centered">
              <div className="alt-eyebrow-badge">
                <span className="alt-eyebrow-dot" />
                <span>Platform Comparison Matrix</span>
              </div>
              <h2 className="section-title">Looking for a simpler automation alternative?</h2>
              <p className="section-subtitle">WorkflowMitra gives you the automation power you need — without the complexity, steep learning curve, or high cost of legacy tools.</p>
            </div>

            {/* Clean SaaS Comparison Table */}
            <div className="wm-compare-table-card">
              <div className="wm-compare-table-scroll">
                <table className="wm-compare-table">
                  <thead>
                    <tr>
                      <th className="th-feature">Platform Capabilities</th>
                      
                      {/* WorkflowMitra Hero Column */}
                      <th className="th-wm">
                        <div className="th-wm-header">
                          <span className="th-wm-badge">✦ Recommended</span>
                          <div className="th-wm-brand">
                            <div className="th-wm-logo">
                              <Sparkles size={16} color="#059669" />
                            </div>
                            <span className="th-wm-name">WorkflowMitra</span>
                          </div>
                          <span className="th-wm-sub">All-in-one AI &amp; Automation</span>
                        </div>
                      </th>

                      {/* Zapier */}
                      <th className="th-comp">
                        <div className="th-comp-header">
                          <div className="th-comp-logo logo-zapier" style={{ background: '#fff5f0' }}>
                            <SiZapier size={18} color="#FF4A00" />
                          </div>
                          <span className="th-comp-name">Zapier</span>
                          <span className="th-comp-tag">Legacy No-Code</span>
                        </div>
                      </th>

                      {/* Make */}
                      <th className="th-comp">
                        <div className="th-comp-header">
                          <div className="th-comp-logo logo-make" style={{ background: '#f5f3ff' }}>
                            <SiMake size={18} color="#6D28D9" />
                          </div>
                          <span className="th-comp-name">Make</span>
                          <span className="th-comp-tag">Visual Routers</span>
                        </div>
                      </th>

                      {/* n8n */}
                      <th className="th-comp">
                        <div className="th-comp-header">
                          <div className="th-comp-logo logo-n8n" style={{ background: '#fff7ed' }}>
                            <SiN8N size={20} color="#EA580C" />
                          </div>
                          <span className="th-comp-name">n8n</span>
                          <span className="th-comp-tag">Self-Host / Dev</span>
                        </div>
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_MATRIX.map((row, idx) => (
                      <tr key={idx} className="tr-compare-row">
                        <td className="td-feature">
                          <span className="td-feature-title">{row.feature}</span>
                          <span className="td-feature-sub">{row.description}</span>
                        </td>

                        {/* WorkflowMitra Column */}
                        <td className="td-wm">
                          <div className="td-val-box val-wm">
                            <CheckCircle2 size={16} color="#059669" className="td-check-icon" />
                            <span className="td-val-text font-bold text-dark">{row.wm}</span>
                          </div>
                          {row.wmBadge && (
                            <span className="td-wm-pill">{row.wmBadge}</span>
                          )}
                        </td>

                        {/* Zapier */}
                        <td className="td-comp">
                          <span className="td-val-text text-muted">{row.zapier}</span>
                        </td>

                        {/* Make */}
                        <td className="td-comp">
                          <span className="td-val-text text-muted">{row.make}</span>
                        </td>

                        {/* n8n */}
                        <td className="td-comp">
                          <span className="td-val-text text-muted">{row.n8n}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Quick Switch Banner */}
              <div className="wm-compare-footer">
                <div className="wm-compare-footer-text">
                  <span className="wm-compare-footer-title">Ready to switch to high-velocity automation?</span>
                  <span className="wm-compare-footer-sub">Get 10,000 monthly executions, AI agents, and dedicated engineer support starting at ₹999/mo.</span>
                </div>
                <div className="wm-compare-footer-actions">
                  <a href="https://app.workflowmitra.com/signup" className="wm-compare-cta-btn">
                    <span>Start Free 14-Day Trial</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>
      </DeferredHomeSection>

      {/* 13 — Why WorkflowMitra */}
      <DeferredHomeSection minHeight={420}>
        <section className="why-section" id="why-us">
          <div className="container">
            <div className="section-header why-header-centered">
              <div className="why-eyebrow-badge">
                <span className="why-eyebrow-dot" />
                <span>Built for Ambitious Teams</span>
              </div>
              <h2 className="section-title">Why teams choose WorkflowMitra</h2>
              <p className="section-subtitle">The modern automation platform engineered to scale your operations without friction or enterprise pricing.</p>
            </div>

            <div className="why-grid">
              {WHY_ITEMS.map((item) => (
                <div className="why-card" key={item.label}>
                  
                  <div className="why-card-top">
                    <div className="why-icon-wrap" style={{ background: item.bg, color: item.accent }}>
                      {item.icon === 'easy' && <MousePointerClick size={22} />}
                      {item.icon === 'affordable' && <Coins size={22} />}
                      {item.icon === 'expert' && <Headphones size={22} />}
                      {item.icon === 'powerful' && <Cpu size={22} />}
                      {item.icon === 'flexible' && <Network size={22} />}
                    </div>
                    <span className="why-role-badge" style={{ color: item.accent, background: item.bg }}>
                      {item.roleTag}
                    </span>
                  </div>

                  <h3 className="why-label">{item.label}</h3>
                  <p className="why-desc">{item.desc}</p>

                  <div className="why-footer">
                    <CheckCircle2 size={14} color="#059669" />
                    <span>{item.benefit}</span>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>
      </DeferredHomeSection>

      {/* 14 — Documentation & Onboarding Hub */}
      <DeferredHomeSection minHeight={380}>
        <Suspense fallback={null}>
          <OnboardingSection />
        </Suspense>
      </DeferredHomeSection>

      {/* 15 — FAQ */}
      <DeferredHomeSection minHeight={480}>
        <section className="faq-section" id="faq" itemScope itemType="https://schema.org/FAQPage">
          <div className="container">
            
            <div className="section-header faq-header-centered">
              <div className="faq-eyebrow-badge">
                <span className="faq-eyebrow-dot" />
                <span>Everything You Need To Know</span>
              </div>
              <h2 className="section-title">Frequently asked questions</h2>
              <p className="section-subtitle">
                Clear answers to common questions about WorkflowMitra, integrations, pricing, and how we compare.
              </p>
            </div>

            <div className="faq-list">
              {FAQ_ITEMS.map((item, i) => (
                <div
                  className={`faq-card ${openFaq === i ? 'open' : ''}`}
                  key={i}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <button
                    className="faq-trigger"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="faq-question-text" itemProp="name">{item.q}</span>
                    <div className="faq-icon-circle">
                      <ChevronDown size={18} className={`faq-icon-chevron ${openFaq === i ? 'rotate' : ''}`} />
                    </div>
                  </button>

                  <div
                    className="faq-answer-wrap"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    role="region"
                    hidden={openFaq !== i}
                  >
                    <p className="faq-answer-text" itemProp="text">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Help Prompt */}
            <div className="faq-bottom-card">
              <div className="faq-bottom-content">
                <div className="faq-bottom-icon">
                  <HelpCircle size={24} color="#2563eb" />
                </div>
                <div className="faq-bottom-text">
                  <span className="faq-bottom-title">Have a specific question not listed here?</span>
                  <span className="faq-bottom-sub">Our automation engineers are online and ready to audit your workflow setup for free.</span>
                </div>
              </div>
              <Link to="/contact" className="faq-bottom-btn">
                <MessageCircle size={16} />
                <span>Talk to an Expert</span>
              </Link>
            </div>

          </div>
        </section>
      </DeferredHomeSection>

      {/* 15 — Final CTA (Manual Rock-Solid Center AI Card) */}
      <DeferredHomeSection minHeight={320}>
        <section className="wm-final-cta-section" id="start-automating">
          <div className="wm-final-cta-card">
            {/* Eyebrow Badge */}
            <div className="wm-final-cta-badge">
              <Sparkles size={13} color="#f97316" />
              <span>Instant Setup · No Credit Card Required</span>
            </div>

            {/* Main Headline */}
            <h2 className="wm-final-cta-title">
              Start automating yourself — or let our experts help you
            </h2>

            {/* Subtitle */}
            <p className="wm-final-cta-sub">
              Free to start, no credit card required. Build it yourself in minutes or tell us what you need and our automation experts will help you get there.
            </p>

            {/* Action Buttons */}
            <div className="wm-final-cta-btns">
              <a
                href="https://app.workflowmitra.com/signup"
                className="wm-final-btn-primary"
              >
                <span>Start Building Free</span>
                <ArrowRight size={16} />
              </a>

              <Link
                to="/contact"
                className="wm-final-btn-secondary"
              >
                <span>Get Help Building My Workflow</span>
              </Link>
            </div>

            {/* Trust Reassurance Row */}
            <div className="wm-final-trust-row">
              <span className="wm-final-trust-item">
                <CheckCircle2 size={16} color="#10b981" />
                <span>10,000 Free Credits</span>
              </span>
              <span className="wm-final-trust-item">
                <CheckCircle2 size={16} color="#10b981" />
                <span>37+ Pre-Built Apps</span>
              </span>
              <span className="wm-final-trust-item">
                <CheckCircle2 size={16} color="#10b981" />
                <span>Live Expert Support</span>
              </span>
            </div>
          </div>
        </section>
      </DeferredHomeSection>
    </div>
  )
}

export default Home
