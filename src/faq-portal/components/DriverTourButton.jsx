import React from 'react'
import { PlayCircle, Sparkles } from 'lucide-react'
import { useDriverTour } from '../hooks/use-driver-tour'

export function DriverTourButton({ steps, title, className = '', size = 'default' }) {
  const { startTour } = useDriverTour(steps, title)

  return (
    <button
      type="button"
      onClick={startTour}
      className={`inline-flex items-center gap-2 rounded-xl bg-zinc-900 text-white font-extrabold px-4 py-2.5 text-xs sm:text-sm shadow-md hover:bg-black transition-all cursor-pointer ${className}`}
      style={{
        background: '#0f172a',
        color: '#ffffff',
        border: 'none',
        borderRadius: '12px',
        padding: '10px 18px',
        fontSize: '13px',
        fontWeight: 800,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
        transition: 'all 0.15s ease',
      }}
    >
      <Sparkles size={15} color="#cbd5e1" />
      <span>Start Guide</span>
      <PlayCircle size={15} />
    </button>
  )
}
