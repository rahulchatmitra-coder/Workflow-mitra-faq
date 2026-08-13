import { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Workflow, Zap, Puzzle, GitBranch, Wrench, TrendingUp,
  Building2, Megaphone, Briefcase, Settings, Users, Rocket,
  CheckCircle, HelpCircle,
} from 'lucide-react'
import PageSeo from '../components/PageSeo'
import NodeChain from '../components/NodeChain'
import DeferredHomeSection from '../components/DeferredHomeSection'
import './AutomationHelp.css'

const AgentsShowcase = lazy(() => import('../components/AgentsShowcase'))
const IntegrationsShowcase = lazy(() => import('../components/IntegrationsShowcase'))

const HERO_CHAIN = ['webhook-trigger', 'ai', 'if', 'google-sheets', 'whatsapp']

const PROBLEMS = [
  "I don't know which trigger to use.",
  "I'm not sure which actions I need.",
  "I don't know how to connect my apps.",
  "My workflow isn't behaving as expected.",
  'I know the business process, but not the technical setup.',
]

const CAPABILITIES = [
  { icon: Workflow, title: 'Workflow Design', desc: 'Turn a business process into a practical automation workflow.' },
  { icon: Zap, title: 'Trigger & Action Selection', desc: 'Help identify the right trigger and the actions that should follow it.' },
  { icon: Puzzle, title: 'App Connections', desc: 'Help configure the integrations your workflow needs.', link: '/integrations', linkLabel: 'See integrations' },
  { icon: GitBranch, title: 'Conditions & Logic', desc: 'Help structure branching logic and workflow conditions.' },
  { icon: Wrench, title: 'Troubleshooting', desc: "Help identify why a workflow isn't behaving as expected." },
  { icon: TrendingUp, title: 'Workflow Improvement', desc: 'Help simplify or improve a workflow you already built.' },
]

const HOW_STEPS = [
  { num: '01', title: 'Tell us what you want to automate', desc: 'Describe the repetitive process in plain language.' },
  { num: '02', title: 'Our experts understand the workflow', desc: 'We identify the trigger, actions, conditions and integrations required.' },
  { num: '03', title: 'Build and configure', desc: 'The workflow is created and configured in WorkflowMitra.' },
  { num: '04', title: 'Automate', desc: 'Once ready, the workflow handles the repetitive process automatically.' },
]

const EXAMPLES = [
  {
    category: 'Lead Follow-Up',
    steps: ['Lead arrives', 'Save lead', 'Notify sales', 'Send follow-up', 'Create task'],
    chain: ['webhook-trigger', 'hubspot', 'slack', 'whatsapp', 'assign'],
  },
  {
    category: 'Appointment',
    steps: ['Appointment booked', 'Update records', 'Send confirmation', 'Notify team', 'Schedule reminder'],
    chain: ['calendly', 'google-sheets', 'whatsapp', 'slack', 'schedule'],
  },
  {
    category: 'E-commerce',
    steps: ['Order received', 'Update customer data', 'Notify team', 'Trigger follow-up'],
    chain: ['shopify', 'hubspot', 'slack', 'whatsapp'],
  },
  {
    category: 'Customer Support',
    steps: ['New request', 'Classify request', 'Assign team', 'Notify customer'],
    chain: ['zendesk', 'ai', 'assign', 'whatsapp'],
  },
]

const DIY_ITEMS = ['Visual workflow builder', 'Ready-made templates', 'App integrations', 'Workflow testing', 'Flexible automation']
const EXPERT_ITEMS = ['Explain your business process', 'Get workflow guidance', 'Get help configuring the automation', 'Get help troubleshooting']

const TRADITIONAL_ITEMS = ['Get a tool', 'Search documentation', 'Watch tutorials', 'Figure out the workflow alone']
const WORKFLOWMITRA_ITEMS = ['Get the platform', 'Get templates', 'Get workflow capabilities', 'Real automation experts available to assist']

const AUDIENCES = [
  { icon: Building2, title: 'Business Owners', desc: 'Automate repetitive processes without becoming technical.' },
  { icon: Megaphone, title: 'Marketing Teams', desc: 'Automate lead handling, campaigns and repetitive tasks.', link: '/solutions/marketing' },
  { icon: Briefcase, title: 'Sales Teams', desc: 'Automate lead routing, follow-ups and notifications.', link: '/solutions/sales' },
  { icon: Settings, title: 'Operations Teams', desc: 'Connect systems and reduce repetitive manual work.', link: '/solutions/operations' },
  { icon: Users, title: 'Agencies', desc: 'Build and manage workflows for clients.' },
  { icon: Rocket, title: 'Growing Teams', desc: 'Scale processes without adding the same amount of manual work.' },
]

