/**
 * CONSTANTES GLOBALES DE LA APLICACIÓN
 * 
 * Centraliza todos los valores constantes para facilitar mantenimiento.
 * Siguiendo el principio DRY (Don't Repeat Yourself).
 */

// ========================================
// PALETA DE COLORES OFICIAL
// ========================================
export const BRAND_COLORS = {
  // Colores principales (basados en la UI proporcionada)
  PRIMARY_YELLOW: '#f68d13',
  PRIMARY_BLUE_DARK: '#111835',
  PRIMARY_BLUE: '#0248c1',
  PRIMARY_WHITE: '#fbfcfc',
  
  // Colores secundarios
  ACCENT_PURPLE: '#6c5ce7',
  ACCENT_PINK: '#fd79a8',
  ACCENT_GREEN: '#00b894',
  
  // Grises
  GRAY_900: '#1a1a2e',
  GRAY_800: '#16213e',
  GRAY_700: '#2d3561',
  GRAY_600: '#3f4b7a',
  GRAY_500: '#6c7a9b',
  GRAY_400: '#94a3b8',
  GRAY_300: '#cbd5e1',
  GRAY_200: '#e2e8f0',
  GRAY_100: '#f1f5f9'
};

// Resoluciones de exportación
export const IMAGE_RESOLUTIONS = {
  HD: { width: 1280, height: 720, label: 'HD (1280x720)' },
  FULL_HD: { width: 1920, height: 1080, label: 'Full HD (1920x1080)' },
  QHD: { width: 2560, height: 1440, label: 'QHD (2560x1440)' },
  UHD_4K: { width: 3840, height: 2160, label: '4K (3840x2160)' }
};

// Resolución por defecto (requerimiento: 1920x1080)
export const DEFAULT_RESOLUTION = IMAGE_RESOLUTIONS.FULL_HD;

// Categorías de asistencia
export const ATTENDANCE_CATEGORIES = [
  { key: 'ancianos', label: 'ANCIANO', labelPlural: 'ANCIANOS', order: 1 },
  { key: 'adultos', label: 'ADULTO', labelPlural: 'ADULTOS', order: 2 },
  { key: 'jovenes', label: 'JOVEN', labelPlural: 'JÓVENES', order: 3 },
  { key: 'adolescentes', label: 'ADOLESCENTE', labelPlural: 'ADOLESCENTES', order: 4 },
  { key: 'ninos', label: 'NIÑO', labelPlural: 'NIÑOS', order: 5 },
  { key: 'visitas', label: 'VISITA', labelPlural: 'VISITAS', order: 6 }
];

// Fuentes disponibles (personalizadas)
export const AVAILABLE_FONTS = [
  // Fuentes del sistema
  { value: 'Times New Roman, serif', label: 'Times New Roman', category: 'serif', isCustom: false },
  { value: 'Georgia, serif', label: 'Georgia', category: 'serif', isCustom: false },
  { value: 'Arial, sans-serif', label: 'Arial', category: 'sans-serif', isCustom: false },
  { value: 'Helvetica, sans-serif', label: 'Helvetica', category: 'sans-serif', isCustom: false },
  { value: 'Verdana, sans-serif', label: 'Verdana', category: 'sans-serif', isCustom: false },
  
  // Fuentes personalizadas (el usuario las descargará)
  { value: 'Montserrat, sans-serif', label: 'Montserrat', category: 'sans-serif', isCustom: true },
  { value: 'Roboto, sans-serif', label: 'Roboto', category: 'sans-serif', isCustom: true },
  { value: 'Poppins, sans-serif', label: 'Poppins', category: 'sans-serif', isCustom: true },
  { value: 'Bebas Neue, sans-serif', label: 'Bebas Neue', category: 'display', isCustom: true },
  { value: 'Anton, sans-serif', label: 'Anton', category: 'display', isCustom: true },
  { value: 'Oswald, sans-serif', label: 'Oswald', category: 'sans-serif', isCustom: true }
];

// Tamaños de texto predefinidos (ajustados para 1920x1080)
export const TEXT_SIZES = {
  TITLE: {
    small: '80px',
    medium: '100px',
    large: '120px',
    xlarge: '140px'
  },
  LABEL: {
    small: '36px',
    medium: '45px',
    large: '54px',
    xlarge: '63px'
  },
  NUMBER: {
    small: '40px',
    medium: '50px',
    large: '60px',
    xlarge: '70px'
  },
  TOTAL: {
    small: '80px',
    medium: '100px',
    large: '120px',
    xlarge: '140px'
  }
};

// Calidad de exportación de imagen
export const IMAGE_QUALITY = {
  LOW: 0.7,
  MEDIUM: 0.85,
  HIGH: 0.95,
  MAXIMUM: 1.0
};

export const IMAGE_QUALITY_OPTIONS = [
  { value: IMAGE_QUALITY.MEDIUM, label: 'Media (85%)', recommended: false },
  { value: IMAGE_QUALITY.HIGH, label: 'Alta (95%)', recommended: true },
  { value: IMAGE_QUALITY.MAXIMUM, label: 'Máxima (100%)', recommended: false }
];

// Formatos de exportación
export const EXPORT_FORMATS = {
  PNG: 'png',
  JPEG: 'jpeg'
};

export const EXPORT_FORMAT_OPTIONS = [
  { value: EXPORT_FORMATS.PNG, label: 'PNG (Recomendado)', extension: '.png' },
  { value: EXPORT_FORMATS.JPEG, label: 'JPEG', extension: '.jpg' }
];

// Configuración de localStorage
export const STORAGE_KEYS = {
  THEME: 'asipuc_theme',
  USER_CONFIG: 'asipuc_user_config',
  LAST_ATTENDANCE: 'asipuc_last_attendance',
  EXPORT_SETTINGS: 'asipuc_export_settings',
  CUSTOM_BACKGROUNDS: 'asipuc_custom_backgrounds',
  CUSTOM_LOGOS: 'asipuc_custom_logos'
};

// Nombres de temas
export const THEME_NAMES = {
  DARK: 'dark',
  LIGHT: 'light',
  CUSTOM: 'custom',
  MODERN: 'modern' // Nuevo tema moderno
};

// Rutas de recursos
export const RESOURCE_PATHS = {
  FONTS: '/resources/fonts',
  BACKGROUNDS: '/resources/backgrounds',
  LOGOS: '/resources/logos'
};

// Configuración de logos
export const LOGO_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
  POSITIONS: {
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right'
  },
  DEFAULT_SIZE: 120 // px
};

// Configuración de fondos
export const BACKGROUND_CONFIG = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  RECOMMENDED_RESOLUTION: DEFAULT_RESOLUTION
};
