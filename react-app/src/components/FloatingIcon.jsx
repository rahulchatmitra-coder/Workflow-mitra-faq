import { useEffect, useRef } from 'react'
import './FloatingIcon.css'

function FloatingIcon({ name, icon, color, position, delay, logoUrl }) {
  const iconRef = useRef(null)

  useEffect(() => {
    const element = iconRef.current
    if (!element) return

    // Random animation parameters
    const duration = 3 + Math.random() * 2 // 3-5 seconds
    const distance = 20 + Math.random() * 15 // 20-35px movement
    
    element.style.setProperty('--float-duration', `${duration}s`)
    element.style.setProperty('--float-distance', `${distance}px`)
    element.style.setProperty('--animation-delay', `${delay}s`)
  }, [delay])

  const style = {
    ...position,
    '--icon-color': color,
  }

  return (
    <div 
      ref={iconRef}
      className="floating-icon" 
      style={style}
      title={name}
      role="img"
      aria-label={`${name} integration`}
    >
      <div className="icon-circle">
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt={`${name} logo`} 
            className="icon-image"
            loading="lazy"
          />
        ) : (
          <span className="icon-text">{icon}</span>
        )}
      </div>
      <span className="icon-label">{name}</span>
    </div>
  )
}

export default FloatingIcon
