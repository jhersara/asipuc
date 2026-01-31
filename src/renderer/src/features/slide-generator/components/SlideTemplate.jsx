/**
 * COMPONENTE: SlideTemplate
 * 
 * Template del slide que se exporta como imagen.
 * Completamente desacoplado de la lógica de negocio.
 * Recibe tema y datos como props.
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
    slideHeaderShadow,
    slideOverlay
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
    gridBorderRight
  } = theme.effects;

  // Estilos dinámicos basados en el tema
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
    padding: slideInternalPadding,
    boxSizing: 'border-box'
  };

  const headerStyles = {
    fontSize: theme.sizes.title,
    fontWeight: 900,
    fontFamily: theme.fonts.primary,
    textTransform: 'uppercase',
    letterSpacing: '5px',
    marginBottom: headerMarginBottom,
    textShadow: textShadow,
    color: slideText
  };

  const gridContainerStyles = {
    width: gridWidth,
    border: `${borderWidth} ${slideBorder}`,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr'
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
    textTransform: 'uppercase'
  };

  const numberStyles = {
    fontFamily: theme.fonts.secondary,
    fontSize: theme.sizes.number
  };

  const totalStyles = {
    marginTop: 'auto',
    alignSelf: 'flex-start',
    fontSize: theme.sizes.total,
    fontWeight: 'bold',
    fontFamily: theme.fonts.primary,
    marginLeft: '5%',
    textTransform: 'uppercase'
  };

  // Si hay imagen de fondo, agregar overlay para mejor legibilidad
  const overlayStyles = theme.backgroundImage ? {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: slideOverlay,
    zIndex: 0
  } : null;

  const contentStyles = {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  };

  return (
    <div style={slideStyles}>
      {overlayStyles && <div style={overlayStyles} />}
      
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
    </div>
  );
};
