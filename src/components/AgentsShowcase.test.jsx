import { describe, it, expect } from 'vitest'
import { render, act } from '@testing-library/react'
import AgentsShowcase from './AgentsShowcase'

describe('AgentsShowcase', () => {
  it('titles the section by what it shows', () => {
    const { getByRole } = render(<AgentsShowcase />)
    expect(getByRole('heading', { level: 2 }).textContent).toMatch(/Popular automations/)
  })

  it('lists the five automations', () => {
    const { getByText } = render(<AgentsShowcase />)
    ;['Support Agent', 'Meeting automation', 'Calling automation',
      'Data analysis automation', 'Lead capture → conversion']
      .forEach((n) => expect(getByText(n)).toBeInTheDocument())
  })

  it('renders the flow canvas rather than a chat transcript', () => {
    const { container } = render(<AgentsShowcase />)
    expect(container.querySelector('.fc-canvas')).toBeInTheDocument()
    expect(container.querySelectorAll('.fc-node')).toHaveLength(5)
    expect(container.querySelector('.chat-card')).toBeNull()
  })

  it('shows the live run status with a step counter', () => {
    const { container } = render(<AgentsShowcase />)
    expect(container.querySelector('.sc-pill')).toBeInTheDocument()
    expect(container.querySelector('.sc-now').textContent).toMatch(/Step 1 of 5/)
  })

  it('shows the first automation active on mount', () => {
    const { container } = render(<AgentsShowcase />)
    const active = container.querySelectorAll('.agent-item.active')
    expect(active).toHaveLength(1)
    expect(active[0].textContent).toMatch(/Support Agent/)
  })

  it('switches automation when a row is clicked', () => {
    const { container, getByText } = render(<AgentsShowcase />)
    act(() => { getByText('Calling automation').closest('button').click() })
    expect(container.querySelector('.agent-item.active').textContent).toMatch(/Calling automation/)
  })

  it('names the running flow in the card header', () => {
    const { container } = render(<AgentsShowcase />)
    expect(container.querySelector('.fcard-title').textContent).toBe('Support ticket triage')
  })
})
