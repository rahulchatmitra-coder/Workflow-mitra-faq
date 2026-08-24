import { useEffect, useRef, useState } from 'react'

/** Mount a below-the-fold homepage section shortly before it enters view. */
export default function DeferredHomeSection({ children, minHeight = 0 }) {
  const sectionRef = useRef(null)
  const [shouldRender, setShouldRender] = useState(
    () => typeof window === 'undefined' || !('IntersectionObserver' in window) || (typeof process !== 'undefined' && process.env.NODE_ENV === 'test'),
  )

  useEffect(() => {
    if (shouldRender) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      // Load the next section just before a normal scroll reaches it, while
      // keeping the later sections out of the initial request waterfall.
      { rootMargin: '200px 0px' },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [shouldRender])

  return (
    <div
      ref={sectionRef}
      className="deferred-home-section"
      // Keep the reserved space while an on-demand chunk is downloading so a
      // slow connection never collapses a section or causes a visible jump.
      style={{ minHeight }}
    >
      {shouldRender ? children : null}
    </div>
  )
}
