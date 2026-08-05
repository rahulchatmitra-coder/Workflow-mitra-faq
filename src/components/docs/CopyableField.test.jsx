import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CopyableField } from './CopyableField'

beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
})

describe('CopyableField', () => {
  it('renders the label and value', () => {
    render(<CopyableField label="Webhook URL" value="hooks.slack.com/services/xxx" />)
    expect(screen.getByText('Webhook URL')).toBeInTheDocument()
    expect(screen.getByText('hooks.slack.com/services/xxx')).toBeInTheDocument()
  })

  it('copies the value to the clipboard on click', async () => {
    render(<CopyableField label="Webhook URL" value="hooks.slack.com/services/xxx" />)
    await userEvent.click(screen.getByRole('button', { name: /copy/i }))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hooks.slack.com/services/xxx')
  })

  it('shows a "Copied" confirmation after copying', async () => {
    render(<CopyableField label="Webhook URL" value="hooks.slack.com/services/xxx" />)
    await userEvent.click(screen.getByRole('button', { name: /copy/i }))
    expect(await screen.findByText(/copied/i)).toBeInTheDocument()
  })
})
