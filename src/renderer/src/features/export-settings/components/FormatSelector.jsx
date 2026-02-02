/**
 * COMPONENTE: FormatSelector
 * 
 * Selector de formato de exportación (PNG/JPEG)
 */

import React from 'react';
import { EXPORT_FORMATS } from '../../../core/config/constants';

export const FormatSelector = ({ value, onChange, disabled = false }) => {
  const formats = Object.values(EXPORT_FORMATS);

  return (
    <div className="setting-group">
      <label className="setting-label">
        <span className="label-text">Formato</span>
        <span className="label-hint">Tipo de archivo a exportar</span>
      </label>

      <div className="format-options">
        {formats.map(format => (
          <label 
            key={format.value}
            className={`format-option ${value === format.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="format"
              value={format.value}
              checked={value === format.value}
              onChange={() => onChange(format.value)}
              disabled={disabled}
            />
            <div className="option-content">
              <span className="option-title">{format.label}</span>
              <span className="option-description">{format.description}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
