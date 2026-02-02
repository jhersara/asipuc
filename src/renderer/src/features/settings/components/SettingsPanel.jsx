/**
 * COMPONENTE: SettingsPanel
 * 
 * Panel deslizable de configuración con diseño moderno
 * Inspirado en la UI oscura proporcionada
 */

import React, { useState } from 'react';
import { useTheme } from '../../../core/hooks/useTheme';
import { ResolutionSelector } from '../../export-settings/components/ResolutionSelector';
import { QualitySelector } from '../../export-settings/components/QualitySelector';
import { FormatSelector } from '../../export-settings/components/FormatSelector';
import { useExportSettings } from '../../export-settings/hooks/useExportSettings';
import './SettingsPanel.css';

export const SettingsPanel = ({ isOpen, onClose }) => {
  const { theme, themeName, changeTheme, availableThemes } = useTheme();
  const exportSettings = useExportSettings();
  const [activeTab, setActiveTab] = useState('theme');

  if (!isOpen) return null;

  const tabs = [
    { id: 'theme', label: 'Tema', icon: '🎨' },
    { id: 'export', label: 'Exportación', icon: '📤' },
    { id: 'fonts', label: 'Fuentes', icon: '🔤' },
    { id: 'images', label: 'Imágenes', icon: '🖼️' }
  ];

  return (
    <>
      {/* Overlay */}
      <div className="settings-overlay" onClick={onClose} />

      {/* Panel */}
      <div className="settings-panel">
        {/* Header */}
        <div className="settings-header">
          <h2>Configuración</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="settings-content">
          {activeTab === 'theme' && (
            <div className="settings-section">
              <h3>Seleccionar Tema</h3>
              <div className="theme-options">
                {availableThemes.map(t => (
                  <button
                    key={t.name}
                    className={`theme-card ${themeName === t.name ? 'selected' : ''}`}
                    onClick={() => changeTheme(t.name)}
                  >
                    <div className="theme-preview" />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              <div className="color-preview">
                <h4>Vista Previa de Colores</h4>
                <div className="color-grid">
                  <div className="color-item">
                    <div 
                      className="color-swatch" 
                      style={{ backgroundColor: theme.colors.slideBackground }}
                    />
                    <span>Fondo</span>
                  </div>
                  <div className="color-item">
                    <div 
                      className="color-swatch" 
                      style={{ backgroundColor: theme.colors.slideText }}
                    />
                    <span>Texto</span>
                  </div>
                  <div className="color-item">
                    <div 
                      className="color-swatch" 
                      style={{ backgroundColor: theme.colors.slideAccent }}
                    />
                    <span>Acento</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="settings-section">
              <h3>Configuración de Exportación</h3>
              
              <ResolutionSelector
                value={exportSettings.settings.resolution}
                onChange={exportSettings.updateResolution}
              />

              <QualitySelector
                value={exportSettings.settings.quality}
                onChange={exportSettings.updateQuality}
              />

              <FormatSelector
                value={exportSettings.settings.format}
                onChange={exportSettings.updateFormat}
              />

              <button 
                className="reset-button"
                onClick={exportSettings.resetToDefaults}
              >
                Restablecer a valores predeterminados
              </button>
            </div>
          )}

          {activeTab === 'fonts' && (
            <div className="settings-section">
              <h3>Fuentes</h3>
              <p className="section-hint">
                Coloca archivos de fuentes (.ttf, .woff2) en:
                <code>src/renderer/src/assets/fonts/</code>
              </p>
              <div className="info-box">
                <p>📚 Funcionalidad de selección de fuentes estará disponible próximamente</p>
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="settings-section">
              <h3>Imágenes</h3>
              <p className="section-hint">
                Agrega logos y fondos personalizados
              </p>
              <div className="image-upload-area">
                <button className="upload-button">
                  📁 Subir Logo
                </button>
                <button className="upload-button">
                  🖼️ Subir Fondo
                </button>
              </div>
              <div className="info-box">
                <p>⚠️ Los fondos deben ser exactamente 1920x1080px</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
