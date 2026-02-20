import React, { useState, useEffect, useRef } from 'react';
import { useResources } from '../hooks/useResources';
import { useTheme } from '../../../core/hooks/useTheme';
import { fileManagerService } from '../services/fileManagerService';
import { FiCheck } from 'react-icons/fi';

export const BackgroundSelector = () => {
  const { getAllBackgrounds, isLoading } = useResources();
  const { updateBackgroundImage, theme } = useTheme();

  const [selectedBackground, setSelectedBackground] = useState(theme.backgroundImage);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadWarning, setUploadWarning] = useState(null);
  const inputRef = useRef(null);

  const backgrounds = getAllBackgrounds();

  const handleSelectBackground = (url) => {
    setSelectedBackground(url);
    updateBackgroundImage(url);
  };

  const handleClearBackground = () => {
    setSelectedBackground(null);
    updateBackgroundImage(null);
  };

  const processFile = async (file) => {
    setIsUploading(true);
    setUploadError(null);
    setUploadWarning(null);

    const result = await fileManagerService.loadBackgroundImage(file);

    if (!result.success) {
      setUploadError(result.errors.join(', '));
      setIsUploading(false);
      return;
    }

    if (result.warnings?.length > 0) {
      setUploadWarning(result.warnings[0]);
    }

    handleSelectBackground(result.data.url);
    setIsUploading(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  return (
    <div className="background-selector">
      <h3 className="section-title">Imagen de Fondo</h3>

      {/* Zona de carga */}
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="upload-placeholder"><p>Cargando imagen...</p></div>
        ) : (
          <div className="upload-placeholder">
            <p>Arrastra una imagen aquí</p>
            <span>o</span>
            <label className="btn-upload-inline">
              Seleccionar archivo
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
            </label>
            <span style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>
              JPG, PNG, WEBP — Recomendado 1920×1080
            </span>
          </div>
        )}
      </div>

      {uploadError && <div className="upload-error"> {uploadError}</div>}
      {uploadWarning && !uploadError && <div className="upload-warning"> {uploadWarning}</div>}

      {/* Galería */}
      <div className="backgrounds-gallery">
        <h4 className="gallery-title">Fondos Disponibles</h4>

        {isLoading ? (
          <div className="loading">Cargando fondos...</div>
        ) : backgrounds.length === 0 ? (
          <div className="empty-state">
            <p>No hay fondos disponibles.</p>
            <p className="hint">Sube uno o coloca imágenes en:</p>
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
                  <div className="selected-badge"> <FiCheck className='icon'/> </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBackground && (
        <>
          <button className="btn-clear" onClick={handleClearBackground}>
            Quitar Fondo
          </button>
          <div className="current-background-preview">
            <h4>Fondo Actual:</h4>
            <img src={selectedBackground} alt="Fondo actual" />
          </div>
        </>
      )}
    </div>
  );
};
