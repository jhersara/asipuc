/**
 * COMPONENTE: BackgroundUploader
 * 
 * Componente para subir imágenes de fondo
 * Incluye validación, preview y opción de redimensionar
 */

import React, { useState } from 'react';
import { fileManagerService } from '../services/fileManagerService';

export const BackgroundUploader = ({ 
  currentBackground, 
  onUpload,
  onRemove 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const [preview, setPreview] = useState(currentBackground);

  const handleFile = async (file) => {
    setIsLoading(true);
    setError(null);

    try {
      const validation = await fileManagerService.validateBackgroundImage(file);
      
      if (!validation.isValid) {
        setError(validation.errors.join(', '));
        setIsLoading(false);
        return;
      }

      // Mostrar advertencia de resolución sin bloquear la carga
      if (validation.warnings && validation.warnings.length > 0) {
        setWarning(validation.warnings[0]);
      } else {
        setWarning(null);
      }

      const result = await fileManagerService.loadBackgroundImage(file);

      if (result.success) {
        setPreview(result.data.url);
        onUpload(result.data.url);
      } else {
        setError(result.errors.join(', '));
      }
    } catch (err) {
      setError('Error al cargar la imagen');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    onRemove();
  };

  return (
    <div className="background-uploader">
      <label className="uploader-label">Imagen de Fondo</label>
      <p className="uploader-info">Resolución: 1920x1080px | Formato: JPG, PNG</p>

      {/* Zona de drop */}
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''} ${preview ? 'has-preview' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Cargando imagen...</p>
          </div>
        ) : preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="background-preview" />
            <div className="preview-overlay">
              <button onClick={handleRemove} className="btn-remove">
                ✕ Eliminar
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="upload-icon">📁</div>
            <p>Arrastra una imagen aquí</p>
            <p className="or-text">o</p>
            <label className="btn-upload">
              Seleccionar archivo
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        )}
      </div>

      {/* Mensajes de error */}
      {error && (
        <div className="upload-error">
          ⚠️ {error}
        </div>
      )}

      {/* Advertencias (no bloquean la carga) */}
      {!error && warning && (
        <div className="upload-warning">
          ⚠️ {warning}
        </div>
      )}
    </div>
  );
};
