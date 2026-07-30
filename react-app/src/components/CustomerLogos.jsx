import './CustomerLogos.css'

export default function CustomerLogos() {
  const logos = [
    { name: 'Samsara', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Samsara_logo.svg' },
    { name: 'Webflow', src: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Webflow_logo.svg' },
    { name: 'Ramp', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Ramp_Logo.svg' },
    { name: 'Instacart', src: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Instacart_logo_and_wordmark.svg' },
    { name: 'Shopify', src: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg' },
    { name: 'Gusto', src: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Gusto_logo.svg' },
  ]

  return (
    <section className="customer-logos-section">
      <div className="container">
        <div className="logos-wrapper">
          {logos.map((logo, idx) => (
            <div key={idx} className="logo-item">
              <img src={logo.src} alt={`${logo.name} logo`} className="customer-logo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
