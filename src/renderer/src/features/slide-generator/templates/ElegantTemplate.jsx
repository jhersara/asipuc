/**
 * TEMPLATE: Elegant
 * 
 * Diseño elegante con toques dorados.
 * Características:
 * - Decoraciones elegantes
 * - Bordes ornamentales
 * - Acentos dorados
 * - Tipografía refinada
 */

import React from 'react';
import { DEFAULT_RESOLUTION } from '../../../core/config/constants';

export const ElegantTemplate = ({ 
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

  const accentColor = '#d4af37'; // Oro

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
    overflow: 'hidden'
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
    maxWidth: '1100px',
    border: `3px solid ${accentColor}`,
    borderRadius: '20px',
    padding: '60px',
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    boxShadow: `0 0 50px rgba(212, 175, 55, 0.3)`
  };

  const ornamentTopStyles = {
    width: '150px',
    height: '3px',
    background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
    margin: '0 auto 30px'
  };

  const headerStyles = {
    fontSize: '110px',
    fontWeight: 'bold',
    fontFamily: 'Didot, Georgia, serif',
    textTransform: 'uppercase',
    letterSpacing: '15px',
    marginBottom: '50px',
    textAlign: 'center',
    color: accentColor,
    textShadow: `0 0 30px ${accentColor}, 2px 2px 4px rgba(0,0,0,0.8)`
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    marginBottom: '50px'
  };

  const itemStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 30px',
    borderBottom: `2px solid ${accentColor}`,
    fontSize: '48px'
  };

  const labelStyles = {
    fontFamily: 'Didot, Georgia, serif',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    fontWeight: 'normal'
  };

  const numberStyles = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '56px',
    fontWeight: 'bold',
    color: accentColor
  };

  const ornamentBottomStyles = {
    width: '150px',
    height: '3px',
    background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
    margin: '30px auto'
  };

  const totalStyles = {
    textAlign: 'center',
    fontSize: '90px',
    fontWeight: 'bold',
    fontFamily: 'Didot, Georgia, serif',
    textTransform: 'uppercase',
    letterSpacing: '10px',
    color: accentColor,
    textShadow: `0 0 30px ${accentColor}, 2px 2px 4px rgba(0,0,0,0.8)`,
    padding: '20px',
    border: `3px solid ${accentColor}`,
    borderRadius: '10px',
    background: 'rgba(0, 0, 0, 0.3)'
  };

  const logoStyles = theme.logos.main.enabled ? {
    position: 'absolute',
    top: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: `${theme.logos.main.size}px`,
    height: 'auto',
    zIndex: 3,
    objectFit: 'contain',
    filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.5))'
  } : null;

  return (
    <div style={slideStyles}>
      {overlayStyles && <div style={overlayStyles} />}

      {theme.logos.main.enabled && theme.logos.main.url && (
        <img src={theme.logos.main.url} alt="Logo" style={logoStyles} />
      )}

      <div style={contentStyles}>
        <div style={ornamentTopStyles} />
        
        <h1 style={headerStyles}>Asistencia</h1>

        <div style={gridStyles}>
          {data.map((item) => (
            <div key={item.key} style={itemStyles}>
              <span style={labelStyles}>{item.label}</span>
              <span style={numberStyles}>{item.value}</span>
            </div>
          ))}
        </div>

        <div style={ornamentBottomStyles} />

        <div style={totalStyles}>
          Total: {total}
        </div>
      </div>
    </div>
  );
};

// Metadatos del template
ElegantTemplate.metadata = {
  id: 'elegant',
  name: 'Elegante',
  description: 'Diseño sofisticado con acentos dorados',
  category: 'luxury',
  thumbnail: '/templates/elegant-thumb.png'
};
