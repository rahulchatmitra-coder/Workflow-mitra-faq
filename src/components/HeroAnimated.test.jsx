import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HeroAnimated from './HeroAnimated'

const renderHero = () =>
  render(<MemoryRouter><HeroAnimated /></MemoryRouter>)

describe('HeroAnimated', () => {
  it('renders the main headline, subtitle, and CTA buttons', () => {
    const { getByText, getByRole } = renderHero()
    expect(getByText(/Run your business on AI workflows like a pro/i)).toBeInTheDocument()
    expect(getByText(/All-in-one AI automation platform to connect your apps/i)).toBeInTheDocument()

    const primaryBtn = getByRole('link', { name: /Start Building Free/i })
    const secondaryBtn = getByRole('link', { name: /Get 1-on-1 Help/i })

    expect(primaryBtn).toBeInTheDocument()
    expect(primaryBtn).toHaveAttribute('href', 'https://app.workflowmitra.com/signup')

    expect(secondaryBtn).toBeInTheDocument()
    expect(secondaryBtn).toHaveAttribute('href', '/contact')
  })

  it('renders the app mockup with sidebar and workflow items', () => {
    const { container, getByText } = renderHero()
    expect(container.querySelector('.app-mockup-sidebar')).toBeInTheDocument()
    expect(getByText(/ChatMitra/i)).toBeInTheDocument()

    const workflowRows = container.querySelectorAll('.workflow-card-row')
    expect(workflowRows.length).toBe(7)
  })

  it('renders search input and workflow controls in the mockup', () => {
    const { getByPlaceholderText } = renderHero()
    expect(getByPlaceholderText(/Search workflows\.\.\./i)).toBeInTheDocument()
  })
})
