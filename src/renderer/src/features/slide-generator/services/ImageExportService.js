import { toPng, toJpeg } from 'html-to-image';
import { IMAGE_QUALITY, DEFAULT_RESOLUTION } from '../../../core/config/constants';

class ImageExportService {

  /**
   * Prepara el elemento para captura: elimina transform heredado,
   * captura, y restaura el estado original.
   */
  async _captureElement(element, options, format = 'png') {
    const {
      quality = IMAGE_QUALITY.HIGH,
      backgroundColor = '#000000',
      width = DEFAULT_RESOLUTION.width,
      height = DEFAULT_RESOLUTION.height
    } = options;

    // Guardar transform actual del elemento
    const prevTransform = element.style.transform;
    const prevTransformOrigin = element.style.transformOrigin;
    const prevPosition = element.style.position;
    const prevLeft = element.style.left;
    const prevTop = element.style.top;

    // Sacar el elemento del flujo visual para que no afecte el layout
    // y eliminar cualquier transform que distorsione la captura
    element.style.transform = 'none';
    element.style.transformOrigin = 'top left';
    element.style.position = 'fixed';
    element.style.left = '-99999px';
    element.style.top = '-99999px';

    try {
      const fn = format === 'jpeg' ? toJpeg : toPng;
      const dataUrl = await fn(element, {
        quality,
        backgroundColor,
        pixelRatio: 1,          // 1:1 → imagen exactamente 1920×1080
        width,
        height,
        cacheBust: false,
        skipAutoScale: true
      });
      return dataUrl;
    } finally {
      // Restaurar siempre, incluso si falla
      element.style.transform = prevTransform;
      element.style.transformOrigin = prevTransformOrigin;
      element.style.position = prevPosition;
      element.style.left = prevLeft;
      element.style.top = prevTop;
    }
  }

  async exportToPng(element, options = {}) {
    if (!element) throw new Error('Elemento no encontrado para exportar');
    try {
      return await this._captureElement(element, options, 'png');
    } catch (error) {
      console.error('Error al exportar a PNG:', error);
      throw new Error(`Error al generar imagen PNG: ${error.message}`);
    }
  }

  async exportToJpeg(element, options = {}) {
    if (!element) throw new Error('Elemento no encontrado para exportar');
    try {
      return await this._captureElement(element, options, 'jpeg');
    } catch (error) {
      console.error('Error al exportar a JPEG:', error);
      throw new Error(`Error al generar imagen JPEG: ${error.message}`);
    }
  }

  downloadImage(dataUrl, filename = null) {
    const defaultFilename = `Asistencia-${new Date().toLocaleDateString().replace(/\//g, '-')}.png`;
    const link = document.createElement('a');
    link.download = filename || defaultFilename;
    link.href = dataUrl;
    link.click();
    link.remove();
  }

  async exportAndDownload(element, options = {}, filename = null) {
    const format = options.format || 'png';
    const dataUrl = format === 'jpeg' || format === 'jpg'
      ? await this.exportToJpeg(element, options)
      : await this.exportToPng(element, options);
    this.downloadImage(dataUrl, filename);
    return true;
  }
}

export const imageExportService = new ImageExportService();
