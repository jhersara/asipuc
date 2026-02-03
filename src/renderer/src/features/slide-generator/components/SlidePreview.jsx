/**
 * COMPONENTE: SlidePreview
 * 
 * Wrapper del slide con soporte para templates dinámicos.
 */

import React, { useRef } from 'react';
import { useTheme } from '../../../core/hooks/useTheme';
import { getTemplateById } from '../templates';

export const SlidePreview = ({ 
  data, 
  total, 
  resolution,
  id = 'slide-preview'
}) => {
  const slideRef = useRef(null);
  const { theme, selectedTemplate } = useTheme();

  // Obtener el componente del template seleccionado
  const TemplateComponent = getTemplateById(selectedTemplate);

  return (
    <div className="slide-preview-container">
      <div id={id} ref={slideRef}>
        <TemplateComponent
          data={data}
          total={total}
          theme={theme}
          resolution={resolution}
        />
      </div>
    </div>
  );
};
