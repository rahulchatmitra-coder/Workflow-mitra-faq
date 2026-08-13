import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import IntegrationsHub from './IntegrationsHub'

describe('IntegrationsHub', () => {
  it('sets its own page title (not the marketing homepage title)', () => {
    render(<MemoryRouter><IntegrationsHub /></MemoryRouter>)
    expect(document.title).toBe('Integrations & Apps — WorkflowMitra Docs')
  })

  it('renders a card for every registry entry', () => {
    render(<MemoryRouter><IntegrationsHub /></MemoryRouter>)
    expect(screen.getByText('Slack')).toBeInTheDocument()
    expect(screen.getByText('Discord')).toBeInTheDocument()
  })

  it('marks live integrations as clickable links and coming-soon ones as not', () => {
    render(<MemoryRouter><IntegrationsHub /></MemoryRouter>)
    expect(screen.getByRole('link', { name: /slack/i })).toHaveAttribute('href', '/docs/integrations/slack')
    expect(screen.queryByRole('link', { name: /^discord/i })).not.toBeInTheDocument()
    expect(screen.getAllByText('Coming soon').length).toBeGreaterThan(0)
  })

  it('filters the grid as the user types in search', async () => {
    render(<MemoryRouter><IntegrationsHub /></MemoryRouter>)
    const inputs = screen.getAllByRole('textbox')
    await userEvent.type(inputs[inputs.length - 1], 'telegram')
    expect(screen.getByText('Telegram')).toBeInTheDocument()
    expect(screen.queryByText('Google Sheets')).not.toBeInTheDocument()
  })

  it('filters the grid by category chip', async () => {
    render(<MemoryRouter><IntegrationsHub /></MemoryRouter>)
    await userEvent.click(screen.getByRole('button', { name: 'AI' }))
    expect(screen.getByText('AI Agent')).toBeInTheDocument()
    expect(screen.queryByText('Slack')).not.toBeInTheDocument()
  })
})
