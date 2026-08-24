import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import FlowCanvas from './FlowCanvas'

const NODES = {
  n1: { type: 'zendesk', label: 'New ticket' },
  n2: { type: 'ai', label: 'AI triage' },
  n3: { type: 'if', label: 'Urgent?' },
  n4: { type: 'slack', label: 'Alert #support' },
  n5: { type: 'assign', label: 'Assign agent' },
}
const PAYLOADS = ['ticket_id: 8841', 'subject, body', 'urgency: "high"', '→ #support-urgent']

describe('FlowCanvas', () => {
  it('renders all five flow nodes with their labels', () => {
    const { getByText } = render(<FlowCanvas />)
    ;['On Webhook', 'IF Filter', 'HubSpot CRM', 'WhatsApp', 'Slack Alert'].forEach((label) => {
      expect(getByText(label)).toBeInTheDocument()
    })
  })

  it('renders svg connecting wires', () => {
    const { container } = render(<FlowCanvas />)
    const wires = container.querySelectorAll('svg path')
    expect(wires.length).toBeGreaterThanOrEqual(4)
  })

  it('renders with external step control', () => {
    const { container } = render(<FlowCanvas step={2} />)
    expect(container.querySelector('.fc-canvas')).toBeInTheDocument()
  })
})
