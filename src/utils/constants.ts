import { RestaurantInfo, NavigationItem, SiteConfig } from '@/types'

// Configuration générale du site
export const SITE_CONFIG: SiteConfig = {
  name: 'GRILL\'Z',
  description: 'Restaurant de burgers fusion marocaine. Commandez directement via WhatsApp ! Saveurs authentiques, créations modernes.',
  url: 'https://grillz-restaurant.vercel.app',
  ogImage: '/images/grillz-social-share.jpg',
  social: {
    instagram: 'https://instagram.com/grillz.ma',
    facebook: 'https://facebook.com/grillz.ma',
    twitter: 'https://twitter.com/grillz_ma'
  },
  whatsapp: {
    number: '212625525036', // 06 25 52 50 36
    businessName: 'GRILL\'Z Burger'
  },
  analytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX' // À configurer
  }
}

// Informations du restaurant
export const RESTAURANT_INFO: RestaurantInfo = {
  name: 'GRILL\'Z',
  slogan: 'Smash it, Grill it, Taste it',
  subtitle: 'Le meilleur des burgers grillés',
  description: 'GRILL\'Z est votre destination burger de référence. Spécialistes du burger grillé à la perfection, nous proposons des créations savoureuses préparées avec des ingrédients frais et de qualité. Chaque burger est une expérience gustative unique.',
  address: {
    street: 'Résidence Daris 3, Immeuble 1',
    city: 'Nouaceur',
    postalCode: '27182',
    country: 'Maroc'
  },
  contact: {
    phone: '05 21 12 57 57',
    whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '212625525036',
    email: 'contact@grillzburger.ma'
  },
  hours: {
    'Tous les jours': '12:00 - 00:15'
  },
  socialMedia: {
    instagram: 'https://www.instagram.com/grillz_burger_/',
    facebook: 'https://facebook.com/grillzburger',
    tiktok: 'https://tiktok.com/@grillz_burger'
  }
}

// Navigation du site
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home',
    label: 'Accueil',
    href: '#home'
  },
  {
    id: 'menu',
    label: 'Notre Menu',
    href: '#menu'
  },
  {
    id: 'gallery',
    label: 'Galerie',
    href: '#gallery'
  },
  {
    id: 'about',
    label: 'À Propos',
    href: '#about'
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '#contact'
  }
]

// Constantes pour WhatsApp
export const WHATSAPP_CONFIG = {
  baseUrl: 'https://wa.me/',
  number: import.meta.env.VITE_WHATSAPP_NUMBER || '212625525036', // Utilise la variable d'environnement
  businessName: SITE_CONFIG.whatsapp.businessName
}

// Messages prédéfinis pour WhatsApp
export const WHATSAPP_MESSAGES = {
  greeting: (businessName: string) => 
    `🍔 Bonjour ${businessName}!\n\n`,
  
  orderTemplate: (burgerName: string, price: number) =>
    `Je souhaite commander:
• ${burgerName}
• Prix: ${price} DH

Merci! 🔥`,
    
  generalInquiry: (businessName: string) =>
    `🍔 Bonjour ${businessName}!

J'aimerais avoir plus d'informations sur votre menu.

Merci! 🔥`,
    
  reservation: (businessName: string) =>
    `🍔 Bonjour ${businessName}!

J'aimerais faire une réservation.

Merci! 🔥`
}

// Breakpoints responsive (correspond à Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

// Durées d'animation (millisecondes)
export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  carousel: 5000 // Auto-play carousel
} as const

// Configuration des couleurs (pour JS)
export const COLORS = {
  grillz: {
    black: '#1a1a1a',
    grey: '#4a4a4a',
    orange: '#d97706',
    yellow: '#f59e0b'
  },
  morocco: {
    terracotta: '#cd7f32',
    ochre: '#cc7722',
    red: '#8b0000',
    gold: '#ffd700'
  }
} as const

// Configuration SEO
export const SEO_CONFIG = {
  defaultTitle: 'GRILL\'Z - L\'Art du Burger Fusion Marocaine',
  titleTemplate: '%s | GRILL\'Z',
  defaultDescription: SITE_CONFIG.description,
  keywords: [
    'burger',
    'restaurant',
    'maroc',
    'fusion',
    'whatsapp',
    'commande',
    'grill',
    'halal',
    'casablanca',
    'livraison'
  ],
  author: 'GRILL\'Z Team',
  twitterHandle: '@grillz_ma'
}

// Configuration Analytics
export const ANALYTICS_EVENTS = {
  // Navigation
  MENU_CLICK: 'menu_navigation_click',
  SECTION_VIEW: 'section_view',
  
  // Menu interactions
  BURGER_VIEW: 'burger_view',
  BURGER_HOVER: 'burger_hover',
  
  // WhatsApp interactions
  WHATSAPP_CLICK: 'whatsapp_click',
  ORDER_ATTEMPT: 'order_attempt',
  
  // Gallery interactions  
  GALLERY_IMAGE_VIEW: 'gallery_image_view',
  CAROUSEL_INTERACTION: 'carousel_interaction',
  
  // Contact interactions
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',
  SOCIAL_CLICK: 'social_media_click',
  
  // Performance
  PAGE_LOAD: 'page_load_time',
  IMAGE_LOAD_ERROR: 'image_load_error'
} as const

// Configuration des images
export const IMAGE_CONFIG = {
  formats: ['webp', 'jpg'],
  sizes: {
    thumbnail: 300,
    card: 600,
    hero: 1200,
    gallery: 800
  },
  quality: {
    low: 60,
    medium: 80,
    high: 95
  }
} as const

// Regex patterns utiles
export const PATTERNS = {
  phone: /^(\+212|0)[5-7][0-9]{8}$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  whatsapp: /^(\+|00)[1-9]\d{1,14}$/
} as const

// Messages d'erreur
export const ERROR_MESSAGES = {
  WHATSAPP_UNAVAILABLE: 'WhatsApp n\'est pas disponible sur cet appareil',
  IMAGE_LOAD_FAILED: 'Impossible de charger l\'image',
  NETWORK_ERROR: 'Erreur de connexion réseau',
  INVALID_PHONE: 'Numéro de téléphone invalide',
  INVALID_EMAIL: 'Adresse email invalide'
} as const