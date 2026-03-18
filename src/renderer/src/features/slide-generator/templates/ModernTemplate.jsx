/**
 * TEMPLATE: Modern
 * 
 * Diseño moderno con tabla clara, basado en la imagen de referencia.
 * Características:
 * - Tabla 2x3 con bordes blancos
 * - Logos en las esquinas
 * - Hashtag superior
 * - Fondo de imagen con overlay
 */

import React from 'react';
import { DEFAULT_RESOLUTION } from '../../../core/config/constants';

export const ModernTemplate = ({ 
  data, 
  total, 
  theme,
  resolution = DEFAULT_RESOLUTION 
}) => {
  const {
    slideBackground,
    slideText,
    slideBorder,
    slideOverlay,
    hashtagColor
  } = theme.colors;

  const {
    slideInternalPadding,
    gridCellPadding,
    headerMarginBottom,
    gridWidth
  } = theme.spacing;

  const {
    textShadow,
    borderWidth,
    gridBorderBottom,
    gridBorderRight,
    titleLetterSpacing,
    totalMarginLeft
  } = theme.effects;

  // Estilos del contenedor
  const slideStyles = {
    width: `${resolution.width}px`,
    height: `${resolution.height}px`,
    backgroundColor: slideBackground,
    color: slideText,
    backgroundImage: theme.backgroundImage ? `url(${theme.backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: slideInternalPadding,
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  };

  const mainLogoStyles = theme.logos.main.enabled ? {
    position: 'absolute',
    top: `${theme.logos.main.offsetY}px`,
    left: `${theme.logos.main.offsetX}px`,
    width: `${theme.logos.main.size}px`,
    height: 'auto',
    zIndex: 3,
    objectFit: 'contain'
  } : null;

  const secondaryLogoStyles = theme.logos.secondary.enabled ? {
    position: 'absolute',
    top: `${theme.logos.secondary.offsetY}px`,
    right: `${theme.logos.secondary.offsetX}px`,
    width: `${theme.logos.secondary.size}px`,
    height: 'auto',
    zIndex: 3,
    objectFit: 'contain'
  } : null;

  const watermarkStyles = theme.logos.watermark.enabled ? {
    position: 'absolute',
    bottom: `${theme.logos.watermark.offsetY}px`,
    right: `${theme.logos.watermark.offsetX}px`,
    width: `${theme.logos.watermark.size}px`,
    height: 'auto',
    zIndex: 3,
    opacity: theme.logos.watermark.opacity,
    objectFit: 'contain'
  } : null;

  const hashtagStyles = theme.hashtag.enabled ? {
    position: 'absolute',
    top: '20px',
    [theme.hashtag.position === 'top-left' ? 'left' : 
     theme.hashtag.position === 'top-right' ? 'right' : 'left']: 
     theme.hashtag.position === 'top-center' ? '50%' : '180px',
    transform: theme.hashtag.position === 'top-center' ? 'translateX(-50%)' : 'none',
    fontSize: theme.sizes.hashtag,
    fontFamily: theme.fonts.hashtag,
    color: hashtagColor,
    zIndex: 3,
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
    fontWeight: 'normal',
    letterSpacing: '2px'
  } : null;

  const headerStyles = {
    fontSize: theme.sizes.title,
    fontWeight: 900,
    fontFamily: theme.fonts.primary,
    textTransform: 'uppercase',
    letterSpacing: titleLetterSpacing,
    marginBottom: headerMarginBottom,
    textShadow: textShadow,
    color: slideText,
    zIndex: 2
  };

  const gridContainerStyles = {
    width: gridWidth,
    border: `${borderWidth} solid ${slideBorder}`,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 2
  };

  const gridItemStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: gridCellPadding,
    borderBottom: `${gridBorderBottom} ${slideBorder}`,
    fontSize: theme.sizes.label,
    fontWeight: 'bold',
    fontFamily: theme.fonts.primary
  };

  const labelStyles = {
    textTransform: 'uppercase',
    letterSpacing: '2px'
  };

  const numberStyles = {
    fontFamily: theme.fonts.secondary,
    fontSize: theme.sizes.number,
    fontWeight: 'bold'
  };

  const totalStyles = {
    marginTop: '40px',
    alignSelf: 'flex-start',
    fontSize: theme.sizes.total,
    fontWeight: 'bold',
    fontFamily: theme.fonts.primary,
    marginLeft: totalMarginLeft,
    textTransform: 'uppercase',
    letterSpacing: '4px',
    textShadow: textShadow,
    zIndex: 2
  };

  return (
    <div style={slideStyles}>
      {overlayStyles && <div style={overlayStyles} />}

      {theme.logos.main.enabled && theme.logos.main.url && (
        <img src={theme.logos.main.url} alt="Logo principal" style={mainLogoStyles} />
      )}

      {theme.logos.secondary.enabled && theme.logos.secondary.url && (
        <img src={theme.logos.secondary.url} alt="Logo secundario" style={secondaryLogoStyles} />
      )}

      {theme.hashtag.enabled && theme.hashtag.text && (
        <div style={hashtagStyles}>{theme.hashtag.text}</div>
      )}

      <div style={contentStyles}>
        <h1 style={headerStyles}>ASISTENCIA</h1>

        <div style={gridContainerStyles}>
          {data.map((item, index) => (
            <div 
              key={item.key}
              style={{
                ...gridItemStyles,
                borderBottom: index >= data.length - 2 ? 'none' : gridItemStyles.borderBottom,
                borderRight: index % 2 === 0 ? `${gridBorderRight} ${slideBorder}` : 'none'
              }}
            >
              <span style={labelStyles}>{item.label}</span>
              <span style={numberStyles}>{item.value}</span>
            </div>
          ))}
        </div>

        <div style={totalStyles}>
          TOTAL: {total}
        </div>
      </div>

      {theme.logos.watermark.enabled && theme.logos.watermark.url && (
        <img src={theme.logos.watermark.url} alt="Marca de agua" style={watermarkStyles} />
      )}
    </div>
  );
};

// Metadatos del template
ModernTemplate.metadata = {
  id: 'modern',
  name: 'Moderno',
  description: 'Diseño moderno con tabla clara y bordes definidos',
  category: 'professional',
  thumbnail: '/templates/modern-thumb.png'
};
