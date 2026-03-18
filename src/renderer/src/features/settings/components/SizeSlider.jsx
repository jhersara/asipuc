/**
 * COMPONENTE: SizeSlider
 * 
 * Slider para ajustar tamaños con preview visual.
 */

import React from 'react';

export const SizeSlider = ({ 
  label, 
  value, 
  onChange,
  min = 20,
  max = 200,
  unit = 'px',
  step = 2
}) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (onChange) {
      onChange(`${newValue}${unit}`);
    }
  };

  // Extraer valor numérico si viene con unidad
  const numericValue = typeof value === 'string' 
    ? parseInt(value.replace(/[^0-9]/g, ''))
    : value;

  // Calcular porcentaje para la barra de progreso
  const percentage = ((numericValue - min) / (max - min)) * 100;

  return (
    <div className="size-slider">
      <div className="slider-header">
        <label className="slider-label">{label}</label>
        <span className="slider-value">{numericValue}{unit}</span>
      </div>

      <div className="slider-container">
        <input
          type="range"
          className="slider-input"
          min={min}
          max={max}
          step={step}
          value={numericValue}
          onChange={handleChange}
          style={{
            background: `linear-gradient(to right, #007bff 0%, #007bff ${percentage}%, #444 ${percentage}%, #444 100%)`
          }}
        />
      </div>

      <div className="slider-marks">
        <span className="mark-min">{min}{unit}</span>
        <span className="mark-max">{max}{unit}</span>
      </div>

      {/* Preview visual del tamaño */}
      <div className="size-preview">
        <div 
          className="preview-text"
          style={{ fontSize: `${Math.min(numericValue / 2, 48)}px` }}
        >
          Aa
        </div>
      </div>
    </div>
  );
};
