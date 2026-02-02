/**
 * CONSTANTES GLOBALES DE LA APLICACIÓN
 * 
 * Centraliza todos los valores constantes para facilitar mantenimiento.
 * Siguiendo el principio DRY (Don't Repeat Yourself).
 */

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
  { key: 'ancianos', label: 'ANCIANO', order: 1 },
  { key: 'adultos', label: 'ADULTOS', order: 2 },
  { key: 'jovenes', label: 'JÓVENES', order: 3 },
  { key: 'adolescentes', label: 'ADOLESCENTES', order: 4 },
  { key: 'ninos', label: 'NIÑOS', order: 5 },
  { key: 'visitas', label: 'VISITAS', order: 6 }
];

// Fuentes del sistema (web safe fonts)
export const SYSTEM_FONTS = [
  { value: 'Impact, sans-serif', label: 'Impact', category: 'display', weight: '900' },
  { value: 'Arial Black, sans-serif', label: 'Arial Black', category: 'sans-serif', weight: '900' },
  { value: 'Times New Roman, serif', label: 'Times New Roman', category: 'serif', weight: 'normal' },
  { value: 'Georgia, serif', label: 'Georgia', category: 'serif', weight: 'normal' },
  { value: 'Arial, sans-serif', label: 'Arial', category: 'sans-serif', weight: 'normal' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica', category: 'sans-serif', weight: 'normal' },
  { value: 'Verdana, sans-serif', label: 'Verdana', category: 'sans-serif', weight: 'normal' },
  { value: 'Courier New, monospace', label: 'Courier New', category: 'monospace', weight: 'normal' }
];

// Rutas de recursos del sistema
export const SYSTEM_PATHS = {
  FONTS: 'resources/assets/fonts',
  BACKGROUNDS: 'resources/assets/backgrounds',
  LOGOS: 'resources/assets/logos'
};

// Rutas de recursos del usuario
export const USER_PATHS = {
  FONTS: 'resources/user-uploads/fonts',
  BACKGROUNDS: 'resources/user-uploads/backgrounds',
  LOGOS: 'resources/user-uploads/logos'
};

// Formatos de archivo soportados
export const SUPPORTED_FORMATS = {
  FONTS: ['.ttf', '.otf', '.woff', '.woff2'],
  IMAGES: ['.jpg', '.jpeg', '.png', '.webp'],
  LOGOS: ['.png', '.svg']
};

// Tamaños de texto predefinidos (ajustados para 1920x1080)
export const TEXT_SIZES = {
  TITLE: {
    small: '80px',
    medium: '100px',
    large: '120px',
    xlarge: '140px'
  },
  LABEL: {
    small: '40px',
    medium: '50px',
    large: '60px',
    xlarge: '70px'
  },
  NUMBER: {
    small: '50px',
    medium: '60px',
    large: '70px',
    xlarge: '80px'
  },
  TOTAL: {
    small: '90px',
    medium: '110px',
    large: '130px',
    xlarge: '150px'
  },
  HASHTAG: {
    small: '24px',
    medium: '30px',
    large: '36px',
    xlarge: '42px'
  }
};

// Calidad de exportación de imagen
export const IMAGE_QUALITY = {
  LOW: 0.7,
  MEDIUM: 0.85,
  HIGH: 0.95,
  MAXIMUM: 1.0
};

// Configuración de localStorage
export const STORAGE_KEYS = {
  THEME: 'asipuc_theme',
  USER_CONFIG: 'asipuc_user_config',
  LAST_ATTENDANCE: 'asipuc_last_attendance',
  EXPORT_SETTINGS: 'asipuc_export_settings'
};

// Nombres de temas
export const THEME_NAMES = {
  DARK: 'dark',
  LIGHT: 'light',
  CUSTOM: 'custom'
};

// Formatos de exportación
export const EXPORT_FORMATS = {
  PNG: { value: 'png', label: 'PNG (Mejor calidad)', extension: '.png' },
  JPEG: { value: 'jpeg', label: 'JPEG (Menor tamaño)', extension: '.jpg' }
};

// Opciones de calidad
export const QUALITY_OPTIONS = [
  { value: IMAGE_QUALITY.MAXIMUM, label: 'Máxima (100%)', speed: 'slow' },
  { value: IMAGE_QUALITY.HIGH, label: 'Alta (95%)', speed: 'medium' },
  { value: IMAGE_QUALITY.MEDIUM, label: 'Media (85%)', speed: 'fast' },
  { value: IMAGE_QUALITY.LOW, label: 'Baja (70%)', speed: 'fastest' }
];

// Tamaños máximos de archivo (en bytes)
export const MAX_FILE_SIZES = {
  FONT: 5 * 1024 * 1024, // 5MB
  IMAGE: 10 * 1024 * 1024, // 10MB
  LOGO: 5 * 1024 * 1024 // 5MB
};

// Posiciones de logos en el slide
export const LOGO_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right'
};

// Configuración por defecto de logos
export const DEFAULT_LOGO_CONFIG = {
  mainLogo: {
    position: LOGO_POSITIONS.TOP_LEFT,
    size: 150,
    offsetX: 40,
    offsetY: 40
  },
  secondaryLogo: {
    position: LOGO_POSITIONS.TOP_RIGHT,
    size: 150,
    offsetX: 40,
    offsetY: 40
  },
  watermark: {
    position: LOGO_POSITIONS.BOTTOM_RIGHT,
    size: 180,
    offsetX: 40,
    offsetY: 40,
    opacity: 1
  }
};
