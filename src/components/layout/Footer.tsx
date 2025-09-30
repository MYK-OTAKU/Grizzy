import React from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Instagram, 
  Facebook,
  Heart,
  ArrowUp
} from 'lucide-react'
import { RESTAURANT_INFO } from '@utils/constants'

const Footer: React.FC = () => {
  
  // Scroll vers le haut
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Liens rapides
  const quickLinks = [
    { label: 'Accueil', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Galerie', href: '#gallery' },
    { label: 'À Propos', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <footer className="bg-grillz-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-moroccan-pattern opacity-5" />
      
      <motion.div
        className="container-grillz relative z-10 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          
          {/* Logo et description */}
          <motion.div
            className="lg:col-span-1"
            variants={itemVariants}
          >
            <div className="mb-6">
              <img 
                src="/images/logo/grillz-logo.png" 
                alt="GRILL'Z Logo" 
                className="h-16 w-auto mb-4"
              />
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Spécialistes du burger grillé. Smash it, Grill it, Taste it. 
              L'expérience burger ultime à Nouaceur.
            </p>
            
            <div className="flex space-x-4">
              <motion.a
                href={RESTAURANT_INFO.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              
              <motion.a
                href={RESTAURANT_INFO.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              
              <motion.a
                href={`https://wa.me/${RESTAURANT_INFO.contact.whatsapp.replace(/[\s\-\(\)]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-green-500 rounded-lg flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Liens rapides */}
          <motion.div
            variants={itemVariants}
          >
            <h4 className="font-display text-lg font-bold mb-6 text-grillz-orange">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-grillz-orange transition-colors duration-300 flex items-center group"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.querySelector(link.href)
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    <span className="w-2 h-2 bg-grillz-orange rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={itemVariants}
          >
            <h4 className="font-display text-lg font-bold mb-6 text-grillz-orange">
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-grillz-orange flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {RESTAURANT_INFO.address.street}<br />
                    {RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.postalCode}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-grillz-orange flex-shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.contact.phone}`}
                  className="text-gray-300 hover:text-grillz-orange transition-colors text-sm"
                >
                  {RESTAURANT_INFO.contact.phone}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-grillz-orange flex-shrink-0" />
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.contact.whatsapp.replace(/[\s\-\(\)]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-grillz-orange transition-colors text-sm"
                >
                  {RESTAURANT_INFO.contact.whatsapp}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Horaires */}
          <motion.div
            variants={itemVariants}
          >
            <h4 className="font-display text-lg font-bold mb-6 text-grillz-orange">
              Horaires
            </h4>
            <div className="space-y-2">
              {Object.entries(RESTAURANT_INFO.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span className="text-gray-300">{day}</span>
                  <span className="text-grillz-yellow font-mono">{hours}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-grillz-orange/10 rounded-lg border border-grillz-orange/20">
              <div className="flex items-center text-green-400 text-sm mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Ouvert maintenant
              </div>
              <p className="text-xs text-gray-400">
                Commandes WhatsApp disponibles 24h/7j
              </p>
            </div>
          </motion.div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <motion.div
              className="flex items-center space-x-2 text-sm text-gray-400"
              variants={itemVariants}
            >
              <span>© {new Date().getFullYear()} GRILL'Z. Tous droits réservés.</span>
              <Heart className="w-4 h-4 text-grillz-orange" />
            </motion.div>

            {/* Liens légaux */}
            <motion.div
              className="flex items-center space-x-6 text-sm"
              variants={itemVariants}
            >
              <a
                href="#"
                className="text-gray-400 hover:text-grillz-orange transition-colors"
              >
                Mentions Légales
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-grillz-orange transition-colors"
              >
                Politique de Confidentialité
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-grillz-orange transition-colors"
              >
                CGV
              </a>
            </motion.div>

            {/* Bouton retour haut */}
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 bg-grillz-orange hover:bg-grillz-yellow rounded-lg flex items-center justify-center transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Badge développé avec amour */}
        <motion.div
          className="text-center mt-8 pt-8 border-t border-white/5"
          variants={itemVariants}
        >
          <p className="text-xs text-gray-500">
            Développé avec <Heart className="w-3 h-3 inline text-grillz-orange" /> 
            par l'équipe GRILL'Z • Mindset Developer X10 🚀
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer