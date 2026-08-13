import { CloseIcon } from '../icons/docIcons'
import './sections.css'

export function MistakesList({ mistakes }) {
  return (
    <ul className="ds-mistakes">
      {mistakes.map((m) => (
        <li key={m.text}>
          <span className="ds-mistakes__icon"><CloseIcon size={13} /></span>
          <span>{m.text}</span>
        </li>
      ))}
    </ul>
  )
}
