import { describe, it, expect } from 'vitest'
import { agentsShowcaseData } from './agentsShowcaseData'

const NODE_KEYS = ['n1', 'n2', 'n3', 'n4', 'n5']

describe('agentsShowcaseData', () => {
  it('has the five popular automations', () => {
    expect(agentsShowcaseData.map((a) => a.id))
      .toEqual([
        'lead-ai-crm-whatsapp',
        'customer-ticket-ai-agent',
        'order-invoice-customer-update',
        'meeting-ai-notes-followup',
        'website-visitor-ai-sales-booking',
      ])
  })

  it('gives every automation a valid nodes array and edges', () => {
    agentsShowcaseData.forEach((a) => {
      expect(Array.isArray(a.nodes)).toBe(true)
      expect(a.nodes.length).toBeGreaterThanOrEqual(5)
      a.nodes.forEach((n) => {
        expect(n.type).toBeTruthy()
        expect(n.label).toBeTruthy()
      })
      expect(Array.isArray(a.edges)).toBe(true)
      expect(a.edges.length).toBeGreaterThanOrEqual(4)
    })
  })

  it('carries demo telemetry with runs and uptime', () => {
    agentsShowcaseData.forEach((a) => {
      expect(a.live.runs).toBeGreaterThan(0)
      expect(a.live.ok).toBeGreaterThan(90)
      expect(a.live.unit).toBeTruthy()
    })
  })

  it('drops the old chat-transcript fields', () => {
    agentsShowcaseData.forEach((a) => {
      expect(a.question).toBeUndefined()
      expect(a.table).toBeUndefined()
      expect(a.callouts).toBeUndefined()
    })
  })
})
