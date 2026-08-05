import { useEffect, useRef, useState } from 'react'
import './SectionNav.css'

export function SectionNav({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id)
  const observerRef = useRef(null)

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean)
    if (!('IntersectionObserver' in window) || sections.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -70% 0px' }
    )
    sections.forEach((s) => observerRef.current.observe(s))
    return () => observerRef.current?.disconnect()
  }, [items])

  return (
    <aside className="section-nav">
      <h5>On this page</h5>
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} className={item.id === activeId ? 'active' : ''}>
          {item.label}
        </a>
      ))}
    </aside>
  )
}
