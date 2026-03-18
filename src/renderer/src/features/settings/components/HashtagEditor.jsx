/**
 * COMPONENTE: HashtagEditor
 * 
 * Editor de hashtag con preview en tiempo real.
 */

import React, { useState } from 'react';
import { useTheme } from '../../../core/hooks/useTheme';

export const HashtagEditor = () => {
  const { updateHashtag, theme } = useTheme();
  const [config, setConfig] = useState(theme.hashtag);

  /**
   * Actualizar configuración
   */
  const handleConfigChange = (updates) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    updateHashtag(newConfig);
  };

  /**
   * Toggle enabled
   */
  const handleToggle = () => {
    handleConfigChange({ enabled: !config.enabled });
  };

  return (
    <div className="hashtag-editor">
      <div className="hashtag-header">
        <h3>Hashtag</h3>
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
        <div className="hashtag-body">
          {/* Input de texto */}
          <div className="input-group">
            <label htmlFor="hashtag-text">Texto del Hashtag</label>
            <input
              id="hashtag-text"
              type="text"
              value={config.text}
              onChange={(e) => handleConfigChange({ text: e.target.value })}
              placeholder="#TuHashtag"
              maxLength={50}
            />
            <small>{config.text.length}/50 caracteres</small>
          </div>

          {/* Selector de posición */}
          <div className="input-group">
            <label>Posición</label>
            <div className="position-selector">
              <button
                className={`position-btn ${config.position === 'top-left' ? 'active' : ''}`}
                onClick={() => handleConfigChange({ position: 'top-left' })}
              >
                ↖ Superior Izquierda
              </button>
              <button
                className={`position-btn ${config.position === 'top-center' ? 'active' : ''}`}
                onClick={() => handleConfigChange({ position: 'top-center' })}
              >
                ↑ Superior Centro
              </button>
              <button
                className={`position-btn ${config.position === 'top-right' ? 'active' : ''}`}
                onClick={() => handleConfigChange({ position: 'top-right' })}
              >
                ↗ Superior Derecha
              </button>
            </div>
          </div>

          {/* Preview */}
          {config.text && (
            <div className="hashtag-preview">
              <h4>Vista Previa:</h4>
              <div className="preview-box" style={{
                textAlign: config.position === 'top-center' ? 'center' : 
                          config.position === 'top-right' ? 'right' : 'left'
              }}>
                <span className="hashtag-preview-text">{config.text}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
