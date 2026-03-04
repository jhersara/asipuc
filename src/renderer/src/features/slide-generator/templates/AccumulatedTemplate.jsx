/**
 * TEMPLATE: AccumulatedTemplate
 *
 * Vista del total acumulado. Se adapta automaticamente al numero de servicios.
 * Muestra cada servicio con su nombre real y total, mas el gran total.
 * Se usa en todos los templates cuando el usuario activa "Total Acumulado".
 */

import React from 'react';
import { DEFAULT_RESOLUTION } from '../../../core/config/constants';

export const AccumulatedTemplate = ({
  services = [],   // [{ id, name, total }]
  grandTotal = 0,
  theme,
  resolution = DEFAULT_RESOLUTION
}) => {
  const { slideBackground, slideText, slideBorder, slideOverlay, hashtagColor } = theme.colors;
  const { textShadow } = theme.effects;

  // ---- Slide base ----
  const slideStyles = {
    width:              `${resolution.width}px`,
    height:             `${resolution.height}px`,
    backgroundColor:    slideBackground,
    color:              slideText,
    backgroundImage:    theme.backgroundImage ? `url(${theme.backgroundImage})` : 'none',
    backgroundSize:     'cover',
    backgroundPosition: 'center',
    backgroundRepeat:   'no-repeat',
    position:    'relative',
    display:     'flex',
    flexDirection: 'column',
    alignItems:  'center',
    justifyContent: 'center',
    boxSizing:   'border-box',
    overflow:    'hidden',
    fontFamily:  theme.fonts?.primary || 'sans-serif',
  };

  const overlayStyles = theme.backgroundImage ? {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: slideOverlay,
    zIndex: 1,
  } : null;

  // ---- Logos ----
  const mainLogoStyles = theme.logos?.main?.enabled ? {
    position: 'absolute',
    top:   `${theme.logos.main.offsetY}px`,
    left:  `${theme.logos.main.offsetX}px`,
    width: `${theme.logos.main.size}px`,
    height: 'auto', zIndex: 3, objectFit: 'contain',
  } : null;

  const secondaryLogoStyles = theme.logos?.secondary?.enabled ? {
    position: 'absolute',
    top:   `${theme.logos.secondary.offsetY}px`,
    right: `${theme.logos.secondary.offsetX}px`,
    width: `${theme.logos.secondary.size}px`,
    height: 'auto', zIndex: 3, objectFit: 'contain',
  } : null;

  const watermarkStyles = theme.logos?.watermark?.enabled ? {
    position: 'absolute',
    bottom: `${theme.logos.watermark.offsetY}px`,
    right:  `${theme.logos.watermark.offsetX}px`,
    width:  `${theme.logos.watermark.size}px`,
    height: 'auto', zIndex: 3,
    opacity:   theme.logos.watermark.opacity,
    objectFit: 'contain',
  } : null;

  // ---- Hashtag ----
  const hashtagStyles = theme.hashtag?.enabled && theme.hashtag?.text ? {
    position:  'absolute',
    top:       '28px',
    left:      '50%',
    transform: 'translateX(-50%)',
    fontSize:  theme.sizes?.hashtag || '36px',
    fontFamily: theme.fonts?.hashtag || theme.fonts?.primary,
    color:     hashtagColor || '#fff',
    zIndex:    3,
    textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
    whiteSpace: 'nowrap',
    letterSpacing: '2px',
  } : null;

  // ---- Contenido ----
  const contentStyles = {
    position:      'relative',
    zIndex:        2,
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'center',
    width:         '100%',
    gap:           '50px',
    padding:       '0 80px',
    boxSizing:     'border-box',
  };

  // Ajuste dinamico segun cantidad de servicios
  const count = services.length || 1;

  // Escala relativa segun cantidad — se aplica sobre el tamaño del tema
  const scaleLabel  = count <= 2 ? 1 : count === 3 ? 0.78 : 0.62;
  const scaleNumber = count <= 2 ? 1 : count === 3 ? 0.82 : 0.66;
  const scaleTotal  = count <= 2 ? 1 : count === 3 ? 0.82 : 0.68;
  const boxPadding  = count <= 2 ? '38px 50px' : count === 3 ? '28px 36px' : '20px 28px';

  // Parsear el px del tema y aplicar escala
  const parseSize = (sizeStr, fallback) => {
    const n = parseInt(sizeStr) || fallback;
    return n;
  };

  const titleSize  = parseSize(theme.sizes?.title,  120);
  const labelSize  = Math.round(parseSize(theme.sizes?.label,  48) * scaleLabel);
  const numberSize = Math.round(parseSize(theme.sizes?.number, 110) * scaleNumber);
  const totalSize  = Math.round(parseSize(theme.sizes?.total,  115) * scaleTotal);

  const titleStyles = {
    fontSize:      `${titleSize}px`,
    fontWeight:    900,
    fontFamily:    theme.fonts?.primary,
    textTransform: 'uppercase',
    letterSpacing: '8px',
    textShadow:    textShadow || '4px 4px 20px rgba(0,0,0,0.9)',
    color:         slideText,
    lineHeight:    1,
  };

  const getClipPath = (index, total) => {
    if (total === 1) return 'polygon(3% 0%, 97% 0%, 94% 100%, 6% 100%)';
    if (index === 0)         return 'polygon(0% 0%, 97% 0%, 91% 100%, 0% 100%)';
    if (index === total - 1) return 'polygon(9% 0%, 100% 0%, 100% 100%, 3% 100%)';
    return 'polygon(6% 0%, 97% 0%, 94% 100%, 3% 100%)';
  };

  const servicesRowStyles = {
    display:       'flex',
    flexDirection: 'row',
    alignItems:    'stretch',
    width:         '100%',
    gap:           0,
  };

  const totalStyles = {
    fontSize:      `${totalSize}px`,
    fontWeight:    900,
    fontFamily:    theme.fonts?.primary,
    textTransform: 'uppercase',
    letterSpacing: '6px',
    textShadow:    textShadow || '4px 4px 20px rgba(0,0,0,0.9)',
    color:         slideText,
    lineHeight:    1,
  };

  return (
    <div style={slideStyles}>
      {overlayStyles && <div style={overlayStyles} />}

      {theme.logos?.main?.enabled && theme.logos.main.url && (
        <img src={theme.logos.main.url} alt="Logo principal" style={mainLogoStyles} />
      )}
      {theme.logos?.secondary?.enabled && theme.logos.secondary.url && (
        <img src={theme.logos.secondary.url} alt="Logo secundario" style={secondaryLogoStyles} />
      )}
      {theme.logos?.watermark?.enabled && theme.logos.watermark.url && (
        <img src={theme.logos.watermark.url} alt="Marca de agua" style={watermarkStyles} />
      )}
      {hashtagStyles && (
        <div style={hashtagStyles}>{theme.hashtag.text}</div>
      )}

      <div style={contentStyles}>

        <div style={titleStyles}>ASISTENCIA</div>

        {/* Cajas de servicios — se adaptan automaticamente */}
        <div style={servicesRowStyles}>
          {services.map((service, index) => (
            <div
              key={service.id}
              style={{
                flex:           1,
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                justifyContent: 'center',
                padding:        boxPadding,
                gap:            '12px',
                border:         `3px solid ${slideBorder}`,
                borderLeft:     index === 0 ? `3px solid ${slideBorder}` : 'none',
                backgroundColor:'rgba(0,0,0,0.35)',
                clipPath:       getClipPath(index, services.length),
              }}
            >
              <span style={{
                fontSize:      `${labelSize}px`,
                fontWeight:    700,
                fontFamily:    theme.fonts?.primary,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow:    '2px 2px 8px rgba(0,0,0,0.8)',
                color:         slideText,
                textAlign:     'center',
              }}>
                {service.name}
              </span>
              <span style={{
                fontSize:   `${numberSize}px`,
                fontWeight: 900,
                fontFamily: theme.fonts?.secondary || theme.fonts?.primary,
                textShadow: '3px 3px 12px rgba(0,0,0,0.9)',
                color:      slideText,
                lineHeight: 1,
              }}>
                {service.total}
              </span>
            </div>
          ))}
        </div>

        <div style={totalStyles}>TOTAL: {grandTotal}</div>

      </div>
    </div>
  );
};
