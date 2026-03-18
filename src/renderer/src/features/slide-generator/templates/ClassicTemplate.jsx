/**
 * TEMPLATE: Classic
 * 
 * Diseño clásico estilo iglesia tradicional.
 * Características:
 * - Lista vertical simple
 * - Tipografía serif elegante
 * - Sin bordes, más minimalista
 * - Total destacado al final
 */

import React from 'react';
import { DEFAULT_RESOLUTION } from '../../../core/config/constants';

export const ClassicTemplate = ({ 
  data, 
  total, 
  theme,
  resolution = DEFAULT_RESOLUTION 
}) => {
  const {
    slideBackground,
    slideText,
    slideOverlay,
    hashtagColor
  } = theme.colors;

  const slideStyles = {
    width: `${resolution.width}px`,
    height: `${resolution.height}px`,
    backgroundColor: slideBackground,
    color: slideText,
    backgroundImage: theme.backgroundImage ? `url(${theme.backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    fontFamily: 'Georgia, serif'
  };

  const overlayStyles = theme.backgroundImage ? {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: slideOverlay,
    zIndex: 1
  } : null;

  const contentStyles = {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '900px',
    textAlign: 'center'
  };

  const headerStyles = {
    fontSize: '110px',
    fontWeight: 'normal',
    fontFamily: 'Georgia, serif',
    textTransform: 'uppercase',
    letterSpacing: '12px',
    marginBottom: '80px',
    textShadow: '3px 3px 8px rgba(0, 0, 0, 0.7)',
    borderBottom: `4px solid ${slideText}`,
    paddingBottom: '20px'
  };

  const listContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    marginBottom: '60px'
  };

  const listItemStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
    fontSize: '52px',
    fontFamily: 'Georgia, serif',
    borderBottom: `2px solid rgba(255, 255, 255, 0.3)`
  };

  const labelStyles = {
    textTransform: 'capitalize',
    fontWeight: 'normal',
    letterSpacing: '3px'
  };

  const numberStyles = {
    fontWeight: 'bold',
    fontSize: '62px',
    fontFamily: 'Arial, sans-serif'
  };

  const totalContainerStyles = {
    marginTop: '40px',
    padding: '30px',
    borderTop: `5px solid ${slideText}`,
    borderBottom: `5px solid ${slideText}`
  };

  const totalStyles = {
    fontSize: '100px',
    fontWeight: 'bold',
    fontFamily: 'Georgia, serif',
    textTransform: 'uppercase',
    letterSpacing: '8px',
    textShadow: '4px 4px 10px rgba(0, 0, 0, 0.8)'
  };

  const logoStyles = theme.logos.main.enabled ? {
    position: 'absolute',
    top: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: `${theme.logos.main.size}px`,
    height: 'auto',
    zIndex: 3,
    objectFit: 'contain'
  } : null;

  const hashtagStyles = theme.hashtag.enabled ? {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '32px',
    fontFamily: 'Georgia, serif',
    color: hashtagColor,
    zIndex: 3,
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
    letterSpacing: '4px',
    fontStyle: 'italic'
  } : null;

  return (
    <div style={slideStyles}>
      {overlayStyles && <div style={overlayStyles} />}

      {theme.logos.main.enabled && theme.logos.main.url && (
        <img src={theme.logos.main.url} alt="Logo" style={logoStyles} />
      )}

      {theme.hashtag.enabled && theme.hashtag.text && (
        <div style={hashtagStyles}>{theme.hashtag.text}</div>
      )}

      <div style={contentStyles}>
        <h1 style={headerStyles}>Asistencia</h1>

        <div style={listContainerStyles}>
          {data.map((item) => (
            <div key={item.key} style={listItemStyles}>
              <span style={labelStyles}>{item.label}</span>
              <span style={numberStyles}>{item.value}</span>
            </div>
          ))}
        </div>

        <div style={totalContainerStyles}>
          <div style={totalStyles}>
            Total: {total}
          </div>
        </div>
      </div>
    </div>
  );
};

// Metadatos del template
ClassicTemplate.metadata = {
  id: 'classic',
  name: 'Clásico',
  description: 'Diseño tradicional elegante con lista vertical',
  category: 'traditional',
  thumbnail: '/templates/classic-thumb.png'
};
