import { Link } from 'react-router-dom'
import * as Icons from '../icons/docIcons'
import './sections.css'

const ICON_MAP = { bag: Icons.BagIcon, headset: Icons.HeadsetIcon, bell: Icons.BellIcon, calendar: Icons.CalendarIcon }

export function TemplatesUsingThis({ templates, recommendedFallback }) {
  if (templates.length > 0) {
    return (
      <div className="ds-templates">
        {templates.map((t) => (
          <Link key={t.id} to={`/template/${t.id}`} className="ds-templates__card">
            <span className="ds-templates__title">{t.title}</span>
            <Icons.ChevronRightIcon size={16} />
          </Link>
        ))}
      </div>
    )
  }
  return (
    <div className="ds-templates ds-templates--fallback">
      {recommendedFallback.map((u) => {
        const Icon = ICON_MAP[u.icon] || Icons.MessageIcon
        return (
          <Link key={u.text} to="/template/new" className="ds-templates__card">
            <Icon size={16} />
            <span className="ds-templates__title">{u.text}</span>
          </Link>
        )
      })}
    </div>
  )
}
