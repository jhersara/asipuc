/**
 * COMPONENTE: BackgroundGallery
 * 
 * Galería de imágenes de fondo predefinidas y personalizadas.
 * Permite seleccionar, cargar y eliminar fondos.
 */

import React, { useRef } from 'react';
import { useBackgroundImage } from '../../../core/hooks/useBackgroundImage';
import { useTheme } from '../../../core/hooks/useTheme';
import './BackgroundGallery.css';

export const BackgroundGallery = ({ onClose }) => {
  const fileInputRef = useRef(null);
  const {
    activeBackground,
    customBackgrounds,
    defaultBackgrounds,
    isLoading,
    error,
    loadImageFromFile,
    selectBackground,
    deleteCustomBackground,
    clearBackground,
    clearError
  } = useBackgroundImage();

  const { updateBackgroundImage, clearBackgroundImage } = useTheme();

  /**
   * Manejar selección de archivo
   */
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const result = await loadImageFromFile(file);
    
    if (result.success) {
      // Validación de resolución
      if (result.validation && !result.validation.isValid) {
        const confirmUse = window.confirm(
          `${result.validation.message}\n\n${result.validation.recommendation}\n\n¿Desea usar esta imagen de todas formas?`
        );
        
        if (!confirmUse) {
          deleteCustomBackground(result.imageData.id);
          return;
        }
      }
      
      // Seleccionar la imagen recién cargada
      handleSelectBackground(result.imageData.dataUrl);
      alert('¡Imagen cargada correctamente!');
    } else {
      alert('Error al cargar imagen: ' + result.error);
    }

    // Limpiar input
    event.target.value = '';
  };

  /**
   * Manejar clic en botón de cargar
   */
  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Seleccionar fondo
   */
  const handleSelectBackground = (imageUrl) => {
    selectBackground(imageUrl);
    updateBackgroundImage(imageUrl);
  };

  /**
   * Eliminar fondo personalizado
   */
  const handleDeleteCustom = (imageId, imageUrl) => {
    const confirmDelete = window.confirm('¿Está seguro de eliminar esta imagen?');
    
    if (confirmDelete) {
      const success = deleteCustomBackground(imageId);
      if (success && imageUrl === activeBackground) {
        clearBackgroundImage();
      }
    }
  };

  /**
   * Limpiar fondo (sin imagen)
   */
  const handleClearBackground = () => {
    clearBackground();
    clearBackgroundImage();
  };

  return (
    <div className="background-gallery-overlay">
      <div className="background-gallery-modal">
        {/* Header */}
        <div className="gallery-header">
          <h2>Galería de Fondos</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Error message */}
        {error && (
          <div className="gallery-error">
            {error}
            <button onClick={clearError}>×</button>
          </div>
        )}

        {/* Actions */}
        <div className="gallery-actions">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          
          <button 
            className="btn-load-image" 
            onClick={handleLoadClick}
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : '📁 Cargar Imagen'}
          </button>

          <button 
            className="btn-clear-background" 
            onClick={handleClearBackground}
            disabled={!activeBackground}
          >
            🚫 Sin Fondo
          </button>
        </div>

        {/* Default Backgrounds */}
        <div className="gallery-section">
          <h3>Fondos Predefinidos</h3>
          <div className="gallery-grid">
            {defaultBackgrounds.map(bg => (
              <div
                key={bg.id}
                className={`gallery-item ${activeBackground === bg.fullImage ? 'active' : ''}`}
                onClick={() => handleSelectBackground(bg.fullImage)}
              >
                <div className="gallery-item-preview">
                  {/* Por ahora mostramos un placeholder con color */}
                  <div 
                    className="preview-placeholder"
                    style={{ 
                      background: bg.category === 'religious' ? '#4a4a6a' :
                                 bg.category === 'nature' ? '#2a4a3a' : '#3a3a3a'
                    }}
                  >
                    <span className="placeholder-icon">🖼️</span>
                  </div>
                </div>
                <div className="gallery-item-name">{bg.name}</div>
                {activeBackground === bg.fullImage && (
                  <div className="active-indicator">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Custom Backgrounds */}
        {customBackgrounds.length > 0 && (
          <div className="gallery-section">
            <h3>Mis Imágenes</h3>
            <div className="gallery-grid">
              {customBackgrounds.map(bg => (
                <div
                  key={bg.id}
                  className={`gallery-item ${activeBackground === bg.dataUrl ? 'active' : ''}`}
                >
                  <div 
                    className="gallery-item-preview"
                    onClick={() => handleSelectBackground(bg.dataUrl)}
                  >
                    <img src={bg.dataUrl} alt={bg.metadata?.name || 'Custom'} />
                  </div>
                  <div className="gallery-item-name">
                    {bg.metadata?.name || 'Sin nombre'}
                  </div>
                  <div className="gallery-item-info">
                    {bg.metadata?.width}x{bg.metadata?.height}
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCustom(bg.id, bg.dataUrl)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                  {activeBackground === bg.dataUrl && (
                    <div className="active-indicator">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="gallery-info">
          <p>💡 <strong>Consejo:</strong> Use imágenes de al menos 1920x1080 píxeles para mejor calidad.</p>
          <p>📁 Formatos soportados: JPG, PNG, WebP (máx. 5MB)</p>
        </div>
      </div>
    </div>
  );
};
