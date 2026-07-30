import './About.css'

function About() {
  const team = [
    { name: 'Sarah Chen', role: 'CEO & Co-Founder', bio: 'Former VP of Product at TechCorp' },
    { name: 'Michael Rodriguez', role: 'CTO & Co-Founder', bio: 'Ex-Engineering Lead at StartupHub' },
    { name: 'Jessica Park', role: 'Head of Design', bio: 'Previously at Innovation Labs' },
    { name: 'David Kim', role: 'Head of Engineering', bio: 'Former Senior Engineer at CloudTech' }
  ]

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1 className="page-title">About FlowMitra</h1>
          <p className="page-subtitle">
            We're on a mission to make automation accessible to every team
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              FlowMitra was founded in 2023 with a simple belief: automation shouldn't require coding expertise. 
              We've built a platform that empowers teams of all sizes to automate their workflows without writing a single line of code.
            </p>
            <p>
              Today, over 10,000 teams use FlowMitra to automate everything from customer support to data analysis. 
              We're backed by leading investors and continue to grow rapidly.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>🚀 Innovation</h3>
              <p>We constantly push boundaries to deliver cutting-edge automation solutions.</p>
            </div>
            <div className="value-card">
              <h3>🤝 Customer First</h3>
              <p>Your success is our success. We're here to help you achieve your goals.</p>
            </div>
            <div className="value-card">
              <h3>🎯 Simplicity</h3>
              <p>Complex problems deserve simple solutions. We make automation easy.</p>
            </div>
            <div className="value-card">
              <h3>🌍 Transparency</h3>
              <p>We believe in honest communication and building trust with our users.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="40" fill="#f0f0f0"/>
                    <circle cx="40" cy="32" r="12" fill="#d0d0d0"/>
                    <path d="M20 64C20 52 28 44 40 44C52 44 60 52 60 64" fill="#d0d0d0"/>
                  </svg>
                </div>
                <h3>{member.name}</h3>
                <div className="role">{member.role}</div>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <h2>Join Us on Our Journey</h2>
          <p>We're always looking for talented people to join our team</p>
          <a href="/contact" className="btn btn-primary btn-large">Get in Touch</a>
        </div>
      </section>
    </div>
  )
}

export default About
