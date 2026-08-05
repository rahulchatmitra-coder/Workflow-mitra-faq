import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

const renderHome = () => render(<MemoryRouter><Home /></MemoryRouter>)

describe('Home — popular workflows section', () => {
  it('renders the four templates', () => {
    const { getByText } = renderHome()
    ;[
      'Lead → WhatsApp in 5 seconds',
      'Paid order → invoice → WhatsApp',
      'AI drafts, you approve',
      'Support ticket → AI triage',
    ].forEach((title) => expect(getByText(title)).toBeInTheDocument())
  })

  it('draws a real node chain on every card', () => {
    const { container } = renderHome()
    const chains = container.querySelectorAll('.templates-grid .nc')
    expect(chains).toHaveLength(4)
    chains.forEach((chain) => expect(chain.querySelectorAll('.nc-disc')).toHaveLength(4))
  })

  it('places the templates section before the customer logos', () => {
    const { container } = renderHome()
    const templates = container.querySelector('.templates-section')
    const logos = container.querySelector('.customer-logos, .customer-logos-section')
    expect(templates).toBeInTheDocument()
    expect(logos).toBeInTheDocument()
    // Node.DOCUMENT_POSITION_FOLLOWING === 4
    expect(templates.compareDocumentPosition(logos) & 4).toBeTruthy()
  })

  it('shows no zero-value usage counts', () => {
    const { container } = renderHome()
    expect(container.querySelector('.templates-section').textContent).not.toMatch(/0 uses/)
  })

  it('offers only categories that match a template', () => {
    const { container } = renderHome()
    const tabs = [...container.querySelectorAll('.template-tabs .tab-btn')].map((b) => b.textContent.trim())
    expect(tabs).toEqual(['All', 'Lead capture', 'E-commerce', 'AI', 'Customer support'])
  })

  it('titles the section by what the reader gets, not by what it is called', () => {
    const { getByText, queryByText } = renderHome()
    expect(getByText('Start from a workflow that already works')).toBeInTheDocument()
    expect(getByText(/Four of the most-used templates/)).toBeInTheDocument()
    expect(queryByText('Featured Templates')).toBeNull()
  })
})
