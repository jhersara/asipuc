/**
 * TEMPLATE: Minimal
 * 
 * Diseño minimalista ultra limpio.
 * Características:
 * - Mucho espacio en blanco
 * - Tipografía sans-serif
 * - Sin bordes ni decoraciones
 * - Énfasis en legibilidad
 */

import React from 'react';
import { DEFAULT_RESOLUTION } from '../../../core/config/constants';

export const MinimalTemplate = ({ 
  data, 
  total, 
  theme,
  resolution = DEFAULT_RESOLUTION 
}) => {
  const {
    slideBackground,
    slideText,
    slideOverlay
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
    padding: '100px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    fontFamily: 'Helvetica, Arial, sans-serif'
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
    maxWidth: '1000px'
  };

  const headerStyles = {
    fontSize: '140px',
    fontWeight: '100',
    fontFamily: 'Helvetica, Arial, sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '20px',
    marginBottom: '100px',
    textAlign: 'left',
    opacity: 0.95
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
    marginBottom: '80px'
  };

  const cardStyles = {
    textAlign: 'center',
    padding: '30px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    backdropFilter: 'blur(10px)'
  };

  const cardLabelStyles = {
    fontSize: '28px',
    fontWeight: '300',
    textTransform: 'uppercase',
    letterSpacing: '4px',
    marginBottom: '20px',
    opacity: 0.7
  };

  const cardNumberStyles = {
    fontSize: '90px',
    fontWeight: '100',
    fontFamily: 'Helvetica, Arial, sans-serif'
  };

  const totalContainerStyles = {
    textAlign: 'center',
    marginTop: '60px',
    padding: '40px',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '12px'
  };

  const totalLabelStyles = {
    fontSize: '36px',
    fontWeight: '300',
    textTransform: 'uppercase',
    letterSpacing: '8px',
    marginBottom: '15px',
    opacity: 0.7
  };

  const totalValueStyles = {
    fontSize: '140px',
    fontWeight: '100'
  };

  const logoStyles = theme.logos.main.enabled ? {
    position: 'absolute',
    top: '50px',
    right: '50px',
    width: `${theme.logos.main.size}px`,
    height: 'auto',
    zIndex: 3,
    objectFit: 'contain',
    opacity: 0.9
  } : null;

  return (
    <div style={slideStyles}>
      {overlayStyles && <div style={overlayStyles} />}

      {theme.logos.main.enabled && theme.logos.main.url && (
        <img src={theme.logos.main.url} alt="Logo" style={logoStyles} />
      )}

      <div style={contentStyles}>
        <h1 style={headerStyles}>Asistencia</h1>

        <div style={gridStyles}>
          {data.map((item) => (
            <div key={item.key} style={cardStyles}>
              <div style={cardLabelStyles}>{item.label}</div>
              <div style={cardNumberStyles}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={totalContainerStyles}>
          <div style={totalLabelStyles}>Total</div>
          <div style={totalValueStyles}>{total}</div>
        </div>
      </div>
    </div>
  );
};

// Metadatos del template
MinimalTemplate.metadata = {
  id: 'minimal',
  name: 'Minimalista',
  description: 'Diseño limpio y moderno con tarjetas',
  category: 'modern',
  thumbnail: '/templates/minimal-thumb.png'
};
