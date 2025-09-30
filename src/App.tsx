import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Layout Components
import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'

// Section Components
import HeroSection from '@components/sections/HeroSection'
import MenuSection from '@components/sections/MenuSection'
import GallerySection from '@components/sections/GallerySection'
import AboutSection from '@components/sections/AboutSection'
import ContactSection from '@components/sections/ContactSection'

// Styles
import '@styles/index.css'

const App: React.FC = () => {
  
  // Configuration Google Analytics (si disponible)
  useEffect(() => {
    // Initialiser GA4 si l'ID est configuré
    const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
    
    if (GA_ID && typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('config', GA_ID, {
        page_title: 'GRILL\'Z - L\'Art du Burger Fusion Marocaine',
        page_location: window.location.href
      })
    }

    // Événement de chargement de page pour analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'GRILL\'Z Homepage',
        page_location: window.location.href,
        page_path: '/'
      })
    }
  }, [])

  // Animation de la page principale
  const pageVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="min-h-screen bg-white"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Header Navigation */}
        <Header />

        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Menu Section */}
          <MenuSection />
          
          {/* Gallery Section */}
          <GallerySection />
          
          {/* About Section */}
          <AboutSection />
          
          {/* Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}

export default App