import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Award, Users, Flame, Star, Crown } from 'lucide-react'
import { RESTAURANT_INFO } from '@utils/constants'
import useScrollReveal from '@hooks/useScrollReveal'

const AboutSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal()

  // Valeurs et points forts du restaurant
  const values = [
    {
      icon: Heart,
      title: 'Passion Authentique',
      description: 'Chaque burger est préparé avec amour et respect des traditions culinaires marocaines.'
    },
    {
      icon: Award,
      title: 'Qualité Premium',
      description: 'Ingrédients sélectionnés, viandes premium et épices importées directement du Maroc.'
    },
    {
      icon: Users,
      title: 'Équipe Dévouée',
      description: 'Une équipe passionnée qui met son savoir-faire au service de votre satisfaction.'
    },
    {
      icon: Flame,
      title: 'Cuisson Parfaite',
      description: 'Maîtrise du grill et techniques de cuisson pour révéler tous les arômes.'
    }
  ]

  // Statistiques impressionnantes
  const stats = [
    {
      icon: Crown,
      number: '2019',
      label: 'Année de Création',
      description: '5 ans d\'excellence'
    },
    {
      icon: Star,
      number: '1000+',
      label: 'Clients Satisfaits',
      description: 'Chaque mois'
    },
    {
      icon: Award,
      number: '12',
      label: 'Recettes Signature',
      description: 'Créations uniques'
    },
    {
      icon: Flame,
      number: '100%',
      label: 'Halal Certifié',
      description: 'Qualité garantie'
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section
      ref={ref}
      id="about"
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-moroccan-pattern opacity-3" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-grillz-orange/5 rounded-full blur-3xl translate-x-48" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-morocco-terracotta/5 rounded-full blur-3xl -translate-x-32" />
      
      <motion.div
        className="container-grillz relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Header de section */}
        <motion.div
          className="text-center mb-20"
          variants={itemVariants}
        >
          <span className="inline-block bg-grillz-orange/10 text-grillz-orange font-medium px-4 py-2 rounded-full text-sm mb-4">
            Notre Histoire
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-grillz-black mb-6">
            L'Esprit
            <span className="text-gradient block">GRILL'Z</span>
          </h2>
          
          <p className="text-xl text-grillz-grey max-w-3xl mx-auto leading-relaxed">
            Une histoire de passion pour les burgers parfaits, alliant tradition 
            du grill et innovation culinaire pour des expériences gustatives exceptionnelles.
          </p>
        </motion.div>

        {/* Contenu principal en deux colonnes */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Histoire et description */}
          <motion.div
            className="space-y-8"
            variants={itemVariants}
          >
            <div>
              <h3 className="font-display text-3xl font-bold text-grillz-black mb-4">
                L'Art du Burger Parfait
              </h3>
              <p className="text-lg text-grillz-grey leading-relaxed mb-6">
                {RESTAURANT_INFO.description}
              </p>
              <p className="text-lg text-grillz-grey leading-relaxed">
                Depuis notre ouverture, GRILL'Z s'est imposé comme LA référence burger 
                au Maroc. Notre secret ? Des ingrédients frais sélectionnés quotidiennement, 
                une cuisson au grill maîtrisée à la perfection, et une équipe passionnée 
                qui met tout son cœur dans chaque préparation.
              </p>
            </div>

            <div className="bg-gradient-to-r from-grillz-orange/10 to-grillz-yellow/10 p-6 rounded-xl border-l-4 border-grillz-orange">
              <h4 className="font-display text-xl font-bold text-grillz-black mb-2">
                Notre Mission
              </h4>
              <p className="text-grillz-grey">
                Révolutionner l'expérience burger en célébrant la richesse culinaire 
                marocaine, tout en respectant les attentes modernes de qualité, 
                rapidité et authenticité.
              </p>
            </div>
          </motion.div>

          {/* Image du restaurant ou équipe */}
          <motion.div
            className="relative"
            variants={imageVariants}
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-grillz-orange/20 to-grillz-yellow/20">
              <img
                src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80"
                alt="Équipe GRILL'Z - Passionnés de cuisine fusion marocaine"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            {/* Badges flottants */}
            <motion.div
              className="absolute -top-4 -left-4 bg-grillz-orange text-white p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Star className="w-6 h-6 mb-1" />
              <div className="text-sm font-bold">5⭐</div>
              <div className="text-xs">Excellence</div>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -right-4 bg-morocco-terracotta text-white p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Heart className="w-6 h-6 mb-1" />
              <div className="text-sm font-bold">100%</div>
              <div className="text-xs">Passion</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Nos Valeurs */}
        <motion.div
          className="mb-20"
          variants={itemVariants}
        >
          <h3 className="font-display text-3xl font-bold text-grillz-black text-center mb-12">
            Ce Qui Nous Anime
          </h3>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              
              return (
                <motion.div
                  key={value.title}
                  className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: index * 0.1,
                        duration: 0.5
                      }
                    }
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-grillz-orange/10 text-grillz-orange rounded-xl mb-4 group-hover:bg-grillz-orange group-hover:text-white transition-all duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-grillz-black mb-2">
                    {value.title}
                  </h4>
                  <p className="text-grillz-grey text-sm">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          className="bg-gradient-to-r from-grillz-black via-grillz-black to-grillz-orange/20 rounded-2xl p-8 md:p-12 text-white"
          variants={statsVariants}
        >
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl font-bold mb-4">
              GRILL'Z en Chiffres
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Quelques chiffres qui témoignent de notre engagement 
              et de la confiance de nos clients
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              
              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        delay: index * 0.1 + 0.3,
                        duration: 0.5
                      }
                    }
                  }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-grillz-orange text-white rounded-xl mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-grillz-orange mb-2">
                    {stat.number}
                  </div>
                  <div className="font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-300">
                    {stat.description}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default AboutSection