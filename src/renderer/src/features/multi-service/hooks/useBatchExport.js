/**
 * HOOK: useBatchExport
 * Extrae la logica de exportacion por lotes de BatchExport
 * para poder reutilizarla desde el PanelExport.
 */

import { useState } from 'react';
import { useTheme } from '../../../core/hooks/useTheme';
import { getTemplateById } from '../../slide-generator/templates';
import { DEFAULT_RESOLUTION } from '../../../core/config/constants';
import { toPng } from 'html-to-image';
import React from 'react';

export const useBatchExport = ({
  services,
  getFormattedData,
  getFormattedAccumulatedData,
  getServiceTotal,
  accumulatedTotal,
  onSuccess,
  onError,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress]       = useState(0);
  const { theme, selectedTemplate }   = useTheme();

  const TemplateComponent = getTemplateById(selectedTemplate);

  const captureSlide = (data, total, filename) =>
    new Promise((resolve, reject) => {
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
            data, total, theme, resolution: DEFAULT_RESOLUTION
          })
        );

        requestAnimationFrame(() => {
          setTimeout(async () => {
            try {
              const slideEl = wrapper.firstChild;
              if (!slideEl) throw new Error('No se generó el elemento del slide');

              const dataUrl = await toPng(slideEl, {
                width: DEFAULT_RESOLUTION.width,
                height: DEFAULT_RESOLUTION.height,
                pixelRatio: 2,
                quality: 0.95,
                backgroundColor: '#000000',
                cacheBust: false,
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

  const handleBatchExport = async () => {
    setIsExporting(true);
    setProgress(0);

    const date = new Date().toLocaleDateString().replace(/\//g, '-');
    const enabled = services.filter(s => s.enabled);
    const totalSteps = enabled.length + 1;

    try {
      for (let i = 0; i < enabled.length; i++) {
        const svc = enabled[i];
        await captureSlide(
          getFormattedData(svc.id),
          getServiceTotal(svc.id),
          `${date}-${svc.name.replace(/\s+/g, '-')}.png`
        );
        setProgress(Math.round(((i + 1) / totalSteps) * 100));
        await new Promise(r => setTimeout(r, 300));
      }

      await captureSlide(
        getFormattedAccumulatedData(),
        accumulatedTotal,
        `${date}-TOTAL-ACUMULADO.png`
      );

      setProgress(100);
      onSuccess?.(`${totalSteps} imágenes exportadas correctamente`);
    } catch (err) {
      onError?.('Error en exportación: ' + err.message);
    } finally {
      setIsExporting(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return { handleBatchExport, isExporting, progress };
};
