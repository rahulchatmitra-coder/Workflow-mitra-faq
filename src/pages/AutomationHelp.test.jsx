import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AutomationHelp from './AutomationHelp'

const renderPage = () => render(<MemoryRouter><AutomationHelp /></MemoryRouter>)

describe('AutomationHelp', () => {
  it('renders the primary hero heading and both CTAs', () => {
    const { getByText, getAllByText } = renderPage()
    expect(getByText('Need help building your automation?')).toBeInTheDocument()
    expect(getAllByText('Tell Us What You Want to Automate').length).toBeGreaterThan(0)
    expect(getAllByText('Start Building Free').length).toBeGreaterThan(0)
  })

  it('links the primary CTA to the contact page with automation-help context', () => {
    const { getAllByText } = renderPage()
    const ctas = getAllByText('Tell Us What You Want to Automate')
    ctas.forEach((cta) => expect(cta.closest('a')).toHaveAttribute('href', '/contact?from=automation-help'))
  })

  it('draws a real node chain for every workflow example', () => {
    const { container } = renderPage()
    const chains = container.querySelectorAll('.ah-example-chain .nc')
    expect(chains.length).toBe(4)
    chains.forEach((chain) => expect(chain.querySelectorAll('.nc-disc').length).toBeGreaterThan(0))
  })

  it('renders all four workflow example categories', () => {
    const { getByText } = renderPage()
    ;['Lead Follow-Up', 'Appointment', 'E-commerce', 'Customer Support'].forEach((title) =>
      expect(getByText(title)).toBeInTheDocument()
    )
  })

  it('renders an FAQPage schema block', () => {
    const { container } = renderPage()
    const faq = container.querySelector('[itemType="https://schema.org/FAQPage"]')
    expect(faq).toBeInTheDocument()
    expect(faq.querySelectorAll('[itemType="https://schema.org/Question"]').length).toBe(7)
  })

  it('does not invent an SLA, guarantee, or fake customer count', () => {
    const { container } = renderPage()
    const text = container.textContent
    expect(text).not.toMatch(/guarantee/i)
    expect(text).not.toMatch(/\d+,\d+\+? (customers|businesses|teams) trust/i)
    expect(text).not.toMatch(/24\/7/)
  })

  it('offers exactly one path to build it yourself and one to get expert help', () => {
    const { getByText } = renderPage()
    expect(getByText('Build it yourself')).toBeInTheDocument()
    expect(getByText('Get expert help')).toBeInTheDocument()
  })
})
