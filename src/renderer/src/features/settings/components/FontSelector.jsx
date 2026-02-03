/**
 * COMPONENTE: FontSelector
 * 
 * Selector de fuentes con preview en tiempo real.
 */

import React from 'react';
import { SYSTEM_FONTS } from '../../../core/config/constants';

export const FontSelector = ({ 
  label, 
  selectedFont, 
  onChange,
  previewText = 'ASISTENCIA'
}) => {
  const handleFontChange = (e) => {
    const fontValue = e.target.value;
    if (onChange) {
      onChange(fontValue);
    }
  };

  return (
    <div className="font-selector">
      <label className="font-selector-label">{label}</label>
      
      {/* Selector dropdown */}
      <select
        className="font-select"
        value={selectedFont}
        onChange={handleFontChange}
      >
        {SYSTEM_FONTS.map((font, index) => (
          <option 
            key={index} 
            value={font.value}
            style={{ fontFamily: font.value }}
          >
            {font.label}
          </option>
        ))}
      </select>

      {/* Preview */}
      <div 
        className="font-preview"
        style={{ fontFamily: selectedFont }}
      >
        {previewText}
      </div>

      {/* Font info */}
      <div className="font-info">
        <small>
          {SYSTEM_FONTS.find(f => f.value === selectedFont)?.category || 'sans-serif'}
        </small>
      </div>
    </div>
  );
};
