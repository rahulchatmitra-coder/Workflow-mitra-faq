import { describe, it, expect } from 'vitest'
import { searchIntegrations } from './searchIntegrations'

const registry = [
  { slug: 'slack', title: 'Slack', shortDescription: 'Post a message to a Slack channel.', category: 'MESSAGING' },
  { slug: 'google-sheets', title: 'Google Sheets', shortDescription: 'Read and write spreadsheet rows.', category: 'SPREADSHEET' },
  { slug: 'gmail', title: 'Gmail', shortDescription: 'Send and label emails.', category: 'EMAIL' },
]

describe('searchIntegrations', () => {
  it('returns everything for an empty query', () => {
    expect(searchIntegrations('', registry)).toHaveLength(3)
  })

  it('matches by title', () => {
    const result = searchIntegrations('slack', registry)
    expect(result.map((r) => r.slug)).toEqual(['slack'])
  })

  it('matches by category', () => {
    const result = searchIntegrations('spreadsheet', registry)
    expect(result.map((r) => r.slug)).toContain('google-sheets')
  })

  it('tolerates a small typo', () => {
    const result = searchIntegrations('slak', registry)
    expect(result.map((r) => r.slug)).toContain('slack')
  })

  it('returns nothing for a totally unrelated query', () => {
    expect(searchIntegrations('xyzzyquux', registry)).toHaveLength(0)
  })
})
