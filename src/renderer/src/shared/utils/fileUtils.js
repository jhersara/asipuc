/**
 * UTILIDADES PARA MANEJO DE ARCHIVOS
 * 
 * Funciones helper para trabajar con imágenes, fuentes y otros recursos.
 */

import { BACKGROUND_CONFIG, LOGO_CONFIG } from '../config/constants';

/**
 * Validar tipo de archivo
 */
export const validateFileType = (file, allowedTypes) => {
  if (!file) return { valid: false, error: 'No se seleccionó ningún archivo' };
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Tipo de archivo no válido. Tipos permitidos: ${allowedTypes.join(', ')}`
    };
  }
  
  return { valid: true };
};

/**
 * Validar tamaño de archivo
 */
export const validateFileSize = (file, maxSize) => {
  if (!file) return { valid: false, error: 'No se seleccionó ningún archivo' };
  
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `El archivo es muy grande. Tamaño máximo: ${maxSizeMB}MB`
    };
  }
  
  return { valid: true };
};

/**
 * Convertir archivo a Base64
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      resolve(reader.result);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Validar imagen de fondo
 */
export const validateBackgroundImage = async (file) => {
  // Validar tipo
  const typeValidation = validateFileType(file, BACKGROUND_CONFIG.ALLOWED_TYPES);
  if (!typeValidation.valid) return typeValidation;
  
  // Validar tamaño
  const sizeValidation = validateFileSize(file, BACKGROUND_CONFIG.MAX_SIZE);
  if (!sizeValidation.valid) return sizeValidation;
  
  // Validar dimensiones (opcional pero recomendado)
  try {
    const dimensions = await getImageDimensions(file);
    const recommended = BACKGROUND_CONFIG.RECOMMENDED_RESOLUTION;
    
    if (dimensions.width < recommended.width || dimensions.height < recommended.height) {
      return {
        valid: true,
        warning: `La imagen tiene una resolución menor a la recomendada (${recommended.width}x${recommended.height}). Puede verse pixelada.`
      };
    }
  } catch (error) {
    console.warn('No se pudieron validar las dimensiones:', error);
  }
  
  return { valid: true };
};

/**
 * Validar logo
 */
export const validateLogo = (file) => {
  // Validar tipo
  const typeValidation = validateFileType(file, LOGO_CONFIG.ALLOWED_TYPES);
  if (!typeValidation.valid) return typeValidation;
  
  // Validar tamaño
  const sizeValidation = validateFileSize(file, LOGO_CONFIG.MAX_SIZE);
  if (!sizeValidation.valid) return sizeValidation;
  
  return { valid: true };
};

/**
 * Obtener dimensiones de una imagen
 */
export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.width,
        height: img.height
      });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('No se pudo cargar la imagen'));
    };
    
    img.src = url;
  });
};

/**
 * Comprimir imagen manteniendo aspect ratio
 */
export const compressImage = async (file, maxWidth = 1920, maxHeight = 1080, quality = 0.9) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calcular nuevas dimensiones manteniendo aspect ratio
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          file.type,
          quality
        );
      };
      
      img.onerror = reject;
      img.src = e.target.result;
    };
    
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Generar nombre de archivo único
 */
export const generateUniqueFilename = (originalName) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  const extension = originalName.split('.').pop();
  const baseName = originalName.replace(`.${extension}`, '');
  
  return `${baseName}-${timestamp}-${random}.${extension}`;
};

/**
 * Formatear bytes a tamaño legible
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
