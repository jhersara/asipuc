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
  LAST_ATTENDANCE: 'asipuc_last_attendance'
};

// Nombres de temas
export const THEME_NAMES = {
  DARK: 'dark',
  LIGHT: 'light',
  CUSTOM: 'custom'
};
