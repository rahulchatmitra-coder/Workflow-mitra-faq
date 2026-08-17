import { lazy, Suspense, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HeroAnimated from '../components/HeroAnimated'
import NodeChain from '../components/NodeChain'
import DeferredHomeSection from '../components/DeferredHomeSection'
import PageSeo from '../components/PageSeo'
import './Home.css'

const IntegrationsShowcase = lazy(() => import('../components/IntegrationsShowcase'))
const AgentsShowcase = lazy(() => import('../components/AgentsShowcase'))
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
    description: 'New mail is read by AI, spam is archived, the rest is categorised and a reply drafted — then a person approves before anything is sent.',
    chain: ['gmail', 'ai', 'approval', 'gmail'],
    steps: 6,
  },
  {
    id: 3,
    category: 'Customer support',
    title: 'Support ticket → AI triage',
    description: 'A new helpdesk ticket is categorised by AI, urgent ones alert the team, it goes to the next agent in the rota, and the customer gets an acknowledgement.',
    chain: ['zendesk', 'ai', 'if', 'slack'],
    steps: 6,
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
  'Lead arrives via form',
  'Employee checks email',
  'Copies data to spreadsheet',
  'Updates CRM manually',
  'Notifies sales team on chat',
  'Creates follow-up reminder',
  'Sends confirmation message',
]

const AFTER_STEPS = [
  'Lead arrives via form',
  'CRM updated automatically',
  'Sales team notified instantly',
  'Follow-up scheduled',
  'Confirmation sent on WhatsApp',
]

const USE_CASES = [
  { title: 'Lead Management', desc: 'Capture, qualify, and route leads to your sales team automatically.', link: '/solutions/marketing', icon: '📥' },
  { title: 'Sales Follow-up', desc: 'Never miss a follow-up. Automated reminders, messages, and CRM updates.', link: '/solutions/sales', icon: '🤝' },
  { title: 'Marketing Automation', desc: 'Trigger campaigns, segment audiences, and track engagement without manual work.', link: '/solutions/marketing', icon: '📣' },
  { title: 'Customer Support', desc: 'Route tickets, send acknowledgements, and escalate urgent issues automatically.', link: '/solutions/support', icon: '🎧' },
  { title: 'E-commerce Operations', desc: 'From order confirmation to shipping updates — automate the entire post-purchase flow.', link: '/solutions/operations', icon: '🛒' },
  { title: 'Business Operations', desc: 'Sync data between tools, generate reports, and keep your team aligned.', link: '/solutions/operations', icon: '⚙️' },
]

const COMPETITORS = [
  { name: 'Zapier', desc: 'Powerful automation without the per-task pricing.' },
  { name: 'Make', desc: 'Visual workflows without the steep learning curve.' },
  { name: 'n8n', desc: 'Self-host flexibility with managed convenience and expert help.' },
  { name: 'Pabbly', desc: 'Reliable automation backed by real human support.' },
]

