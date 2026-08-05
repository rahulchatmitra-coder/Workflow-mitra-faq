import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import NodeChain from './NodeChain'

describe('NodeChain', () => {
  it('renders one disc per node', () => {
    const { container } = render(<NodeChain nodes={['shopify', 'zoho', 'whatsapp', 'google-sheets']} />)
    expect(container.querySelectorAll('.nc-disc')).toHaveLength(4)
  })

  it('renders a connector between each pair, never a trailing one', () => {
    const { container } = render(<NodeChain nodes={['gmail', 'ai', 'approval', 'gmail']} />)
    expect(container.querySelectorAll('.nc-link')).toHaveLength(3)
  })

  it('colours each disc with the product brand hex', () => {
    const { container } = render(<NodeChain nodes={['whatsapp', 'if']} />)
    const discs = container.querySelectorAll('.nc-disc')
    expect(discs[0].style.background).toBe('rgb(37, 211, 102)')  // #25D366
    expect(discs[1].style.background).toBe('rgb(255, 158, 67)')  // #ff9e43
  })

  it('marks only the first node as the trigger', () => {
    const { container } = render(<NodeChain nodes={['shopify', 'zoho', 'whatsapp']} />)
    const bolts = container.querySelectorAll('.nc-bolt')
    expect(bolts).toHaveLength(1)
    expect(container.querySelectorAll('.nc-disc')[0].querySelector('.nc-bolt')).toBeInTheDocument()
  })

  it('renders nothing for an empty chain', () => {
    const { container } = render(<NodeChain nodes={[]} />)
    expect(container.querySelectorAll('.nc-disc')).toHaveLength(0)
  })

  it('exposes the node type for assertions and styling', () => {
    const { container } = render(<NodeChain nodes={['zendesk', 'ai']} />)
    expect(container.querySelector('[data-node-type="zendesk"]')).toBeInTheDocument()
    expect(container.querySelector('[data-node-type="ai"]')).toBeInTheDocument()
  })
})
