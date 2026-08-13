import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HeroAnimated from './HeroAnimated'

const renderHero = () =>
  render(<MemoryRouter><HeroAnimated /></MemoryRouter>)

describe('HeroAnimated', () => {
  it('renders four clusters', () => {
    const { container } = renderHero()
    expect(container.querySelectorAll('.agent-decoration-wrapper')).toHaveLength(4)
  })

  it('renders 24 real logo chips across the clusters', () => {
    const { container } = renderHero()
    const chips = container.querySelectorAll('.agent-chip')
    expect(chips).toHaveLength(24)
    chips.forEach((chip) => expect(chip.querySelector('svg')).toBeInTheDocument())
  })

  it('renders one named cursor per cluster', () => {
    const { getByText } = renderHero()
    ;['Katherine', 'Aron', 'Marcelo', 'Rahul'].forEach((name) =>
      expect(getByText(name)).toBeInTheDocument()
    )
  })

  it('uses all four mascot silhouettes', () => {
    const { container } = renderHero()
    ;[0, 1, 2, 3].forEach((i) =>
      expect(container.querySelector(`[data-mascot="${i}"]`)).toBeInTheDocument()
    )
  })

  it('keeps the headline and both calls to action', () => {
    const { getByText, getByRole } = renderHero()
    expect(getByText(/No coding required/i)).toBeInTheDocument()
    expect(getByRole('link', { name: /Start Building Free/ })).toBeInTheDocument()
    expect(getByRole('link', { name: /Get Help Building My Workflow/ })).toBeInTheDocument()
  })

  it('keeps the decorations hidden below the desktop breakpoint', () => {
    const { container } = renderHero()
    expect(container.querySelector('.hero-decorations').classList.contains('desktop-only')).toBe(true)
  })

  it('renders a real FlowCanvas product panel alongside the existing mascot decorations', () => {
    const { container } = renderHero()
    expect(container.querySelectorAll('.agent-decoration-wrapper')).toHaveLength(4)
    expect(container.querySelector('.hero-canvas-panel .fc-canvas')).toBeInTheDocument()
    expect(container.querySelectorAll('.hero-canvas-panel .fc-node').length).toBeGreaterThan(0)
  })
})
