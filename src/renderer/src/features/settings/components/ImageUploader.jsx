/**
 * COMPONENTE: ImageUploader
 * 
 * Componente de carga de imágenes con drag & drop.
 * Soporta preview y validación.
 */

import React, { useState, useRef } from 'react';

export const ImageUploader = ({ 
  onUpload, 
  accept = 'image/*',
  maxSize = 10 * 1024 * 1024, // 10MB por defecto
  label = 'Subir Imagen',
  preview = true
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  /**
   * Validar archivo
   */
  const validateFile = (file) => {
    const errors = [];

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      errors.push('Solo se permiten imágenes');
    }

    // Validar tamaño
    if (file.size > maxSize) {
      errors.push(`Tamaño máximo: ${maxSize / 1024 / 1024}MB`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  };

  /**
   * Manejar selección de archivo
   */
  const handleFileSelect = async (file) => {
    setError(null);

    // Validar
    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.errors.join(', '));
      return;
    }

    // Preview
    if (preview) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    // Subir
    if (onUpload) {
      setIsUploading(true);
      try {
        await onUpload(file);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsUploading(false);
      }
    }
  };

  /**
   * Manejar drop
   */
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  /**
   * Manejar drag over
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  /**
   * Manejar drag leave
   */
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  /**
   * Manejar click en input
   */
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Manejar cambio de input
   */
  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="image-uploader">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />

      <div
        className={`upload-area ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {previewUrl ? (
          <div className="preview-container">
            <img src={previewUrl} alt="Preview" className="preview-image" />
            <div className="preview-overlay">
              <span>Click para cambiar</span>
            </div>
          </div>
        ) : (
          <div className="upload-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p>{isUploading ? 'Subiendo...' : label}</p>
            <span>Arrastra una imagen o haz click</span>
          </div>
        )}
      </div>

      {error && (
        <div className="upload-error">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};
