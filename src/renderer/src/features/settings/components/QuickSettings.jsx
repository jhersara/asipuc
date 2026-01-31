/**
 * COMPONENTE: QuickSettings
 * 
 * Panel de configuración rápida para ajustes básicos.
 * Permite cambiar tema (colores) y abrir galería de fondos.
 */

import React, { useState } from 'react';
import { useTheme } from '../../../core/hooks/useTheme';
import { AVAILABLE_FONTS, TEXT_SIZES } from '../../../core/config/constants';
import { BackgroundGallery } from '../../background-gallery/components/BackgroundGallery';
import './QuickSettings.css';

export const QuickSettings = () => {
  const { 
    theme, 
    themeName, 
    changeTheme, 
    updateFont, 
    updateSize,
    availableThemes 
  } = useTheme();

  const [showGallery, setShowGallery] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Cambiar tema de colores
   */
  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
  };

  /**
   * Cambiar fuente principal
   */
  const handleFontChange = (fontValue) => {
    updateFont('primary', fontValue);
  };

  /**
   * Cambiar tamaño del título
   */
  const handleTitleSizeChange = (size) => {
    updateSize('title', size);
  };

  return (
    <>
      <div className={`quick-settings ${isExpanded ? 'expanded' : ''}`}>
        {/* Toggle Button */}
        <button 
          className="settings-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          title="Configuración rápida"
        >
          ⚙️
        </button>

        {/* Settings Panel */}
        {isExpanded && (
          <div className="settings-panel">
            <h3 className="settings-title">⚙️ Configuración Rápida</h3>

            {/* Color Theme Selector */}
            <div className="setting-group">
              <label className="setting-label">Esquema de Color:</label>
              <div className="theme-buttons">
                {availableThemes.map(t => (
                  <button
                    key={t.name}
                    className={`theme-btn ${themeName === t.name ? 'active' : ''}`}
                    onClick={() => handleThemeChange(t.name)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Background Gallery Button */}
            <div className="setting-group">
              <label className="setting-label">Imagen de Fondo:</label>
              <button 
                className="btn-open-gallery"
                onClick={() => setShowGallery(true)}
              >
                🖼️ Abrir Galería
              </button>
            </div>

            {/* Font Selector */}
            <div className="setting-group">
              <label className="setting-label">Fuente Principal:</label>
              <select 
                className="setting-select"
                value={theme.fonts.primary}
                onChange={(e) => handleFontChange(e.target.value)}
              >
                {AVAILABLE_FONTS.map(font => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Title Size Selector */}
            <div className="setting-group">
              <label className="setting-label">Tamaño del Título:</label>
              <div className="size-buttons">
                {Object.entries(TEXT_SIZES.TITLE).map(([key, value]) => (
                  <button
                    key={key}
                    className={`size-btn ${theme.sizes.title === value ? 'active' : ''}`}
                    onClick={() => handleTitleSizeChange(value)}
                  >
                    {key.charAt(0).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="settings-info">
              <small>💡 Los cambios se aplican automáticamente</small>
            </div>
          </div>
        )}
      </div>

      {/* Background Gallery Modal */}
      {showGallery && (
        <BackgroundGallery onClose={() => setShowGallery(false)} />
      )}
    </>
  );
};
