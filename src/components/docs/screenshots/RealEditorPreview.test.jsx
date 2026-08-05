import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RealEditorPreview } from './RealEditorPreview'

const oneOp = [
  {
    id: 'text',
    label: 'Post a message',
    summary: 'post to #orders',
    caption: 'Slack has a single mode.',
    fields: [
      { kind: 'credential' },
      { label: 'Slack webhook URL', required: true, placeholder: 'https://hooks.slack.com/services/…', error: 'A webhook URL is required.' },
      { label: 'Message', required: true, multiline: true, placeholder: 'New order from {{ customer }}', hint: 'Use {{ variables }} from earlier steps.' },
    ],
  },
]

const manyOps = [
  { id: 'text', label: 'Text message', summary: 'text', caption: 'Free text.', fields: [{ label: 'Message', placeholder: 'Hi' }] },
  { id: 'media', label: 'Media', summary: 'media', caption: 'Send a file.', fields: [{ label: 'Public URL', placeholder: 'https://…' }] },
]

describe('RealEditorPreview', () => {
  it('renders the node label on the canvas and in the popover header', () => {
    render(<RealEditorPreview nodeType="slack" nodeLabel="Slack" operations={oneOp} />)
    expect(screen.getAllByText('Slack')).toHaveLength(2)
  })

  it('renders each field of the active operation, with its hint and error', () => {
    render(<RealEditorPreview nodeType="slack" nodeLabel="Slack" operations={oneOp} />)
    expect(screen.getByText('Slack webhook URL')).toBeInTheDocument()
    expect(screen.getByText('A webhook URL is required.')).toBeInTheDocument()
    expect(screen.getByText('Use {{ variables }} from earlier steps.')).toBeInTheDocument()
  })

  it('renders the credential picker with the product\'s real default option', () => {
    render(<RealEditorPreview nodeType="slack" nodeLabel="Slack" operations={oneOp} />)
    expect(screen.getByText('None — enter details inline')).toBeInTheDocument()
  })

  it('shows no operation tabs when the node has a single mode', () => {
    render(<RealEditorPreview nodeType="slack" nodeLabel="Slack" operations={oneOp} />)
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument()
  })

  it('shows one tab per operation when the node has several', () => {
    render(<RealEditorPreview nodeType="whatsapp" nodeLabel="WhatsApp" operations={manyOps} />)
    expect(screen.getAllByRole('tab')).toHaveLength(2)
  })

  it('swaps the visible fields and caption when another operation is selected', async () => {
    render(<RealEditorPreview nodeType="whatsapp" nodeLabel="WhatsApp" operations={manyOps} />)
    expect(screen.getByText('Message')).toBeInTheDocument()
    expect(screen.getByText('Free text.')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', { name: 'Media' }))

    expect(screen.getByText('Public URL')).toBeInTheDocument()
    expect(screen.getByText('Send a file.')).toBeInTheDocument()
    expect(screen.queryByText('Message')).not.toBeInTheDocument()
  })

  it('marks the selected tab for assistive tech', async () => {
    render(<RealEditorPreview nodeType="whatsapp" nodeLabel="WhatsApp" operations={manyOps} />)
    expect(screen.getByRole('tab', { name: 'Text message' })).toHaveAttribute('aria-selected', 'true')
    await userEvent.click(screen.getByRole('tab', { name: 'Media' }))
    expect(screen.getByRole('tab', { name: 'Media' })).toHaveAttribute('aria-selected', 'true')
  })
})
