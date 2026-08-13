import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import AgentDecoration from './AgentDecoration'

const LOGOS = ['facebook', 'googlegemini', 'hubspot', 'whatsapp', 'googlesheets', 'telegram']

describe('AgentDecoration', () => {
  it('renders one chip per logo', () => {
    const { container } = render(<AgentDecoration logos={LOGOS} mascot={0} />)
    expect(container.querySelectorAll('.agent-chip')).toHaveLength(6)
  })

  it('renders a real svg mark inside every chip, never a text letter', () => {
    const { container } = render(<AgentDecoration logos={LOGOS} mascot={0} />)
    container.querySelectorAll('.agent-chip').forEach((chip) => {
      expect(chip.querySelector('svg')).toBeInTheDocument()
      expect(chip.textContent).toBe('')
    })
  })

  it('marks the last two chips as ambient', () => {
    const { container } = render(<AgentDecoration logos={LOGOS} mascot={0} />)
    const chips = container.querySelectorAll('.agent-chip')
    expect(chips[3].classList.contains('is-ambient')).toBe(false)
    expect(chips[4].classList.contains('is-ambient')).toBe(true)
    expect(chips[5].classList.contains('is-ambient')).toBe(true)
  })

  it('renders the mascot silhouette selected by index', () => {
    const { container } = render(<AgentDecoration logos={LOGOS} mascot={2} />)
    expect(container.querySelector('[data-mascot="2"]')).toBeInTheDocument()
  })

  it('renders a cursor with its name when given one', () => {
    const { getByText } = render(
      <AgentDecoration logos={LOGOS} mascot={0} cursor={{ name: 'Katherine', color: '#E8388A' }} />
    )
    expect(getByText('Katherine')).toBeInTheDocument()
  })

  it('renders no cursor when given none', () => {
    const { container } = render(<AgentDecoration logos={LOGOS} mascot={0} />)
    expect(container.querySelector('.agent-cursor')).toBeNull()
  })

  it('skips a logo with no brand mark rather than rendering a placeholder', () => {
    const { container } = render(<AgentDecoration logos={['whatsapp', 'not-a-real-brand-xyz']} mascot={0} />)
    expect(container.querySelectorAll('.agent-chip')).toHaveLength(1)
  })

  it('applies the float delay as a custom property', () => {
    const { container } = render(<AgentDecoration logos={LOGOS} mascot={0} delay={1.5} />)
    expect(container.querySelector('.agent-decoration-wrapper').style.getPropertyValue('--float-delay')).toBe('1.5s')
  })
})
