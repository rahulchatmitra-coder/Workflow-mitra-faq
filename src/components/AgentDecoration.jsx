import { useEffect, useState } from 'react'
import './AgentDecoration.css'

export default function AgentDecoration({ 
  shape, 
  color, 
  position, 
  cursors = [], 
  badges = [], 
  delay = 0,
  scale = 1
}) {
  const [rotation, setRotation] = useState(0)

  // Orbit animation loop
  useEffect(() => {
    let animationFrame
    let start
    const duration = 15000 // 15 seconds per full rotation

    const step = (timestamp) => {
      if (start === undefined) start = timestamp
      const elapsed = timestamp - start
      const currentRotation = (elapsed / duration) * 360
      setRotation(currentRotation)
      animationFrame = window.requestAnimationFrame(step)
    }

    animationFrame = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(animationFrame)
  }, [])

  const renderShape = () => {
    switch (shape) {
      case 'blob':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill={color} d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,97.7,-2.1C98.6,13.8,94.4,30.1,84.9,43.2C75.4,56.3,60.6,66.2,45.4,74.2C30.2,82.2,14.6,88.3,-1.1,90.3C-16.8,92.3,-32.6,90.2,-47.4,82.7C-62.2,75.2,-76,62.3,-84.9,46.9C-93.8,31.5,-97.8,13.6,-96.2,-3.5C-94.6,-20.6,-87.4,-36.9,-77.2,-50.7C-67,-64.5,-53.8,-75.8,-39.3,-82.5C-24.8,-89.2,-9.1,-91.3,5.1,-90.4C19.3,-89.5,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
            {renderEyes()}
          </svg>
        )
      case 'square':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect fill={color} x="20" y="20" width="160" height="160" rx="40" />
            {renderEyes()}
          </svg>
        )
      case 'cross':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill={color} d="M130,20 L130,70 L180,70 C191.045695,70 200,78.954305 200,90 L200,110 C200,121.045695 191.045695,130 180,130 L130,130 L130,180 C130,191.045695 121.045695,200 110,200 L90,200 C78.954305,200 70,191.045695 70,180 L70,130 L20,130 C8.954305,130 0,121.045695 0,110 L0,90 C0,78.954305 8.954305,70 20,70 L70,70 L70,20 C70,8.954305 78.954305,0 90,0 L110,0 C121.045695,0 130,8.954305 130,20 Z" />
            {renderEyes()}
          </svg>
        )
      case 'organic':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill={color} d="M51.9,-75.6C66.5,-65.4,77.1,-49.2,84.7,-31.6C92.3,-14,96.9,5,93,22.3C89.1,39.6,76.7,55.2,61.1,65.6C45.5,76,26.7,81.2,7.2,84.1C-12.3,87,-32.5,87.6,-48.9,79.5C-65.3,71.4,-77.9,54.6,-85.9,35.9C-93.9,17.2,-97.3,-3.4,-91.3,-21.3C-85.3,-39.2,-69.9,-54.4,-52.7,-64.1C-35.5,-73.8,-16.5,-78,-0.2,-77.7C16.1,-77.4,37.3,-85.8,51.9,-75.6Z" transform="translate(100 100)" />
            {renderEyes()}
          </svg>
        )
      default:
        return null
    }
  }

  const renderEyes = () => (
    <g className="mascot-eyes">
      <ellipse fill="#ffffff" cx="80" cy="90" rx="8" ry="16" />
      <ellipse fill="#ffffff" cx="120" cy="90" rx="8" ry="16" />
    </g>
  )

  const renderBadgeLogo = (type) => {
    switch (type) {
      case 'gmail': return <span style={{color: '#EA4335', fontSize: '18px', fontWeight: 'bold'}}>G</span>;
      case 'slack': return <span style={{color: '#E01E5A', fontSize: '18px', fontWeight: 'bold'}}>#</span>;
      case 'sheets': return <span style={{color: '#10b981', fontSize: '18px', fontWeight: 'bold'}}>S</span>;
      case 'drive': return <span style={{color: '#FFBA00', fontSize: '18px', fontWeight: 'bold'}}>D</span>;
      case 'airtable': return <span style={{color: '#FCB400', fontSize: '18px', fontWeight: 'bold'}}>A</span>;
      case 'zapier': return <span style={{color: '#FF4F00', fontSize: '18px', fontWeight: 'bold'}}>Z</span>;
      case 'discord': return <span style={{color: '#5865F2', fontSize: '18px', fontWeight: 'bold'}}>D</span>;
      default: return <span style={{color: '#000', fontSize: '18px', fontWeight: 'bold'}}>?</span>;
    }
  }

  return (
    <div 
      className={`agent-decoration-wrapper ${shape}`}
      style={{
        ...position,
        '--float-delay': `${delay}s`,
        transform: `scale(${scale})`
      }}
    >
      <div className="mascot-container">
        {/* Core Mascot Shape */}
        <div className="mascot-shape">
          {renderShape()}
        </div>

        {/* Orbiting Badges */}
        <div className="badges-orbit-ring" style={{ transform: `rotate(${rotation}deg)` }}>
          {badges.map((badge, idx) => {
            const angle = (idx / badges.length) * 360
            const orbitRadius = 140
            const x = Math.cos(angle * (Math.PI / 180)) * orbitRadius
            const y = Math.sin(angle * (Math.PI / 180)) * orbitRadius
            
            return (
              <div 
                key={idx} 
                className="orbiting-badge"
                style={{ 
                  transform: `translate(${x}px, ${y}px) rotate(${-rotation}deg)` 
                }}
              >
                <div className="badge-inner">
                  {renderBadgeLogo(badge)}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Cursors */}
      {cursors.map((cursor, idx) => (
        <div 
          key={idx} 
          className={`cursor-wrapper cursor-${idx + 1}`}
          style={{
            '--cursor-color': cursor.color,
            '--cursor-delay': `${delay + idx * 0.5}s`
          }}
        >
          <svg className="cursor-pointer" viewBox="0 0 80 90" width="28" height="28">
            <filter id={`shadow-${shape}-${idx}`}><feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="rgba(0,0,0,0.15)" /></filter>
            <path fill={cursor.color} stroke="#fff" strokeWidth="4" strokeLinejoin="round" d="M37.1 6.8a7.1 7.1 0 0 1 13 0l34.6 77c.8 1.7-1 3.6-2.8 3l-39-13.3q-2-.8-4.2 0l-33 12.7a2.3 2.3 0 0 1-2.9-3z" filter={`url(#shadow-${shape}-${idx})`} />
          </svg>
          <div className="cursor-label" style={{ backgroundColor: cursor.color }}>
            {cursor.name}
          </div>
        </div>
      ))}
    </div>
  )
}
