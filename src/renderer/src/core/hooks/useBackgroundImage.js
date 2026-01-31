/**
 * CUSTOM HOOK: useBackgroundImage
 * 
 * Hook para gestionar imágenes de fondo de los slides.
 * Integra el servicio de imágenes con React.
 */

import { useState, useCallback, useEffect } from 'react';
import { backgroundImageService } from '../services/BackgroundImageService';
import { DEFAULT_BACKGROUNDS } from '../config/constants';

export const useBackgroundImage = () => {
  const [activeBackground, setActiveBackground] = useState(null);
  const [customBackgrounds, setCustomBackgrounds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Cargar estado inicial
   */
  useEffect(() => {
    loadInitialState();
  }, []);

  /**
   * Cargar imágenes guardadas
   */
  const loadInitialState = useCallback(() => {
    try {
      const active = backgroundImageService.getActiveImage();
      const custom = backgroundImageService.getCustomImages();
      
      setActiveBackground(active);
      setCustomBackgrounds(custom);
    } catch (err) {
      console.error('Error al cargar estado inicial:', err);
      setError(err.message);
    }
  }, []);

  /**
   * Cargar imagen desde archivo
   */
  const loadImageFromFile = useCallback(async (file) => {
    setIsLoading(true);
    setError(null);

    try {
      const imageData = await backgroundImageService.loadImageFromFile(file);
      
      // Validar resolución
      const validation = backgroundImageService.validateImageResolution(
        imageData.width,
        imageData.height
      );

      if (!validation.isValid) {
        // Advertir pero permitir continuar
        console.warn(validation.message);
      }

      // Guardar en custom images
      const saved = backgroundImageService.saveCustomImage(
        imageData.dataUrl,
        {
          name: imageData.name,
          width: imageData.width,
          height: imageData.height,
          size: imageData.size
        }
      );

      // Actualizar estado
      setCustomBackgrounds(prev => [...prev, saved]);

      return {
        success: true,
        imageData: saved,
        validation
      };
    } catch (err) {
      console.error('Error al cargar imagen:', err);
      setError(err.message);
      return {
        success: false,
        error: err.message
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Seleccionar imagen activa
   */
  const selectBackground = useCallback((dataUrl) => {
    try {
      backgroundImageService.setActiveImage(dataUrl);
      setActiveBackground(dataUrl);
      return true;
    } catch (err) {
      console.error('Error al seleccionar fondo:', err);
      setError(err.message);
      return false;
    }
  }, []);

  /**
   * Eliminar imagen personalizada
   */
  const deleteCustomBackground = useCallback((imageId) => {
    try {
      const success = backgroundImageService.deleteCustomImage(imageId);
      
      if (success) {
        setCustomBackgrounds(prev => prev.filter(img => img.id !== imageId));
        
        // Si la imagen eliminada era la activa, limpiar
        const deletedImage = customBackgrounds.find(img => img.id === imageId);
        if (deletedImage && deletedImage.dataUrl === activeBackground) {
          setActiveBackground(null);
          backgroundImageService.setActiveImage(null);
        }
      }

      return success;
    } catch (err) {
      console.error('Error al eliminar fondo:', err);
      setError(err.message);
      return false;
    }
  }, [activeBackground, customBackgrounds]);

  /**
   * Limpiar fondo activo
   */
  const clearBackground = useCallback(() => {
    backgroundImageService.setActiveImage(null);
    setActiveBackground(null);
  }, []);

  /**
   * Limpiar error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Obtener todas las imágenes disponibles (predefinidas + personalizadas)
   */
  const getAllBackgrounds = useCallback(() => {
    return {
      default: DEFAULT_BACKGROUNDS,
      custom: customBackgrounds
    };
  }, [customBackgrounds]);

  return {
    // Estado
    activeBackground,
    customBackgrounds,
    defaultBackgrounds: DEFAULT_BACKGROUNDS,
    isLoading,
    error,

    // Funciones
    loadImageFromFile,
    selectBackground,
    deleteCustomBackground,
    clearBackground,
    clearError,
    getAllBackgrounds
  };
};
