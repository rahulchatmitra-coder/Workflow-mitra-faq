import './Solutions.css'

function Solutions() {
  const solutions = [
    {
      title: 'Sales & Marketing',
      description: 'Automate lead generation, email campaigns, and CRM updates.',
      features: ['Lead scoring', 'Email automation', 'CRM sync', 'Campaign tracking']
    },
    {
      title: 'Customer Support',
      description: 'Streamline ticket management and customer communications.',
      features: ['Ticket routing', 'Auto-responses', 'Knowledge base', 'Feedback collection']
    },
    {
      title: 'HR & Recruiting',
      description: 'Simplify hiring, onboarding, and employee management.',
      features: ['Resume screening', 'Interview scheduling', 'Onboarding automation', 'Employee surveys']
    },
    {
      title: 'Finance & Operations',
      description: 'Automate invoicing, expense tracking, and reporting.',
      features: ['Invoice generation', 'Expense approval', 'Financial reports', 'Data reconciliation']
    },
    {
      title: 'Product & Engineering',
      description: 'Enhance development workflows and project management.',
      features: ['Code reviews', 'Deployment automation', 'Bug tracking', 'Sprint planning']
    },
    {
      title: 'Data & Analytics',
      description: 'Transform data processing and reporting workflows.',
      features: ['Data pipelines', 'Report generation', 'Dashboard updates', 'Data validation']
    }
  ]

  return (
    <div className="solutions-page">
      <section className="solutions-hero">
        <div className="container">
          <h1 className="page-title">Solutions for Every Team</h1>
          <p className="page-subtitle">
            FlowMitra adapts to your team's unique needs with powerful automation solutions
          </p>
        </div>
      </section>

      <section className="solutions-grid-section">
        <div className="container">
          <div className="solutions-grid">
            {solutions.map((solution, index) => (
              <article key={index} className="solution-card">
                <h3 className="solution-title">{solution.title}</h3>
                <p className="solution-description">{solution.description}</p>
                <ul className="solution-features">
                  {solution.features.map((feature, idx) => (
                    <li key={idx}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solutions-cta">
        <div className="container">
          <h2>Ready to transform your workflow?</h2>
          <a href="/contact" className="btn btn-primary btn-large">Get Started</a>
        </div>
      </section>
    </div>
  )
}

export default Solutions
