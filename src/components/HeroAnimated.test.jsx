import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HeroAnimated from './HeroAnimated'

const renderHero = () =>
  render(<MemoryRouter><HeroAnimated /></MemoryRouter>)

describe('HeroAnimated', () => {
  it('renders the main headline, subtitle, and eyebrow pill', () => {
    const { getByText } = renderHero()
    expect(getByText(/Build & Scale AI Workflows/i)).toBeInTheDocument()
    expect(getByText(/Next-Gen AI Workflow Automation/i)).toBeInTheDocument()
    expect(getByText(/Connect your SaaS apps, orchestrate autonomous AI reasoning agents/i)).toBeInTheDocument()
  })

  it('renders primary and secondary calls to action with valid links', () => {
    const { getByRole } = renderHero()
    const primaryBtn = getByRole('link', { name: /Start Building Free/i })
    const secondaryBtn = getByRole('link', { name: /Get 1-on-1 Automation Help/i })

    expect(primaryBtn).toBeInTheDocument()
    expect(primaryBtn).toHaveAttribute('href', 'https://app.workflowmitra.com/signup')

    expect(secondaryBtn).toBeInTheDocument()
    expect(secondaryBtn).toHaveAttribute('href', '/contact')
  })

  it('renders trust reassurance badges', () => {
    const { getByText } = renderHero()
    expect(getByText(/Free 14-day trial/i)).toBeInTheDocument()
    expect(getByText(/No credit card required/i)).toBeInTheDocument()
    expect(getByText(/1-on-1 Expert setup help/i)).toBeInTheDocument()
  })

  it('renders all 5 workflow pipeline stages', () => {
    const { container } = renderHero()
    const nodeCards = container.querySelectorAll('.canvas-node-card')
    expect(nodeCards).toHaveLength(5)
  })

  it('renders the interactive workflow mockup with simulation button', () => {
    const { getByRole, getByText } = renderHero()
    const testBtn = getByRole('button', { name: /Run workflow simulation/i })
    expect(testBtn).toBeInTheDocument()

    // Clicking test button activates simulation
    fireEvent.click(testBtn)
    expect(getByText(/Simulating/i)).toBeInTheDocument()
  })

  it('renders live execution telemetry and inspector box', () => {
    const { getByText, container } = renderHero()
    expect(container.querySelector('.canvas-telemetry-banner')).toBeInTheDocument()
    expect(getByText(/Live Execution Payload & AI Output/i)).toBeInTheDocument()
  })
})
