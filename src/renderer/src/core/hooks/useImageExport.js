/**
 * CUSTOM HOOK: useImageExport
 * 
 * Hook para manejar la exportación de imágenes.
 * Encapsula la lógica de exportación y estados relacionados.
 */

import { useState, useCallback } from 'react';
import { imageExportService } from '../../features/slide-generator/services/ImageExportService';
import { DEFAULT_RESOLUTION } from '../config/constants';

export const useImageExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);

  /**
   * Exportar elemento como imagen
   */
  const exportImage = useCallback(async (elementId, options = {}) => {
    setIsExporting(true);
    setExportError(null);

    try {
      const element = document.getElementById(elementId);
      
      if (!element) {
        throw new Error(`Elemento con ID "${elementId}" no encontrado`);
      }

      const exportOptions = {
        quality: 0.95,
        backgroundColor: '#000000',
        pixelRatio: 2,
        width: DEFAULT_RESOLUTION.width,
        height: DEFAULT_RESOLUTION.height,
        ...options
      };

      await imageExportService.exportAndDownload(
        element, 
        exportOptions,
        options.filename
      );

      return { success: true };
    } catch (error) {
      console.error('Error al exportar imagen:', error);
      setExportError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsExporting(false);
    }
  }, []);

  /**
   * Resetear error
   */
  const clearError = useCallback(() => {
    setExportError(null);
  }, []);

  return {
    exportImage,
    isExporting,
    exportError,
    clearError
  };
};
