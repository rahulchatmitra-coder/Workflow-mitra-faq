import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SectionNav } from './SectionNav'

const items = [{ id: 'usecases', label: 'Real use cases' }, { id: 'faq', label: 'FAQ' }]

beforeEach(() => {
  document.body.innerHTML = '<div id="usecases"></div><div id="faq"></div>'
  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  }
})

describe('SectionNav', () => {
  it('renders one link per item, pointing at its anchor', () => {
    render(<SectionNav items={items} />)
    expect(screen.getByRole('link', { name: 'Real use cases' })).toHaveAttribute('href', '#usecases')
    expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '#faq')
  })

  it('marks the first item active by default', () => {
    render(<SectionNav items={items} />)
    expect(screen.getByRole('link', { name: 'Real use cases' })).toHaveClass('active')
  })
})
