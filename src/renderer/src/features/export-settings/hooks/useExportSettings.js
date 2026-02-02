/**
 * HOOK: useExportSettings
 * 
 * Maneja la configuración de exportación de imágenes
 */

import { useState, useCallback, useEffect } from 'react';
import { 
  DEFAULT_RESOLUTION, 
  IMAGE_QUALITY, 
  EXPORT_FORMATS,
  STORAGE_KEYS 
} from '../../../core/config/constants';

export const useExportSettings = () => {
  const [settings, setSettings] = useState({
    resolution: DEFAULT_RESOLUTION,
    quality: IMAGE_QUALITY.MAXIMUM,
    format: EXPORT_FORMATS.PNG.value,
    filename: ''
  });

  // Cargar configuración guardada
  useEffect(() => {
    loadSettings();
  }, []);

  // Guardar cuando cambien los settings
  useEffect(() => {
    saveSettings();
  }, [settings]);

  const loadSettings = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPORT_SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings(prev => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.error('Error al cargar configuración de exportación:', error);
    }
  };

  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXPORT_SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error al guardar configuración de exportación:', error);
    }
  };

  const updateResolution = useCallback((resolution) => {
    setSettings(prev => ({ ...prev, resolution }));
  }, []);

  const updateQuality = useCallback((quality) => {
    setSettings(prev => ({ ...prev, quality }));
  }, []);

  const updateFormat = useCallback((format) => {
    setSettings(prev => ({ ...prev, format }));
  }, []);

  const updateFilename = useCallback((filename) => {
    setSettings(prev => ({ ...prev, filename }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setSettings({
      resolution: DEFAULT_RESOLUTION,
      quality: IMAGE_QUALITY.MAXIMUM,
      format: EXPORT_FORMATS.PNG.value,
      filename: ''
    });
  }, []);

  return {
    settings,
    updateResolution,
    updateQuality,
    updateFormat,
    updateFilename,
    resetToDefaults
  };
};
