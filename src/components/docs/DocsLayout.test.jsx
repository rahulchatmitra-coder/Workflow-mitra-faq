import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DocsLayout } from './DocsLayout'

describe('DocsLayout', () => {
  it('renders its children', () => {
    render(<MemoryRouter><DocsLayout>my-content</DocsLayout></MemoryRouter>)
    expect(screen.getByText('my-content')).toBeInTheDocument()
  })

  it('renders the section nav when given one', () => {
    render(<MemoryRouter><DocsLayout sectionNav={<nav>my-nav</nav>}>c</DocsLayout></MemoryRouter>)
    expect(screen.getByText('my-nav')).toBeInTheDocument()
  })

  it('carries no chrome of its own — the real site Navigation/Footer wrap docs routes', () => {
    const { container } = render(<MemoryRouter><DocsLayout>c</DocsLayout></MemoryRouter>)
    // no docs-specific topbar, search box or back-link: those all live in <Navigation />
    expect(container.querySelector('.docs-topbar')).not.toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('drops the sidebar column when no section nav is passed, so content uses full width', () => {
    const { container } = render(<MemoryRouter><DocsLayout>c</DocsLayout></MemoryRouter>)
    expect(container.querySelector('.docs-body--no-sidenav')).toBeInTheDocument()
  })

  it('keeps the two-column grid when a section nav is passed', () => {
    const { container } = render(<MemoryRouter><DocsLayout sectionNav={<nav>n</nav>}>c</DocsLayout></MemoryRouter>)
    expect(container.querySelector('.docs-body--no-sidenav')).not.toBeInTheDocument()
  })
})
