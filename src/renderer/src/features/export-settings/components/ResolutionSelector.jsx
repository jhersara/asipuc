/**
 * COMPONENTE: ResolutionSelector
 * 
 * Selector de resolución para exportación
 */

import React from 'react';
import { IMAGE_RESOLUTIONS } from '../../../core/config/constants';

export const ResolutionSelector = ({ value, onChange, disabled = false }) => {
  const resolutions = Object.values(IMAGE_RESOLUTIONS);

  return (
    <div className="setting-group">
      <label className="setting-label">
        <span className="label-text">Resolución</span>
        <span className="label-hint">Tamaño de la imagen exportada</span>
      </label>
      
      <select 
        className="setting-select"
        value={JSON.stringify(value)}
        onChange={(e) => onChange(JSON.parse(e.target.value))}
        disabled={disabled}
      >
        {resolutions.map(res => (
          <option key={res.label} value={JSON.stringify(res)}>
            {res.label}
          </option>
        ))}
      </select>

      <div className="resolution-preview">
        {value.width} × {value.height} px
      </div>
    </div>
  );
};
