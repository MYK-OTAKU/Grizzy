import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Flame } from 'lucide-react'
import { RESTAURANT_INFO } from '@utils/constants'
import Button from '@components/ui/Button'
import useScrollReveal from '@hooks/useScrollReveal'

const HeroSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Suivre la position de la souris pour l'effet parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll vers la section menu
  const scrollToMenu = () => {
    const menuSection = document.querySelector('#menu')
    if (menuSection) {
      const headerHeight = 80
      const elementPosition = menuSection.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth'
      })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const logoVariants = {
    hidden: { scale: 0.5, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300
      }
    }
  }

  const flameVariants = {
    initial: { 
      scale: 1,
      rotate: 0,
      filter: 'drop-shadow(0 0 20px rgba(217, 119, 6, 0.5))'
    },
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 3, -3, 0],
      filter: [
        'drop-shadow(0 0 20px rgba(217, 119, 6, 0.5))',
        'drop-shadow(0 0 30px rgba(217, 119, 6, 0.8))',
        'drop-shadow(0 0 20px rgba(217, 119, 6, 0.5))'
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const scrollIndicatorVariants = {
    animate: {
      y: [0, 10, 0],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-grillz-black via-grillz-black/90 to-grillz-orange/20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-moroccan-pattern opacity-5" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-grillz-black/80 via-transparent to-grillz-black/60" />

      {/* Particles flottantes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-grillz-orange rounded-full opacity-30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            variants={particleVariants}
            animate="animate"
            transition={{ delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <motion.div
        className="container-grillz relative z-10 text-center text-white px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
        }}
      >
        {/* Badge de qualité */}
        {/* <motion.div
          className="inline-flex items-center space-x-2 bg-grillz-orange/20 backdrop-blur-sm border border-grillz-orange/30 rounded-full px-4 py-2 mb-8"
          variants={itemVariants}
        >
          <Star className="w-4 h-4 text-grillz-yellow fill-current" />
          <span className="text-sm font-medium text-grillz-yellow">
            Restaurant #1 Fusion Marocaine
          </span>
        </motion.div> */}

        {/* Logo principal avec flammes */}
        <motion.div
          className="flex items-center justify-center space-x-4 mb-0"
          variants={logoVariants}
          whileHover="hover"
        >
          <motion.div
            className="text-grillz-orange"
            variants={flameVariants}
            initial="initial"
            animate="animate"
          >
            <Flame className="w-16 h-16 md:w-20 md:h-20" />
          </motion.div>
          
          <div className="text-left pt-5">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-gradient leading-none">
              GRILL'Z
            </h1>
            <p className="font-arabic text-lg md:text-xl text-morocco-gold font-medium -mt-2">
              {/* المطعم الأصيل */}    

            </p>
          </div>
          
          <motion.div
            className="text-grillz-yellow"
            variants={flameVariants}
            initial="initial"
            animate="animate"
            style={{ animationDelay: '1s' }}
          >
            <Flame className="w-16 h-16 md:w-20 md:h-20" />
          </motion.div>
        </motion.div>

        {/* Slogan principal */}
        <motion.h2
          className="font-display text-3xl md:text-5xl lg:text-6xl font-bold  mb-3"
          variants={itemVariants}
        >
          {RESTAURANT_INFO.slogan}
        </motion.h2>

        {/* Sous-titre */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          {RESTAURANT_INFO.subtitle}
        </motion.p>

        {/* Description courte */}
        <motion.p
          className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Découvrez une expérience culinaire unique où l'authenticité des saveurs marocaines 
          rencontre l'innovation moderne. Chaque burger est une œuvre d'art gustative 
          préparée avec passion et des ingrédients d'exception.
        </motion.p>

        {/* Boutons d'action */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
          variants={itemVariants}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToMenu}
            className="min-w-[200px]"
          >
            Découvrir le Menu
          </Button>
          
          <Button
            variant="whatsapp"
            size="lg"
            href={`https://wa.me/${RESTAURANT_INFO.contact.whatsapp}?text=${encodeURIComponent('🍔 Bonjour GRILL\'Z! J\'aimerais découvrir vos spécialités. Merci! 🔥')}`}
            target="_blank"
            className="min-w-[200px]"
          >
            Commander Maintenant
          </Button>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto mb-16"
          variants={itemVariants}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-grillz-orange mb-2">12+</div>
            <div className="text-gray-400">Burgers Signature</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-grillz-yellow mb-2">5⭐</div>
            <div className="text-gray-400">Note Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-morocco-gold mb-2">100%</div>
            <div className="text-gray-400">Fusion Authentique</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Indicateur de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
        variants={scrollIndicatorVariants}
        animate="animate"
        onClick={scrollToMenu}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Découvrir</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection