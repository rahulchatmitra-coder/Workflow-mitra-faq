import React from 'react'
import { Accordion } from './Accordion'
import { HOME_FAQS } from '../data/faq-home-data'

export function FaqSection() {
  const formattedFaqs = HOME_FAQS.map((faq) => ({
    id: faq.id,
    title: faq.title,
    content: <p style={{ margin: 0 }}>{faq.content}</p>,
  }))

  return (
    <section className="wm-faq-section">
      <div className="wm-container-narrow">
        <div className="wm-section-header">
          <h2 className="wm-section-title">
            Frequently Asked Questions
          </h2>
          <p className="wm-section-desc">
            Everything you need to know about Workflow Mitra automations.
          </p>
        </div>
        <Accordion items={formattedFaqs} allowMultiple={true} />
      </div>
    </section>
  )
}
