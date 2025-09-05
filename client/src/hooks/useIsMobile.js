import { useState, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768

/**
 * Hook to detect if the current viewport is mobile
 * @returns {boolean} Whether the viewport is mobile-sized
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Check on mount
    checkIsMobile()

    // Listen for resize events
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}