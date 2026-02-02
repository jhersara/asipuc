/**
 * COMPONENTE: FontSelector
 * 
 * Selector de fuentes con preview
 */

import React from 'react';
import { SYSTEM_FONTS, CUSTOM_FONTS } from '../../../core/config/constants';

export const FontSelector = ({ 
  label, 
  value, 
  onChange,
  category = 'all' // 'all', 'serif', 'sans-serif', 'display'
}) => {
  // Combinar fuentes del sistema y personalizadas
  const allFonts = [...SYSTEM_FONTS, ...CUSTOM_FONTS];
  
  // Filtrar por categoría si es necesario
  const fonts = category === 'all' 
    ? allFonts 
    : allFonts.filter(font => font.category === category);

  return (
    <div className="font-selector">
      <label className="font-selector-label">{label}</label>
      
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-select"
        style={{ fontFamily: value }}
      >
        {fonts.map((font) => (
          <option 
            key={font.value} 
            value={font.value}
            style={{ fontFamily: font.value }}
          >
            {font.label}
          </option>
        ))}
      </select>

      {/* Preview del texto */}
      <div 
        className="font-preview"
        style={{ fontFamily: value }}
      >
        ASISTENCIA 123
      </div>
    </div>
  );
};
