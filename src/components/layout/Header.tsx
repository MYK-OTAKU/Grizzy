import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Flame } from 'lucide-react'
import { NAVIGATION_ITEMS, RESTAURANT_INFO } from '@utils/constants'
import Button from '@components/ui/Button'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Détecter le scroll pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fermer le menu mobile au clic sur un lien
  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    
    // Scroll smooth vers la section
    const element = document.querySelector(href)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth'
      })
    }
  }

  // Animation variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    scrolled: { 
      backgroundColor: 'rgba(26, 26, 26, 0.95)',
      backdropFilter: 'blur(20px)'
    }
  }

  const logoVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400 }
    }
  }

  const flameVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: [0, 5, -5, 0],
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }

  const navItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-grillz-black/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container-grillz">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo GRILL'Z */}
          <motion.div
            className="flex items-center cursor-pointer"
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            onClick={() => handleNavClick('#home')}
          >
            <img 
              src="/images/logo/grillz-logo.png" 
              alt="GRILL'Z Logo" 
              className="h-12 w-auto"
            />
          </motion.div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className="text-white hover:text-grillz-orange transition-colors duration-300 font-medium"
                whileHover={{ scale: 1.05, color: '#d97706' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 + 0.5 }
                }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Button
              variant="primary"
              href={`https://wa.me/${RESTAURANT_INFO.contact.whatsapp}?text=${encodeURIComponent('🍔 Bonjour GRILL\'Z! J\'aimerais passer une commande. Merci! 🔥')}`}
              target="_blank"
            >
              Commander
            </Button>
          </div>

          {/* Menu Hamburger Mobile */}
          <motion.button
            className="md:hidden p-2 text-white hover:text-grillz-orange transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-grillz-black/95 backdrop-blur-md border-t border-grillz-orange/20"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <nav className="py-6 space-y-4">
                {NAVIGATION_ITEMS.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className="block px-4 py-2 text-white hover:text-grillz-orange hover:bg-grillz-orange/10 transition-colors duration-300 font-medium"
                    variants={navItemVariants}
                    initial="closed"
                    animate="open"
                    custom={index}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                <motion.div
                  className="px-4 pt-4"
                  variants={navItemVariants}
                  initial="closed"
                  animate="open"
                  custom={NAVIGATION_ITEMS.length}
                >
                  <Button
                    variant="primary"
                    className="w-full"
                    href={`https://wa.me/${RESTAURANT_INFO.contact.whatsapp}?text=${encodeURIComponent('🍔 Bonjour GRILL\'Z! J\'aimerais passer une commande. Merci! 🔥')}`}
                    target="_blank"
                  >
                    Commander sur WhatsApp
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header