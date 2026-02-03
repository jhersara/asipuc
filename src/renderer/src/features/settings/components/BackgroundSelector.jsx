/**
 * COMPONENTE: BackgroundSelector
 * 
 * Selector de imágenes de fondo con galería y uploader.
 */

import React, { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { useResources } from '../hooks/useResources';
import { useTheme } from '../../../core/hooks/useTheme';

export const BackgroundSelector = () => {
  const { getAllBackgrounds, uploadFile, isLoading } = useResources();
  const { updateBackgroundImage, theme } = useTheme();
  const [selectedBackground, setSelectedBackground] = useState(theme.backgroundImage);

  const backgrounds = getAllBackgrounds();

  /**
   * Seleccionar fondo
   */
  const handleSelectBackground = (backgroundUrl) => {
    setSelectedBackground(backgroundUrl);
    updateBackgroundImage(backgroundUrl);
  };

  /**
   * Subir nuevo fondo
   */
  const handleUploadBackground = async (file) => {
    const result = await uploadFile(file, 'background');
    if (result.success) {
      handleSelectBackground(result.resource.url);
    }
  };

  /**
   * Limpiar fondo
   */
  const handleClearBackground = () => {
    setSelectedBackground(null);
    updateBackgroundImage(null);
  };

  return (
    <div className="background-selector">
      <h3 className="section-title">Imagen de Fondo</h3>

      {/* Uploader */}
      <div className="upload-section">
        <ImageUploader
          onUpload={handleUploadBackground}
          label="Subir Fondo Personalizado"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          maxSize={10 * 1024 * 1024}
        />
      </div>

      {/* Galería de fondos */}
      <div className="backgrounds-gallery">
        <h4 className="gallery-title">Fondos Disponibles</h4>
        
        {isLoading ? (
          <div className="loading">Cargando fondos...</div>
        ) : backgrounds.length === 0 ? (
          <div className="empty-state">
            <p>No hay fondos disponibles.</p>
            <p className="hint">Sube uno usando el botón de arriba o coloca imágenes en:</p>
            <code>resources/assets/backgrounds/</code>
          </div>
        ) : (
          <div className="backgrounds-grid">
            {backgrounds.map((bg, index) => (
              <div
                key={index}
                className={`background-item ${selectedBackground === bg.url ? 'selected' : ''}`}
                onClick={() => handleSelectBackground(bg.url)}
              >
                <img src={bg.url} alt={bg.name} />
                <div className="background-name">{bg.name}</div>
                {selectedBackground === bg.url && (
                  <div className="selected-badge">✓</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botón para limpiar */}
      {selectedBackground && (
        <button className="btn-clear" onClick={handleClearBackground}>
          Quitar Fondo
        </button>
      )}

      {/* Preview del fondo seleccionado */}
      {selectedBackground && (
        <div className="current-background-preview">
          <h4>Fondo Actual:</h4>
          <img src={selectedBackground} alt="Fondo actual" />
        </div>
      )}
    </div>
  );
};
