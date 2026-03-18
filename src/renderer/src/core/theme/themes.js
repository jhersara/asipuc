/**
 * DEFINICIÓN DE TEMAS MEJORADA
 * 
 * Incluye configuración completa para replicar el diseño de referencia.
 */

import { TEXT_SIZES, DEFAULT_LOGO_CONFIG } from '../config/constants';

/**
 * Tema oscuro (por defecto) - Basado en imagen de referencia
 */
export const darkTheme = {
  name: 'dark',
  
  colors: {
    // Colores de la interfaz de control
    controlBackground: '#333',
    controlText: '#ffffff',
    inputBackground: '#444',
    inputText: '#ffffff',
    inputBorder: '#666',
    
    // Colores de botones
    primaryButton: '#007bff',
    primaryButtonHover: '#0056b3',
    successButton: '#28a745',
    successButtonHover: '#1e7e34',
    buttonText: '#ffffff',
    
    // Colores del slide
    slideBackground: '#000000',
    slideText: '#ffffff',
    slideBorder: '#ffffff',
    slideHeaderShadow: 'rgba(0, 0, 0, 0.8)',
    
    // Overlay para fondos con imagen
    slideOverlay: 'rgba(0, 0, 0, 0.3)',
    
    // Color del hashtag
    hashtagColor: '#ffffff'
  },
  
  fonts: {
    primary: 'Impact, sans-serif', // Para títulos grandes
    secondary: 'Arial, sans-serif', // Para números
    hashtag: 'Arial, sans-serif' // Para hashtag
  },
  
  sizes: {
    title: TEXT_SIZES.TITLE.large,
    label: TEXT_SIZES.LABEL.large,
    number: TEXT_SIZES.NUMBER.large,
    total: TEXT_SIZES.TOTAL.large,
    hashtag: TEXT_SIZES.HASHTAG.large
  },
  
  spacing: {
    slideInternalPadding: '50px',
    gridCellPadding: '20px 40px',
    headerMarginBottom: '50px',
    gridWidth: '85%',
    hashtagMarginBottom: '10px'
  },
  
  effects: {
    textShadow: '4px 4px 8px rgba(0, 0, 0, 0.9)',
    borderWidth: '4px',
    borderStyle: 'solid',
    gridBorderBottom: '3px solid',
    gridBorderRight: '3px solid',
    titleLetterSpacing: '8px',
    totalMarginLeft: '7%'
  },
  
  // Configuración de logos
  logos: {
    main: {
      enabled: false,
      url: null,
      ...DEFAULT_LOGO_CONFIG.mainLogo
    },
    secondary: {
      enabled: false,
      url: null,
      ...DEFAULT_LOGO_CONFIG.secondaryLogo
    },
    watermark: {
      enabled: false,
      url: null,
      ...DEFAULT_LOGO_CONFIG.watermark
    }
  },
  
  // Hashtag
  hashtag: {
    enabled: false,
    text: '',
    position: 'top-right' // top-left, top-right, top-center
  },
  
  // Imagen de fondo
  backgroundImage: null
};

/**
 * Tema claro
 */
export const lightTheme = {
  name: 'light',
  
  colors: {
    controlBackground: '#f5f5f5',
    controlText: '#333333',
    inputBackground: '#ffffff',
    inputText: '#333333',
    inputBorder: '#cccccc',
    
    primaryButton: '#0066cc',
    primaryButtonHover: '#004499',
    successButton: '#28a745',
    successButtonHover: '#1e7e34',
    buttonText: '#ffffff',
    
    slideBackground: '#ffffff',
    slideText: '#000000',
    slideBorder: '#000000',
    slideHeaderShadow: 'rgba(0, 0, 0, 0.2)',
    
    slideOverlay: 'rgba(255, 255, 255, 0.3)',
    hashtagColor: '#000000'
  },
  
  fonts: {
    primary: 'Impact, sans-serif',
    secondary: 'Arial, sans-serif',
    hashtag: 'Arial, sans-serif'
  },
  
  sizes: {
    title: TEXT_SIZES.TITLE.large,
    label: TEXT_SIZES.LABEL.large,
    number: TEXT_SIZES.NUMBER.large,
    total: TEXT_SIZES.TOTAL.large,
    hashtag: TEXT_SIZES.HASHTAG.large
  },
  
  spacing: {
    slideInternalPadding: '50px',
    gridCellPadding: '20px 40px',
    headerMarginBottom: '50px',
    gridWidth: '85%',
    hashtagMarginBottom: '10px'
  },
  
  effects: {
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    borderWidth: '4px',
    borderStyle: 'solid',
    gridBorderBottom: '3px solid',
    gridBorderRight: '3px solid',
    titleLetterSpacing: '8px',
    totalMarginLeft: '7%'
  },
  
  logos: {
    main: {
      enabled: false,
      url: null,
      ...DEFAULT_LOGO_CONFIG.mainLogo
    },
    secondary: {
      enabled: false,
      url: null,
      ...DEFAULT_LOGO_CONFIG.secondaryLogo
    },
    watermark: {
      enabled: false,
      url: null,
      ...DEFAULT_LOGO_CONFIG.watermark
    }
  },
  
  hashtag: {
    enabled: false,
    text: '',
    position: 'top-right'
  },
  
  backgroundImage: null
};

/**
 * Tema base para personalizaciones
 */
export const createCustomTheme = (overrides = {}) => {
  return {
    name: 'custom',
    colors: {
      ...darkTheme.colors,
      ...(overrides.colors || {})
    },
    fonts: {
      ...darkTheme.fonts,
      ...(overrides.fonts || {})
    },
    sizes: {
      ...darkTheme.sizes,
      ...(overrides.sizes || {})
    },
    spacing: {
      ...darkTheme.spacing,
      ...(overrides.spacing || {})
    },
    effects: {
      ...darkTheme.effects,
      ...(overrides.effects || {})
    },
    logos: {
      main: {
        ...darkTheme.logos.main,
        ...(overrides.logos?.main || {})
      },
      secondary: {
        ...darkTheme.logos.secondary,
        ...(overrides.logos?.secondary || {})
      },
      watermark: {
        ...darkTheme.logos.watermark,
        ...(overrides.logos?.watermark || {})
      }
    },
    hashtag: {
      ...darkTheme.hashtag,
      ...(overrides.hashtag || {})
    },
    backgroundImage: overrides.backgroundImage || null
  };
};

/**
 * Temas disponibles
 */
export const themes = {
  dark: darkTheme,
  light: lightTheme
};

/**
 * Obtener tema por nombre
 */
export const getThemeByName = (themeName) => {
  return themes[themeName] || darkTheme;
};
