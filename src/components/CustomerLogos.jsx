import React from 'react'

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
    <section className="py-8 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-8 flex-wrap md:flex-nowrap opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {logos.map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center p-2 flex-1 min-w-[120px]">
              <img 
                src={logo.src} 
                alt={`${logo.name} logo`} 
                className="max-h-7 w-auto object-contain hover:scale-105 transition-transform" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
