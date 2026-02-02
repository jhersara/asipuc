/**
 * COMPONENTE: SlideTemplate
 * 
 * Template profesional del slide basado en el diseño de referencia.
 * Características:
 * - Resolución exacta 1920x1080px (sin bordes negros)
 * - Soporte para logos múltiples
 * - Hashtag configurable
 * - Imagen de fondo que cubre toda el área
 * - Overlay para mejor legibilidad
 */

import React from 'react';
import { DEFAULT_RESOLUTION } from '../../../core/config/constants';

export const SlideTemplate = ({ 
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
    gridWidth,
    hashtagMarginBottom
  } = theme.spacing;

  const {
    textShadow,
    borderWidth,
    gridBorderBottom,
    gridBorderRight,
    titleLetterSpacing,
    totalMarginLeft
  } = theme.effects;

  // Estilos del contenedor principal - Tamaño EXACTO sin bordes
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

  // Overlay oscuro para mejor legibilidad del texto
  const overlayStyles = theme.backgroundImage ? {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: slideOverlay,
    zIndex: 1
  } : null;

  // Contenedor del contenido (sobre el overlay)
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

  // Logo principal (esquina superior izquierda)
  const mainLogoStyles = theme.logos.main.enabled ? {
    position: 'absolute',
    top: `${theme.logos.main.offsetY}px`,
    left: `${theme.logos.main.offsetX}px`,
    width: `${theme.logos.main.size}px`,
    height: 'auto',
    zIndex: 3,
    objectFit: 'contain'
  } : null;

  // Logo secundario (esquina superior derecha)
  const secondaryLogoStyles = theme.logos.secondary.enabled ? {
    position: 'absolute',
    top: `${theme.logos.secondary.offsetY}px`,
    right: `${theme.logos.secondary.offsetX}px`,
    width: `${theme.logos.secondary.size}px`,
    height: 'auto',
    zIndex: 3,
    objectFit: 'contain'
  } : null;

  // Marca de agua (esquina inferior derecha)
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

  // Hashtag
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

  // Título principal
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

  // Contenedor de la tabla
  const gridContainerStyles = {
    width: gridWidth,
    border: `${borderWidth} solid ${slideBorder}`,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Fondo semi-transparente
    zIndex: 2
  };

  // Celda de la tabla
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

  // Total
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
      {/* Overlay oscuro */}
      {overlayStyles && <div style={overlayStyles} />}

      {/* Logo principal */}
      {theme.logos.main.enabled && theme.logos.main.url && (
        <img 
          src={theme.logos.main.url} 
          alt="Logo principal" 
          style={mainLogoStyles}
        />
      )}

      {/* Logo secundario */}
      {theme.logos.secondary.enabled && theme.logos.secondary.url && (
        <img 
          src={theme.logos.secondary.url} 
          alt="Logo secundario" 
          style={secondaryLogoStyles}
        />
      )}

      {/* Hashtag */}
      {theme.hashtag.enabled && theme.hashtag.text && (
        <div style={hashtagStyles}>
          {theme.hashtag.text}
        </div>
      )}

      {/* Contenido principal */}
      <div style={contentStyles}>
        {/* Título */}
        <h1 style={headerStyles}>ASISTENCIA</h1>

        {/* Tabla de asistencia */}
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

        {/* Total */}
        <div style={totalStyles}>
          TOTAL: {total}
        </div>
      </div>

      {/* Marca de agua */}
      {theme.logos.watermark.enabled && theme.logos.watermark.url && (
        <img 
          src={theme.logos.watermark.url} 
          alt="Marca de agua" 
          style={watermarkStyles}
        />
      )}
    </div>
  );
};
