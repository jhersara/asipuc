import React, { useState, useRef } from 'react';
import { useTheme } from '../../../core/hooks/useTheme';

export const LogoConfigurator = ({ logoType, title }) => {
  const { updateLogo, theme } = useTheme();

  const logoConfig = theme.logos[logoType];
  const [config, setConfig] = useState(logoConfig);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const inputRef = useRef(null);

  const handleConfigChange = (updates) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    updateLogo(logoType, newConfig);
  };

  const handleToggle = () => {
    handleConfigChange({ enabled: !config.enabled });
  };

  const handleRemoveLogo = () => {
    handleConfigChange({ enabled: false, url: null });
  };

  const processFile = (file) => {
    const MAX = 5 * 1024 * 1024;
    const allowed = ['image/png', 'image/svg+xml', 'image/jpeg', 'image/webp'];

    if (!allowed.includes(file.type)) {
      setUploadError('Formato no válido. Usa PNG, SVG, JPG o WEBP.');
      return;
    }
    if (file.size > MAX) {
      setUploadError('Archivo muy grande. Máximo 5MB.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      handleConfigChange({ enabled: true, url: e.target.result });
      setIsUploading(false);
    };
    reader.onerror = () => {
      setUploadError('Error al leer el archivo.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
    e.target.value = '';
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

          {/* Uploader inline */}
          <label className="btn-upload-inline" style={{ display: 'block', textAlign: 'center', marginBottom: '12px' }}>
            {isUploading ? 'Cargando...' : config.url ? 'Cambiar Logo' : 'Subir Logo'}
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/svg+xml,image/jpeg,image/webp"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
          </label>

          {uploadError && <div className="upload-error">⚠️ {uploadError}</div>}

          {/* Preview */}
          {config.url && (
            <div className="logo-preview">
              <img src={config.url} alt="Logo preview" />
              <button className="btn-remove" onClick={handleRemoveLogo}>
                Quitar Logo
              </button>
            </div>
          )}

          {/* Controles */}
          {config.url && (
            <div className="logo-controls">
              <div className="control-group">
                <label>Tamaño: {config.size}px</label>
                <input
                  type="range" min="50" max="300" value={config.size}
                  onChange={(e) => handleConfigChange({ size: parseInt(e.target.value) })}
                />
              </div>
              <div className="control-group">
                <label>Desplazamiento Horizontal: {config.offsetX}px</label>
                <input
                  type="range" min="0" max="200" value={config.offsetX}
                  onChange={(e) => handleConfigChange({ offsetX: parseInt(e.target.value) })}
                />
              </div>
              <div className="control-group">
                <label>Desplazamiento Vertical: {config.offsetY}px</label>
                <input
                  type="range" min="0" max="200" value={config.offsetY}
                  onChange={(e) => handleConfigChange({ offsetY: parseInt(e.target.value) })}
                />
              </div>
              {logoType === 'watermark' && (
                <div className="control-group">
                  <label>Opacidad: {Math.round(config.opacity * 100)}%</label>
                  <input
                    type="range" min="0" max="100" value={config.opacity * 100}
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
