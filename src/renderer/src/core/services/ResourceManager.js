/**
 * SERVICIO: ResourceManager
 * 
 * Gestiona la carga y manejo de recursos del sistema y del usuario.
 * Incluye validación, escaneo de carpetas y carga de archivos.
 */

import { 
  SYSTEM_PATHS, 
  USER_PATHS, 
  SUPPORTED_FORMATS,
  MAX_FILE_SIZES 
} from '../config/constants';

class ResourceManager {
  constructor() {
    this.systemResources = {
      fonts: [],
      backgrounds: [],
      logos: []
    };
    
    this.userResources = {
      fonts: [],
      backgrounds: [],
      logos: []
    };
  }

  /**
   * Inicializar y escanear recursos
   */
  async initialize() {
    try {
      // En Electron, necesitamos usar IPC para acceder al sistema de archivos
      if (window.api && window.api.scanResources) {
        const resources = await window.api.scanResources();
        this.systemResources = resources.system || this.systemResources;
        this.userResources = resources.user || this.userResources;
      } else {
        console.warn('API de recursos no disponible');
      }
    } catch (error) {
      console.error('Error al inicializar recursos:', error);
    }
  }

  /**
   * Obtener todas las fuentes disponibles
   */
  getAllFonts() {
    return {
      system: this.systemResources.fonts,
      user: this.userResources.fonts
    };
  }

  /**
   * Obtener todos los fondos disponibles
   */
  getAllBackgrounds() {
    return {
      system: this.systemResources.backgrounds,
      user: this.userResources.backgrounds
    };
  }

  /**
   * Obtener todos los logos disponibles
   */
  getAllLogos() {
    return {
      system: this.systemResources.logos,
      user: this.userResources.logos
    };
  }

  /**
   * Validar archivo de fuente
   */
  validateFont(file) {
    const errors = [];
    
    // Validar extensión
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    if (!SUPPORTED_FORMATS.FONTS.includes(extension)) {
      errors.push(`Formato no soportado. Use: ${SUPPORTED_FORMATS.FONTS.join(', ')}`);
    }
    
    // Validar tamaño
    if (file.size > MAX_FILE_SIZES.FONT) {
      errors.push(`Archivo muy grande. Máximo: ${MAX_FILE_SIZES.FONT / 1024 / 1024}MB`);
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Validar archivo de imagen
   */
  validateImage(file, type = 'background') {
    const errors = [];
    const maxSize = type === 'logo' ? MAX_FILE_SIZES.LOGO : MAX_FILE_SIZES.IMAGE;
    const formats = type === 'logo' ? SUPPORTED_FORMATS.LOGOS : SUPPORTED_FORMATS.IMAGES;
    
    // Validar extensión
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    if (!formats.includes(extension)) {
      errors.push(`Formato no soportado. Use: ${formats.join(', ')}`);
    }
    
    // Validar tamaño
    if (file.size > maxSize) {
      errors.push(`Archivo muy grande. Máximo: ${maxSize / 1024 / 1024}MB`);
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Cargar fuente personalizada en el DOM
   */
  async loadCustomFont(fontName, fontPath) {
    try {
      const fontFace = new FontFace(fontName, `url(${fontPath})`);
      await fontFace.load();
      document.fonts.add(fontFace);
      return { success: true, fontName };
    } catch (error) {
      console.error('Error al cargar fuente:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Convertir archivo a base64
   */
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
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
          width: img.width,
          height: img.height,
          aspectRatio: img.width / img.height
        });
      };
      
      img.onerror = reject;
      img.src = url;
    });
  }

  /**
   * Guardar recurso del usuario
   */
  async saveUserResource(file, type) {
    try {
      if (!window.api || !window.api.saveUserResource) {
        throw new Error('API no disponible');
      }

      // Convertir a base64 para enviar por IPC
      const base64 = await this.fileToBase64(file);
      
      const result = await window.api.saveUserResource({
        name: file.name,
        type,
        data: base64
      });

      if (result.success) {
        // Actualizar lista local
        this.userResources[type + 's'].push(result.resource);
      }

      return result;
    } catch (error) {
      console.error('Error al guardar recurso:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Eliminar recurso del usuario
   */
  async deleteUserResource(resourcePath, type) {
    try {
      if (!window.api || !window.api.deleteUserResource) {
        throw new Error('API no disponible');
      }

      const result = await window.api.deleteUserResource({
        path: resourcePath,
        type
      });

      if (result.success) {
        // Actualizar lista local
        this.userResources[type + 's'] = this.userResources[type + 's'].filter(
          r => r.path !== resourcePath
        );
      }

      return result;
    } catch (error) {
      console.error('Error al eliminar recurso:', error);
      return { success: false, error: error.message };
    }
  }
}

// Exportar instancia única (Singleton)
export const resourceManager = new ResourceManager();
