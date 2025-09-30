import React from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  MessageCircle,
  Navigation,
  Star
} from 'lucide-react'
import { RESTAURANT_INFO, ANALYTICS_EVENTS } from '@utils/constants'
import { useRestaurantStatus } from '@hooks/useRestaurantStatus'
import { getStatusColor, getStatusIcon } from '@utils/timeUtils'
import Button from '@components/ui/Button'
import useScrollReveal from '@hooks/useScrollReveal'

const ContactSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal()
  const restaurantStatus = useRestaurantStatus(RESTAURANT_INFO.hours['Tous les jours'])

  // Gérer les clics sur les liens de contact
  const handleContactClick = (type: string, value: string) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', ANALYTICS_EVENTS.PHONE_CLICK, {
        contact_type: type,
        contact_value: value
      })
    }
  }

  // Gérer les clics sur les réseaux sociaux
  const handleSocialClick = (platform: string, url: string) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', ANALYTICS_EVENTS.SOCIAL_CLICK, {
        social_platform: platform,
        social_url: url
      })
    }
  }

  // Informations de contact organisées
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Notre Adresse',
      primary: `${RESTAURANT_INFO.address.street}`,
      secondary: `${RESTAURANT_INFO.address.city}, ${RESTAURANT_INFO.address.postalCode}`,
      action: () => {
        const address = encodeURIComponent(`${RESTAURANT_INFO.address.street}, ${RESTAURANT_INFO.address.city}, ${RESTAURANT_INFO.address.country}`)
        window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')
        handleContactClick('address', address)
      },
      buttonText: 'Voir sur Maps',
      buttonIcon: Navigation
    },
    {
      icon: Phone,
      title: 'Téléphone',
      primary: RESTAURANT_INFO.contact.phone,
      secondary: 'Service client disponible',
      action: () => {
        window.location.href = `tel:${RESTAURANT_INFO.contact.phone}`
        handleContactClick('phone', RESTAURANT_INFO.contact.phone)
      },
      buttonText: 'Appeler',
      buttonIcon: Phone
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      primary: RESTAURANT_INFO.contact.whatsapp,
      secondary: 'Commandes et réservations',
      action: () => {
        const message = encodeURIComponent('🍔 Bonjour GRILL\'Z! J\'aimerais avoir des informations. Merci! 🔥')
        const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.contact.whatsapp}?text=${message}`
        window.open(whatsappUrl, '_blank')
        handleContactClick('whatsapp', RESTAURANT_INFO.contact.whatsapp)
      },
      buttonText: 'WhatsApp',
      buttonIcon: MessageCircle
    }
  ]

  // Réseaux sociaux
  const socialLinks = [
    {
      platform: 'Instagram',
      icon: Instagram,
      url: RESTAURANT_INFO.socialMedia.instagram!,
      color: 'from-purple-500 to-pink-500',
      handle: '@grillz.ma'
    },
    {
      platform: 'Facebook',
      icon: Facebook,
      url: RESTAURANT_INFO.socialMedia.facebook!,
      color: 'from-blue-600 to-blue-700',
      handle: 'GRILL\'Z Restaurant'
    },
    {
      platform: 'TikTok',
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43z"/>
        </svg>
      ),
      url: RESTAURANT_INFO.socialMedia.tiktok!,
      color: 'from-black to-gray-800',
      handle: '@grillz.ma'
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="section-padding bg-gradient-to-br from-grillz-black via-grillz-black to-grillz-orange/10 text-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-moroccan-pattern opacity-5" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-grillz-orange/10 rounded-full blur-3xl -translate-x-48" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-grillz-yellow/10 rounded-full blur-3xl translate-x-32" />
      
      <motion.div
        className="container-grillz relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Header de section */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <span className="inline-block bg-grillz-orange/20 text-grillz-orange font-medium px-4 py-2 rounded-full text-sm mb-4">
            Nous Contacter
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Venez Nous
            <span className="text-gradient block">Rencontrer</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Besoin d'informations ? Une réservation ? Une commande spéciale ? 
            Notre équipe est là pour vous accueillir et répondre à toutes vos questions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          
          {/* Informations de contact */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={itemVariants}
          >
            <h3 className="font-display text-2xl font-bold mb-8">
              Informations Pratiques
            </h3>
            
            <div className="grid md:grid-cols-1 gap-6">
              {contactInfo.map((info) => {
                const Icon = info.icon
                const ButtonIcon = info.buttonIcon
                
                return (
                  <motion.div
                    key={info.title}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                    variants={cardVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-grillz-orange rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <h4 className="font-semibold text-lg mb-1">{info.title}</h4>
                        <p className="text-gray-300 mb-1">{info.primary}</p>
                        <p className="text-gray-400 text-sm mb-4">{info.secondary}</p>
                        
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={info.action}
                          className="border-grillz-orange/30 hover:border-grillz-orange"
                        >
                          <ButtonIcon className="w-4 h-4 mr-2" />
                          {info.buttonText}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Horaires */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <h3 className="font-display text-2xl font-bold mb-8 flex items-center">
              <Clock className="w-6 h-6 mr-3 text-grillz-orange" />
              Nos Horaires
            </h3>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="space-y-4">
                {Object.entries(RESTAURANT_INFO.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="font-medium">{day}</span>
                    <span className="text-grillz-orange font-mono">{hours}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className={`flex items-center text-sm ${
                  getStatusColor(restaurantStatus.status)
                }`}>
                  <span className="mr-2">{getStatusIcon(restaurantStatus.isOpen)}</span>
                  {restaurantStatus.message}
                </div>
                {restaurantStatus.timeUntilClose && (
                  <div className="text-xs text-gray-400 mt-1">
                    Fermeture dans {restaurantStatus.timeUntilClose}
                  </div>
                )}
              </div>
            </div>

            {/* Évaluation rapide */}
            <div className="bg-gradient-to-r from-grillz-orange/20 to-grillz-yellow/20 backdrop-blur-sm border border-grillz-orange/30 rounded-xl p-6">
              <div className="text-center">
                <div className="flex justify-center items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-grillz-yellow fill-current" />
                  ))}
                </div>
                <div className="text-2xl font-bold mb-1">4.8/5</div>
                <div className="text-sm text-gray-300">
                  Basé sur 200+ avis clients
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Réseaux sociaux */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h3 className="font-display text-2xl font-bold mb-8">
            Suivez-Nous
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              
              return (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick(social.platform, social.url)}
                  className={`flex items-center space-x-3 px-6 py-3 bg-gradient-to-r ${social.color} rounded-full text-white font-medium hover:shadow-lg transition-all duration-300`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-6 h-6" />
                  <span>{social.handle}</span>
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        {/* CTA finale */}
        <motion.div
          className="text-center bg-gradient-to-r from-grillz-orange/20 via-grillz-yellow/20 to-grillz-orange/20 rounded-2xl p-8 border border-grillz-orange/30"
          variants={itemVariants}
        >
          <h3 className="font-display text-3xl font-bold mb-4">
            Prêt pour une Expérience GRILL'Z ?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Commandez dès maintenant via WhatsApp ou venez nous rendre visite 
            pour découvrir nos créations signature dans une ambiance chaleureuse.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              variant="whatsapp"
              size="lg"
              href={`https://wa.me/${RESTAURANT_INFO.contact.whatsapp}?text=${encodeURIComponent('🍔 Bonjour GRILL\'Z! Je souhaite passer commande. Merci! 🔥')}`}
              target="_blank"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Commander Maintenant
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const address = encodeURIComponent(`${RESTAURANT_INFO.address.street}, ${RESTAURANT_INFO.address.city}, ${RESTAURANT_INFO.address.country}`)
                window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')
              }}
            >
              <Navigation className="w-5 h-5 mr-2" />
              Nous Trouver
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ContactSection