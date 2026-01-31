/**
 * SERVICIO: BackgroundImageService
 * 
 * Gestiona las imágenes de fondo de los slides.
 * Permite cargar, guardar y seleccionar imágenes.
 * 
 * Características:
 * - Cargar imágenes desde el sistema de archivos
 * - Convertir a Base64 para almacenamiento
 * - Validar formato y tamaño
 * - Gestionar galería de imágenes predefinidas
 * - Persistencia en localStorage
 */

import { STORAGE_KEYS } from '../config/constants';

class BackgroundImageService {
  // Formatos permitidos
  static ALLOWED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  // Tamaño máximo: 5MB
  static MAX_SIZE = 5 * 1024 * 1024;

  /**
   * Cargar imagen desde archivo
   * 
   * @param {File} file - Archivo de imagen
   * @returns {Promise<Object>} Información de la imagen cargada
   */
  async loadImageFromFile(file) {
    return new Promise((resolve, reject) => {
      // Validar formato
      if (!BackgroundImageService.ALLOWED_FORMATS.includes(file.type)) {
        reject(new Error(
          `Formato no permitido. Use: ${BackgroundImageService.ALLOWED_FORMATS.join(', ')}`
        ));
        return;
      }

      // Validar tamaño
      if (file.size > BackgroundImageService.MAX_SIZE) {
        reject(new Error(
          `La imagen es muy grande. Tamaño máximo: ${BackgroundImageService.MAX_SIZE / 1024 / 1024}MB`
        ));
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        
        img.onload = () => {
          resolve({
            dataUrl: e.target.result,
            width: img.width,
            height: img.height,
            name: file.name,
            size: file.size,
            type: file.type
          });
        };

        img.onerror = () => {
          reject(new Error('Error al cargar la imagen'));
        };

        img.src = e.target.result;
      };

      reader.onerror = () => {
        reject(new Error('Error al leer el archivo'));
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Guardar imagen personalizada en localStorage
   * 
   * @param {string} dataUrl - Data URL de la imagen
   * @param {Object} metadata - Metadatos de la imagen
   */
  saveCustomImage(dataUrl, metadata = {}) {
    try {
      const customImages = this.getCustomImages();
      
      const imageData = {
        id: `custom_${Date.now()}`,
        dataUrl,
        metadata,
        createdAt: new Date().toISOString()
      };

      customImages.push(imageData);

      localStorage.setItem(
        STORAGE_KEYS.CUSTOM_BACKGROUNDS,
        JSON.stringify(customImages)
      );

      return imageData;
    } catch (error) {
      console.error('Error al guardar imagen personalizada:', error);
      throw new Error('No se pudo guardar la imagen. Puede ser muy grande.');
    }
  }

  /**
   * Obtener imágenes personalizadas guardadas
   * 
   * @returns {Array} Lista de imágenes personalizadas
   */
  getCustomImages() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_BACKGROUNDS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error al obtener imágenes personalizadas:', error);
      return [];
    }
  }

  /**
   * Eliminar imagen personalizada
   * 
   * @param {string} imageId - ID de la imagen a eliminar
   */
  deleteCustomImage(imageId) {
    try {
      const customImages = this.getCustomImages();
      const filtered = customImages.filter(img => img.id !== imageId);
      
      localStorage.setItem(
        STORAGE_KEYS.CUSTOM_BACKGROUNDS,
        JSON.stringify(filtered)
      );

      return true;
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
      return false;
    }
  }

  /**
   * Obtener imagen activa
   * 
   * @returns {string|null} Data URL de la imagen activa
   */
  getActiveImage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ACTIVE_BACKGROUND);
      return stored || null;
    } catch (error) {
      console.error('Error al obtener imagen activa:', error);
      return null;
    }
  }

  /**
   * Establecer imagen activa
   * 
   * @param {string} dataUrl - Data URL de la imagen
   */
  setActiveImage(dataUrl) {
    try {
      if (dataUrl) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_BACKGROUND, dataUrl);
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_BACKGROUND);
      }
      return true;
    } catch (error) {
      console.error('Error al establecer imagen activa:', error);
      return false;
    }
  }

  /**
   * Limpiar todas las imágenes personalizadas
   */
  clearAllCustomImages() {
    try {
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_BACKGROUNDS);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_BACKGROUND);
      return true;
    } catch (error) {
      console.error('Error al limpiar imágenes:', error);
      return false;
    }
  }

  /**
   * Validar si una imagen es adecuada para slides (resolución mínima)
   * 
   * @param {number} width - Ancho de la imagen
   * @param {number} height - Alto de la imagen
   * @returns {Object} Resultado de validación
   */
  validateImageResolution(width, height) {
    const minWidth = 1920;
    const minHeight = 1080;

    const isValid = width >= minWidth && height >= minHeight;

    return {
      isValid,
      message: isValid 
        ? 'Resolución adecuada' 
        : `Resolución mínima recomendada: ${minWidth}x${minHeight}px. Su imagen: ${width}x${height}px`,
      recommendation: !isValid 
        ? 'La imagen puede verse pixelada al exportar en Full HD.' 
        : null
    };
  }
}

// Exportar instancia única (Singleton)
export const backgroundImageService = new BackgroundImageService();
