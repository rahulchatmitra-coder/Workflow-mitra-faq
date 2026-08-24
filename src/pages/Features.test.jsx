import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Features from './Features'
import { MODEL_PROVIDERS } from '../data/aiSectionData'

const renderPage = () => render(<MemoryRouter><Features /></MemoryRouter>)

describe('Features', () => {
  it('renders the primary hero heading and both CTAs', () => {
    const { getByText, getAllByRole } = renderPage()
    expect(getByText('Powerful automation. Without the complexity.')).toBeInTheDocument()
    expect(getAllByRole('link', { name: /Start Building Free/i }).length).toBeGreaterThan(0)
    expect(getAllByRole('link', { name: /Get Help Building My Workflow/i }).length).toBeGreaterThan(0)
  })

  it('links CTAs to real, already-implemented destinations', () => {
    const { getAllByRole } = renderPage()
    getAllByRole('link', { name: /Start Building Free/i }).forEach((cta) =>
      expect(cta).toHaveAttribute('href', 'https://app.workflowmitra.com/signup')
    )
    getAllByRole('link', { name: /Get Help Building My Workflow/i }).forEach((cta) =>
      expect(cta).toHaveAttribute('href', '/automation-help')
    )
  })

  it('renders the hero product visual as a real FlowCanvas, not an image', () => {
    const { container } = renderPage()
    expect(container.querySelector('.ft-hero-visual .fc-canvas')).toBeInTheDocument()
  })

  it('frames the hero canvas in browser chrome and floating capability chips', () => {
    const { container, getByText } = renderPage()
    expect(container.querySelector('.ft-hero-visual .browser-bar')).toBeInTheDocument()
    expect(container.querySelectorAll('.ft-hero-visual .browser-dot').length).toBe(3)
    expect(getByText('Retries automatically')).toBeInTheDocument()
    expect(getByText('5 AI providers')).toBeInTheDocument()
  })

  it('only shows the 8 verified live integrations, never a coming-soon backend node as if it were live', () => {
    const { queryAllByText, queryByText } = renderPage()
    ;['WhatsApp', 'Slack', 'Telegram', 'Gmail', 'Google Sheets', 'Shopify', 'HTTP Request', 'AI Agent'].forEach((label) =>
      expect(queryAllByText(label).length).toBeGreaterThanOrEqual(1)
    )
    // Postgres/MySQL/MongoDB/Redis/Discord/HubSpot are real engine nodes but are
    // marked 'coming-soon' on /integrations — must not be shown here as available.
    ;['Postgres', 'MySQL', 'MongoDB', 'Redis', 'HubSpot'].forEach((label) =>
      expect(queryByText(label)).toBeNull()
    )
  })

  it('names only the AI providers verified against the engine source', () => {
    const { getByText } = renderPage()
    expect(getByText(MODEL_PROVIDERS.join(' · '), { exact: false })).toBeInTheDocument()
  })

  it('renders an FAQPage schema block with all 9 questions', () => {
    const { container } = renderPage()
    const faq = container.querySelector('[itemType="https://schema.org/FAQPage"]')
    expect(faq).toBeInTheDocument()
    expect(faq.querySelectorAll('[itemType="https://schema.org/Question"]').length).toBe(9)
  })

  it('does not invent an uptime, certification, or fake customer-count claim', () => {
    const { container } = renderPage()
    const text = container.textContent
    expect(text).not.toMatch(/99\.9+%/)
    expect(text).not.toMatch(/SOC ?2/i)
    expect(text).not.toMatch(/bank-grade|military-grade/i)
    expect(text).not.toMatch(/\d+,\d+\+? (customers|businesses|teams)/i)
  })

  it('has exactly one h1', () => {
    const { container } = renderPage()
    expect(container.querySelectorAll('h1').length).toBe(1)
  })
})
