/**
 * THEME PROVIDER
 * 
 * Proveedor de contexto para el sistema de temas.
 * Permite que cualquier componente acceda y modifique el tema actual.
 * 
 * Implementa:
 * - Context API de React
 * - Persistencia en localStorage
 * - Detección de cambios
 */

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { darkTheme, lightTheme, createCustomTheme, getThemeByName } from './themes';
import { STORAGE_KEYS, THEME_NAMES } from '../config/constants';

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

  /**
   * Cargar tema desde localStorage al iniciar
   */
  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  /**
   * Guardar tema en localStorage cuando cambie
   */
  useEffect(() => {
    saveThemeToStorage();
  }, [currentTheme, themeName, customConfig]);

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
      // Si hay error, usar tema por defecto
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
   * Cambiar a un tema predefinido
   */
  const changeTheme = useCallback((newThemeName) => {
    const theme = getThemeByName(newThemeName);
    setCurrentTheme(theme);
    setThemeName(newThemeName);
    setCustomConfig(null); // Limpiar configuración personalizada
  }, []);

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
      }
    };
    updateCustomTheme(newConfig);
  }, [customConfig, currentTheme, updateCustomTheme]);

  /**
   * Actualizar fuente
   */
  const updateFont = useCallback((fontType, fontValue) => {
    const newConfig = {
      ...customConfig,
      fonts: {
        ...(customConfig?.fonts || currentTheme.fonts),
        [fontType]: fontValue
      }
    };
    updateCustomTheme(newConfig);
  }, [customConfig, currentTheme, updateCustomTheme]);

  /**
   * Actualizar tamaño de texto
   */
  const updateSize = useCallback((sizeKey, sizeValue) => {
    const newConfig = {
      ...customConfig,
      sizes: {
        ...(customConfig?.sizes || currentTheme.sizes),
        [sizeKey]: sizeValue
      }
    };
    updateCustomTheme(newConfig);
  }, [customConfig, currentTheme, updateCustomTheme]);

  /**
   * Actualizar imagen de fondo
   */
  const updateBackgroundImage = useCallback((imageUrl) => {
    const newConfig = {
      ...customConfig,
      backgroundImage: imageUrl
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
    localStorage.removeItem(STORAGE_KEYS.USER_CONFIG);
  }, []);

  // Valor del contexto
  const contextValue = {
    theme: currentTheme,
    themeName,
    customConfig,
    changeTheme,
    updateCustomTheme,
    updateColor,
    updateFont,
    updateSize,
    updateBackgroundImage,
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
