import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Users, Utensils, Eye } from 'lucide-react'
import { galleryItems, getFoodGallery, getAmbianceGallery, getTeamGallery, getFeaturedGallery } from '@data/gallery'
import { ANALYTICS_EVENTS } from '@utils/constants'
import Carousel from '@components/ui/Carousel'
import useScrollReveal from '@hooks/useScrollReveal'

const GallerySection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal()
  const [activeCategory, setActiveCategory] = useState<string>('featured')

  // Catégories de galerie avec icônes
  const categories = [
    {
      id: 'featured',
      label: 'Sélection',
      icon: Camera,
      count: getFeaturedGallery().length,
      items: getFeaturedGallery()
    },
    {
      id: 'food',
      label: 'Nos Plats',
      icon: Utensils,
      count: getFoodGallery().length,
      items: getFoodGallery()
    },
    {
      id: 'ambiance',
      label: 'Ambiance',
      icon: Eye,
      count: getAmbianceGallery().length,
      items: getAmbianceGallery()
    },
    {
      id: 'team',
      label: 'Notre Équipe',
      icon: Users,
      count: getTeamGallery().length,
      items: getTeamGallery()
    }
  ]

  // Obtenir les items de la catégorie active
  const activeItems = categories.find(cat => cat.id === activeCategory)?.items || getFeaturedGallery()

  // Gérer le changement de catégorie
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', ANALYTICS_EVENTS.GALLERY_IMAGE_VIEW, {
        category: categoryId,
        action: 'category_change'
      })
    }
  }

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

  const headerVariants = {
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

  const categoryVariants = {
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

  const carouselVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section
      ref={ref}
      id="gallery"
      className="section-padding bg-gradient-to-br from-gray-50 via-white to-grillz-orange/5 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-grillz-orange/5 rounded-full blur-3xl -translate-y-48 translate-x-48" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-grillz-yellow/5 rounded-full blur-3xl translate-y-32 -translate-x-32" />
      
      <motion.div
        className="container-grillz relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Header de section */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
        >
          <span className="inline-block bg-grillz-orange/10 text-grillz-orange font-medium px-4 py-2 rounded-full text-sm mb-4">
            Notre Galerie
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-grillz-black mb-6">
            Plongez dans
            <span className="text-gradient block">L'Univers GRILL'Z</span>
          </h2>
          
          <p className="text-xl text-grillz-grey max-w-3xl mx-auto leading-relaxed">
            Découvrez l'atmosphère unique de notre restaurant, nos créations culinaires 
            et l'équipe passionnée qui donne vie à chaque burger avec amour et expertise.
          </p>
        </motion.div>

        {/* Filtres de catégories */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
          variants={categoryVariants}
        >
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            
            return (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-grillz-orange text-white shadow-lg shadow-grillz-orange/30'
                    : 'bg-white text-grillz-grey hover:bg-grillz-orange/10 hover:text-grillz-orange shadow-md'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                <span>{category.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-grillz-orange/20 text-grillz-orange'
                }`}>
                  {category.count}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Carrousel principal */}
        <motion.div
          className="mb-16"
          variants={carouselVariants}
        >
          <Carousel
            items={activeItems}
            autoPlay={true}
            showDots={true}
            showArrows={true}
            interval={6000}
            className="max-w-5xl mx-auto shadow-2xl"
            imageClassName="transition-transform duration-500 hover:scale-105"
          />
        </motion.div>

        {/* Grille de miniatures */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16"
          variants={containerVariants}
        >
          {activeItems.slice(0, 12).map((item, index) => (
            <motion.div
              key={`${activeCategory}-${item.id}`}
              className="aspect-square rounded-lg overflow-hidden bg-gray-200 cursor-pointer group"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: index * 0.05,
                    duration: 0.4
                  }
                }
              }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => {
                // Analytics tracking
                if (typeof gtag !== 'undefined') {
                  gtag('event', ANALYTICS_EVENTS.GALLERY_IMAGE_VIEW, {
                    image_id: item.id,
                    category: item.category,
                    action: 'thumbnail_click'
                  })
                }
              }}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                loading="lazy"
              />
              
              {/* Overlay au hover */}
              <div className="absolute inset-0 bg-grillz-orange/0 group-hover:bg-grillz-orange/20 transition-all duration-300 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistiques de la galerie */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={statsVariants}
        >
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-grillz-orange mb-2">
              {galleryItems.length}+
            </div>
            <div className="text-grillz-grey font-medium">
              Photos Exclusives
            </div>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-grillz-yellow mb-2">
              4
            </div>
            <div className="text-grillz-grey font-medium">
              Catégories Visuelles
            </div>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-morocco-terracotta mb-2">
              HD
            </div>
            <div className="text-grillz-grey font-medium">
              Qualité Premium
            </div>
          </div>
        </motion.div>

        {/* CTA Instagram */}
        <motion.div
          className="text-center mt-16 p-8 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl border border-purple-200"
          variants={headerVariants}
        >
          <h3 className="font-display text-2xl font-bold text-grillz-black mb-4">
            Suivez-nous sur Instagram
          </h3>
          <p className="text-grillz-grey mb-6 max-w-2xl mx-auto">
            Découvrez encore plus de photos exclusives, des behind-the-scenes 
            et les dernières créations GRILL'Z sur notre Instagram officiel !
          </p>
          <motion.a
            href="https://instagram.com/grillz.ma"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera className="w-5 h-5" />
            <span>@grillz.ma</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default GallerySection