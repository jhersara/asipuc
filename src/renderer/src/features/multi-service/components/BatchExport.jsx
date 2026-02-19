/**
 * COMPONENTE: BatchExport
 *
 * Exportación por lotes de todos los servicios.
 * Estrategia: cambia temporalmente los datos del slide visible,
 * captura la imagen y lo restaura antes de pasar al siguiente.
 */

import React, { useState } from 'react';
import { useTheme } from '../../../core/hooks/useTheme';
import { getTemplateById } from '../../slide-generator/templates';
import { DEFAULT_RESOLUTION } from '../../../core/config/constants';
import { toPng } from 'html-to-image';
import { GiCardboardBox } from 'react-icons/gi';
import { IoReloadSharp } from 'react-icons/io5';

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
   * Renderiza un template en un contenedor offscreen, lo captura como PNG y lo descarga.
   */
  const captureSlide = (data, total, filename) => {
    return new Promise((resolve, reject) => {
      const container = document.createElement('div');
      container.style.cssText =
        'position:fixed;left:-99999px;top:-99999px;width:0;height:0;overflow:hidden;';
      document.body.appendChild(container);

      const wrapper = document.createElement('div');
      wrapper.id = `batch-slide-${Date.now()}`;
      container.appendChild(wrapper);

      import('react-dom/client').then(({ createRoot }) => {
        const root = createRoot(wrapper);

        root.render(
          React.createElement(TemplateComponent, {
            data,
            total,
            theme,
            resolution: DEFAULT_RESOLUTION
          })
        );

        // Esperar un frame para que React pinte
        requestAnimationFrame(() => {
          setTimeout(async () => {
            try {
              // El slide real tiene el tamaño completo; tomamos el primer hijo renderizado
              const slideEl = wrapper.firstChild;
              if (!slideEl) throw new Error('No se generó el elemento del slide');

              const dataUrl = await toPng(slideEl, {
                width: DEFAULT_RESOLUTION.width,
                height: DEFAULT_RESOLUTION.height,
                pixelRatio: 2,
                quality: 0.95,
                backgroundColor: '#000000',
                cacheBust: false
              });

              const link = document.createElement('a');
              link.download = filename;
              link.href = dataUrl;
              link.click();
              link.remove();

              resolve({ success: true });
            } catch (err) {
              reject(err);
            } finally {
              root.unmount();
              document.body.removeChild(container);
            }
          }, 150);
        });
      });
    });
  };

  const handleBatchExport = async () => {
    setIsExporting(true);
    setProgress(0);

    const date = new Date().toLocaleDateString().replace(/\//g, '-');
    const enabledServices = services.filter(s => s.enabled);
    const totalSteps = enabledServices.length + 1;

    try {
      for (let i = 0; i < enabledServices.length; i++) {
        const service = enabledServices[i];
        const data = getFormattedData(service.id);
        const serviceTotal = getServiceTotal(service.id);
        const filename = `${date}-${service.name.replace(/\s+/g, '-')}.png`;

        await captureSlide(data, serviceTotal, filename);
        setProgress(Math.round(((i + 1) / totalSteps) * 100));

        // Pausa entre capturas para evitar saturar el navegador
        await new Promise(r => setTimeout(r, 300));
      }

      // Exportar total acumulado
      const accumulatedData = getFormattedAccumulatedData();
      await captureSlide(
        accumulatedData,
        accumulatedTotal,
        `${date}-TOTAL-ACUMULADO.png`
      );

      setProgress(100);
      alert(`✅ ${totalSteps} imágenes exportadas correctamente`);
    } catch (error) {
      alert('❌ Error en la exportación: ' + error.message);
    } finally {
      setIsExporting(false);
      setProgress(0);
    }
  };

  const enabledCount = services.filter(s => s.enabled).length;

  return (
    <div className="batch-export">
      <button
        className="btn-batch-export"
        onClick={handleBatchExport}
        disabled={isExporting}
      >
        {isExporting ? (
          <>
            <span className="spinner">
              <IoReloadSharp className="icon" />
            </span>
            Exportando... {progress}%
          </>
        ) : (
          <>
            <GiCardboardBox className="icon" /> Exportar Todos ({enabledCount + 1} slides)
          </>
        )}
      </button>

      {isExporting && (
        <div className="export-progress">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      <p className="batch-export-help">
        Exporta todos los servicios activos + total acumulado en un solo click
      </p>
    </div>
  );
};
