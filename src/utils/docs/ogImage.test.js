import { describe, it, expect } from 'vitest'
import { resolveOgImage } from './ogImage'

describe('resolveOgImage', () => {
  it('resolves "category" to the category template path', () => {
    expect(resolveOgImage({ ogImage: 'category' }, 'MESSAGING')).toBe('/og/messaging.png')
  })

  it('passes an explicit path through unchanged', () => {
    expect(resolveOgImage({ ogImage: '/og/custom-slack.png' }, 'MESSAGING')).toBe('/og/custom-slack.png')
  })

  it('falls back to the site-wide default when the category image is missing from the known set', () => {
    expect(resolveOgImage({ ogImage: 'category' }, 'NOT_A_REAL_CATEGORY')).toBe('/og/default.png')
  })
})
