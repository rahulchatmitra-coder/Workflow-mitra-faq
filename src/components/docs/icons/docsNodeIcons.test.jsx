import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { DocsNodeIcon, nodeDiscBg } from './docsNodeIcons'

describe('docsNodeIcons — types the template chains need', () => {
  it.each([
    ['if', '#ff9e43'],
    ['approval', '#ff9e43'],
    ['hubspot', '#FF7A59'],
    ['zoho', '#E42527'],
    ['zendesk', '#03363D'],
    ['gmail', '#EA4335'],
    ['whatsapp', '#25D366'],
    ['slack', '#4A154B'],
    ['shopify', '#7AB55C'],
    ['google-sheets', '#34A853'],
    ['ai', '#0A0A0A'],
    ['webhook-trigger', '#0A0A0A'],
    ['calendly', '#006BFF'],
    ['googlemeet', '#00897B'],
    ['postgresql', '#4169E1'],
    ['assign', '#ff9e43'],
    ['call', '#0A0A0A'],
    ['schedule', '#0A0A0A'],
  ])('gives "%s" the disc colour %s', (type, hex) => {
    expect(nodeDiscBg(type)).toBe(hex)
  })

  it.each(['if', 'approval', 'hubspot', 'zoho', 'zendesk',
           'calendly', 'googlemeet', 'postgresql', 'assign', 'call', 'schedule'])(
    'renders a real mark for "%s"',
    (type) => {
      const { container } = render(<DocsNodeIcon type={type} size={24} mono />)
      expect(container.querySelector('svg')).toBeInTheDocument()
    }
  )

  // An unregistered type still renders — it silently falls back to the generic
  // Blocks glyph on a black disc. The colour assertions above can't catch that
  // for types whose real colour is also black, so compare the actual geometry.
  it.each(['call', 'schedule', 'assign', 'if', 'approval'])(
    'renders a glyph for "%s" distinct from the Blocks fallback',
    (type) => {
      const mine = render(<DocsNodeIcon type={type} size={24} mono />).container.innerHTML
      const fallback = render(<DocsNodeIcon type="totally-unknown-xyz" size={24} mono />).container.innerHTML
      expect(mine).not.toBe(fallback)
    }
  )
})
