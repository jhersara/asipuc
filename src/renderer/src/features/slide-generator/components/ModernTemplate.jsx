/**
 * TEMPLATE MODERNO - Basado en el diseño de ejemplo
 * 
 * Características:
 * - Grid 2x3 con bordes blancos
 * - Soporte para 2 logos (izquierda y derecha)
 * - Hashtag opcional
 * - Fondo de imagen o color sólido
 * - Resolución exacta 1920x1080px sin bordes negros
 */

import React from 'react';
import { DEFAULT_RESOLUTION } from '../../../core/config/constants';

export const ModernTemplate = ({ 
  data, 
  total, 
  theme,
  resolution = DEFAULT_RESOLUTION,
  logoLeft = null,
  logoRight = null,
  hashtag = null,
  backgroundImage = null
}) => {
  const {
    slideBackground,
    slideText,
    slideBorder,
    slideAccent
  } = theme.colors;

  const {
    slideInternalPadding,
    gridCellPadding,
    headerMarginBottom,
    gridWidth,
    logoMargin
  } = theme.spacing;

  const {
    textShadow,
    borderWidth,
    gridBorderBottom,
    gridBorderRight
  } = theme.effects;

  // Estilos del contenedor principal (exactamente 1920x1080)
  const containerStyles = {
    width: `${resolution.width}px`,
    height: `${resolution.height}px`,
    backgroundColor: slideBackground,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: slideInternalPadding,
    boxSizing: 'border-box',
    overflow: 'hidden',
    color: slideText
  };

  // Overlay oscuro si hay imagen de fondo
  const overlayStyles = backgroundImage ? {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.slideOverlay,
    zIndex: 1
  } : null;

  // Contenedor del contenido (sobre el overlay)
  const contentWrapperStyles = {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  // Sección superior con logos y hashtag
  const headerSectionStyles = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px'
  };

  const logoStyles = {
    width: '140px',
    height: '140px',
    objectFit: 'contain'
  };

  const hashtagStyles = {
    position: 'absolute',
    top: logoMargin,
    right: logoMargin,
    fontSize: '32px',
    fontFamily: theme.fonts.primary,
    color: slideText,
    textShadow: textShadow,
    letterSpacing: '2px'
  };

  // Título principal
  const titleStyles = {
    fontSize: theme.sizes.title,
    fontWeight: 900,
    fontFamily: theme.fonts.primary,
    textTransform: 'uppercase',
    letterSpacing: '8px',
    marginBottom: headerMarginBottom,
    textShadow: textShadow,
    color: slideText,
    textAlign: 'center'
  };

  // Contenedor del grid
  const gridContainerStyles = {
    width: gridWidth,
    border: `${borderWidth} solid ${slideBorder}`,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'repeat(3, 1fr)',
    marginBottom: '40px'
  };

  // Estilos de cada celda del grid
  const gridItemStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: gridCellPadding,
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

  // Estilo del total
  const totalStyles = {
    fontSize: theme.sizes.total,
    fontWeight: 'bold',
    fontFamily: theme.fonts.primary,
    textTransform: 'uppercase',
    letterSpacing: '4px',
    textShadow: textShadow,
    alignSelf: 'flex-start',
    marginLeft: '7.5%'
  };

  // Determinar bordes de celdas
  const getCellStyles = (index) => {
    const isLastRow = index >= data.length - 2;
    const isLeftColumn = index % 2 === 0;

    return {
      ...gridItemStyles,
      borderBottom: isLastRow ? 'none' : `${gridBorderBottom} ${slideBorder}`,
      borderRight: isLeftColumn ? `${gridBorderRight} ${slideBorder}` : 'none'
    };
  };

  return (
    <div style={containerStyles}>
      {/* Overlay si hay imagen de fondo */}
      {overlayStyles && <div style={overlayStyles} />}

      {/* Contenido principal */}
      <div style={contentWrapperStyles}>
        {/* Header con logos */}
        <div style={headerSectionStyles}>
          {/* Logo izquierdo */}
          {logoLeft && (
            <img 
              src={logoLeft} 
              alt="Logo izquierdo" 
              style={logoStyles}
            />
          )}

          <div style={{ flex: 1 }} />

          {/* Logo derecho */}
          {logoRight && (
            <img 
              src={logoRight} 
              alt="Logo derecho" 
              style={logoStyles}
            />
          )}
        </div>

        {/* Hashtag opcional (solo si no hay logo derecho) */}
        {hashtag && !logoRight && (
          <div style={hashtagStyles}>{hashtag}</div>
        )}

        {/* Título */}
        <h1 style={titleStyles}>ASISTENCIA</h1>

        {/* Grid de categorías */}
        <div style={gridContainerStyles}>
          {data.map((item, index) => (
            <div 
              key={item.key}
              style={getCellStyles(index)}
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
    </div>
  );
};
