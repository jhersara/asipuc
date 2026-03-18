import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { darkTheme, createCustomTheme, getThemeByName } from './themes';
import { STORAGE_KEYS, THEME_NAMES } from '../config/constants';
import { DEFAULT_TEMPLATE_ID } from '../../features/slide-generator/templates';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(darkTheme);
  const [themeName, setThemeName] = useState(THEME_NAMES.DARK);
  const [customConfig, setCustomConfig] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE_ID);

  // Ref siempre actualizado para evitar stale closures
  const customConfigRef = useRef(customConfig);
  const currentThemeRef = useRef(currentTheme);
  useEffect(() => { customConfigRef.current = customConfig; }, [customConfig]);
  useEffect(() => { currentThemeRef.current = currentTheme; }, [currentTheme]);

  useEffect(() => {
    loadThemeFromStorage();
    loadTemplateFromStorage();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, themeName);
      if (customConfig) {
        localStorage.setItem(STORAGE_KEYS.USER_CONFIG, JSON.stringify(customConfig));
      }
    } catch (e) {
      console.error('Error guardando tema:', e);
    }
  }, [currentTheme, themeName, customConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('asipuc_selected_template', selectedTemplate);
    } catch (e) {
      console.error('Error guardando template:', e);
    }
  }, [selectedTemplate]);

  const loadThemeFromStorage = () => {
    try {
      const savedThemeName = localStorage.getItem(STORAGE_KEYS.THEME);
      const savedConfig = localStorage.getItem(STORAGE_KEYS.USER_CONFIG);

      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        setCustomConfig(config);
        customConfigRef.current = config;
        if (savedThemeName === THEME_NAMES.CUSTOM) {
          const t = createCustomTheme(config);
          setCurrentTheme(t);
          currentThemeRef.current = t;
          setThemeName(THEME_NAMES.CUSTOM);
        } else {
          const t = getThemeByName(savedThemeName);
          setCurrentTheme(t);
          currentThemeRef.current = t;
          setThemeName(savedThemeName || THEME_NAMES.DARK);
        }
      } else if (savedThemeName) {
        const t = getThemeByName(savedThemeName);
        setCurrentTheme(t);
        currentThemeRef.current = t;
        setThemeName(savedThemeName);
      }
    } catch (e) {
      console.error('Error al cargar tema:', e);
    }
  };

  const loadTemplateFromStorage = () => {
    try {
      const saved = localStorage.getItem('asipuc_selected_template');
      if (saved) setSelectedTemplate(saved);
    } catch (e) {
      console.error('Error al cargar template:', e);
    }
  };

  // Usa siempre la ref para evitar stale closures
  const updateCustomTheme = useCallback((config) => {
    const newTheme = createCustomTheme(config);
    setCurrentTheme(newTheme);
    currentThemeRef.current = newTheme;
    setThemeName(THEME_NAMES.CUSTOM);
    setCustomConfig(config);
    customConfigRef.current = config;
  }, []);

  const changeTheme = useCallback((newThemeName) => {
    const t = getThemeByName(newThemeName);
    setCurrentTheme(t);
    currentThemeRef.current = t;
    setThemeName(newThemeName);
    setCustomConfig(null);
    customConfigRef.current = null;
  }, []);

  const updateColor = useCallback((colorKey, colorValue) => {
    const cfg = customConfigRef.current;
    const thm = currentThemeRef.current;
    updateCustomTheme({
      ...cfg,
      colors: { ...(cfg?.colors || thm.colors), [colorKey]: colorValue }
    });
  }, [updateCustomTheme]);

  const updateFont = useCallback((fontType, fontValue) => {
    const cfg = customConfigRef.current;
    const thm = currentThemeRef.current;
    updateCustomTheme({
      ...cfg,
      fonts: { ...(cfg?.fonts || thm.fonts), [fontType]: fontValue }
    });
  }, [updateCustomTheme]);

  const updateSize = useCallback((sizeKey, sizeValue) => {
    const cfg = customConfigRef.current;
    const thm = currentThemeRef.current;
    updateCustomTheme({
      ...cfg,
      sizes: { ...(cfg?.sizes || thm.sizes), [sizeKey]: sizeValue }
    });
  }, [updateCustomTheme]);

  const updateBackgroundImage = useCallback((imageUrl) => {
    const cfg = customConfigRef.current;
    updateCustomTheme({ ...cfg, backgroundImage: imageUrl });
  }, [updateCustomTheme]);

  const updateLogo = useCallback((logoType, config) => {
    const cfg = customConfigRef.current;
    const thm = currentThemeRef.current;
    updateCustomTheme({
      ...cfg,
      logos: {
        ...(cfg?.logos || thm.logos),
        [logoType]: {
          ...(cfg?.logos?.[logoType] || thm.logos[logoType]),
          ...config
        }
      }
    });
  }, [updateCustomTheme]);

  const updateHashtag = useCallback((config) => {
    const cfg = customConfigRef.current;
    const thm = currentThemeRef.current;
    updateCustomTheme({
      ...cfg,
      hashtag: { ...(cfg?.hashtag || thm.hashtag), ...config }
    });
  }, [updateCustomTheme]);

  const changeTemplate = useCallback((templateId) => {
    setSelectedTemplate(templateId);
  }, []);

  const resetTheme = useCallback(() => {
    setCurrentTheme(darkTheme);
    currentThemeRef.current = darkTheme;
    setThemeName(THEME_NAMES.DARK);
    setCustomConfig(null);
    customConfigRef.current = null;
    setSelectedTemplate(DEFAULT_TEMPLATE_ID);
    localStorage.removeItem(STORAGE_KEYS.USER_CONFIG);
    localStorage.removeItem('asipuc_selected_template');
  }, []);

  const contextValue = {
    theme: currentTheme,
    themeName,
    customConfig,
    selectedTemplate,
    changeTheme,
    updateCustomTheme,
    updateColor,
    updateFont,
    updateSize,
    updateBackgroundImage,
    updateLogo,
    updateHashtag,
    changeTemplate,
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
