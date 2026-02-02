/**
 * COMPONENTE: QualitySelector
 * 
 * Selector de calidad de exportación
 */

import React from 'react';
import { QUALITY_OPTIONS } from '../../../core/config/constants';

export const QualitySelector = ({ value, onChange, disabled = false }) => {
  return (
    <div className="setting-group">
      <label className="setting-label">
        <span className="label-text">Calidad</span>
        <span className="label-hint">Mayor calidad = mayor tamaño de archivo</span>
      </label>

      <div className="quality-options">
        {QUALITY_OPTIONS.map(option => (
          <label 
            key={option.value}
            className={`quality-option ${value === option.value ? 'selected' : ''} ${option.recommended ? 'recommended' : ''}`}
          >
            <input
              type="radio"
              name="quality"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              disabled={disabled}
            />
            <span className="option-label">{option.label}</span>
            {option.recommended && <span className="badge">Recomendado</span>}
          </label>
        ))}
      </div>

      <div className="quality-bar">
        <div 
          className="quality-indicator"
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );
};
