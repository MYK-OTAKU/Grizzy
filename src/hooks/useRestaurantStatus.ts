import { useState, useEffect } from 'react'
import { getRestaurantStatus, type OpeningStatus } from '@/utils/timeUtils'

/**
 * Custom hook to track restaurant opening status in real-time
 */
export const useRestaurantStatus = (hoursString: string): OpeningStatus => {
  const [status, setStatus] = useState<OpeningStatus>(() => 
    getRestaurantStatus(hoursString)
  )

  useEffect(() => {
    const updateStatus = () => {
      const newStatus = getRestaurantStatus(hoursString)
      setStatus(newStatus)
    }

    // Update immediately
    updateStatus()

    // Update every minute
    const interval = setInterval(updateStatus, 60000)

    return () => clearInterval(interval)
  }, [hoursString])

  return status
}