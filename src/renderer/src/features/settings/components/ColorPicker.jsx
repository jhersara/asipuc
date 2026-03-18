/**
 * COMPONENTE: ColorPicker
 * 
 * Selector de colores con preview y presets.
 */

import React, { useState } from 'react';

export const ColorPicker = ({ 
  label, 
  color, 
  onChange,
  presets = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(color || '#ffffff');

  const defaultPresets = [
    { name: 'Blanco', value: '#ffffff' },
    { name: 'Negro', value: '#000000' },
    { name: 'Gris', value: '#808080' },
    { name: 'Azul', value: '#007bff' },
    { name: 'Verde', value: '#28a745' },
    { name: 'Rojo', value: '#dc3545' },
    { name: 'Amarillo', value: '#ffc107' },
    { name: 'Naranja', value: '#fd7e14' },
    { name: 'Morado', value: '#6f42c1' },
    { name: 'Rosa', value: '#e83e8c' },
    { name: 'Oro', value: '#d4af37' },
    { name: 'Plata', value: '#c0c0c0' }
  ];

  const colorPresets = presets.length > 0 ? presets : defaultPresets;

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setCurrentColor(newColor);
    if (onChange) {
      onChange(newColor);
    }
  };

  const handlePresetClick = (presetColor) => {
    setCurrentColor(presetColor);
    if (onChange) {
      onChange(presetColor);
    }
  };

  return (
    <div className="color-picker">
      <label className="color-picker-label">{label}</label>
      
      <div className="color-picker-input-group">
        {/* Color preview */}
        <div 
          className="color-preview"
          style={{ backgroundColor: currentColor }}
          onClick={() => setIsOpen(!isOpen)}
        />

        {/* Hex input */}
        <input
          type="text"
          className="color-hex-input"
          value={currentColor}
          onChange={(e) => {
            setCurrentColor(e.target.value);
            if (onChange) onChange(e.target.value);
          }}
          placeholder="#ffffff"
          maxLength={7}
        />

        {/* Native color picker */}
        <input
          type="color"
          className="native-color-picker"
          value={currentColor}
          onChange={handleColorChange}
        />
      </div>

      {/* Color presets */}
      {isOpen && (
        <div className="color-presets">
          <div className="presets-title">Colores Predefinidos</div>
          <div className="presets-grid">
            {colorPresets.map((preset, index) => (
              <div
                key={index}
                className={`preset-color ${currentColor.toLowerCase() === preset.value.toLowerCase() ? 'active' : ''}`}
                style={{ backgroundColor: preset.value }}
                onClick={() => handlePresetClick(preset.value)}
                title={preset.name}
              >
                {currentColor.toLowerCase() === preset.value.toLowerCase() && (
                  <span className="preset-check">✓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
