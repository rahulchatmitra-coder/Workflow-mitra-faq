import { lazy, Suspense, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HeroAnimated from '../components/HeroAnimated'
import EnterpriseScaleSection from '../components/EnterpriseScaleSection'
import IntegrationsShowcase from '../components/IntegrationsShowcase'
import NodeChain from '../components/NodeChain'
import DeferredHomeSection from '../components/DeferredHomeSection'
import PageSeo from '../components/PageSeo'
import { Sparkles, ArrowRight, CheckCircle2, Zap, Users, CreditCard, Layers, Bot, Play, XCircle, Clock, AlertCircle, ChevronRight, ChevronDown, TrendingUp, Headphones, ShoppingBag, MousePointerClick, Coins, Cpu, Network, HelpCircle, MessageCircle, Sliders, ShieldCheck } from 'lucide-react'
import { SiZapier, SiMake, SiN8N } from 'react-icons/si'
import './Home.css'

import AgentsShowcase from '../components/AgentsShowcase'
const AIAgentsFeatureSection = lazy(() => import('../components/AIAgentsFeatureSection'))
const DarkAIIntegrationsSection = lazy(() => import('../components/DarkAIIntegrationsSection'))
const OnboardingSection = lazy(() => import('../credentials-portal/OnboardingSection'))
const TestimonialSlider = lazy(() => import('../components/TestimonialSlider'))

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
  { step: '01', title: '1. Build lead spreadsheet', desc: 'Manually gather lead details and meticulously organize them into structured rows and columns in a spreadsheet.', tag: 'Hours' },
  { step: '02', title: '2. Hunt down valid emails', desc: 'Spend valuable hours researching prospects online and cross-checking databases to find accurate, working email addresses.', tag: 'Data Hunting' },
  { step: '03', title: '3. Draft cold emails', desc: 'Individually write personalized outreach emails from scratch, hoping to resonate with each recipient.', tag: 'Manual Copy' },
  { step: '04', title: '4. Schedule batch send', desc: 'Manually configure email campaigns, carefully selecting ideal send times to maximize open rates.', tag: 'Batch Delay' },
  { step: '05', title: '5. Wait for replies', desc: 'Sit idly and wait, sometimes days, for prospects to slowly respond, creating uncertainty in your pipeline.', tag: 'Days Wasted' },
  { step: '06', title: '6. Manual follow-ups', desc: 'Regularly revisit the spreadsheet, identify unresponsive leads, and manually craft and send additional follow-up messages.', tag: 'Tedious Work' },
  { step: '07', title: '7. Qualify prospects on calls', desc: 'Schedule and conduct phone calls individually to determine the genuine interest level and qualification of prospects.', tag: 'Time Drain' },
  { step: '08', title: '8. Back-and-forth scheduling', desc: 'Playing the never-ending back and forth with clients to coordinate calendar availability and meeting links.', tag: 'Calendar Chaos' },
  { step: '09', title: '9. Update CRM fields', desc: 'Spend extra hours manually logging interactions, notes, updates, and lead status into your CRM to keep records up-to-date.', tag: 'Admin Work' },
  { step: '10', title: '10. Meeting finally confirmed', desc: 'After numerous manual tasks, repeated efforts, and days of waiting, finally confirm the meeting with your prospect.', tag: 'Slow Velocity' },
]

const AFTER_STEPS = [
  { step: '01', title: '1. Connect your CRM & Inbound Sources', desc: 'Seamlessly plug your existing CRM and tools into WorkflowMitra—no setup headaches, zero code. Just connect and let the automation begin.', tag: 'Instant Sync' },
  { step: '02', title: '2. AI scores & personalizes leads', desc: 'Instantly analyzes and ranks your leads based on relevance and buying intent, then tailors outreach to each one—before you even lift a finger.', tag: 'AI Powered' },
  { step: '03', title: '3. Smart follow-up launches on Autopilot', desc: 'Outreach never sleeps. Your AI agent sends timely, personalized follow-ups across WhatsApp & Email around the clock to maximize response rates.', tag: '24/7 Autopilot' },
  { step: '04', title: '4. Calendar filled—meeting booked & closed', desc: 'Once replies come in, the AI handles scheduling and confirmations—dropping booked meetings directly into your calendar, no back-and-forth.', tag: '5× Faster' },
]

