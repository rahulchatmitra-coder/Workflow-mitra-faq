import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {
  Slack,
  GmailLogo,
  HubSpotLogo,
  Openai,
  WhatsappIcon,
  WorkflowMitraLogo,
  GoogleSheetsLogo,
  Claude,
} from './ui/svgs'
import { SiStripe, SiNotion, SiZendesk, SiShopify, SiJira } from 'react-icons/si'
import { FaSalesforce } from 'react-icons/fa'
import './VisualAdaptSpeedSection.css'

const DEPARTMENTS = [
  {
    id: 'it',
    label: 'IT',
    title: 'IT automation',
    desc: 'Cut complexity and move faster by automating everything from monitoring to incident response. Connect tools, integrate AI, reduce manual work, and free your team to focus on innovation.',
    cta: 'Automate IT',
    link: '/solutions/engineering',
    image: '/images/adapt/it_man.jpg',
    leadApp: <SiJira size={22} color="#0052CC" />,
    leadName: 'Jira',
    secondApp: <WorkflowMitraLogo className="w-5 h-5" />,
    secondName: 'WorkflowMitra',
  },
  {
    id: 'operations',
    label: 'Operations',
    title: 'Operations automation',
    desc: 'Streamline fulfillment, inventory sync, and multi-channel order routing without writing code. Eliminate manual bottlenecks, boost order accuracy, and scale customer satisfaction effortlessly.',
    cta: 'Automate Operations',
    link: '/solutions/operations',
    image: '/images/adapt/ops_man.jpg',
    leadApp: <SiShopify size={22} color="#96BF48" />,
    leadName: 'Shopify',
    secondApp: <WhatsappIcon className="w-5 h-5" />,
    secondName: 'WhatsApp API',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    title: 'Marketing automation',
    desc: 'Accelerate lead capture, automated audience segmentation, and personalized outreach campaigns across channels. Nurture high-intent prospects and track attribution with zero manual exports.',
    cta: 'Automate Marketing',
    link: '/solutions/marketing',
    image: '/images/adapt/it_man.jpg',
    leadApp: <HubSpotLogo className="w-5 h-5" />,
    leadName: 'HubSpot',
    secondApp: <Openai className="w-5 h-5" />,
    secondName: 'GPT-4o Engine',
  },
  {
    id: 'sales',
    label: 'Sales',
    title: 'Sales automation',
    desc: 'Empower SDRs and sales closers to move at lightning speed. Instantly qualify inbound leads, auto-assign CRM stages, draft research dossiers, and trigger high-converting follow-ups 24/7.',
    cta: 'Automate Sales',
    link: '/solutions/sales',
    image: '/images/adapt/sales_man.jpg',
    leadApp: <FaSalesforce size={22} color="#00A1E0" />,
    leadName: 'Salesforce',
    secondApp: <WhatsappIcon className="w-5 h-5" />,
    secondName: 'WhatsApp Outreach',
  },
  {
    id: 'finance',
    label: 'Finance',
    title: 'Finance automation',
    desc: 'Eliminate manual billing errors, automate GST invoice generation, and reconcile subscription charges in real time. Enforce compliance audit trails with automatic manager approval triggers.',
    cta: 'Automate Finance',
    link: '/solutions/operations',
    image: '/images/adapt/ops_man.jpg',
    leadApp: <SiStripe size={22} color="#635BFF" />,
    leadName: 'Stripe',
    secondApp: <GoogleSheetsLogo className="w-5 h-5" />,
    secondName: 'Ledger Sheets',
  },
  {
    id: 'cx',
    label: 'CX',
    title: 'Customer Support (CX) automation',
    desc: 'Deliver instant, verified answers to customer inquiries 24/7 across email, WhatsApp, and chat. Route priority tickets to Slack, resolve FAQs autonomously, and keep CSAT scores peak.',
    cta: 'Automate Support',
    link: '/solutions/support',
    image: '/images/adapt/it_man.jpg',
    leadApp: <SiZendesk size={22} color="#03363D" />,
    leadName: 'Zendesk',
    secondApp: <SiNotion size={22} color="#000000" />,
    secondName: 'Notion KB',
  },
  {
    id: 'people',
    label: 'People',
    title: 'People & HR automation',
    desc: 'Create unforgettable employee onboarding workflows from offer acceptance to Day 1. Automatically provision accounts, schedule intro meetings, and deliver team welcome kits without manual friction.',
    cta: 'Automate People Ops',
    link: '/solutions/operations',
    image: '/images/adapt/sales_man.jpg',
    leadApp: <GmailLogo className="w-5 h-5" />,
    leadName: 'Gmail',
    secondApp: <Slack className="w-5 h-5" />,
    secondName: 'Slack Onboarding',
  },
]

export default function VisualAdaptSpeedSection() {
  const [activeDept, setActiveDept] = useState(DEPARTMENTS[0])

  return (
    <section className="wm-adapt-speed-section" id="adapt-at-speed" aria-label="Adapt at speed with visual-first automation and AI">
      <div className="wm-adapt-container">
        
        {/* Centered Heading */}
        <div className="wm-adapt-header">
          <h2 className="wm-adapt-title">
            Adapt at speed with visual-first<br className="wm-title-br" /> automation and AI
          </h2>
          <p className="wm-adapt-subtitle">
            WorkflowMitra drives efficiencies, solves problems, and speeds innovation by breaking down silos across your business.
          </p>
        </div>

        {/* Department Filter Navigation Pills (Make.com Exact Look) */}
        <div className="wm-dept-pills-bar" role="tablist" aria-label="Department Categories">
          {DEPARTMENTS.map(dept => {
            const isActive = activeDept.id === dept.id
            return (
              <button
                key={dept.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`wm-dept-pill-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveDept(dept)}
              >
                <span>{dept.label}</span>
              </button>
            )
          })}
        </div>

        {/* Showcase Two-Column Card (Make.com Exact Style) */}
        <div className="wm-adapt-card-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDept.id}
              className="wm-adapt-card-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              
              {/* Left Column: Clean Real Photo + Floating Connected App Bubble */}
              <div className="wm-adapt-photo-col">
                <div className="wm-adapt-photo-box">
                  <img
                    src={activeDept.image}
                    alt={activeDept.title}
                    className="wm-adapt-photo-img"
                    loading="lazy"
                  />
                  
                  {/* Floating Connected Apps Bubble (Exact Make.com Style) */}
                  <div className="wm-adapt-floating-node-pill" aria-label="Connected integrations">
                    <div className="wm-node-bubble lead-bubble" title={activeDept.leadName}>
                      {activeDept.leadApp}
                    </div>
                    <div className="wm-node-dots-wire">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                    </div>
                    <div className="wm-node-bubble second-bubble" title={activeDept.secondName}>
                      {activeDept.secondApp}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Title, Body Text, and Solid Button */}
              <div className="wm-adapt-content-col">
                <div className="wm-adapt-content-box">
                  <h3 className="wm-adapt-dept-heading">{activeDept.title}</h3>
                  <p className="wm-adapt-dept-desc">{activeDept.desc}</p>
                  
                  <div className="wm-adapt-cta-row">
                    <Link to={activeDept.link} className="wm-adapt-action-btn">
                      <span>{activeDept.cta}</span>
                    </Link>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
