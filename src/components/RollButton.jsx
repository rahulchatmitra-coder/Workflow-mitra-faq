import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './RollButton.css'

/**
 * Reusable Axvio-Style Staggered Rolling Text Button
 * 
 * @param {string} text - The button text to roll (or passed as children)
 * @param {string} to - React Router Link destination (if router link)
 * @param {string} href - External anchor link (if regular <a>)
 * @param {string} variant - 'dark' | 'primary' | 'secondary' | 'outline' | 'white' | 'blue'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} showArrow - Whether to render trailing arrow SVG
 * @param {React.ReactNode} icon - Custom icon node (optional)
 * @param {function} onClick - Click handler
 * @param {string} type - 'button' | 'submit' | 'reset'
 * @param {string} className - Additional custom classes
 */
export default function RollButton({
  text,
  children,
  to,
  href,
  variant = 'dark',
  size = 'md',
  showArrow = false,
  icon = null,
  onClick,
  type = 'button',
  className = '',
  id,
  target,
  rel,
  disabled = false,
  ...rest
}) {
  const [isRolled, setIsRolled] = useState(false)
  const content = text || (typeof children === 'string' ? children : '')
  const letters = typeof content === 'string' ? content.split('') : []

  // Check if cursor is properly within the center zone of the button
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Center zone: inside 14% horizontal margin and 12% vertical margin
    const marginX = rect.width * 0.14
    const marginY = rect.height * 0.12

    if (
      x >= marginX &&
      x <= rect.width - marginX &&
      y >= marginY &&
      y <= rect.height - marginY
    ) {
      setIsRolled(true)
    } else {
      setIsRolled(false)
    }
  }

  const handleMouseLeave = () => {
    setIsRolled(false)
  }

  const hasExplicitLabel = Boolean(rest['aria-label'])

  const buttonInner = (
    <>
      {content && <span className="sr-only">{content}</span>}
      <span className="roll-track" aria-hidden="true">
        {letters.length > 0 ? (
          letters.map((char, idx) => (
            <span
              key={idx}
              className="roll-char-col"
              style={{ transitionDelay: `${idx * 0.016}s` }}
            >
              <span className="roll-char">{char === ' ' ? '\u00A0' : char}</span>
              <span className="roll-char roll-char-clone" aria-hidden="true">
                {char === ' ' ? '\u00A0' : char}
              </span>
            </span>
          ))
        ) : (
          children
        )}
      </span>

      {icon && <span className="roll-icon">{icon}</span>}

      {showArrow && (
        <svg
          className="roll-icon roll-arrow-svg"
          viewBox="0 0 12 12"
          width="11"
          height="11"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M2.5 6h7M6.5 2.5l3.5 3.5-3.5 3.5" />
        </svg>
      )}
    </>
  )

  const combinedClasses = `roll-btn roll-btn-${variant} roll-btn-${size} ${isRolled ? 'is-rolled' : ''} ${className}`.trim()

  if (to) {
    return (
      <Link
        to={to}
        className={combinedClasses}
        id={id}
        aria-label={hasExplicitLabel ? rest['aria-label'] : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        {...rest}
      >
        {buttonInner}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        id={id}
        aria-label={hasExplicitLabel ? rest['aria-label'] : undefined}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        {...rest}
      >
        {buttonInner}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      id={id}
      aria-label={hasExplicitLabel ? rest['aria-label'] : undefined}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...rest}
    >
      {buttonInner}
    </button>
  )
}
