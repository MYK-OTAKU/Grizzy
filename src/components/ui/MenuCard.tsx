import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Flame, Award, Leaf } from 'lucide-react'
import { MenuCardProps } from '@/types'
import { ANALYTICS_EVENTS } from '@utils/constants'
import Card from './Card'
import Button from './Button'
import useWhatsApp from '@hooks/useWhatsApp'

const MenuCard: React.FC<MenuCardProps> = ({
  burger,
  onOrder,
  showCategory = true,
  compact = false,
  className = ''
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { sendOrder } = useWhatsApp()

  // Gérer la commande via WhatsApp
  const handleOrder = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', ANALYTICS_EVENTS.BURGER_VIEW, {
        burger_name: burger.name,
        burger_id: burger.id,
        burger_price: burger.price,
        burger_category: burger.category
      })
    }

    if (onOrder) {
      onOrder(burger)
    } else {
      sendOrder(burger)
    }
  }

  // Gérer le hover pour analytics
  const handleHover = () => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', ANALYTICS_EVENTS.BURGER_HOVER, {
        burger_name: burger.name,
        burger_id: burger.id
      })
    }
  }

  // Obtenir l'icône selon la catégorie
  const getCategoryIcon = () => {
    switch (burger.category) {
      case 'signature':
        return <Award className="w-4 h-4" />
      case 'vegan':
        return <Leaf className="w-4 h-4" />
      default:
        return null
    }
  }

  // Obtenir la couleur du badge catégorie
  const getCategoryColor = () => {
    switch (burger.category) {
      case 'signature':
        return 'bg-grillz-orange/20 text-grillz-orange border-grillz-orange/30'
      case 'vegan':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'classic':
        return 'bg-grillz-grey/20 text-grillz-grey border-grillz-grey/30'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  // Rendu du niveau de piment
  const renderSpicyLevel = () => {
    if (!burger.spicyLevel) return null

    return (
      <div className="flex items-center space-x-1">
        {[...Array(3)].map((_, i) => (
          <Flame
            key={i}
            className={`w-3 h-3 ${
              i < burger.spicyLevel! 
                ? 'text-red-500 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.4,
        type: "spring",
        stiffness: 300
      }
    }
  }

  return (
    <motion.div
      className={`group ${className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      onHoverStart={handleHover}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card
        hover={true}
        padding="sm"
        className="h-full overflow-hidden"
      >
        {/* Image du burger */}
        <div className="relative overflow-hidden rounded-lg mb-4">
          <motion.div
            className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
            variants={imageVariants}
          >
            {!imageError ? (
              <img
                src={burger.image}
                alt={burger.name}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-grillz-orange/20 to-grillz-yellow/20">
                <Flame className="w-12 h-12 text-grillz-orange" />
              </div>
            )}
            
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 loading-shimmer" />
            )}
          </motion.div>

          {/* Badges overlay */}
          <div className="absolute top-2 left-2 flex flex-col space-y-2">
            {burger.popular && (
              <span className="bg-grillz-orange text-white text-xs font-bold px-2 py-1 rounded-full">
                POPULAIRE
              </span>
            )}
            
            {burger.moroccanFusion && (
              <span className="bg-morocco-terracotta text-white text-xs font-bold px-2 py-1 rounded-full">
                FUSION 🇲🇦
              </span>
            )}
          </div>

          {/* Prix overlay */}
          <div className="absolute top-2 right-2">
            <span className="bg-grillz-black/80 text-grillz-yellow font-bold text-lg px-3 py-1 rounded-full backdrop-blur-sm">
              {burger.price} DH
            </span>
          </div>
        </div>

        {/* Contenu de la carte */}
        <div className="space-y-3">
          {/* Header avec nom et catégorie */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold text-grillz-black mb-1 group-hover:text-grillz-orange transition-colors">
                {burger.name}
              </h3>
              
              {showCategory && (
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full border ${getCategoryColor()}`}>
                    {getCategoryIcon()}
                    <span className="capitalize">{burger.category}</span>
                  </span>
                  {renderSpicyLevel()}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className={`text-gray-600 leading-relaxed ${
            compact ? 'text-sm line-clamp-2' : 'text-sm'
          }`}>
            {burger.description}
          </p>

          {/* Ingrédients (si pas compact) */}
          {!compact && burger.ingredients.length > 0 && (
            <div>
              <p className="text-xs font-medium text-grillz-grey mb-1">
                Ingrédients principaux:
              </p>
              <p className="text-xs text-gray-500 line-clamp-2">
                {burger.ingredients.slice(0, 4).join(' • ')}
                {burger.ingredients.length > 4 && '...'}
              </p>
            </div>
          )}

          {/* Allergènes */}
          {burger.allergens && burger.allergens.length > 0 && (
            <p className="text-xs text-gray-400">
              <span className="font-medium">Allergènes:</span> {burger.allergens.join(', ')}
            </p>
          )}

          {/* Bouton de commande */}
          <motion.div
            variants={buttonVariants}
            className="pt-2"
          >
            <Button
              variant="whatsapp"
              className="w-full group-hover:scale-105 transition-transform"
              onClick={handleOrder}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Commander {burger.price} DH
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export default MenuCard