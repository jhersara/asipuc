/**
 * COMPONENTE: SlidePreview
 * 
 * Wrapper del slide con capacidad de exportación.
 * Separa la lógica de visualización de la exportación.
 */

import React, { useRef } from 'react';
import { SlideTemplate } from './SlideTemplate';

export const SlidePreview = ({ 
  data, 
  total, 
  theme, 
  resolution,
  id = 'slide-preview'
}) => {
  const slideRef = useRef(null);

  return (
    <div className="slide-preview-container">
      <div id={id} ref={slideRef}>
        <SlideTemplate
          data={data}
          total={total}
          theme={theme}
          resolution={resolution}
        />
      </div>
    </div>
  );
};
