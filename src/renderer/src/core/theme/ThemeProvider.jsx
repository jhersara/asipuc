/**
 * THEME PROVIDER (ACTUALIZADO)
 * 
 * Proveedor de contexto para el sistema de temas.
 * Ahora integrado con el sistema de imágenes de fondo.
 * 
 * Implementa:
 * - Context API de React
 * - Persistencia en localStorage
 * - Gestión de imágenes de fondo
 * - Detección de cambios
 */

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { darkTheme, lightTheme, createCustomTheme, getThemeByName } from './themes';
import { STORAGE_KEYS, THEME_NAMES } from '../config/constants';
import { backgroundImageService } from '../services/BackgroundImageService';

// Crear contexto
export const ThemeContext = createContext();

/**
 * Provider del tema
 */
export const ThemeProvider = ({ children }) => {
  // Estado del tema actual
  const [currentTheme, setCurrentTheme] = useState(darkTheme);
  const [themeName, setThemeName] = useState(THEME_NAMES.DARK);
  
  // Estado para configuraciones personalizadas
  const [customConfig, setCustomConfig] = useState(null);
  
  // Estado para imagen de fondo activa
  const [backgroundImage, setBackgroundImage] = useState(null);

  /**
   * Cargar tema desde localStorage al iniciar
   */
  useEffect(() => {
    loadThemeFromStorage();
    loadBackgroundImage();
  }, []);

  /**
   * Guardar tema en localStorage cuando cambie
   */
  useEffect(() => {
    saveThemeToStorage();
  }, [currentTheme, themeName, customConfig]);

  /**
   * Actualizar tema cuando cambie la imagen de fondo
   */
  useEffect(() => {
    if (backgroundImage !== null) {
      updateThemeWithBackground(backgroundImage);
    }
  }, [backgroundImage]);

  /**
   * Cargar imagen de fondo guardada
   */
  const loadBackgroundImage = () => {
    try {
      const savedBackground = backgroundImageService.getActiveImage();
      setBackgroundImage(savedBackground);
    } catch (error) {
      console.error('Error al cargar imagen de fondo:', error);
    }
  };

  /**
   * Cargar configuración guardada
   */
  const loadThemeFromStorage = () => {
    try {
      const savedThemeName = localStorage.getItem(STORAGE_KEYS.THEME);
      const savedConfig = localStorage.getItem(STORAGE_KEYS.USER_CONFIG);

      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        setCustomConfig(config);
        
        if (savedThemeName === THEME_NAMES.CUSTOM) {
          setCurrentTheme(createCustomTheme(config));
          setThemeName(THEME_NAMES.CUSTOM);
        } else {
          const theme = getThemeByName(savedThemeName);
          setCurrentTheme(theme);
          setThemeName(savedThemeName || THEME_NAMES.DARK);
        }
      } else if (savedThemeName) {
        const theme = getThemeByName(savedThemeName);
        setCurrentTheme(theme);
        setThemeName(savedThemeName);
      }
    } catch (error) {
      console.error('Error al cargar tema desde localStorage:', error);
      setCurrentTheme(darkTheme);
      setThemeName(THEME_NAMES.DARK);
    }
  };

  /**
   * Guardar configuración
   */
  const saveThemeToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, themeName);
      
      if (customConfig) {
        localStorage.setItem(STORAGE_KEYS.USER_CONFIG, JSON.stringify(customConfig));
      }
    } catch (error) {
      console.error('Error al guardar tema en localStorage:', error);
    }
  };

  /**
   * Actualizar tema con imagen de fondo
   */
  const updateThemeWithBackground = (imageUrl) => {
    const newConfig = {
      ...customConfig,
      backgroundImage: imageUrl
    };
    
    const newTheme = createCustomTheme(newConfig);
    setCurrentTheme(newTheme);
    
    // Si estamos usando un tema predefinido, cambiar a custom
    if (themeName !== THEME_NAMES.CUSTOM) {
      setThemeName(THEME_NAMES.CUSTOM);
      setCustomConfig(newConfig);
    }
  };

  /**
   * Cambiar a un tema predefinido
   */
  const changeTheme = useCallback((newThemeName) => {
    const theme = getThemeByName(newThemeName);
    
    // Mantener la imagen de fondo si existe
    if (backgroundImage) {
      const themeWithBackground = createCustomTheme({
        ...theme,
        backgroundImage
      });
      setCurrentTheme(themeWithBackground);
    } else {
      setCurrentTheme(theme);
    }
    
    setThemeName(newThemeName);
    setCustomConfig(null);
  }, [backgroundImage]);

  /**
   * Actualizar configuración personalizada
   */
  const updateCustomTheme = useCallback((config) => {
    const newTheme = createCustomTheme(config);
    setCurrentTheme(newTheme);
    setThemeName(THEME_NAMES.CUSTOM);
    setCustomConfig(config);
  }, []);

  /**
   * Actualizar solo un color específico
   */
  const updateColor = useCallback((colorKey, colorValue) => {
    const newConfig = {
      ...customConfig,
      colors: {
        ...(customConfig?.colors || currentTheme.colors),
        [colorKey]: colorValue
      },
      backgroundImage
    };
    updateCustomTheme(newConfig);
  }, [customConfig, currentTheme, backgroundImage, updateCustomTheme]);

  /**
   * Actualizar fuente
   */
  const updateFont = useCallback((fontType, fontValue) => {
    const newConfig = {
      ...customConfig,
      fonts: {
        ...(customConfig?.fonts || currentTheme.fonts),
        [fontType]: fontValue
      },
      backgroundImage
    };
    updateCustomTheme(newConfig);
  }, [customConfig, currentTheme, backgroundImage, updateCustomTheme]);

  /**
   * Actualizar tamaño de texto
   */
  const updateSize = useCallback((sizeKey, sizeValue) => {
    const newConfig = {
      ...customConfig,
      sizes: {
        ...(customConfig?.sizes || currentTheme.sizes),
        [sizeKey]: sizeValue
      },
      backgroundImage
    };
    updateCustomTheme(newConfig);
  }, [customConfig, currentTheme, backgroundImage, updateCustomTheme]);

  /**
   * Actualizar imagen de fondo
   */
  const updateBackgroundImage = useCallback((imageUrl) => {
    setBackgroundImage(imageUrl);
    backgroundImageService.setActiveImage(imageUrl);
    
    const newConfig = {
      ...customConfig,
      backgroundImage: imageUrl
    };
    updateCustomTheme(newConfig);
  }, [customConfig, updateCustomTheme]);

  /**
   * Limpiar imagen de fondo
   */
  const clearBackgroundImage = useCallback(() => {
    setBackgroundImage(null);
    backgroundImageService.setActiveImage(null);
    
    // Actualizar tema sin imagen
    const newConfig = {
      ...customConfig,
      backgroundImage: null
    };
    updateCustomTheme(newConfig);
  }, [customConfig, updateCustomTheme]);

  /**
   * Resetear a tema por defecto
   */
  const resetTheme = useCallback(() => {
    setCurrentTheme(darkTheme);
    setThemeName(THEME_NAMES.DARK);
    setCustomConfig(null);
    setBackgroundImage(null);
    localStorage.removeItem(STORAGE_KEYS.USER_CONFIG);
    backgroundImageService.setActiveImage(null);
  }, []);

  // Valor del contexto
  const contextValue = {
    theme: currentTheme,
    themeName,
    customConfig,
    backgroundImage,
    changeTheme,
    updateCustomTheme,
    updateColor,
    updateFont,
    updateSize,
    updateBackgroundImage,
    clearBackgroundImage,
    resetTheme,
    availableThemes: [
      { name: THEME_NAMES.DARK, label: 'Oscuro' },
      { name: THEME_NAMES.LIGHT, label: 'Claro' }
    ]
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
