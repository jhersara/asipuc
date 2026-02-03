/**
 * HOOK: useResources
 * 
 * Gestiona la carga y manejo de recursos (imágenes, fuentes, logos).
 */

import { useState, useEffect, useCallback } from 'react';

export const useResources = () => {
  const [resources, setResources] = useState({
    system: {
      fonts: [],
      backgrounds: [],
      logos: []
    },
    user: {
      fonts: [],
      backgrounds: [],
      logos: []
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Cargar recursos al iniciar
   */
  useEffect(() => {
    loadResources();
  }, []);

  /**
   * Escanear y cargar recursos
   */
  const loadResources = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (window.api && window.api.scanResources) {
        const scannedResources = await window.api.scanResources();
        setResources(scannedResources);
        console.log('✅ Recursos cargados:', scannedResources);
      } else {
        console.warn('⚠️ API de recursos no disponible');
      }
    } catch (err) {
      console.error('❌ Error cargando recursos:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Subir archivo
   */
  const uploadFile = useCallback(async (file, type) => {
    try {
      if (!window.api || !window.api.saveUserResource) {
        throw new Error('API no disponible');
      }

      // Convertir a base64
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64Data = await base64Promise;

      // Guardar recurso
      const result = await window.api.saveUserResource({
        name: file.name,
        type,
        data: base64Data
      });

      if (result.success) {
        // Recargar recursos
        await loadResources();
        return { success: true, resource: result.resource };
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error('❌ Error subiendo archivo:', err);
      return { success: false, error: err.message };
    }
  }, [loadResources]);

  /**
   * Eliminar recurso
   */
  const deleteResource = useCallback(async (resourcePath, type) => {
    try {
      if (!window.api || !window.api.deleteUserResource) {
        throw new Error('API no disponible');
      }

      const result = await window.api.deleteUserResource({
        path: resourcePath,
        type
      });

      if (result.success) {
        // Recargar recursos
        await loadResources();
        return { success: true };
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error('❌ Error eliminando recurso:', err);
      return { success: false, error: err.message };
    }
  }, [loadResources]);

  /**
   * Obtener todos los fondos (sistema + usuario)
   */
  const getAllBackgrounds = useCallback(() => {
    return [
      ...resources.system.backgrounds,
      ...resources.user.backgrounds
    ];
  }, [resources]);

  /**
   * Obtener todos los logos
   */
  const getAllLogos = useCallback(() => {
    return [
      ...resources.system.logos,
      ...resources.user.logos
    ];
  }, [resources]);

  /**
   * Obtener todas las fuentes
   */
  const getAllFonts = useCallback(() => {
    return [
      ...resources.system.fonts,
      ...resources.user.fonts
    ];
  }, [resources]);

  return {
    resources,
    isLoading,
    error,
    loadResources,
    uploadFile,
    deleteResource,
    getAllBackgrounds,
    getAllLogos,
    getAllFonts
  };
};
