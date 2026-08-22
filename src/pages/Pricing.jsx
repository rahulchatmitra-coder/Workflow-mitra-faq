import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import PageSeo from '../components/PageSeo';
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

  const comparisonRows = [
    {
      label: 'Credits included',
      starter: '10,000 / mo',
      pro: '20,000 / mo',
      scale: '40,000 / mo'
    },
    {
      label: 'Cost per 1,000 credits',
      starter: '₹99.90',
      pro: '₹74.95 (25% off)',
      scale: '₹67.48 (32% off)'
    },
    {
      label: 'Active workflows',
      starter: '10 workflows',
      pro: '20 workflows',
      scale: '50 workflows'
    },
    {
      label: 'Execution log history',
      starter: '7 days',
      pro: '15 days',
      scale: '30 days'
    },
    {
      label: 'Team seats',
      starter: '2 seats',
      pro: '5 seats',
      scale: '10 seats'
    },
    {
      label: 'All node types & integrations',
      starter: '✓ Included',
      pro: '✓ Included',
      scale: '✓ Included'
    },
    {
      label: 'Support tier',
      starter: 'Community support',
      pro: 'Email support',
      scale: 'Priority support'
    }
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

        {/* Header Block */}
        <motion.div 
          className="axvio-pricing-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="axvio-pricing-eyebrow">
            <span className="axvio-eyebrow-dot" />
            <span>Pricing</span>
          </div>

          <h1 className="axvio-pricing-title">
            Simple Pricing, <span className="axvio-title-gradient">Serious Results.</span>
          </h1>

          <p className="axvio-pricing-subhead">
            No hidden fees. No surprises. Just pick a plan and start automating.
          </p>

          {/* Centered Billing Switch */}
          <div className="axvio-billing-toggle-wrapper">
            <span 
              className={`axvio-billing-label ${!isYearly ? 'active' : ''}`}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </span>

            <button 
              type="button"
              className="axvio-switch-track"
              onClick={() => setIsYearly(!isYearly)}
              aria-label="Toggle annual billing"
            >
              <motion.span 
                className="axvio-switch-thumb"
                animate={{ x: isYearly ? 26 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>

            <span 
              className={`axvio-billing-label ${isYearly ? 'active' : ''}`}
              onClick={() => setIsYearly(true)}
            >
              Yearly <span className="axvio-save-tag">(Save 15%)</span>
            </span>
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
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
                <button
                  type="button"
                  className={`axvio-cta-btn ${plan.isPopular ? 'btn-popular' : 'btn-default'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckout(plan.name);
                  }}
                >
                  {getCtaText(plan)}
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── 2. Compare Tiers Section ─── */}
      <section className="pricing-compare-section">
        <div className="compare-container">
          <div className="compare-header">
            <span className="compare-eyebrow">Tier Breakdown</span>
            <h2>Compare Plan Features</h2>
            <p className="compare-sub">Everything you need to know about our credit allowances, seats, and capabilities.</p>
          </div>

          <div className="compare-table-card">
            <div className="compare-table-responsive">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th className="th-feature">Feature</th>
                    <th className="th-tier">
                      <span className="tier-head-title">Starter</span>
                      <span className="tier-head-credits">10,000 credits</span>
                      <span className="tier-head-price">₹999/mo</span>
                    </th>
                    <th className="th-tier th-tier-pro">
                      <div className="pro-head-badge">Popular</div>
                      <span className="tier-head-title">Pro</span>
                      <span className="tier-head-credits">20,000 credits</span>
                      <span className="tier-head-price">₹1,499/mo</span>
                    </th>
                    <th className="th-tier">
                      <span className="tier-head-title">Scale</span>
                      <span className="tier-head-credits">40,000 credits</span>
                      <span className="tier-head-price">₹2,699/mo</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                      <td className="td-feature-title">{row.label}</td>
                      <td className="td-val">{row.starter}</td>
                      <td className="td-val td-val-pro">{row.pro}</td>
                      <td className="td-val">{row.scale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. FAQ Section ─── */}
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
