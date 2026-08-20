import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function AccordionItem({
  title,
  children,
  isOpen = false,
  onToggle,
  id,
}) {
  return (
    <div id={id} className="wm-accordion-item">
      <button
        type="button"
        onClick={onToggle}
        className="wm-accordion-btn"
      >
        <span>{title}</span>
        <ChevronDown
          size={18}
          color="#64748b"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0,
            marginLeft: '12px',
          }}
        />
      </button>

      {isOpen && (
        <div className="wm-accordion-body">
          {children}
        </div>
      )}
    </div>
  )
}

export function Accordion({
  items,
  allowMultiple = false,
}) {
  const [openItems, setOpenItems] = useState(
    items.length > 0 ? [items[0].id] : []
  )

  const handleToggle = (id) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <div style={{ width: '100%' }}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isOpen={openItems.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}