const WHY_ITEMS = [
  { label: 'Easy', desc: 'Built for non-technical users. No coding, no scripting, no complex setup.' },
  { label: 'Affordable', desc: 'Powerful automation without unnecessary cost. Plans from ₹999/mo.' },
  { label: 'Expert Help', desc: 'Real automation experts can help you design and build your workflows.' },
  { label: 'Powerful', desc: 'Multi-step workflows with conditions, AI, loops, and error handling.' },
  { label: 'Flexible', desc: 'Connect the apps your business already uses, or reach anything via HTTP.' },
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

const CATEGORIES = ['All', 'Lead capture', 'E-commerce', 'AI', 'Customer support']

function Home() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="home-page">
      <PageSeo
        title="WorkflowMitra — Workflow Automation Platform | No-Code AI Workflows"
        description="Build powerful workflow automations without code. Connect your apps, automate repetitive work, and get help from automation experts when you need it."
        path="/"
      />

      {/* 1 — Hero */}
      <HeroAnimated />

      {/* 2 — Trust / Positioning Strip */}
      <section className="trust-strip" aria-label="Key benefits">
        <div className="container">
          <p className="trust-headline">Built for people who want automation — not an automation degree.</p>
          <div className="trust-pills">
            <div className="trust-pill">
              <span className="trust-icon" aria-hidden="true">✦</span>
              <div><strong>Easy to use</strong><span>No coding or scripting required</span></div>
            </div>
            <div className="trust-pill">
              <span className="trust-icon" aria-hidden="true">₹</span>
              <div><strong>Affordable</strong><span>Plans from ₹999/month</span></div>
            </div>
            <div className="trust-pill">
              <span className="trust-icon" aria-hidden="true">👤</span>
              <div><strong>Expert assistance</strong><span>Real people help you build</span></div>
            </div>
            <div className="trust-pill">
              <span className="trust-icon" aria-hidden="true">⚡</span>
              <div><strong>Powerful workflows</strong><span>Conditions, AI, loops &amp; more</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — How It Works */}
      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle">Five steps to your first automation — no technical skills needed.</p>
          </div>
          <div className="how-steps">
            {HOW_STEPS.map((step, i) => (
              <div className="how-step" key={step.num}>
                <div className="how-num">{step.num}</div>
                <div className="how-body">
                  <h3 className="how-step-title">{step.title}</h3>
                  <p className="how-step-desc">{step.desc}</p>
                </div>
                {i < HOW_STEPS.length - 1 && <div className="how-connector" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Workflow Product UI */}
      <DeferredHomeSection minHeight={600}>
        <Suspense fallback={null}>
          <AgentsShowcase />
        </Suspense>
      </DeferredHomeSection>

      {/* 5 — Before vs After */}
      <section className="before-after-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">One trigger. Everything else handled.</h2>
            <p className="section-subtitle">See how a single workflow replaces hours of manual steps.</p>
          </div>
          <div className="ba-grid">
            <div className="ba-column ba-before">
              <h3 className="ba-label">Without WorkflowMitra</h3>
              <div className="ba-steps">
                {BEFORE_STEPS.map((s, i) => (
                  <div className="ba-step" key={i}>
                    <span className="ba-dot ba-dot-manual" aria-hidden="true" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <p className="ba-time">~15 minutes per lead, every time</p>
            </div>
            <div className="ba-column ba-after">
              <h3 className="ba-label">With WorkflowMitra</h3>
              <div className="ba-steps">
                {AFTER_STEPS.map((s, i) => (
                  <div className="ba-step" key={i}>
                    <span className={`ba-dot ${i === 0 ? 'ba-dot-trigger' : 'ba-dot-auto'}`} aria-hidden="true" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <p className="ba-time">Instant — every single time</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — AI-powered Automation */}
      <DeferredHomeSection minHeight={600}>
        <Suspense fallback={null}>
          <AIAgentsFeatureSection />
        </Suspense>
      </DeferredHomeSection>

      {/* 7 — Affordability */}
      <section className="afford-section">
        <div className="container">
          <div className="afford-inner">
            <div className="afford-text">
              <h2>Powerful automation without unnecessary cost</h2>
              <p>WorkflowMitra is designed to give small businesses, startups, agencies, and growing teams access to serious workflow automation — without enterprise pricing. Start free, upgrade when you need more capacity.</p>
              <Link to="/pricing" className="btn btn-secondary">See Pricing →</Link>
            </div>
            <div className="afford-highlight">
              <span className="afford-price">₹999</span>
              <span className="afford-period">/month</span>
              <span className="afford-plan">Starter plan</span>
              <span className="afford-includes">10,000 credits &middot; Unlimited workflows &middot; 5 seats</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Expert Help */}
      <section className="expert-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Don't know how to build your workflow?</h2>
            <p className="section-subtitle">Tell us what you want to automate. Our automation experts can help you understand, design, and build the workflow.</p>
          </div>
          <div className="expert-steps">
            <div className="expert-step">
              <div className="expert-num">1</div>
              <h3>Tell us what you need</h3>
              <p>Describe the manual process you want to automate.</p>
            </div>
            <div className="expert-arrow" aria-hidden="true">→</div>
            <div className="expert-step">
              <div className="expert-num">2</div>
              <h3>We understand the workflow</h3>
              <p>Our experts map the steps, triggers, and apps involved.</p>
            </div>
            <div className="expert-arrow" aria-hidden="true">→</div>
            <div className="expert-step">
              <div className="expert-num">3</div>
              <h3>We help you build it</h3>
              <p>Work with an expert to create and test the workflow together.</p>
            </div>
            <div className="expert-arrow" aria-hidden="true">→</div>
            <div className="expert-step">
              <div className="expert-num">4</div>
              <h3>You automate your business</h3>
              <p>Turn it on and let WorkflowMitra handle the repetitive work.</p>
            </div>
          </div>
          <div className="expert-cta">
            <Link to="/contact" className="btn btn-primary btn-large">Get Help Building My Workflow</Link>
          </div>
        </div>
      </section>

      {/* 9 — Use Cases */}
      <section className="use-cases-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Automation for every part of your business</h2>
            <p className="section-subtitle">Real workflows that solve real problems — from first lead to fulfilled order.</p>
          </div>
          <div className="uc-grid">
            {USE_CASES.map((uc) => (
              <Link to={uc.link} className="uc-card" key={uc.title}>
                <span className="uc-icon" aria-hidden="true">{uc.icon}</span>
                <h3>{uc.title}</h3>
                <p>{uc.desc}</p>
                <span className="uc-arrow" aria-hidden="true">→</span>
              </Link>
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
      <section className="templates-section">
        <div className="container">
          <div className="section-header">
            <div className="section-heading-group">
              <h2 className="section-title">Start from a workflow that already works</h2>
              <p className="section-subtitle">Open a template, connect your accounts, and run it — no coding required.</p>
            </div>
            <div className="template-tabs">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
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
              <div key={template.id} className="template-card">
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
                    <button className="btn-use" onClick={() => navigate(`/template/${template.id}`)}>Use</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="templates-more">
            <Link to="/templates" className="btn btn-secondary">Explore All Templates →</Link>
          </div>
        </div>
      </section>

      {/* 12 — Competitor Alternative */}
      <section className="alt-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Looking for a simpler automation alternative?</h2>
            <p className="section-subtitle">WorkflowMitra gives you the automation power you need — without the complexity or cost you don't.</p>
          </div>
          <div className="alt-grid">
            {COMPETITORS.map((c) => (
              <div className="alt-card" key={c.name}>
                <h3>Alternative to {c.name}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13 — Why WorkflowMitra */}
      <section className="why-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why teams choose WorkflowMitra</h2>
          </div>
          <div className="why-grid">
            {WHY_ITEMS.map((item) => (
              <div className="why-card" key={item.label}>
                <h3 className="why-label">{item.label}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14 — Documentation & Onboarding Hub */}
      <DeferredHomeSection minHeight={380}>
        <Suspense fallback={null}>
          <OnboardingSection />
        </Suspense>
      </DeferredHomeSection>

      {/* 15 — FAQ */}
      <section className="faq-section" itemScope itemType="https://schema.org/FAQPage">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently asked questions</h2>
          </div>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <div
                className={`faq-item ${openFaq === i ? 'open' : ''}`}
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
                  <span itemProp="name">{item.q}</span>
                  <span className="faq-chevron" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div
                  className="faq-answer"
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

      {/* 15 — Final CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Start automating yourself — or let our experts help you</h2>
            <p className="cta-description">
              Free to start, no credit card required. Build it yourself or tell us what you need and our automation experts will help you get there.
            </p>
            <div className="cta-actions">
              <a href="https://app.workflowmitra.com/signup" className="btn btn-primary btn-large">Start Building Free</a>
              <Link to="/contact" className="btn btn-secondary btn-large">Get Help Building My Workflow</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
