/**
 * Utilities for restaurant opening hours and time management
 */

export interface RestaurantHours {
  open: string
  close: string
}

export interface OpeningStatus {
  isOpen: boolean
  status: 'open' | 'closed' | 'closing_soon'
  message: string
  nextOpenTime?: string
  timeUntilClose?: string
}

/**
 * Parse restaurant hours from format "12:00 - 00:15"
 */
export const parseRestaurantHours = (hoursString: string): RestaurantHours => {
  const [open, close] = hoursString.split(' - ').map(time => time.trim())
  return { open, close }
}

/**
 * Convert time string to minutes since midnight
 */
export const timeToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number)
  return hours * 60 + minutes
}

/**
 * Convert minutes since midnight to time string
 */
export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

/**
 * Get current time in Morocco timezone (UTC+1)
 */
export const getCurrentMoroccoTime = (): Date => {
  const now = new Date()
  // Morocco is UTC+1 (no DST since 2018)
  const moroccoTime = new Date(now.getTime() + (1 * 60 * 60 * 1000))
  return moroccoTime
}

/**
 * Check if restaurant is currently open
 */
export const getRestaurantStatus = (hoursString: string): OpeningStatus => {
  const { open, close } = parseRestaurantHours(hoursString)
  const now = getCurrentMoroccoTime()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  
  const openMinutes = timeToMinutes(open)
  let closeMinutes = timeToMinutes(close)
  
  // Handle overnight hours (e.g., 12:00 - 00:15)
  const isOvernight = closeMinutes < openMinutes
  
  if (isOvernight) {
    // If we're past midnight but before closing
    if (currentMinutes < closeMinutes) {
      // Currently in the "next day" portion of overnight hours
      const minutesUntilClose = closeMinutes - currentMinutes
      const isClosingSoon = minutesUntilClose <= 30
      
      return {
        isOpen: true,
        status: isClosingSoon ? 'closing_soon' : 'open',
        message: isClosingSoon 
          ? `Ferme bientôt (${minutesToTime(closeMinutes)})` 
          : `Ouvert jusqu'à ${minutesToTime(closeMinutes)}`,
        timeUntilClose: formatTimeUntil(minutesUntilClose)
      }
    }
    // If we're in the main day portion
    else if (currentMinutes >= openMinutes) {
      // Open until next day closing
      const minutesUntilMidnight = (24 * 60) - currentMinutes
      const minutesUntilClose = minutesUntilMidnight + closeMinutes
      const isClosingSoon = minutesUntilClose <= 30
      
      return {
        isOpen: true,
        status: isClosingSoon ? 'closing_soon' : 'open',
        message: isClosingSoon 
          ? `Ferme bientôt (${minutesToTime(closeMinutes)})` 
          : `Ouvert jusqu'à ${minutesToTime(closeMinutes)}`,
        timeUntilClose: formatTimeUntil(minutesUntilClose)
      }
    }
    // Currently closed (between close and open)
    else {
      return {
        isOpen: false,
        status: 'closed',
        message: `Fermé - Ouvre à ${minutesToTime(openMinutes)}`,
        nextOpenTime: minutesToTime(openMinutes)
      }
    }
  } else {
    // Normal same-day hours
    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      const minutesUntilClose = closeMinutes - currentMinutes
      const isClosingSoon = minutesUntilClose <= 30
      
      return {
        isOpen: true,
        status: isClosingSoon ? 'closing_soon' : 'open',
        message: isClosingSoon 
          ? `Ferme bientôt (${minutesToTime(closeMinutes)})` 
          : `Ouvert jusqu'à ${minutesToTime(closeMinutes)}`,
        timeUntilClose: formatTimeUntil(minutesUntilClose)
      }
    } else {
      // Closed
      let message: string
      
      if (currentMinutes < openMinutes) {
        // Same day opening
        message = `Fermé - Ouvre à ${minutesToTime(openMinutes)}`
      } else {
        // Next day opening
        message = `Fermé - Ouvre demain à ${minutesToTime(openMinutes)}`
      }
      
      return {
        isOpen: false,
        status: 'closed',
        message,
        nextOpenTime: minutesToTime(openMinutes)
      }
    }
  }
}

/**
 * Format time duration in a human-readable way
 */
export const formatTimeUntil = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`
  } else {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    if (remainingMinutes === 0) {
      return `${hours}h`
    }
    return `${hours}h${remainingMinutes.toString().padStart(2, '0')}`
  }
}

/**
 * Get status color class based on restaurant status
 */
export const getStatusColor = (status: OpeningStatus['status']): string => {
  switch (status) {
    case 'open':
      return 'text-green-400'
    case 'closing_soon':
      return 'text-yellow-400'
    case 'closed':
      return 'text-red-400'
    default:
      return 'text-gray-400'
  }
}

/**
 * Get status icon based on restaurant status
 */
export const getStatusIcon = (isOpen: boolean): string => {
  return isOpen ? '🟢' : '🔴'
}