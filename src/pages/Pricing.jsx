import { useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCircle2, ChevronDown, Sparkles, HelpCircle, ArrowRight, Zap, Bot, Users, Headphones, ShieldCheck, Layers } from 'lucide-react';
import { SiZapier, SiMake, SiN8N } from 'react-icons/si';
import PageSeo from '../components/PageSeo';
import RollButton from '../components/RollButton';
import './Pricing.css';

function Pricing() {
  const [activePlanOrder, setActivePlanOrder] = useState(1); // Default highlight Pro (20K tier)
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleCheckout = (planName) => {
    // Navigate to actual WorkflowMitra app billing/checkout or trigger upgrade flow
    window.location.href = 'https://app.workflowmitra.com/billing';
  };

  const getCtaText = (plan) => {
    if (plan.order === 0) {
      return 'Start Free Trial';
    }
    if (plan.order === 1) {
      return 'Upgrade to 20K (Pro)';
    }
    return 'Upgrade to 40K (Scale)';
  };

  // Synchronized with https://app.workflowmitra.com/billing exact tiers
  const plans = [
    {
      order: 0,
      name: 'Starter',
      creditsLabel: '10,000 credits',
      monthlyPrice: '₹999',
      yearlyPrice: '₹849',
      period: 'month',
      description: 'Perfect for founders & solo creators automating core workflows.',
      isPopular: false,
      badge: 'Free 14-Day Trial',
      per1kCost: '₹99.90 / 1k credits',
      features: [
        <><strong key="1">10,000</strong> credits / month (1 credit = 1 step)</>,
        <><strong key="2">10</strong> active workflows</>,
        <><strong key="3">7 days</strong> of execution history</>,
        <><strong key="4">2</strong> team seats</>,
        'All node types & integrations',
        'Community support'
      ]
    },
    {
      order: 1,
      name: 'Pro',
      creditsLabel: '20,000 credits',
      monthlyPrice: '₹1,499',
      yearlyPrice: '₹1,274',
      originalPrice: '₹1,998',
      savingsBadge: 'Save 25%',
      period: 'month',
      description: 'Built for teams scaling operations with high-volume workflows.',
      isPopular: true,
      badge: 'Popular',
      per1kCost: '₹74.95 / 1k credits',
      features: [
        <><strong key="5">20,000</strong> credits / month (1 credit = 1 step)</>,
        <><strong key="6">20</strong> active workflows</>,
        <><strong key="7">15 days</strong> of execution history</>,
        <><strong key="8">5</strong> team seats</>,
        'All node types & integrations',
        'Email support'
      ]
    },
    {
      order: 2,
      name: 'Scale',
      creditsLabel: '40,000 credits and up',
      monthlyPrice: '₹2,699',
      yearlyPrice: '₹2,294',
      originalPrice: '₹3,996',
      savingsBadge: 'Save 32%',
      period: 'month',
      description: 'For growing businesses running mission-critical automation.',
      isPopular: false,
      badge: 'Scales with you',
      per1kCost: '₹67.48 / 1k credits',
      features: [
        <><strong key="9">40,000</strong> credits / month (1 credit = 1 step)</>,
        <><strong key="10">50</strong> active workflows</>,
        <><strong key="11">30 days</strong> of execution history</>,
        <><strong key="12">10</strong> team seats</>,
        'All node types & integrations',
        'Priority support'
      ]
    }
  ];

  const COMPARE_CATEGORIES = [
    {
      category: 'Core Execution & Capacity',
      icon: 'Zap',
      rows: [
        {
          feature: 'Monthly Tasks / Credits',
          sub: '1 credit = 1 complete workflow node execution',
          starter: '10,000 / mo',
          pro: '20,000 / mo',
          scale: '40,000 / mo',
        },
        {
          feature: 'Cost per 1,000 Credits',
          sub: 'Effective price per execution block',
          starter: '₹99.90',
          pro: '₹74.95 (Save 25%)',
          scale: '₹67.48 (Save 32%)',
          badgePro: 'Best Value',
        },
        {
          feature: 'Active Automated Workflows',
          sub: 'Live simultaneous automations in your account',
          starter: '10 Workflows',
          pro: '20 Workflows',
          scale: '50 Workflows',
        },
        {
          feature: 'Execution Log & Audit History',
          sub: 'Detailed step-by-step logs for debugging & replay',
          starter: '7 Days History',
          pro: '15 Days History',
          scale: '30 Days History',
        },
        {
          feature: 'Execution Speed & Latency',
          sub: 'Average node trigger-to-execution latency',
          starter: '< 0.2s Real-time',
          pro: '< 0.2s Real-time',
          scale: '< 0.1s Dedicated Priority',
        },
      ]
    },
    {
      category: 'AI & Autonomous Intelligence',
      icon: 'Bot',
      rows: [
        {
          feature: 'Autonomous AI Reasoning Nodes',
          sub: 'Native Claude 3.5 Sonnet, GPT-4o & DeepSeek access',
          starter: 'Included',
          pro: 'Included (Priority Quotas)',
          scale: 'Unlimited / High Volume',
          isCheck: true,
        },
        {
          feature: 'Smart Error Fallback & Auto-Retry',
          sub: 'Self-healing logic when third-party APIs fail',
          starter: 'Standard Auto-Retry (1x)',
          pro: 'Smart Self-Healing (3x)',
          scale: 'Advanced Auto-Heal (5x) + Alert',
        },
        {
          feature: 'Custom Webhooks & Instant Triggers',
          sub: 'Trigger flows from any external app, webhook, or form',
          starter: 'Unlimited Webhooks',
          pro: 'Unlimited Webhooks',
          scale: 'Unlimited + Dedicated Endpoints',
          isCheck: true,
        },
      ]
    },
    {
      category: 'Team Collaboration & Governance',
      icon: 'Users',
      rows: [
        {
          feature: 'Team Member Seats',
          sub: 'Collaborate with teammates without per-seat fees',
          starter: '2 Included Seats',
          pro: '5 Included Seats',
          scale: '10 Included Seats',
        },
        {
          feature: 'Role-Based Permissions (RBAC)',
          sub: 'Granular admin, editor, and viewer access roles',
          starter: 'Standard Admin',
          pro: 'Custom Roles & Viewers',
          scale: 'Full Enterprise RBAC',
        },
        {
          feature: 'Security & 256-Bit Data Encryption',
          sub: 'End-to-end encryption at rest & in transit',
          starter: 'SOC-2 & GDPR Grade',
          pro: 'SOC-2 & GDPR Grade',
          scale: 'Dedicated VPC / IP Whitelisting',
          isCheck: true,
        },
      ]
    },
    {
      category: 'Support, Expert Setup & SLA',
      icon: 'Headphones',
      rows: [
        {
          feature: 'Customer Support Level',
          sub: 'Guaranteed response time from our automation engineers',
          starter: 'Community & Docs',
          pro: 'Fast Email Support (< 4h)',
          scale: 'Priority SLA & Dedicated Slack',
        },
        {
          feature: '1-on-1 Automation Engineer Help',
          sub: 'Direct assistance to map, build, and debug workflows',
          starter: 'Pre-built Blueprints',
          pro: '1 Onboarding Session Included',
          scale: 'Dedicated Automation Engineer',
        },
        {
          feature: 'Cloud Uptime Commitment',
          sub: 'Guaranteed system availability and redundancy',
          starter: '99.8% SLA',
          pro: '99.9% Uptime SLA',
          scale: '99.99% Enterprise SLA',
        },
      ]
    }
  ];

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
  ];

  const faqs = [
    {
      q: 'How do WorkflowMitra credits work?',
      a: '1 credit equals 1 complete workflow step / node execution. Polling triggers that check for events without finding new data consume 0 credits, ensuring you only pay for actual automation work.'
    },
    {
      q: 'Can I upgrade, downgrade, or cancel my plan anytime?',
      a: 'Yes, you have complete flexibility. You can switch credit tiers or cancel your subscription at any time from your billing settings. Upgrades apply immediately with automatic prorating.'
    },
    {
      q: 'What happens if I exceed my monthly task credits?',
      a: 'Your workflows will never break unexpectedly. We notify you when approaching 80% and 100% capacity. You can enable automatic top-ups or upgrade with one click, and top-ups carry over indefinitely.'
    },
    {
      q: 'Is there a free trial on paid plans?',
      a: 'Yes! All accounts start with a full 14-day free trial on the Starter plan with 10,000 free execution credits. No credit card is required to build and deploy your workflows.'
    },
    {
      q: 'What payment methods and currencies do you accept?',
      a: 'We accept all major Credit & Debit cards (Visa, MasterCard, Amex), UPI, Net Banking, and Razorpay. All Indian transactions include GST invoices for tax compliance.'
    },
    {
      q: 'Do team seats cost extra?',
      a: 'No, team seats are fully included in each tier (2 seats on Starter, 5 seats on Pro, 10 seats on Scale) without any extra per-seat fees.'
    },
    {
      q: 'What kind of support is provided with each tier?',
      a: 'Starter includes community support and comprehensive documentation. Pro includes fast email support. Scale includes priority SLA and dedicated workflow assistance.'
    }
  ];

  return (
    <div className="pricing-page">
      <PageSeo
        title="Pricing — Simple Pricing, Serious Results | WorkflowMitra"
        description="Transparent credit-based pricing for automated workflows. Starter at ₹999/mo, Pro at ₹1,499/mo, Scale at ₹2,699/mo."
        path="/pricing"
      />

      {/* ─── 1. Main Pricing Section ─── */}
      <section className="axvio-pricing-section">
        {/* Subtle Atmospheric Sky Aurora Glows */}
        <div className="axvio-pricing-glow" aria-hidden="true" />
        <div className="axvio-pricing-glow-secondary" aria-hidden="true" />

        {/* Header Block with Right-Aligned Toggle Button */}
        <motion.div 
          className="axvio-pricing-header"
          initial={{ opacity: 1, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="axvio-header-left">
            <div className="axvio-pricing-eyebrow">
              <span className="axvio-eyebrow-dot" />
              <span>Pricing</span>
            </div>

            <h1 className="axvio-pricing-title">
              Simple Pricing, Serious Results.
            </h1>

            <p className="axvio-pricing-subhead">
              No hidden fees. No surprises. Just pick a plan and start automating.
            </p>
          </div>

          {/* Right-Aligned User-Friendly Billing Switch */}
          <div className="axvio-header-right">
            <div className="axvio-billing-toggle-wrapper">
              <button 
                type="button"
                className={`axvio-billing-tab ${!isYearly ? 'active' : ''}`}
                onClick={() => setIsYearly(false)}
                aria-pressed={!isYearly}
              >
                Monthly
              </button>

              <button 
                type="button"
                className={`axvio-billing-tab ${isYearly ? 'active' : ''}`}
                onClick={() => setIsYearly(true)}
                aria-pressed={isYearly}
              >
                <span>Yearly</span>
                <span className="axvio-save-tag">Save 15%</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Three-Column Pricing Cards Grid */}
        <div className="axvio-pricing-grid">
          {plans.map((plan, index) => {
            const isSelected = plan.order === activePlanOrder;
            const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.order}
                className={`axvio-card ${plan.isPopular ? 'popular' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => setActivePlanOrder(plan.order)}
                initial={{ opacity: 1, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Plan Header */}
                <div className="axvio-card-top">
                  <div>
                    <span className="axvio-plan-name">{plan.name}</span>
                    <span className="axvio-credits-sub">{plan.creditsLabel}</span>
                  </div>
                  {plan.badge && (
                    <span className={`axvio-popular-badge ${plan.isPopular ? 'badge-dark' : 'badge-soft'}`}>
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="axvio-price-row">
                  <span className="axvio-price-val">{currentPrice}</span>
                  <span className="axvio-period">/{plan.period}</span>
                  {plan.originalPrice && !isYearly && (
                    <div className="axvio-savings-wrap">
                      <span className="axvio-price-strikethrough">{plan.originalPrice}</span>
                      <span className="axvio-savings-chip">{plan.savingsBadge}</span>
                    </div>
                  )}
                </div>

                {/* Per 1k Credit Cost Pill */}
                <div className="axvio-per1k-pill">
                  <span>{plan.per1kCost}</span>
                </div>

                {/* Short Description */}
                <p className="axvio-plan-desc">{plan.description}</p>

                {/* Feature List */}
                <ul className="axvio-features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="axvio-feature-item">
                      {plan.isPopular ? (
                        <div className="axvio-check-pro" aria-hidden="true">
                          <Check size={11} strokeWidth={3.2} color="#ffffff" />
                        </div>
                      ) : (
                        <div className="axvio-check-default" aria-hidden="true">
                          <Check size={14} strokeWidth={2.4} color="#475569" />
                        </div>
                      )}
                      <span className="axvio-feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action CTA Button */}
                <RollButton
                  variant={plan.isPopular ? 'dark' : 'secondary'}
                  size="md"
                  className="axvio-plan-roll-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckout(plan.name);
                  }}
                >
                  {getCtaText(plan)}
                </RollButton>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── 2. Compare Tiers Section ─── */}
      <section className="pricing-compare-section" id="compare-plans">
        <div className="compare-container">
          <div className="compare-header">
            <span className="compare-eyebrow">Detailed Breakdown</span>
            <h2>Compare Plan Features</h2>
            <p className="compare-sub">Everything you need to know about our task allowances, seats, AI reasoning nodes, and enterprise capabilities.</p>
          </div>

          <div className="compare-table-card">
            <div className="compare-table-responsive">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th className="th-feature">
                      <div className="th-feature-main">
                        <span className="th-feature-title">Plan Capabilities</span>
                        <span className="th-feature-sub">Feature specifications</span>
                      </div>
                    </th>
                    
                    {/* Starter */}
                    <th className="th-tier th-tier-starter">
                      <div className="th-tier-box">
                        <span className="tier-head-title">Starter</span>
                        <span className="tier-head-credits">10,000 tasks</span>
                        <span className="tier-head-price">{isYearly ? '₹849' : '₹999'}<span className="tier-period">/mo</span></span>
                      </div>
                    </th>

                    {/* Pro (Recommended) */}
                    <th className="th-tier th-tier-pro">
                      <div className="th-tier-box pro-highlight-box">
                        <span className="pro-head-badge">Most Popular</span>
                        <span className="tier-head-title">Pro</span>
                        <span className="tier-head-credits">20,000 tasks</span>
                        <span className="tier-head-price">{isYearly ? '₹1,274' : '₹1,499'}<span className="tier-period">/mo</span></span>
                      </div>
                    </th>

                    {/* Scale */}
                    <th className="th-tier th-tier-scale">
                      <div className="th-tier-box">
                        <span className="tier-head-title">Scale</span>
                        <span className="tier-head-credits">40,000 tasks</span>
                        <span className="tier-head-price">{isYearly ? '₹2,294' : '₹2,699'}<span className="tier-period">/mo</span></span>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {COMPARE_CATEGORIES.map((cat, catIdx) => (
                    <Fragment key={`cat-group-${catIdx}`}>
                      {/* Category Header Row */}
                      <tr className="tr-category-header">
                        <td colSpan={4} className="td-category-title">
                          <div className="category-header-pill">
                            {cat.icon === 'Zap' && <Zap size={14} className="cat-icon cat-zap" />}
                            {cat.icon === 'Bot' && <Bot size={14} className="cat-icon cat-bot" />}
                            {cat.icon === 'Users' && <Users size={14} className="cat-icon cat-users" />}
                            {cat.icon === 'Headphones' && <Headphones size={14} className="cat-icon cat-headphone" />}
                            <span>{cat.category}</span>
                          </div>
                        </td>
                      </tr>

                      {/* Category Rows */}
                      {cat.rows.map((row, rowIdx) => (
                        <tr key={`row-${catIdx}-${rowIdx}`} className={rowIdx % 2 === 0 ? 'row-even' : 'row-odd'}>
                          <td className="td-feature-title">
                            <div className="td-feature-name-wrap">
                              <span className="td-feature-name">{row.feature}</span>
                              {row.sub && <span className="td-feature-desc">{row.sub}</span>}
                            </div>
                          </td>

                          {/* Starter Value */}
                          <td className="td-val td-val-starter">
                            <div className="td-val-inner">
                              {row.isCheck && row.starter === 'Included' ? (
                                <CheckCircle2 size={16} color="#059669" className="td-val-check" />
                              ) : null}
                              <span className="td-val-text">{row.starter}</span>
                            </div>
                          </td>

                          {/* Pro Value */}
                          <td className="td-val td-val-pro">
                            <div className="td-val-inner">
                              {row.isCheck ? (
                                <CheckCircle2 size={16} color="#059669" className="td-val-check" />
                              ) : null}
                              <span className="td-val-text font-bold text-dark">{row.pro}</span>
                              {row.badgePro && (
                                <span className="td-pro-save-pill">{row.badgePro}</span>
                              )}
                            </div>
                          </td>

                          {/* Scale Value */}
                          <td className="td-val td-val-scale">
                            <div className="td-val-inner">
                              {row.isCheck ? (
                                <CheckCircle2 size={16} color="#059669" className="td-val-check" />
                              ) : null}
                              <span className="td-val-text font-medium">{row.scale}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Platform Comparison Matrix (Competitor Benchmark) ─── */}
      <section className="alt-section" id="alternatives">
        <div className="compare-container">
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
                <RollButton
                  href="https://app.workflowmitra.com/signup"
                  variant="white"
                  size="md"
                  showArrow={true}
                  className="wm-compare-cta-btn"
                >
                  Start Free 14-Day Trial
                </RollButton>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 4. FAQ Section ─── */}
      <section className="pricing-faq">
        <div className="faq-container">
          <div className="faq-header">
            <span className="faq-eyebrow">Questions & Answers</span>
            <h2>Frequently Asked Questions</h2>
            <p className="faq-sub">Everything you need to know about our pricing, credits, and billing.</p>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`faq-acc-item ${isOpen ? 'open' : ''}`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="faq-acc-question">
                    <h3>{faq.q}</h3>
                    <ChevronDown className={`faq-chevron ${isOpen ? 'rotate' : ''}`} size={18} />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        className="faq-acc-answer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
