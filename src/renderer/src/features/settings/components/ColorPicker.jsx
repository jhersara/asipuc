/**
 * COMPONENTE: ColorPicker
 * 
 * Selector de color profesional con presets
 */

import React, { useState } from 'react';
import { COLOR_PALETTE } from '../../../core/config/constants';

export const ColorPicker = ({ 
  label, 
  value, 
  onChange, 
  showPresets = true 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const presetColors = [
    COLOR_PALETTE.YELLOW,
    COLOR_PALETTE.RED,
    COLOR_PALETTE.BLUE,
    COLOR_PALETTE.NAVY,
    COLOR_PALETTE.WHITE,
    COLOR_PALETTE.SUCCESS,
    COLOR_PALETTE.WARNING,
    COLOR_PALETTE.ERROR,
    '#000000',
    '#ffffff'
  ];

  return (
    <div className="color-picker">
      <label className="color-picker-label">{label}</label>
      
      <div className="color-picker-controls">
        {/* Vista previa del color actual */}
        <div 
          className="color-preview"
          style={{ backgroundColor: value }}
          onClick={() => setIsOpen(!isOpen)}
        />
        
        {/* Input nativo de color */}
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="color-input"
        />
        
        {/* Valor hex */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="color-text-input"
          placeholder="#000000"
          maxLength={7}
        />
      </div>

      {/* Presets de colores */}
      {showPresets && isOpen && (
        <div className="color-presets">
          {presetColors.map((color) => (
            <div
              key={color}
              className="color-preset"
              style={{ backgroundColor: color }}
              onClick={() => {
                onChange(color);
                setIsOpen(false);
              }}
              title={color}
            />
          ))}
        </div>
      )}
    </div>
  );
};
