/**
 * COMPONENTE: SlidePreview
 * 
 * Wrapper del slide con soporte para templates dinámicos.
 */

import React, { useRef } from 'react';
import { useTheme } from '../../../core/hooks/useTheme';
import { getTemplateById } from '../templates';
import { AccumulatedTemplate } from '../templates/AccumulatedTemplate';

export const SlidePreview = ({ 
  data, 
  total, 
  resolution,
  services = [],
  isAccumulated = false,
  id = 'slide-preview'
}) => {
  const slideRef = useRef(null);
  const { theme, selectedTemplate } = useTheme();

  const TemplateComponent = getTemplateById(selectedTemplate);

  // Cuando es vista acumulada, usar siempre AccumulatedTemplate
  if (isAccumulated) {
    return (
      <div id={id} ref={slideRef}>
        <AccumulatedTemplate
          services={services}
          grandTotal={total}
          theme={theme}
          resolution={resolution}
        />
      </div>
    );
  }

  return (
    <div id={id} ref={slideRef}>
      <TemplateComponent
        data={data}
        total={total}
        services={services}
        theme={theme}
        resolution={resolution}
      />
    </div>
  );
};
