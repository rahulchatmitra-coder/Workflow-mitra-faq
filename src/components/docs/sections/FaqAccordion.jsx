import { ChevronDownIcon } from '../icons/docIcons'
import './sections.css'

export function FaqAccordion({ faqs }) {
  return (
    <div className="ds-faq">
      {faqs.map((f, i) => (
        <details key={f.q} open={i === 0}>
          <summary>{f.q}<ChevronDownIcon size={16} className="ds-faq__chev" /></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
