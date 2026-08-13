import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AnnotatedScreenshot } from './AnnotatedScreenshot'
import { Pin } from './Pin'

describe('AnnotatedScreenshot', () => {
  it('renders a fake address bar for the browser-chrome variant', () => {
    render(<AnnotatedScreenshot variant="browser-chrome" addressBarText="api.slack.com">content</AnnotatedScreenshot>)
    expect(screen.getByText('api.slack.com')).toBeInTheDocument()
  })

  it('renders no address bar for the app-native variant', () => {
    render(<AnnotatedScreenshot variant="app-native">content</AnnotatedScreenshot>)
    expect(screen.queryByTestId('fake-address-bar')).not.toBeInTheDocument()
  })

  it('always renders its children', () => {
    render(<AnnotatedScreenshot variant="app-native"><p>the real content</p></AnnotatedScreenshot>)
    expect(screen.getByText('the real content')).toBeInTheDocument()
  })
})

describe('Pin', () => {
  it('renders its number', () => {
    render(<Pin number={3} anchor="top-right" />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
