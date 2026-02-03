/**
 * COMPONENTE: ThemeCustomizer
 * 
 * Editor completo de tema con colores, fuentes y tamaños.
 */

import React from 'react';
import { useTheme } from '../../../core/hooks/useTheme';
import { ColorPicker } from './ColorPicker';
import { FontSelector } from './FontSelector';
import { SizeSlider } from './SizeSlider';

export const ThemeCustomizer = () => {
  const { 
    theme, 
    updateColor, 
    updateFont, 
    updateSize,
    resetTheme 
  } = useTheme();

  return (
    <div className="theme-customizer">
      <h3 className="section-title">Personalizar Tema</h3>
      
      <p className="section-description">
        Ajusta colores, fuentes y tamaños para crear tu diseño perfecto
      </p>

      {/* COLORES */}
      <div className="customizer-section">
        <h4 className="subsection-title">🎨 Colores</h4>
        
        <ColorPicker
          label="Color del Texto"
          color={theme.colors.slideText}
          onChange={(color) => updateColor('slideText', color)}
        />

        <ColorPicker
          label="Color de Bordes"
          color={theme.colors.slideBorder}
          onChange={(color) => updateColor('slideBorder', color)}
        />

        <ColorPicker
          label="Color del Hashtag"
          color={theme.colors.hashtagColor}
          onChange={(color) => updateColor('hashtagColor', color)}
        />

        <ColorPicker
          label="Color de Fondo del Slide"
          color={theme.colors.slideBackground}
          onChange={(color) => updateColor('slideBackground', color)}
        />
      </div>

      {/* FUENTES */}
      <div className="customizer-section">
        <h4 className="subsection-title">✍️ Fuentes</h4>
        
        <FontSelector
          label="Fuente del Título"
          selectedFont={theme.fonts.primary}
          onChange={(font) => updateFont('primary', font)}
          previewText="ASISTENCIA"
        />

        <FontSelector
          label="Fuente de los Números"
          selectedFont={theme.fonts.secondary}
          onChange={(font) => updateFont('secondary', font)}
          previewText="123"
        />
      </div>

      {/* TAMAÑOS */}
      <div className="customizer-section">
        <h4 className="subsection-title">📏 Tamaños de Texto</h4>
        
        <SizeSlider
          label="Tamaño del Título"
          value={theme.sizes.title}
          onChange={(size) => updateSize('title', size)}
          min={60}
          max={180}
        />

        <SizeSlider
          label="Tamaño de Etiquetas"
          value={theme.sizes.label}
          onChange={(size) => updateSize('label', size)}
          min={30}
          max={80}
        />

        <SizeSlider
          label="Tamaño de Números"
          value={theme.sizes.number}
          onChange={(size) => updateSize('number', size)}
          min={40}
          max={100}
        />

        <SizeSlider
          label="Tamaño del Total"
          value={theme.sizes.total}
          onChange={(size) => updateSize('total', size)}
          min={60}
          max={180}
        />

        <SizeSlider
          label="Tamaño del Hashtag"
          value={theme.sizes.hashtag}
          onChange={(size) => updateSize('hashtag', size)}
          min={20}
          max={60}
        />
      </div>

      {/* ACCIONES */}
      <div className="customizer-actions">
        <button 
          className="btn-reset"
          onClick={resetTheme}
        >
          🔄 Restaurar Valores por Defecto
        </button>
      </div>

      {/* NOTA */}
      <div className="customizer-note">
        <div className="note-icon">💡</div>
        <div className="note-text">
          <strong>Tip:</strong> Los cambios se aplican instantáneamente al slide. 
          Experimenta hasta encontrar el diseño perfecto!
        </div>
      </div>
    </div>
  );
};
