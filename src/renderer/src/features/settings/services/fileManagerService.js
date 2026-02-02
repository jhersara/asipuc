/**
 * SERVICIO: FileManagerService
 * 
 * Gestiona la carga y manejo de archivos del usuario:
 * - Imágenes de fondo
 * - Logos
 * - Validación de archivos
 * - Conversión a base64
 */

import { FILE_LIMITS } from '../../../core/config/constants';

class FileManagerService {
  /**
   * Validar archivo de imagen
   */
  validateImageFile(file) {
    const errors = [];

    // Validar tipo
    if (!FILE_LIMITS.ACCEPTED_IMAGE_FORMATS.includes(file.type)) {
      errors.push(`Formato no válido. Usa: ${FILE_LIMITS.ACCEPTED_IMAGE_FORMATS.join(', ')}`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validar imagen de fondo (debe ser 1920x1080)
   */
  async validateBackgroundImage(file) {
    const validation = this.validateImageFile(file);
    
    if (!validation.isValid) {
      return validation;
    }

    // Validar tamaño de archivo
    if (file.size > FILE_LIMITS.MAX_BACKGROUND_SIZE) {
      validation.errors.push(
        `Archivo muy grande. Máximo ${FILE_LIMITS.MAX_BACKGROUND_SIZE / 1024 / 1024}MB`
      );
      validation.isValid = false;
    }

    // Validar dimensiones
    try {
      const dimensions = await this.getImageDimensions(file);
      
      if (dimensions.width !== 1920 || dimensions.height !== 1080) {
        validation.errors.push(
          `La imagen debe ser 1920x1080px. Tu imagen es ${dimensions.width}x${dimensions.height}px`
        );
        validation.isValid = false;
      }
    } catch (error) {
      validation.errors.push('Error al validar dimensiones de la imagen');
      validation.isValid = false;
    }

    return validation;
  }

  /**
   * Validar logo
   */
  validateLogoFile(file) {
    const validation = this.validateImageFile(file);
    
    if (!validation.isValid) {
      return validation;
    }

    // Validar tamaño
    if (file.size > FILE_LIMITS.MAX_LOGO_SIZE) {
      validation.errors.push(
        `Archivo muy grande. Máximo ${FILE_LIMITS.MAX_LOGO_SIZE / 1024 / 1024}MB`
      );
      validation.isValid = false;
    }

    return validation;
  }

  /**
   * Obtener dimensiones de una imagen
   */
  getImageDimensions(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight
        });
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Error al cargar la imagen'));
      };

      img.src = url;
    });
  }

  /**
   * Convertir archivo a base64
   */
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error('Error al leer el archivo'));
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Cargar imagen de fondo
   */
  async loadBackgroundImage(file) {
    try {
      // Validar
      const validation = await this.validateBackgroundImage(file);
      
      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors
        };
      }

      // Convertir a base64
      const base64 = await this.fileToBase64(file);

      return {
        success: true,
        data: {
          url: base64,
          name: file.name,
          size: file.size,
          type: file.type
        }
      };
    } catch (error) {
      return {
        success: false,
        errors: [error.message]
      };
    }
  }

  /**
   * Cargar logo
   */
  async loadLogo(file) {
    try {
      // Validar
      const validation = this.validateLogoFile(file);
      
      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors
        };
      }

      // Convertir a base64
      const base64 = await this.fileToBase64(file);

      return {
        success: true,
        data: {
          url: base64,
          name: file.name,
          size: file.size,
          type: file.type
        }
      };
    } catch (error) {
      return {
        success: false,
        errors: [error.message]
      };
    }
  }

  /**
   * Redimensionar imagen a 1920x1080 (si es necesaria)
   */
  async resizeImageTo1920x1080(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.onload = () => {
        canvas.width = 1920;
        canvas.height = 1080;

        // Calcular dimensiones para cubrir todo el canvas manteniendo proporción
        const imgRatio = img.width / img.height;
        const canvasRatio = 1920 / 1080;

        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

        if (imgRatio > canvasRatio) {
          // Imagen más ancha
          drawHeight = 1080;
          drawWidth = img.width * (1080 / img.height);
          offsetX = -(drawWidth - 1920) / 2;
        } else {
          // Imagen más alta
          drawWidth = 1920;
          drawHeight = img.height * (1920 / img.width);
          offsetY = -(drawHeight - 1080) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.95);
      };

      img.onerror = () => reject(new Error('Error al cargar la imagen'));
      img.src = URL.createObjectURL(file);
    });
  }
}

// Exportar instancia única (Singleton)
export const fileManagerService = new FileManagerService();
