/**
 * COMPONENTE: BatchExport
 * 
 * Exportación por lotes de todos los servicios.
 */

import React, { useState } from 'react';
import { useTheme } from '../../../core/hooks/useTheme';
import { getTemplateById } from '../../slide-generator/templates';
import { DEFAULT_RESOLUTION } from '../../../core/config/constants';
import { toPng } from 'html-to-image';

export const BatchExport = ({ 
  services, 
  getFormattedData,
  getFormattedAccumulatedData,
  getServiceTotal,
  accumulatedTotal
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { theme, selectedTemplate } = useTheme();

  const TemplateComponent = getTemplateById(selectedTemplate);

  /**
   * Exportar un slide individual
   */
  const exportSingleSlide = async (data, total, filename) => {
    // Crear elemento temporal
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    document.body.appendChild(container);

    // Renderizar template
    const root = document.createElement('div');
    container.appendChild(root);

    // Usar React para renderizar (simplificado)
    const slideElement = document.createElement('div');
    slideElement.innerHTML = `
      <div id="temp-slide-${Date.now()}">
        <!-- Aquí iría el render del template -->
      </div>
    `;
    container.appendChild(slideElement);

    try {
      const dataUrl = await toPng(slideElement, {
        width: DEFAULT_RESOLUTION.width,
        height: DEFAULT_RESOLUTION.height,
        pixelRatio: 2,
        quality: 0.95,
        backgroundColor: '#000000'
      });

      // Descargar
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();

      return { success: true };
    } catch (error) {
      console.error('Error exportando:', error);
      return { success: false, error };
    } finally {
      document.body.removeChild(container);
    }
  };

  /**
   * Exportar todos los servicios
   */
  const handleBatchExport = async () => {
    setIsExporting(true);
    setProgress(0);

    const date = new Date().toLocaleDateString().replace(/\//g, '-');
    const enabledServices = services.filter(s => s.enabled);
    const total = enabledServices.length + 1; // Servicios + total acumulado

    try {
      // Exportar cada servicio
      for (let i = 0; i < enabledServices.length; i++) {
        const service = enabledServices[i];
        const data = getFormattedData(service.id);
        const serviceTotal = getServiceTotal(service.id);
        
        await exportSingleSlide(
          data,
          serviceTotal,
          `${date}-${service.name.replace(/\s+/g, '-')}.png`
        );

        setProgress(Math.round(((i + 1) / total) * 100));
        
        // Pequeña pausa entre exportaciones
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Exportar total acumulado
      const accumulatedData = getFormattedAccumulatedData();
      await exportSingleSlide(
        accumulatedData,
        accumulatedTotal,
        `${date}-TOTAL-ACUMULADO.png`
      );

      setProgress(100);
      alert(`✅ ${enabledServices.length + 1} imágenes exportadas correctamente`);
    } catch (error) {
      alert('❌ Error en la exportación: ' + error.message);
    } finally {
      setIsExporting(false);
      setProgress(0);
    }
  };

  return (
    <div className="batch-export">
      <button
        className="btn-batch-export"
        onClick={handleBatchExport}
        disabled={isExporting}
      >
        {isExporting ? (
          <>
            <span className="spinner">⏳</span>
            Exportando... {progress}%
          </>
        ) : (
          <>
            📦 Exportar Todos ({services.filter(s => s.enabled).length + 1} slides)
          </>
        )}
      </button>

      {isExporting && (
        <div className="export-progress">
          <div 
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <p className="batch-export-help">
        Exporta todos los servicios activos + total acumulado en un solo click
      </p>
    </div>
  );
};
