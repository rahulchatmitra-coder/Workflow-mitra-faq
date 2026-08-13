import { useState } from 'react'
import { CopyIcon } from './icons/docIcons'
import './CopyableField.css'

export function CopyableField({ label, value }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="copyable-field">
      <label>{label}</label>
      <div className="copyable-field__row">
        <span className="copyable-field__value">{value}</span>
        <button type="button" className="copyable-field__btn" onClick={handleCopy} aria-label={`Copy ${label}`}>
          <CopyIcon size={13} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
