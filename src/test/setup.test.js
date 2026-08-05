import { describe, it, expect } from 'vitest'

describe('test harness', () => {
  it('runs and understands jest-dom matchers', () => {
    const div = document.createElement('div')
    div.textContent = 'hello'
    document.body.appendChild(div)
    expect(div).toBeInTheDocument()
    expect(div).toHaveTextContent('hello')
  })
})
