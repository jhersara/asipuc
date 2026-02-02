/**
 * DEFINICIÓN DE TEMAS
 * 
 * Cada tema incluye todas las variables de diseño necesarias.
 * Actualizado con nueva paleta de colores moderna.
 */

import { TEXT_SIZES, BRAND_COLORS } from '../config/constants';

/**
 * Tema moderno (basado en la UI proporcionada)
 */
export const modernTheme = {
  name: 'modern',
  colors: {
    // Colores de la interfaz de control (UI oscura moderna)
    controlBackground: BRAND_COLORS.GRAY_900,
    controlText: BRAND_COLORS.PRIMARY_WHITE,
    inputBackground: BRAND_COLORS.GRAY_800,
    inputText: BRAND_COLORS.PRIMARY_WHITE,
    inputBorder: BRAND_COLORS.GRAY_700,
    
    // Colores de botones
    primaryButton: BRAND_COLORS.ACCENT_PURPLE,
    primaryButtonHover: '#5f4fd1',
    successButton: BRAND_COLORS.PRIMARY_YELLOW,
    successButtonHover: '#e07d0a',
    dangerButton: BRAND_COLORS.ACCENT_PINK,
    dangerButtonHover: '#fc5c8d',
    buttonText: BRAND_COLORS.PRIMARY_WHITE,
    
    // Colores del slide (basado en imagen de ejemplo)
    slideBackground: '#000000',
    slideText: BRAND_COLORS.PRIMARY_WHITE,
    slideBorder: BRAND_COLORS.PRIMARY_WHITE,
    slideHeaderShadow: 'rgba(0, 0, 0, 0.8)',
    
    // Overlay/gradientes
    slideOverlay: 'rgba(0, 0, 0, 0.6)',
    
    // Acentos
    accentPrimary: BRAND_COLORS.PRIMARY_YELLOW,
    accentSecondary: BRAND_COLORS.ACCENT_PURPLE,
    accentSuccess: BRAND_COLORS.ACCENT_GREEN
  },
  
  fonts: {
    primary: 'Bebas Neue, Impact, sans-serif',
    secondary: 'Roboto, Arial, sans-serif',
    display: 'Anton, Impact, sans-serif'
  },
  
  sizes: {
    title: TEXT_SIZES.TITLE.large,
    label: TEXT_SIZES.LABEL.large,
    number: TEXT_SIZES.NUMBER.large,
    total: TEXT_SIZES.TOTAL.large
  },
  
  spacing: {
    slideInternalPadding: '60px',
    gridCellPadding: '20px 40px',
    headerMarginBottom: '60px',
    gridWidth: '85%',
    logoSize: '140px',
    logoMargin: '40px'
  },
  
  effects: {
    textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8)',
    borderWidth: '4px',
    borderStyle: 'solid',
    gridBorderBottom: '3px solid',
    gridBorderRight: '3px solid',
    borderRadius: '8px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
  }
};

/**
 * Tema oscuro (original mejorado)
 */
export const darkTheme = {
  name: 'dark',
  colors: {
    controlBackground: '#333',
    controlText: '#ffffff',
    inputBackground: '#444',
    inputText: '#ffffff',
    inputBorder: '#666',
    
    primaryButton: BRAND_COLORS.PRIMARY_BLUE,
    primaryButtonHover: '#013a9e',
    successButton: BRAND_COLORS.ACCENT_GREEN,
    successButtonHover: '#009874',
    dangerButton: '#dc3545',
    dangerButtonHover: '#c82333',
    buttonText: '#ffffff',
    
    slideBackground: '#000000',
    slideText: '#ffffff',
    slideBorder: '#ffffff',
    slideHeaderShadow: '#333333',
    
    slideOverlay: 'rgba(0, 0, 0, 0.5)',
    
    accentPrimary: BRAND_COLORS.PRIMARY_BLUE,
    accentSecondary: BRAND_COLORS.PRIMARY_YELLOW,
    accentSuccess: BRAND_COLORS.ACCENT_GREEN
  },
  
  fonts: {
    primary: 'Times New Roman, serif',
    secondary: 'Arial, sans-serif',
    display: 'Times New Roman, serif'
  },
  
  sizes: {
    title: TEXT_SIZES.TITLE.large,
    label: TEXT_SIZES.LABEL.large,
    number: TEXT_SIZES.NUMBER.large,
    total: TEXT_SIZES.TOTAL.large
  },
  
  spacing: {
    slideInternalPadding: '50px',
    gridCellPadding: '18px 35px',
    headerMarginBottom: '50px',
    gridWidth: '90%',
    logoSize: '120px',
    logoMargin: '30px'
  },
  
  effects: {
    textShadow: '4px 4px 0px #333',
    borderWidth: '3px',
    borderStyle: 'solid',
    gridBorderBottom: '2px solid',
    gridBorderRight: '2px solid',
    borderRadius: '0px',
    boxShadow: 'none'
  }
};

