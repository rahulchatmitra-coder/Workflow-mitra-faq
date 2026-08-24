import { describe, it, expect } from 'vitest'
import { render, act } from '@testing-library/react'
import AgentsShowcase from './AgentsShowcase'

describe('AgentsShowcase', () => {
  it('titles the section by what it shows', () => {
    const { getByRole } = render(<AgentsShowcase />)
    expect(getByRole('heading', { level: 2 }).textContent).toMatch(/Top 4 Autonomous Workflows/i)
  })

  it('lists the top enterprise workflows', () => {
    const { getByText } = render(<AgentsShowcase />)
    ;[
      'Facebook Inbound Lead Routing & Multi-Channel Alert',
      'Zendesk Autonomous AI Ticket Triage & Escalation',
      'Shopify Order Fulfillment, Invoicing & WhatsApp Tracking',
      'API Health Check & Automated Incident Escalation',
    ].forEach((title) => expect(getByText(title)).toBeInTheDocument())
  })

  it('renders interactive workflow canvas cards for all 4 flows', () => {
    const { container } = render(<AgentsShowcase />)
    const cards = container.querySelectorAll('.wm-wf-card-row')
    expect(cards).toHaveLength(4)
    expect(container.querySelectorAll('.wm-wf-canvas-box')).toHaveLength(4)
  })

  it('renders metrics boxes for each workflow', () => {
    const { container } = render(<AgentsShowcase />)
    const metricBoxes = container.querySelectorAll('.wm-wf-metric-box')
    expect(metricBoxes.length).toBe(12) // 3 metrics x 4 workflows
  })
})
