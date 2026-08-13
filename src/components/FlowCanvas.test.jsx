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
  it('renders all five nodes with their labels', () => {
    const { container, getByText } = render(<FlowCanvas nodes={NODES} />)
    expect(container.querySelectorAll('.fc-node')).toHaveLength(5)
    expect(getByText('Urgent?')).toBeInTheDocument()
  })

  it('renders four wires', () => {
    const { container } = render(<FlowCanvas nodes={NODES} />)
    expect(container.querySelectorAll('.fc-wire')).toHaveLength(4)
  })

  it('marks exactly one node as executing', () => {
    const { container } = render(<FlowCanvas nodes={NODES} step={2} />)
    const on = container.querySelectorAll('.fc-node.is-on')
    expect(on).toHaveLength(1)
    expect(on[0].getAttribute('data-node')).toBe('n3')
  })

  it('treats earlier nodes as done and later ones as idle', () => {
    const { container } = render(<FlowCanvas nodes={NODES} step={2} />)
    expect(container.querySelector('[data-node="n1"]').classList.contains('is-done')).toBe(true)
    expect(container.querySelector('[data-node="n5"]').classList.contains('is-idle')).toBe(true)
  })

  it('shows no payload on the first step and the right one after', () => {
    const { container: a } = render(<FlowCanvas nodes={NODES} payloads={PAYLOADS} step={0} />)
    expect(a.querySelector('.fc-payload')).toBeNull()

    const { container: b } = render(<FlowCanvas nodes={NODES} payloads={PAYLOADS} step={2} />)
    expect(b.querySelector('.fc-payload').textContent).toBe('subject, body')
  })

  it('renders a branch tag per entry', () => {
    const { container, getByText } = render(
      <FlowCanvas nodes={NODES} tags={{ n4: 'urgent', n5: 'else' }} />
    )
    expect(container.querySelectorAll('.fc-tag')).toHaveLength(2)
    expect(getByText('urgent')).toBeInTheDocument()
  })

  it('colours each disc from the product registry', () => {
    const { container } = render(<FlowCanvas nodes={NODES} />)
    const disc = container.querySelector('[data-node="n3"] .fc-disc')
    expect(disc.style.background).toBe('rgb(255, 158, 67)')  // #ff9e43
  })

  it('puts the trigger bolt on the first node only', () => {
    const { container } = render(<FlowCanvas nodes={NODES} />)
    expect(container.querySelectorAll('.fc-bolt')).toHaveLength(1)
    expect(container.querySelector('[data-node="n1"] .fc-bolt')).toBeInTheDocument()
  })
})
