import { useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { DEFAULT_RESOLUTION } from '../config/constants';

export const useImageExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);

  const exportImage = useCallback(async (elementId, options = {}) => {
    setIsExporting(true);
    setExportError(null);

    try {
      const wrapper = document.getElementById(elementId);
      if (!wrapper) throw new Error(`Elemento "${elementId}" no encontrado`);

      // El template real es el primer hijo del wrapper
      const template = wrapper.firstElementChild || wrapper;

      const W = options.width  || DEFAULT_RESOLUTION.width;
      const H = options.height || DEFAULT_RESOLUTION.height;
      const filename = options.filename || `Asistencia-${new Date().toLocaleDateString().replace(/\//g, '-')}.png`;

      // Clonar el template en un contenedor fuera de pantalla SIN transform
      const offscreen = document.createElement('div');
      offscreen.style.cssText = `
        position: fixed;
        left: -${W + 100}px;
        top: 0;
        width: ${W}px;
        height: ${H}px;
        overflow: hidden;
        z-index: -9999;
        transform: none;
        pointer-events: none;
      `;

      const clone = template.cloneNode(true);
      // Asegurar que el clon tampoco tenga transform
      clone.style.transform = 'none';
      clone.style.transformOrigin = 'top left';
      clone.style.width  = `${W}px`;
      clone.style.height = `${H}px`;

      offscreen.appendChild(clone);
      document.body.appendChild(offscreen);

      // Pequeña espera para que el navegador pinte el clon
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

      try {
        const dataUrl = await toPng(clone, {
          width: W,
          height: H,
          pixelRatio: 1,
          quality: options.quality || 0.95,
          backgroundColor: options.backgroundColor || '#000000',
          cacheBust: false
        });

        // Descargar
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
        link.remove();

        return { success: true };
      } finally {
        document.body.removeChild(offscreen);
      }

    } catch (error) {
      console.error('Error al exportar imagen:', error);
      setExportError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsExporting(false);
    }
  }, []);

  const clearError = useCallback(() => setExportError(null), []);

  return { exportImage, isExporting, exportError, clearError };
};
