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
  { key: 'ancianos', label: 'ANCIANOS', order: 1 },
  { key: 'adultos', label: 'ADULTOS', order: 2 },
  { key: 'jovenes', label: 'JÓVENES', order: 3 },
  { key: 'adolescentes', label: 'ADOLESCENTES', order: 4 },
  { key: 'ninos', label: 'NIÑOS', order: 5 },
  { key: 'visitas', label: 'VISITAS', order: 6 }
];

// Fuentes disponibles
export const AVAILABLE_FONTS = [
  { value: 'Times New Roman, serif', label: 'Times New Roman', category: 'serif' },
  { value: 'Georgia, serif', label: 'Georgia', category: 'serif' },
  { value: 'Arial, sans-serif', label: 'Arial', category: 'sans-serif' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica', category: 'sans-serif' },
  { value: 'Verdana, sans-serif', label: 'Verdana', category: 'sans-serif' },
  { value: 'Montserrat, sans-serif', label: 'Montserrat', category: 'sans-serif' },
  { value: 'Roboto, sans-serif', label: 'Roboto', category: 'sans-serif' },
  { value: 'Courier New, monospace', label: 'Courier New', category: 'monospace' }
];

// Tamaños de texto predefinidos
export const TEXT_SIZES = {
  TITLE: {
    small: '60px',
    medium: '80px',
    large: '100px',
    xlarge: '120px'
  },
  LABEL: {
    small: '28px',
    medium: '36px',
    large: '45px',
    xlarge: '54px'
  },
  NUMBER: {
    small: '32px',
    medium: '40px',
    large: '50px',
    xlarge: '60px'
  },
  TOTAL: {
    small: '60px',
    medium: '75px',
    large: '90px',
    xlarge: '110px'
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
  CUSTOM_BACKGROUNDS: 'asipuc_custom_backgrounds',
  ACTIVE_BACKGROUND: 'asipuc_active_background',
  DEFAULT_BACKGROUNDS: 'asipuc_default_backgrounds'
};

// Nombres de temas
export const THEME_NAMES = {
  DARK: 'dark',
  LIGHT: 'light',
  CUSTOM: 'custom'
};

// Imágenes de fondo predefinidas
// NOTA: En producción, estas rutas apuntarían a archivos en /resources
export const DEFAULT_BACKGROUNDS = [
  {
    id: 'default_1',
    name: 'Fondo Iglesia Clásico',
    thumbnail: '/backgrounds/thumbnails/church_classic.jpg',
    fullImage: '/backgrounds/church_classic.jpg',
    category: 'religious'
  },
  {
    id: 'default_2',
    name: 'Vidriera Colorida',
    thumbnail: '/backgrounds/thumbnails/stained_glass.jpg',
    fullImage: '/backgrounds/stained_glass.jpg',
    category: 'religious'
  },
  {
    id: 'default_3',
    name: 'Cruz Dorada',
    thumbnail: '/backgrounds/thumbnails/golden_cross.jpg',
    fullImage: '/backgrounds/golden_cross.jpg',
    category: 'religious'
  },
  {
    id: 'default_4',
    name: 'Cielo Estrellado',
    thumbnail: '/backgrounds/thumbnails/starry_sky.jpg',
    fullImage: '/backgrounds/starry_sky.jpg',
    category: 'nature'
  },
  {
    id: 'default_5',
    name: 'Gradiente Oscuro',
    thumbnail: '/backgrounds/thumbnails/dark_gradient.jpg',
    fullImage: '/backgrounds/dark_gradient.jpg',
    category: 'abstract'
  },
  {
    id: 'default_6',
    name: 'Gradiente Claro',
    thumbnail: '/backgrounds/thumbnails/light_gradient.jpg',
    fullImage: '/backgrounds/light_gradient.jpg',
    category: 'abstract'
  }
];

// Formatos de exportación disponibles
export const EXPORT_FORMATS = {
  PNG: { value: 'png', label: 'PNG (sin pérdida)', extension: '.png' },
  JPEG: { value: 'jpeg', label: 'JPEG (comprimido)', extension: '.jpg' }
};
