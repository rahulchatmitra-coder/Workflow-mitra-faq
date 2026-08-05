import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import IntegrationDocPage from './IntegrationDocPage'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes><Route path="/docs/integrations/:slug" element={<IntegrationDocPage />} /></Routes>
    </MemoryRouter>
  )
}

describe('IntegrationDocPage', () => {
  it('renders the matching integration for a live slug', () => {
    renderAt('/docs/integrations/slack')
    expect(screen.getByRole('heading', { level: 1, name: 'Slack' })).toBeInTheDocument()
  })

  it('renders a not-found state for an unknown slug — its own h1, not an integration name', () => {
    renderAt('/docs/integrations/not-a-real-app')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/couldn.t find that/i)
  })

  it('renders a not-found state for a real but coming-soon slug (no content file yet)', () => {
    renderAt('/docs/integrations/discord')
    expect(screen.getByText(/couldn.t find that/i)).toBeInTheDocument()
  })
})
