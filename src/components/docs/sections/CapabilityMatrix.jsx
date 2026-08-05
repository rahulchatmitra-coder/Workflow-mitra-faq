import * as Icons from '../icons/docIcons'
import './sections.css'

const ICON_MAP = {
  message: Icons.MessageIcon,
  file: Icons.FileIcon,
  image: Icons.ImageIcon,
  list: Icons.ListIcon,
  cart: Icons.CartIcon,
  pin: Icons.PinIcon,
  card: Icons.CardIcon,
  bag: Icons.BagIcon,
  bell: Icons.BellIcon,
  calendar: Icons.CalendarIcon,
  headset: Icons.HeadsetIcon,
  key: Icons.KeyIcon,
}

/**
 * Every operation the node supports, up front.
 *
 * A single worked example doesn't tell a reader what an integration is capable
 * of — someone evaluating WhatsApp needs to see that it does templates, media,
 * interactive buttons and catalogues before they invest in setting it up. Each
 * entry names the real operation id so it lines up with the editor's own
 * Operation dropdown further down the page.
 */
export function CapabilityMatrix({ capabilities }) {
  return (
    <div className="ds-caps">
      {capabilities.map((c) => {
        const Icon = ICON_MAP[c.icon] || Icons.MessageIcon
        return (
          <div className="ds-cap" key={c.title}>
            <div className="ds-cap__h">
              <span className="ds-cap__ic"><Icon size={15} /></span>
              {c.title}
            </div>
            <p>
              {c.operation && <code>{c.operation}</code>}
              {c.operation && ' — '}
              {c.body}
            </p>
          </div>
        )
      })}
    </div>
  )
}
