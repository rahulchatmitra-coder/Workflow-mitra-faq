import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import IntegrationsHub from './IntegrationsHub'

describe('IntegrationsHub (Docs FAQ Portal)', () => {
  it('sets its own page title', () => {
    render(
      <MemoryRouter>
        <IntegrationsHub />
      </MemoryRouter>
    )
    expect(document.title).toBe('Documentation & Help Center — WorkflowMitra')
  })

  it('renders the Hero headline and search trigger', () => {
    render(
      <MemoryRouter>
        <IntegrationsHub />
      </MemoryRouter>
    )
    expect(screen.getByText('Hi, how can we help?')).toBeInTheDocument()
    expect(
      screen.getByText('Search 40+ integrations, API keys, webhooks, or ask a question...')
    ).toBeInTheDocument()
  })

  it('renders the FAQ Guide section and categories', () => {
    render(
      <MemoryRouter>
        <IntegrationsHub />
      </MemoryRouter>
    )
    expect(screen.getByText('Workflow Mitra FAQ Guide')).toBeInTheDocument()
    expect(
      screen.getByText('Essential Guide to OpenAI GPT-4o Autonomous AI Agents')
    ).toBeInTheDocument()
  })

  it('renders the interactive workflow canvas builder and FAQs', () => {
    render(
      <MemoryRouter>
        <IntegrationsHub />
      </MemoryRouter>
    )
    expect(screen.getByText('Workflow Automation Builder')).toBeInTheDocument()
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
  })
})
