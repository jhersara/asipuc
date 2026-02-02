/**
 * THEME PROVIDER - VERSIÓN COMPLETA
 * 
 * Proveedor de contexto para el sistema de temas.
 * Incluye soporte para logos, hashtag e imágenes de fondo.
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
  const [currentTheme, setCurrentTheme] = useState(darkTheme);
  const [themeName, setThemeName] = useState(THEME_NAMES.DARK);
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
      console.error('Error al cargar tema:', error);
      setCurrentTheme(darkTheme);
      setThemeName(THEME_NAMES.DARK);
    }
  };

  const saveThemeToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, themeName);
      
      if (customConfig) {
        localStorage.setItem(STORAGE_KEYS.USER_CONFIG, JSON.stringify(customConfig));
      }
    } catch (error) {
      console.error('Error al guardar tema:', error);
    }
  };

  const changeTheme = useCallback((newThemeName) => {
    const theme = getThemeByName(newThemeName);
    setCurrentTheme(theme);
    setThemeName(newThemeName);
    setCustomConfig(null);
  }, []);

  const updateCustomTheme = useCallback((config) => {
    const newTheme = createCustomTheme(config);
    setCurrentTheme(newTheme);
    setThemeName(THEME_NAMES.CUSTOM);
    setCustomConfig(config);
  }, []);

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

  const updateBackgroundImage = useCallback((imageUrl) => {
    const newConfig = {
      ...customConfig,
      backgroundImage: imageUrl
    };
    updateCustomTheme(newConfig);
  }, [customConfig, updateCustomTheme]);

  const updateLogo = useCallback((logoType, config) => {
    const newConfig = {
      ...customConfig,
      logos: {
        ...(customConfig?.logos || currentTheme.logos),
        [logoType]: {
          ...(customConfig?.logos?.[logoType] || currentTheme.logos[logoType]),
          ...config
        }
      }
    };
    updateCustomTheme(newConfig);
  }, [customConfig, currentTheme, updateCustomTheme]);

  const updateHashtag = useCallback((config) => {
    const newConfig = {
      ...customConfig,
      hashtag: {
        ...(customConfig?.hashtag || currentTheme.hashtag),
        ...config
      }
    };
    updateCustomTheme(newConfig);
  }, [customConfig, currentTheme, updateCustomTheme]);

  const resetTheme = useCallback(() => {
    setCurrentTheme(darkTheme);
    setThemeName(THEME_NAMES.DARK);
    setCustomConfig(null);
    localStorage.removeItem(STORAGE_KEYS.USER_CONFIG);
  }, []);

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
    updateLogo,
    updateHashtag,
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