const FAQ_ITEMS = [
  {
    q: 'Do I need technical knowledge to use WorkflowMitra?',
    a: "No. WorkflowMitra is built for non-technical users — you choose a trigger, add actions, connect your apps, and turn the workflow on. If you get stuck, our automation experts can help.",
  },
  {
    q: 'Can someone help me build my workflow?',
    a: 'Yes. Tell us what you want to automate using the form below, and our automation experts can help you understand the workflow, design the steps, and build it with you.',
  },
  {
    q: 'What kind of workflows can your experts help with?',
    a: 'Workflow design, trigger and action selection, app connections, conditions and branching logic, troubleshooting an existing workflow, and improving one that already works.',
  },
  {
    q: 'Can you help with an existing workflow?',
    a: "Yes. If a workflow isn't behaving as expected or you want to simplify one you already built, that falls under troubleshooting and workflow improvement.",
  },
  {
    q: 'Can I build workflows myself?',
    a: 'Yes. WorkflowMitra includes a visual workflow builder, ready-made templates, and integrations with the apps your business already uses — no coding required.',
  },
  {
    q: 'How do I request automation help?',
    a: "Use the “Tell Us What You Want to Automate” form. Describe the process and the apps involved, and our team will get back to you.",
  },
  {
    q: 'Is automation help included in my plan?',
    a: 'Expert assistance is one of the reasons teams choose WorkflowMitra — tell us what you want to automate and our team will help you get started.',
  },
]

