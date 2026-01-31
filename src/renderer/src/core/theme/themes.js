/**
 * DEFINICIÓN DE TEMAS
 * 
 * Cada tema incluye todas las variables de diseño necesarias.
 * Facilita el cambio completo de apariencia de la aplicación.
 */

import { TEXT_SIZES } from '../config/constants';

/**
 * Tema oscuro (por defecto)
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
    slideHeaderShadow: '#333333',
    
    // Overlay/gradientes
    slideOverlay: 'rgba(0, 0, 0, 0.5)'
  },
  
  fonts: {
    primary: 'Times New Roman, serif',
    secondary: 'Arial, sans-serif'
  },
  
  sizes: {
    title: TEXT_SIZES.TITLE.large,
    label: TEXT_SIZES.LABEL.large,
    number: TEXT_SIZES.NUMBER.large,
    total: TEXT_SIZES.TOTAL.large
  },
  
  spacing: {
    slideInternalPadding: '40px',
    gridCellPadding: '15px 30px',
    headerMarginBottom: '40px',
    gridWidth: '90%'
  },
  
  effects: {
    textShadow: '4px 4px 0px #333',
    borderWidth: '3px',
    borderStyle: 'solid',
    gridBorderBottom: '2px solid',
    gridBorderRight: '2px solid'
  }
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
    slideHeaderShadow: '#cccccc',
    
    slideOverlay: 'rgba(255, 255, 255, 0.5)'
  },
  
  fonts: {
    primary: 'Times New Roman, serif',
    secondary: 'Arial, sans-serif'
  },
  
  sizes: {
    title: TEXT_SIZES.TITLE.large,
    label: TEXT_SIZES.LABEL.large,
    number: TEXT_SIZES.NUMBER.large,
    total: TEXT_SIZES.TOTAL.large
  },
  
  spacing: {
    slideInternalPadding: '40px',
    gridCellPadding: '15px 30px',
    headerMarginBottom: '40px',
    gridWidth: '90%'
  },
  
  effects: {
    textShadow: '2px 2px 0px #cccccc',
    borderWidth: '3px',
    borderStyle: 'solid',
    gridBorderBottom: '2px solid',
    gridBorderRight: '2px solid'
  }
};

/**
 * Tema base para personalizaciones
 * El usuario puede extender este tema con sus propios valores
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
    // Almacenar imagen de fondo si existe
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
