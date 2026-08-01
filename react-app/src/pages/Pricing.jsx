import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

function Pricing() {
  const [activePlanOrder, setActivePlanOrder] = useState(0);

  const handleCheckout = (planName) => {
    // TODO: Wire up actual Stripe Checkout / Billing API flow here
    alert(`Initiating checkout/upgrade flow for: ${planName}`);
  };

  const getCtaText = (plan) => {
    if (plan.order > activePlanOrder) {
      return `Upgrade to ${plan.name}`;
    }
    if (plan.order < activePlanOrder) {
      return `Downgrade to ${plan.name}`;
    }
    return `Add a card to keep ${plan.name}`;
  };

  const plans = [
    {
      order: 0,
      name: 'Starter',
      price: '₹999',
      period: 'mo',
      trialNote: 'Free for 11 days more',
      features: [
        <><strong key="1">10,000</strong> credits / month (1 credit = 1 run)</>,
        'Unlimited active workflows',
        <>Up to <strong key="2">5</strong> team seats</>,
        'All node types & integrations',
        'Full-text execution log search',
        'Community support'
      ]
    },
    {
      order: 1,
      name: 'Growth',
      price: '₹2,500',
      period: 'mo',
      features: [
        <><strong key="3">30,000</strong> credits / month</>,
        'Everything in Starter',
        <>Up to <strong key="4">10</strong> team seats</>,
        'High-priority workflow execution',
        'Email support'
      ]
    },
    {
      order: 2,
      name: 'Scale',
      price: '₹5,000',
      period: 'mo',
      features: [
        <><strong key="5">70,000</strong> credits / month</>,
        'Everything in Growth',
        <>Up to <strong key="6">25</strong> team seats</>,
        'Higher rate limits',
        'Priority support'
      ]
    },
    {
      order: 3,
      name: 'Enterprise',
      price: '₹10,000',
      period: 'mo',
      features: [
        <><strong key="7">200,000</strong> credits / month</>,
        'Everything in Scale',
        <>Up to <strong key="8">100</strong> team seats</>,
        'Dedicated support & onboarding',
        'SLA available'
      ]
    }
  ];

  return (
    <div className="pricing-page">
      <section className="pricing-section">
        <div className="pricing-header">
          <span className="pricing-eyebrow">Pricing</span>
          <h1>Simple pricing that scales with your team</h1>
          <p className="pricing-subhead">
            Start free on Starter, then upgrade whenever your workflows need more room to run.
          </p>
        </div>



        <div className="pricing-plans-grid">
          {plans.map((plan) => {
            const isActive = plan.order === activePlanOrder;
            
            return (
              <div 
                key={plan.order} 
                className={`pricing-plan ${isActive ? 'active' : ''}`}
                onClick={() => setActivePlanOrder(plan.order)}
                style={{ cursor: 'pointer' }}
              >
                <div className="plan-top">
                  <span className="plan-name">{plan.name}</span>
                  {isActive && plan.order === 0 && <span className="plan-badge">Your trial</span>}
                  {isActive && plan.order > 0 && <span className="plan-badge">Current Plan</span>}
                </div>
                
                <div className="price-row">
                  <span className="price">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
                
                {plan.trialNote && isActive ? (
                  <p className="trial-note">{plan.trialNote}</p>
                ) : (
                  <div className="price-spacer"></div>
                )}
                
                <ul className="plan-features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <svg className="plan-check" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <circle cx="10" cy="10" r="10" fill="var(--green-soft)" />
                        <path d="M6 10.2l2.6 2.6L14.2 7" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className="plan-cta"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent clicking the button from also clicking the card
                    handleCheckout(plan.name);
                  }}
                >
                  {getCtaText(plan)}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pricing-faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Can I change plans anytime?</h3>
              <p>Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept all major credit cards, PayPal, and wire transfers for enterprise plans.</p>
            </div>
            <div className="faq-item">
              <h3>Is there a free trial?</h3>
              <p>Yes! All paid plans come with a 14-day free trial. No credit card required.</p>
            </div>
            <div className="faq-item">
              <h3>What happens if I exceed my task limit?</h3>
              <p>Your workflows will continue to run. We'll notify you and you can upgrade to a higher plan.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pricing
