import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { GalleryItem } from '@/types'
import { ANIMATION_DURATIONS } from '@utils/constants'

interface CarouselProps {
  items: GalleryItem[]
  autoPlay?: boolean
  showDots?: boolean
  showArrows?: boolean
  className?: string
  imageClassName?: string
  interval?: number
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  showDots = true,
  showArrows = true,
  className = '',
  imageClassName = '',
  interval = ANIMATION_DURATIONS.carousel
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [direction, setDirection] = useState(0)
  // const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Gestion de l'auto-play
  useEffect(() => {
    if (isPlaying && items.length > 1) {
      intervalRef.current = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % items.length)
      }, interval)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, items.length, interval])

  // Navigation précédent
  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  // Navigation suivant
  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  // Aller à un slide spécifique
  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Toggle pause/play
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Pause au hover
  const handleMouseEnter = () => {
    if (autoPlay) {
      setIsPlaying(false)
    }
  }

  const handleMouseLeave = () => {
    if (autoPlay) {
      setIsPlaying(true)
    }
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  }

  const transition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.4 },
    scale: { duration: 0.4 }
  }

  if (!items || items.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-100 rounded-lg ${className}`}>
        <p className="text-gray-500">Aucune image à afficher</p>
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gray-900 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Container des slides */}
      <div className="relative aspect-video">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0"
          >
            <img
              src={items[currentIndex].image}
              alt={items[currentIndex].alt}
              className={`w-full h-full object-cover ${imageClassName}`}
              loading="lazy"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Caption */}
            {items[currentIndex].caption && (
              <motion.div
                className="absolute bottom-4 left-4 right-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <p className="text-lg font-semibold bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg">
                  {items[currentIndex].caption}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Flèches de navigation */}
      {showArrows && items.length > 1 && (
        <>
          <motion.button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
            onClick={goToPrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
            onClick={goToNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </>
      )}

      {/* Contrôle play/pause */}
      {autoPlay && items.length > 1 && (
        <motion.button
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
          onClick={togglePlayPause}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </motion.button>
      )}

      {/* Indicateurs (dots) */}
      {showDots && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Aller au slide {index + 1}</span>
            </motion.button>
          ))}
        </div>
      )}

      {/* Barre de progression */}
      {autoPlay && isPlaying && items.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
          <motion.div
            className="h-full bg-grillz-orange"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: interval / 1000,
              ease: 'linear',
              repeat: Infinity
            }}
          />
        </div>
      )}

      {/* Compteur de slides */}
      {items.length > 1 && (
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          {currentIndex + 1} / {items.length}
        </div>
      )}
    </div>
  )
}

export default Carousel
