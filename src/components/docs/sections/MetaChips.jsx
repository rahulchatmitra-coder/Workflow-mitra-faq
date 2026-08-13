import * as Icons from '../icons/docIcons'
import './sections.css'

const ICON_MAP = { clock: Icons.ClockIcon, key: Icons.KeyIcon, message: Icons.MessageIcon, gauge: Icons.GaugeIcon }

export function MetaChips({ chips }) {
  return (
    <div className="ds-meta-chips">
      {chips.map((c) => {
        const Icon = ICON_MAP[c.icon]
        return <span key={c.label}>{Icon && <Icon size={14} />}{c.label}</span>
      })}
    </div>
  )
}
