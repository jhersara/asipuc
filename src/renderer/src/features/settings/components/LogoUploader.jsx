/**
 * COMPONENTE: LogoUploader
 * 
 * Componente para subir logos
 */

import React, { useState } from 'react';
import { fileManagerService } from '../services/fileManagerService';

export const LogoUploader = ({ 
  currentLogo, 
  onUpload,
  onRemove 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(currentLogo);

  const handleFile = async (file) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fileManagerService.loadLogo(file);

      if (result.success) {
        setPreview(result.data.url);
        onUpload(result.data.url);
      } else {
        setError(result.errors.join(', '));
      }
    } catch (err) {
      setError('Error al cargar el logo');
      console.error(err);
    } finally {
      setIsLoading(false);
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
    <div className="logo-uploader">
      <label className="uploader-label">Logo</label>
      <p className="uploader-info">Formato: PNG con transparencia</p>

      <div className="logo-container">
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
          </div>
        ) : preview ? (
          <div className="logo-preview-wrapper">
            <img src={preview} alt="Logo" className="logo-preview" />
            <button onClick={handleRemove} className="btn-remove-small">×</button>
          </div>
        ) : (
          <label className="logo-upload-btn">
            <div className="upload-placeholder">+</div>
            <input
              type="file"
              accept="image/png,image/svg+xml"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
          </label>
        )}
      </div>

      {error && <div className="upload-error-small">{error}</div>}
    </div>
  );
};
