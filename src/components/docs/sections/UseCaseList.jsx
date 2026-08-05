import * as Icons from '../icons/docIcons'
import './sections.css'

const ICON_MAP = { bag: Icons.BagIcon, headset: Icons.HeadsetIcon, bell: Icons.BellIcon, calendar: Icons.CalendarIcon }

export function UseCaseList({ useCases }) {
  return (
    <ul className="ds-usecases">
      {useCases.map((u) => {
        const Icon = ICON_MAP[u.icon] || Icons.MessageIcon
        return (
          <li key={u.text}>
            <span className="ds-usecases__icon"><Icon size={16} /></span>
            <span>{u.text}</span>
          </li>
        )
      })}
    </ul>
  )
}