/**
 * Tema claro
 */
export const lightTheme = {
  name: 'light',
  colors: {
    controlBackground: BRAND_COLORS.GRAY_100,
    controlText: BRAND_COLORS.GRAY_900,
    inputBackground: '#ffffff',
    inputText: BRAND_COLORS.GRAY_900,
    inputBorder: BRAND_COLORS.GRAY_300,
    
    primaryButton: BRAND_COLORS.PRIMARY_BLUE,
    primaryButtonHover: '#013a9e',
    successButton: BRAND_COLORS.ACCENT_GREEN,
    successButtonHover: '#009874',
    dangerButton: '#dc3545',
    dangerButtonHover: '#c82333',
    buttonText: '#ffffff',
    
    slideBackground: '#ffffff',
    slideText: '#000000',
    slideBorder: '#000000',
    slideHeaderShadow: '#cccccc',
    
    slideOverlay: 'rgba(255, 255, 255, 0.5)',
    
    accentPrimary: BRAND_COLORS.PRIMARY_BLUE,
    accentSecondary: BRAND_COLORS.PRIMARY_YELLOW,
    accentSuccess: BRAND_COLORS.ACCENT_GREEN
  },
  
  fonts: {
    primary: 'Times New Roman, serif',
    secondary: 'Arial, sans-serif',
    display: 'Times New Roman, serif'
  },
  
  sizes: {
    title: TEXT_SIZES.TITLE.large,
    label: TEXT_SIZES.LABEL.large,
    number: TEXT_SIZES.NUMBER.large,
    total: TEXT_SIZES.TOTAL.large
  },
  
  spacing: {
    slideInternalPadding: '50px',
    gridCellPadding: '18px 35px',
    headerMarginBottom: '50px',
    gridWidth: '90%',
    logoSize: '120px',
    logoMargin: '30px'
  },
  
  effects: {
    textShadow: '2px 2px 0px #cccccc',
    borderWidth: '3px',
    borderStyle: 'solid',
    gridBorderBottom: '2px solid',
    gridBorderRight: '2px solid',
    borderRadius: '0px',
    boxShadow: 'none'
  }
};

/**
 * Tema base para personalizaciones
 */
export const createCustomTheme = (overrides = {}) => {
  return {
    name: 'custom',
    colors: {
      ...modernTheme.colors,
      ...(overrides.colors || {})
    },
    fonts: {
      ...modernTheme.fonts,
      ...(overrides.fonts || {})
    },
    sizes: {
      ...modernTheme.sizes,
      ...(overrides.sizes || {})
    },
    spacing: {
      ...modernTheme.spacing,
      ...(overrides.spacing || {})
    },
    effects: {
      ...modernTheme.effects,
      ...(overrides.effects || {})
    },
    backgroundImage: overrides.backgroundImage || null,
    logos: overrides.logos || {
      primary: null,
      secondary: null,
      position: 'top-left'
    }
  };
};

/**
 * Temas disponibles
 */
export const themes = {
  modern: modernTheme,
  dark: darkTheme,
  light: lightTheme
};

/**
 * Obtener tema por nombre
 */
export const getThemeByName = (themeName) => {
  return themes[themeName] || modernTheme; // Por defecto, tema moderno
};