const CATEGORIES = ['All', 'Lead capture', 'E-commerce', 'AI', 'Customer support']

const COMPARISON_MATRIX = [
  {
    feature: 'Starter Price & Monthly Tasks',
    description: 'Entry-level pricing and monthly execution allowance',
    wm: '₹999 / mo (10,000 tasks)',
    wmBadge: 'Best Value',
    zapier: '₹2,499 / mo (750 tasks)',
    make: '₹750 / mo (1,000 ops)',
    n8n: '₹1,660 / mo + Compute',
  },
  {
    feature: 'Cost for 10,000 Executions',
    description: 'What your business actually pays at standard scale',
    wm: '₹999 / mo (Included)',
    wmBadge: 'Save up to 80%',
    zapier: '₹11,600+ / mo',
    make: '₹3,300+ / mo',
    n8n: '₹2,500+ / mo + Server',
  },
  {
    feature: 'Autonomous AI (Claude & GPT-4o)',
    description: 'Native AI reasoning, smart extraction & decision nodes',
    wm: 'Built-in Native AI Nodes',
    wmBadge: 'Zero Extra Cost',
    zapier: '₹4,100+ / mo (Paid Add-on)',
    make: 'Manual HTTP + Token Bills',
    n8n: 'Manual LangChain Setup',
  },
  {
    feature: '1-on-1 Human Automation Help',
    description: 'Real engineers to map, build & debug workflows with you',
    wm: 'Included with Experts (Free)',
    wmBadge: 'Full Support',
    zapier: 'Community forum only',
    make: 'Hire expensive agency (₹25k+)',
    n8n: 'Self-serve docs only',
  },
  {
    feature: 'Setup & Learning Curve',
    description: 'Time needed to go from zero to live automated workflow',
    wm: '5 Mins (Visual & No-Code)',
    zapier: 'Moderate (Tier limits)',
    make: 'Steep router mazes',
    n8n: 'High (DevOps & code required)',
  },
  {
    feature: 'Cloud Hosting, Maintenance & SLA',
    description: 'Server uptime, updates, auto-retries & guaranteed SLA',
    wm: '100% Managed (99.8% SLA)',
    zapier: 'Cloud Managed',
    make: 'Cloud Managed',
    n8n: 'Self-Hosted Server Overhead',
  },
  {
    feature: 'Active Automated Workflows',
    description: 'Number of active workflows you can run simultaneously',
    wm: 'Unlimited Active Workflows',
    zapier: 'Restricted on starter tiers',
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

      {/* 2 — Built for enterprise scale and trust (OmniAgent Reference 1:1) */}
      <EnterpriseScaleSection />

      {/* 3 — Effortless Tool Integrations (Orbital Interactive Showcase) */}
      <IntegrationsShowcase />

      {/* 4 — N8N-Inspired Interactive Workflow Showcase */}
      <AgentsShowcase />

      {/* 5 — AI-powered Automation */}
      <DeferredHomeSection minHeight={600}>
        <Suspense fallback={null}>
          <AIAgentsFeatureSection />
        </Suspense>
      </DeferredHomeSection>

      {/* 5.1 — Connect AI to your tools & everything you use */}
      <DeferredHomeSection minHeight={480}>
        <Suspense fallback={null}>
          <DarkAIIntegrationsSection />
        </Suspense>
      </DeferredHomeSection>

      {/* 6 — Affordability (Ultra-Modern AI Automation Pricing & Value Showcase) */}
      <DeferredHomeSection minHeight={520}>
        <section className="afford-section" id="pricing-overview">
          {/* Subtle Ambient Background Glow */}
          <div className="wm-afford-ambient-glow" />

          <div className="container">
            <div className="wm-afford-card-wrapper">
              
              {/* Left Value & Feature Matrix Column */}
              <div className="wm-afford-text-col">
                <div className="wm-afford-pill-badge">
                  <Sparkles size={13} className="wm-afford-badge-sparkle" />
                  <span>TRANSPARENT &amp; PREDICTABLE PRICING</span>
                </div>

                <h2 className="wm-afford-title">
                  Powerful automation <br />
                  <span className="wm-afford-title-gradient">without unnecessary cost</span>
                </h2>
                
                <p className="wm-afford-subtitle">
                  Built specifically for startups, agencies, and high-growth teams. Experience enterprise-grade AI automation with unlimited workflows, collaborative team access, and zero hidden per-seat fees.
                </p>

                {/* 2x2 Sleek Feature Grid */}
                <div className="wm-afford-feature-grid">
                  <div className="wm-afford-feature-card">
                    <div className="wm-afford-icon-box icon-amber">
                      <Zap size={18} />
                    </div>
                    <div className="wm-afford-feature-info">
                      <h4>10,000 Monthly Credits</h4>
                      <p>Multi-step executions and high-volume triggers included.</p>
                    </div>
                  </div>

                  <div className="wm-afford-feature-card">
                    <div className="wm-afford-icon-box icon-blue">
                      <Layers size={18} />
                    </div>
                    <div className="wm-afford-feature-info">
                      <h4>Unlimited Workflows</h4>
                      <p>Build and run as many active flows as your business needs.</p>
                    </div>
                  </div>

                  <div className="wm-afford-feature-card">
                    <div className="wm-afford-icon-box icon-purple">
                      <Users size={18} />
                    </div>
                    <div className="wm-afford-feature-info">
                      <h4>5 Team Seats Included</h4>
                      <p>Full team collaboration with zero per-seat upgrade fees.</p>
                    </div>
                  </div>

                  <div className="wm-afford-feature-card">
                    <div className="wm-afford-icon-box icon-emerald">
                      <Headphones size={18} />
                    </div>
                    <div className="wm-afford-feature-info">
                      <h4>Human Expert Help</h4>
                      <p>1-on-1 workflow setup assistance whenever you need it.</p>
                    </div>
                  </div>
                </div>

                {/* Left Guarantee Note */}
                <div className="wm-afford-cta-row">
                  <span className="wm-afford-guarantee">
                    <ShieldCheck size={16} color="#059669" />
                    <span>Free 14-day trial &middot; No credit card required</span>
                  </span>
                </div>
              </div>

              {/* Right Interactive AI Automation Tier Card */}
              <div className="wm-afford-card-col">
                <div className="wm-afford-pricing-card">
                  {/* Popular Accent Glow */}
                  <div className="wm-afford-card-glow" />

                  <div className="wm-afford-badge-row">
                    <div className="wm-afford-plan-identity">
                      <span className="wm-afford-plan-dot" />
                      <span className="wm-afford-plan-name">Starter Blueprint Plan</span>
                    </div>
                    <span className="wm-afford-save-chip">⚡ MOST POPULAR</span>
                  </div>

                  <div className="wm-afford-price-block">
                    <div className="wm-afford-amount-wrap">
                      <span className="wm-afford-currency">₹</span>
                      <span className="wm-afford-price-num">999</span>
                    </div>
                    <div className="wm-afford-price-meta">
                      <span className="wm-afford-frequency">/month</span>
                      <span className="wm-afford-cancel-anytime">Billed monthly &middot; Cancel anytime</span>
                    </div>
                  </div>

                  <div className="wm-afford-savings-pill">
                    <CheckCircle2 size={13} color="#059669" />
                    <span>Save up to 75% compared to Zapier / Make tiers</span>
                  </div>

                  <p className="wm-afford-tier-desc">
                    Everything you need to automate core sales, CRM enrichment, customer support, and operational workflows on autopilot.
                  </p>

                  <div className="wm-afford-specs-box">
                    <div className="wm-afford-spec-row">
                      <span className="wm-spec-label">Monthly Tasks / Credits</span>
                      <span className="wm-spec-val font-bold">10,000 executions</span>
                    </div>
                    <div className="wm-afford-spec-row">
                      <span className="wm-spec-label">Active Workflows</span>
                      <span className="wm-spec-val val-green">Unlimited</span>
                    </div>
                    <div className="wm-afford-spec-row">
                      <span className="wm-spec-label">Team Members</span>
                      <span className="wm-spec-val">5 Included</span>
                    </div>
                    <div className="wm-afford-spec-row">
                      <span className="wm-spec-label">Execution Latency</span>
                      <span className="wm-spec-val val-green">&lt; 0.2s Real-time</span>
                    </div>
                    <div className="wm-afford-spec-row">
                      <span className="wm-spec-label">Reliability &amp; SLA</span>
                      <span className="wm-spec-val">99.99% Uptime</span>
                    </div>
                  </div>

                  <a href="https://app.workflowmitra.com/signup" className="wm-afford-start-btn">
                    <span>Start Free 14-Day Trial</span>
                    <ArrowRight size={16} className="wm-btn-arrow" />
                  </a>

                  <div className="wm-afford-card-footer-notes">
                    <span>Instant activation</span>
                    <span>&middot;</span>
                    <span>No card needed</span>
                    <span>&middot;</span>
                    <span>14-day guarantee</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
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
                  <div className="template-card-glow" aria-hidden="true" />
                  <div className="template-header">
                    <div className="template-apps">
                      <NodeChain nodes={template.chain} size={42} gap={20} />
                    </div>
                  </div>
                  <div className="template-content">
                    <div className="template-badge-row">
                      <span className={`template-category cat-${template.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                        {template.category}
                      </span>
                      <span className="template-meta">
                        <Zap size={11} className="template-meta-icon" />
                        {template.steps} steps
                      </span>
                    </div>
                    <h3 className="template-title">{template.title}</h3>
                    <p className="template-description">{template.description}</p>
                    <div className="template-footer">
                      <span className="template-ready-hint">Ready to deploy</span>
                      <span className="template-explore-link">
                        <span>View Template</span>
                        <ArrowRight size={13} className="template-arrow" />
                      </span>
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
                          <div className="td-feature-content">
                            <span className="td-feature-title">{row.feature}</span>
                            <span className="td-feature-sub">{row.description}</span>
                          </div>
                        </td>

                        {/* WorkflowMitra Column */}
                        <td className="td-wm">
                          <div className="td-wm-content">
                            <div className="td-val-box val-wm">
                              <CheckCircle2 size={16} color="#059669" className="td-check-icon" />
                              <span className="td-val-text font-bold text-dark">{row.wm}</span>
                            </div>
                            {row.wmBadge && (
                              <span className="td-wm-pill">{row.wmBadge}</span>
                            )}
                          </div>
                        </td>

                        {/* Zapier */}
                        <td className="td-comp">
                          <div className="td-comp-content">
                            <span className="td-val-text text-muted">{row.zapier}</span>
                          </div>
                        </td>

                        {/* Make */}
                        <td className="td-comp">
                          <div className="td-comp-content">
                            <span className="td-val-text text-muted">{row.make}</span>
                          </div>
                        </td>

                        {/* n8n */}
                        <td className="td-comp">
                          <div className="td-comp-content">
                            <span className="td-val-text text-muted">{row.n8n}</span>
                          </div>
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

      {/* 13 — Why WorkflowMitra / Testimonials Slider */}
      <DeferredHomeSection minHeight={480}>
        <Suspense fallback={<div className="section-placeholder" style={{ minHeight: 480 }} />}>
          <TestimonialSlider />
        </Suspense>
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
          </div>
        </section>
      </DeferredHomeSection>

      {/* 15 — Final CTA (Manual Rock-Solid Center AI Card) */}
      <DeferredHomeSection minHeight={320}>
        <section className="wm-final-cta-section" id="start-automating">
          <div className="wm-final-cta-card">
            {/* Atmospheric Background Glow */}
            <div className="wm-final-card-glow" aria-hidden="true" />

            {/* Eyebrow Badge */}
            <div className="wm-final-cta-badge">
              <Sparkles size={13} className="wm-final-badge-sparkle" />
              <span>Ready To Automate Your Business?</span>
            </div>

            {/* Main Headline */}
            <h2 className="wm-final-cta-title">
              Start automating yourself — or let our <span className="wm-final-highlight">experts help you</span>
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
                <CheckCircle2 size={15} color="#059669" />
                <span>10,000 Free Credits</span>
              </span>
              <span className="wm-final-trust-item">
                <CheckCircle2 size={15} color="#059669" />
                <span>37+ Pre-Built Apps</span>
              </span>
              <span className="wm-final-trust-item">
                <CheckCircle2 size={15} color="#059669" />
                <span>Live Expert Support</span>
              </span>
              <span className="wm-final-trust-item">
                <CheckCircle2 size={15} color="#059669" />
                <span>99.8% Uptime SLA</span>
              </span>
            </div>
          </div>
        </section>
      </DeferredHomeSection>
    </div>
  )
}

export default Home
