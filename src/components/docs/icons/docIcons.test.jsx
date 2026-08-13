import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import * as DocIcons from './docIcons'

const EXPECTED_ICONS = [
  'SearchIcon', 'ClockIcon', 'KeyIcon', 'GaugeIcon', 'ChevronDownIcon', 'ChevronRightIcon',
  'CloseIcon', 'LinkIcon', 'LightbulbIcon', 'UndoIcon', 'RedoIcon', 'ResizeIcon', 'TrashIcon',
  'CopyIcon', 'CalendarIcon', 'HeadsetIcon', 'BellIcon', 'BagIcon', 'MessageIcon', 'HelpIcon',
  'GridIcon', 'FrameIcon', 'HttpRequestIcon', 'AiAgentIcon',
]

describe('docIcons', () => {
  it.each(EXPECTED_ICONS)('exports a renderable %s', (name) => {
    const Icon = DocIcons[name]
    expect(Icon).toBeTruthy()
    const { container } = render(<Icon size={16} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
