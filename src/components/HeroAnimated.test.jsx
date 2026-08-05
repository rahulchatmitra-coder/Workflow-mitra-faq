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
    expect(getByText(/by your team/)).toBeInTheDocument()
    expect(getByRole('link', { name: /Start building for free/ })).toBeInTheDocument()
    expect(getByRole('link', { name: /Watch demo/ })).toBeInTheDocument()
  })

  it('keeps the decorations hidden below the desktop breakpoint', () => {
    const { container } = renderHero()
    expect(container.querySelector('.hero-decorations').classList.contains('desktop-only')).toBe(true)
  })
})
