import { useEffect, useState } from 'react'

/** Advances 0..steps-1 on a timer, frozen at `initial` when the OS asks for reduced motion. */
export function useCanvasStep(steps = 5, intervalMs = 1400, initial = 2) {
  const [step, setStep] = useState(initial)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const timer = setInterval(() => {
      setStep((s) => (s + 1) % steps)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [steps, intervalMs])

  return step
}
