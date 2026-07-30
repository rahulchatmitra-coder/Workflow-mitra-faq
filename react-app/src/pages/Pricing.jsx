import { Link } from 'react-router-dom'
import './Pricing.css'

function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out FlowMitra',
      features: [
        '100 tasks per month',
        '5 active workflows',
        'Basic integrations',
        'Community support',
        '1 team member'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For growing teams and businesses',
      features: [
        '10,000 tasks per month',
        'Unlimited workflows',
        'All integrations',
        'Priority support',
        '10 team members',
        'Advanced analytics',
        'Custom branding'
      ],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organizations',
      features: [
        'Unlimited tasks',
        'Unlimited workflows',
        'All integrations',
        'Dedicated support',
        'Unlimited team members',
        'Advanced security',
        'SLA guarantee',
        'Custom integrations'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ]

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="container">
          <h1 className="page-title">Simple, Transparent Pricing</h1>
          <p className="page-subtitle">
            Choose the plan that fits your needs. Upgrade or downgrade at any time.
          </p>
        </div>
      </section>

      <section className="pricing-plans">
        <div className="container">
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
              >
                {plan.highlighted && <div className="badge">Most Popular</div>}
                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">{plan.price}</span>
                    <span className="period">/{plan.period}</span>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="10" fill="#10b981" opacity="0.1"/>
                        <path d="M14 7L8.5 12.5L6 10" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/contact" 
                  className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} btn-large btn-full`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
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
