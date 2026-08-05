import { describe, it, expect } from 'vitest'
import { agentsShowcaseData } from './agentsShowcaseData'

const NODE_KEYS = ['n1', 'n2', 'n3', 'n4', 'n5']

describe('agentsShowcaseData', () => {
  it('has the five popular automations', () => {
    expect(agentsShowcaseData.map((a) => a.id))
      .toEqual(['support', 'meeting', 'calls', 'data', 'leads'])
  })

  it('gives every automation a five-node graph', () => {
    agentsShowcaseData.forEach((a) => {
      expect(Object.keys(a.nodes)).toEqual(NODE_KEYS)
      NODE_KEYS.forEach((k) => {
        expect(a.nodes[k].type).toBeTruthy()
        expect(a.nodes[k].label).toBeTruthy()
      })
    })
  })

  it('gives every automation one step caption per node and one payload per hop', () => {
    agentsShowcaseData.forEach((a) => {
      expect(a.steps).toHaveLength(5)
      expect(a.payloads).toHaveLength(4)
    })
  })

  it('carries demo telemetry with a per-step duration for each node', () => {
    agentsShowcaseData.forEach((a) => {
      expect(a.live.dur).toHaveLength(5)
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
