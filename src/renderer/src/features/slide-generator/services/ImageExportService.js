/**
 * SERVICIO: ImageExportService
 * 
 * Servicio profesional para exportación de imágenes.
 * Maneja la lógica de conversión de DOM a imagen con alta calidad.
 * 
 * Características:
 * - Exportación en resolución Full HD (1920x1080)
 * - Control de calidad
 * - Manejo de errores robusto
 * - Múltiples formatos (PNG por defecto)
 */

import { toPng, toJpeg } from 'html-to-image';
import { IMAGE_QUALITY, DEFAULT_RESOLUTION } from '../../../core/config/constants';

class ImageExportService {
  /**
   * Exportar elemento DOM como PNG
   * 
   * @param {HTMLElement} element - Elemento DOM a exportar
   * @param {Object} options - Opciones de exportación
   * @returns {Promise<string>} Data URL de la imagen
   */
  async exportToPng(element, options = {}) {
    const {
      quality = IMAGE_QUALITY.HIGH,
      backgroundColor = '#000000',
      pixelRatio = 2, // Mejora la nitidez en pantallas de alta resolución
      width = DEFAULT_RESOLUTION.width,
      height = DEFAULT_RESOLUTION.height
    } = options;

    if (!element) {
      throw new Error('Elemento no encontrado para exportar');
    }

    try {
      const dataUrl = await toPng(element, {
        quality,
        backgroundColor,
        pixelRatio,
        width,
        height,
        // Cachear fuentes para evitar problemas de carga
        cacheBust: false,
        // Incluir estilos inline
        includeQueryParams: true
      });

      return dataUrl;
    } catch (error) {
      console.error('Error al exportar a PNG:', error);
      throw new Error(`Error al generar imagen PNG: ${error.message}`);
    }
  }

  /**
   * Exportar elemento DOM como JPEG
   * 
   * @param {HTMLElement} element - Elemento DOM a exportar
   * @param {Object} options - Opciones de exportación
   * @returns {Promise<string>} Data URL de la imagen
   */
  async exportToJpeg(element, options = {}) {
    const {
      quality = IMAGE_QUALITY.HIGH,
      backgroundColor = '#000000',
      pixelRatio = 2,
      width = DEFAULT_RESOLUTION.width,
      height = DEFAULT_RESOLUTION.height
    } = options;

    if (!element) {
      throw new Error('Elemento no encontrado para exportar');
    }

    try {
      const dataUrl = await toJpeg(element, {
        quality,
        backgroundColor,
        pixelRatio,
        width,
        height,
        cacheBust: false
      });

      return dataUrl;
    } catch (error) {
      console.error('Error al exportar a JPEG:', error);
      throw new Error(`Error al generar imagen JPEG: ${error.message}`);
    }
  }

  /**
   * Descargar imagen desde data URL
   * 
   * @param {string} dataUrl - Data URL de la imagen
   * @param {string} filename - Nombre del archivo
   */
  downloadImage(dataUrl, filename = null) {
    try {
      const link = document.createElement('a');
      const defaultFilename = `Asistencia-${new Date().toLocaleDateString().replace(/\//g, '-')}.png`;
      
      link.download = filename || defaultFilename;
      link.href = dataUrl;
      link.click();
      
      // Limpiar
      link.remove();
    } catch (error) {
      console.error('Error al descargar imagen:', error);
      throw new Error(`Error al descargar imagen: ${error.message}`);
    }
  }

  /**
   * Exportar y descargar en un solo paso
   * 
   * @param {HTMLElement} element - Elemento a exportar
   * @param {Object} options - Opciones de exportación
   * @param {string} filename - Nombre del archivo
   * @returns {Promise<boolean>} True si se exportó correctamente
   */
  async exportAndDownload(element, options = {}, filename = null) {
    try {
      const format = options.format || 'png';
      
      let dataUrl;
      if (format === 'jpeg' || format === 'jpg') {
        dataUrl = await this.exportToJpeg(element, options);
      } else {
        dataUrl = await this.exportToPng(element, options);
      }

      this.downloadImage(dataUrl, filename);
      
      return true;
    } catch (error) {
      console.error('Error en exportación completa:', error);
      throw error;
    }
  }

  /**
   * Obtener dimensiones reales del elemento
   * 
   * @param {HTMLElement} element - Elemento a medir
   * @returns {Object} Ancho y alto del elemento
   */
  getElementDimensions(element) {
    if (!element) {
      return DEFAULT_RESOLUTION;
    }

    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  }
}

// Exportar instancia única (Singleton pattern)
export const imageExportService = new ImageExportService();
