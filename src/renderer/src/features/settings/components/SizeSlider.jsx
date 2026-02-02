/**
 * COMPONENTE: SizeSlider
 * 
 * Control deslizante para ajustar tamaños de texto
 */

import React from 'react';

export const SizeSlider = ({ 
  label, 
  value, 
  onChange, 
  min = 20, 
  max = 200, 
  step = 2,
  unit = 'px',
  showValue = true
}) => {
  // Convertir valor de string (ej: "100px") a número
  const numValue = parseInt(value) || min;

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    onChange(`${newValue}${unit}`);
  };

  return (
    <div className="size-slider">
      <div className="size-slider-header">
        <label className="size-slider-label">{label}</label>
        {showValue && (
          <span className="size-slider-value">{value}</span>
        )}
      </div>

      <div className="size-slider-control">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={numValue}
          onChange={handleChange}
          className="slider"
        />
        
        <div className="slider-markers">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>

      {/* Preview del tamaño */}
      <div 
        className="size-preview"
        style={{ fontSize: value }}
      >
        Aa
      </div>
    </div>
  );
};
