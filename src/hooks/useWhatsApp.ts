import { useCallback } from 'react'
import { Burger, UseWhatsAppReturn } from '@/types'
import { WHATSAPP_CONFIG, WHATSAPP_MESSAGES, ANALYTICS_EVENTS } from '@utils/constants'

// Hook personnalisé pour gérer l'intégration WhatsApp
const useWhatsApp = (): UseWhatsAppReturn => {
  // Fonction pour valider un numéro WhatsApp
  const isValidNumber = useCallback((number: string): boolean => {
    // Supprimer les espaces et caractères spéciaux
    const cleanNumber = number.replace(/[\s\-\(\)]/g, '')
    
    // Vérifier le format international
    const whatsappRegex = /^(\+|00)[1-9]\d{1,14}$/
    return whatsappRegex.test(cleanNumber)
  }, [])

  // Fonction pour générer l'URL WhatsApp
  const generateWhatsAppUrl = useCallback((burger: Burger, customMessage?: string): string => {
    const { number } = WHATSAPP_CONFIG
    
    if (!isValidNumber(number)) {
      console.error('Numéro WhatsApp invalide:', number)
      return '#'
    }

    // Nettoyer le numéro (supprimer les + et 00)
    const cleanNumber = number.replace(/^(\+|00)/, '')
    
    // Construire le message
    let message: string
    
    if (customMessage) {
      message = customMessage
    } else {
      const greeting = WHATSAPP_MESSAGES.greeting(WHATSAPP_CONFIG.businessName)
      const orderDetails = WHATSAPP_MESSAGES.orderTemplate(burger.name, burger.price)
      message = greeting + orderDetails
    }

    // Encoder le message pour URL
    const encodedMessage = encodeURIComponent(message)
    
    // Construire l'URL complète
    const whatsappUrl = `${WHATSAPP_CONFIG.baseUrl}${cleanNumber}?text=${encodedMessage}`
    
    return whatsappUrl
  }, [isValidNumber])

  // Fonction principale pour envoyer une commande
  const sendOrder = useCallback((burger: Burger, customMessage?: string): void => {
    try {
      // Générer l'URL WhatsApp
      const whatsappUrl = generateWhatsAppUrl(burger, customMessage)
      
      if (whatsappUrl === '#') {
        console.error('Impossible de générer l\'URL WhatsApp')
        return
      }

      // Analytics tracking
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', ANALYTICS_EVENTS.WHATSAPP_CLICK, {
          burger_name: burger.name,
          burger_id: burger.id,
          burger_price: burger.price,
          burger_category: burger.category,
          moroccan_fusion: burger.moroccanFusion
        })
        
        (window as any).gtag('event', ANALYTICS_EVENTS.ORDER_ATTEMPT, {
          currency: 'MAD',
          value: burger.price,
          items: [{
            item_id: burger.id,
            item_name: burger.name,
            item_category: burger.category,
            price: burger.price,
            quantity: 1
          }]
        })
      }

      // Détecter si on est sur mobile ou desktop
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      if (isMobile) {
        // Sur mobile, ouvrir directement l'app WhatsApp
        window.location.href = whatsappUrl
      } else {
        // Sur desktop, ouvrir dans un nouvel onglet
        const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
        
        // Fallback si le popup est bloqué
        if (!newWindow) {
          window.location.href = whatsappUrl
        }
      }

    } catch (error) {
      console.error('Erreur lors de l\'envoi de la commande WhatsApp:', error)
      
      // Analytics tracking de l'erreur
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'exception', {
          description: 'WhatsApp order failed',
          fatal: false
        })
      }
    }
  }, [generateWhatsAppUrl])

  return {
    sendOrder,
    generateWhatsAppUrl,
    isValidNumber
  }
}

export default useWhatsApp