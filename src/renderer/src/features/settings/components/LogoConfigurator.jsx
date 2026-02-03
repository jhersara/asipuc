/**
 * COMPONENTE: LogoConfigurator
 * 
 * Configurador de logos con controles de tamaño y posición.
 */

import React, { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { useResources } from '../hooks/useResources';
import { useTheme } from '../../../core/hooks/useTheme';

export const LogoConfigurator = ({ logoType, title }) => {
  const { uploadFile } = useResources();
  const { updateLogo, theme } = useTheme();
  
  const logoConfig = theme.logos[logoType];
  const [config, setConfig] = useState(logoConfig);

  /**
   * Actualizar configuración local y en tema
   */
  const handleConfigChange = (updates) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    updateLogo(logoType, newConfig);
  };

  /**
   * Subir logo
   */
  const handleUploadLogo = async (file) => {
    const result = await uploadFile(file, 'logo');
    if (result.success) {
      handleConfigChange({
        enabled: true,
        url: result.resource.url
      });
    }
  };

  /**
   * Toggle enabled
   */
  const handleToggle = () => {
    handleConfigChange({ enabled: !config.enabled });
  };

  /**
   * Quitar logo
   */
  const handleRemoveLogo = () => {
    handleConfigChange({
      enabled: false,
      url: null
    });
  };

  return (
    <div className="logo-configurator">
      <div className="logo-header">
        <h3>{title}</h3>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={config.enabled}
            onChange={handleToggle}
          />
          <span className="slider"></span>
        </label>
      </div>

      {config.enabled && (
        <div className="logo-config-body">
          {/* Uploader */}
          <ImageUploader
            onUpload={handleUploadLogo}
            label={config.url ? "Cambiar Logo" : "Subir Logo"}
            accept="image/png,image/svg+xml"
            maxSize={5 * 1024 * 1024}
            preview={true}
          />

          {/* Preview del logo actual */}
          {config.url && (
            <div className="logo-preview">
              <img src={config.url} alt="Logo preview" />
              <button className="btn-remove" onClick={handleRemoveLogo}>
                Quitar Logo
              </button>
            </div>
          )}

          {/* Controles de tamaño y posición */}
          {config.url && (
            <div className="logo-controls">
              <div className="control-group">
                <label>Tamaño: {config.size}px</label>
                <input
                  type="range"
                  min="50"
                  max="300"
                  value={config.size}
                  onChange={(e) => handleConfigChange({ size: parseInt(e.target.value) })}
                />
              </div>

              <div className="control-group">
                <label>Desplazamiento Horizontal: {config.offsetX}px</label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={config.offsetX}
                  onChange={(e) => handleConfigChange({ offsetX: parseInt(e.target.value) })}
                />
              </div>

              <div className="control-group">
                <label>Desplazamiento Vertical: {config.offsetY}px</label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={config.offsetY}
                  onChange={(e) => handleConfigChange({ offsetY: parseInt(e.target.value) })}
                />
              </div>

              {logoType === 'watermark' && (
                <div className="control-group">
                  <label>Opacidad: {Math.round(config.opacity * 100)}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={config.opacity * 100}
                    onChange={(e) => handleConfigChange({ opacity: parseInt(e.target.value) / 100 })}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