function AutomationHelp() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="ah-page">
      <PageSeo
        title="Automation Help & Workflow Experts | WorkflowMitra"
        description="Get help building workflow automations with WorkflowMitra. Tell our automation experts what you want to automate and get guidance creating the right workflow."
        path="/automation-help"
      />

      {/* 1 — Hero */}
      <section className="ah-hero">
        <div className="container">
          <p className="ah-eyebrow">Automation Help</p>
          <h1 className="ah-hero-title">Need help building your automation?</h1>
          <p className="ah-hero-subtitle">
            Tell us what you want to automate. Our automation experts can help you turn the idea into a working WorkflowMitra workflow.
          </p>
          <div className="ah-hero-cta">
            <Link to="/contact?from=automation-help" className="btn btn-primary btn-large">
              Tell Us What You Want to Automate
            </Link>
            <a href="https://app.workflowmitra.com/signup" className="btn btn-secondary btn-large">
              Start Building Free
            </a>
          </div>
          <p className="ah-hero-reassurance">Free to start &middot; No credit card required &middot; Expert help available</p>

          <div className="ah-hero-visual">
            <div className="ah-hero-stages">
              <span>You explain the goal</span>
              <span className="ah-hero-stage-arrow" aria-hidden="true">→</span>
              <span>Our experts help build the workflow</span>
              <span className="ah-hero-stage-arrow" aria-hidden="true">→</span>
              <span>WorkflowMitra runs it automatically</span>
            </div>
            <div className="ah-hero-chain-wrap">
              <NodeChain nodes={HERO_CHAIN} size={56} gap={32} />
            </div>
          </div>
        </div>
      </section>

      {/* 2 — The Problem */}
      <section className="ah-problem-section">
        <div className="container">
          <div className="ah-section-header">
            <h2 className="ah-section-title">Automation sounds easy. Building the right workflow isn't always.</h2>
            <p className="ah-section-subtitle">You know the business process. You don't have to also become the technical expert.</p>
          </div>
          <div className="ah-problem-grid">
            {PROBLEMS.map((p) => (
              <div className="ah-problem-card" key={p}>
                <HelpCircle className="ah-problem-icon" size={20} strokeWidth={1.75} aria-hidden="true" />
                <p>&ldquo;{p}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — What Our Experts Help With */}
      <section className="ah-capabilities-section">
        <div className="container">
          <div className="ah-section-header">
            <h2 className="ah-section-title">From idea to working automation.</h2>
            <p className="ah-section-subtitle">Real capabilities our automation experts can help with — nothing more, nothing invented.</p>
          </div>
          <div className="ah-capabilities-grid">
            {CAPABILITIES.map((c) => (
              <div className="ah-capability-card" key={c.title}>
                <span className="ah-capability-icon" aria-hidden="true"><c.icon size={22} strokeWidth={1.75} /></span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                {c.link && <Link to={c.link} className="ah-capability-link">{c.linkLabel} →</Link>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — How It Works */}
      <section className="ah-how-section">
        <div className="container">
          <div className="ah-section-header">
            <h2 className="ah-section-title">From conversation to running workflow.</h2>
          </div>
          <div className="ah-how-steps">
            {HOW_STEPS.map((step, i) => (
              <div className="ah-how-step" key={step.num}>
                <div className="ah-how-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {i < HOW_STEPS.length - 1 && <span className="ah-how-arrow" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Real Workflow Examples */}
      <section className="ah-examples-section">
        <div className="container">
          <div className="ah-section-header">
            <h2 className="ah-section-title">Tell us the problem. We'll help turn it into a workflow.</h2>
            <p className="ah-section-subtitle">Real examples of the kind of workflows our experts help build.</p>
          </div>
          <div className="ah-examples-grid">
            {EXAMPLES.map((ex) => (
              <div className="ah-example-card" key={ex.category}>
                <span className="ah-example-category">{ex.category}</span>
                <div className="ah-example-chain">
                  <NodeChain nodes={ex.chain} size={40} gap={20} />
                </div>
                <ol className="ah-example-steps">
                  {ex.steps.map((s) => <li key={s}>{s}</li>)}
                </ol>
              </div>
            ))}
          </div>
          <div className="ah-examples-more">
            <Link to="/templates" className="btn btn-secondary">Explore All Templates →</Link>
          </div>
        </div>
      </section>

      {/* 6 — DIY vs Expert Help */}
      <section className="ah-paths-section">
        <div className="container">
          <div className="ah-section-header">
            <h2 className="ah-section-title">Two ways to automate. Both work.</h2>
            <p className="ah-section-subtitle">WorkflowMitra isn't trying to force you into either path.</p>
          </div>
          <div className="ah-paths-grid">
            <div className="ah-path-card">
              <h3>Build it yourself</h3>
              <ul>
                {DIY_ITEMS.map((i) => (
                  <li key={i}><CheckCircle size={16} strokeWidth={2} aria-hidden="true" /><span>{i}</span></li>
                ))}
              </ul>
              <a href="https://app.workflowmitra.com/signup" className="btn btn-secondary">Start Building Free</a>
            </div>
            <div className="ah-path-card ah-path-card-highlight">
              <h3>Get expert help</h3>
              <ul>
                {EXPERT_ITEMS.map((i) => (
                  <li key={i}><CheckCircle size={16} strokeWidth={2} aria-hidden="true" /><span>{i}</span></li>
                ))}
              </ul>
              <Link to="/contact?from=automation-help" className="btn btn-primary">Tell Us What You Want to Automate</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — Why This Is Different */}
      <section className="ah-diff-section">
        <div className="container">
          <div className="ah-section-header">
            <h2 className="ah-section-title">More than a workflow builder.</h2>
          </div>
          <div className="ah-diff-grid">
            <div className="ah-diff-card">
              <h3>Traditional automation experience</h3>
              <ul>
                {TRADITIONAL_ITEMS.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div className="ah-diff-card ah-diff-card-highlight">
              <h3>WorkflowMitra</h3>
              <ul>
                {WORKFLOWMITRA_ITEMS.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Who This Is For */}
      <section className="ah-audience-section">
        <div className="container">
          <div className="ah-section-header">
            <h2 className="ah-section-title">Built for people, not job titles.</h2>
          </div>
          <div className="ah-audience-grid">
            {AUDIENCES.map((a) => {
              const CardTag = a.link ? Link : 'div'
              const cardProps = a.link ? { to: a.link } : {}
              return (
                <CardTag className="ah-audience-card" key={a.title} {...cardProps}>
                  <span className="ah-audience-icon" aria-hidden="true"><a.icon size={22} strokeWidth={1.75} /></span>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </CardTag>
              )
            })}
          </div>
        </div>
      </section>

      {/* 9 — Product Proof */}
      <section className="ah-proof-header">
        <div className="container">
          <div className="ah-section-header">
            <h2 className="ah-section-title">A real platform behind the advice.</h2>
            <p className="ah-section-subtitle">We aren't just giving guidance — you're using a real automation platform, built and run by our team.</p>
          </div>
        </div>
      </section>
      <DeferredHomeSection minHeight={600}>
        <Suspense fallback={null}>
          <AgentsShowcase />
        </Suspense>
      </DeferredHomeSection>
      <DeferredHomeSection minHeight={520}>
        <Suspense fallback={null}>
          <IntegrationsShowcase />
        </Suspense>
      </DeferredHomeSection>

      {/* 10 — FAQ */}
      <section className="ah-faq-section" itemScope itemType="https://schema.org/FAQPage">
        <div className="container">
          <div className="ah-section-header">
            <h2 className="ah-section-title">Frequently asked questions</h2>
          </div>
          <div className="ah-faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <div
                className={`ah-faq-item ${openFaq === i ? 'open' : ''}`}
                key={item.q}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  className="ah-faq-trigger"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span itemProp="name">{item.q}</span>
                  <span className="ah-faq-chevron" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div
                  className="ah-faq-answer"
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

      {/* 11 — Final Conversion */}
      <section className="ah-cta-section">
        <div className="container">
          <div className="ah-cta-content">
            <h2>You know what you want to automate. Let's build it.</h2>
            <p>You don't need to figure out every technical step yourself.</p>
            <div className="ah-cta-actions">
              <Link to="/contact?from=automation-help" className="btn btn-primary btn-large">
                Tell Us What You Want to Automate
              </Link>
              <a href="https://app.workflowmitra.com/signup" className="btn btn-secondary btn-large">
                Start Building Free
              </a>
            </div>
            <p className="ah-cta-links">
              Or see <Link to="/pricing">pricing</Link>, browse <Link to="/templates">templates</Link>, or explore <Link to="/integrations">integrations</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AutomationHelp
