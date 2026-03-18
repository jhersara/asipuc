/**
 * TEMPLATE: Dominical
 *
 * Diseño para cultos dominicales.
 * Muestra Primer Culto y Segundo Culto con sus totales y el gran total.
 * Inspirado en el diseño de Soacha Central.
 */

import React from 'react';
import { DEFAULT_RESOLUTION } from '../../../core/config/constants';

export const DominicanTemplate = ({
  services = [],
  theme,
  resolution = DEFAULT_RESOLUTION
}) => {
  const { slideBackground, slideText, slideBorder, slideOverlay } = theme.colors;

  // Tomar los primeros dos servicios habilitados
  const activeServices = services.filter(s => s.enabled).slice(0, 2);
  const primerCulto  = activeServices[0] || { name: 'PRIMER CULTO',  total: 0 };
  const segundoCulto = activeServices[1] || { name: 'SEGUNDO CULTO', total: 0 };
  const grandTotal   = (primerCulto.total || 0) + (segundoCulto.total || 0);

  const slideStyles = {
    width:           `${resolution.width}px`,
    height:          `${resolution.height}px`,
    backgroundColor: slideBackground,
    color:           slideText,
    backgroundImage: theme.backgroundImage ? `url(${theme.backgroundImage})` : 'none',
    backgroundSize:     'cover',
    backgroundPosition: 'center',
    backgroundRepeat:   'no-repeat',
    position:   'relative',
    display:    'flex',
    flexDirection: 'column',
    alignItems:    'center',
    justifyContent:'center',
    boxSizing:  'border-box',
    overflow:   'hidden',
    fontFamily: theme.fonts?.primary || 'sans-serif',
    gap: '40px',
  };

  const overlayStyles = theme.backgroundImage ? {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: slideOverlay,
    zIndex: 1,
  } : null;

  // ---- Hashtag ----
  const hashtagStyles = theme.hashtag?.enabled && theme.hashtag?.text ? {
    position:   'absolute',
    top:        '30px',
    left:       '50%',
    transform:  'translateX(-50%)',
    fontSize:   theme.sizes?.hashtag || '36px',
    fontFamily: theme.fonts?.hashtag || theme.fonts?.primary,
    color:      theme.colors?.hashtagColor || '#ffffff',
    zIndex:     3,
    textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
    whiteSpace: 'nowrap',
    letterSpacing: '2px',
  } : null;

  // ---- Logos ----
  const mainLogoStyles = theme.logos?.main?.enabled ? {
    position:  'absolute',
    top:       `${theme.logos.main.offsetY}px`,
    left:      `${theme.logos.main.offsetX}px`,
    width:     `${theme.logos.main.size}px`,
    height:    'auto',
    zIndex:    3,
    objectFit: 'contain',
  } : null;

  const secondaryLogoStyles = theme.logos?.secondary?.enabled ? {
    position:  'absolute',
    top:       `${theme.logos.secondary.offsetY}px`,
    right:     `${theme.logos.secondary.offsetX}px`,
    width:     `${theme.logos.secondary.size}px`,
    height:    'auto',
    zIndex:    3,
    objectFit: 'contain',
  } : null;

  const watermarkStyles = theme.logos?.watermark?.enabled ? {
    position:  'absolute',
    bottom:    `${theme.logos.watermark.offsetY}px`,
    right:     `${theme.logos.watermark.offsetX}px`,
    width:     `${theme.logos.watermark.size}px`,
    height:    'auto',
    zIndex:    3,
    opacity:   theme.logos.watermark.opacity,
    objectFit: 'contain',
  } : null;

  // ---- Contenido ----
  const contentStyles = {
    position:       'relative',
    zIndex:         2,
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    width:          '100%',
    gap:            '50px',
  };

  const titleStyles = {
    fontSize:      theme.sizes?.title || '130px',
    fontWeight:    900,
    fontFamily:    theme.fonts?.primary,
    textTransform: 'uppercase',
    letterSpacing: '8px',
    textShadow:    '4px 4px 20px rgba(0,0,0,0.9), 0 0 60px rgba(255,255,255,0.15)',
    color:         slideText,
    lineHeight:    1,
  };

  // Contenedor de las dos cajas de culto
  const cultosRowStyles = {
    display:        'flex',
    flexDirection:  'row',
    alignItems:     'stretch',
    width:          '88%',
    gap:            0,
  };

  // Cada caja de culto — forma de paralelogramo con clip-path
  const cultoBoxBase = {
    flex:           1,
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    justifyContent: 'center',
    padding:        '40px 60px',
    gap:            '16px',
    border:         `3px solid ${slideBorder}`,
    backgroundColor:'rgba(0,0,0,0.35)',
    clipPath:       'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)',
  };

  const cultoLabelStyles = {
    fontSize:      theme.sizes?.label || '48px',
    fontWeight:    700,
    fontFamily:    theme.fonts?.primary,
    textTransform: 'uppercase',
    letterSpacing: '3px',
    textShadow:    '2px 2px 8px rgba(0,0,0,0.8)',
    color:         slideText,
  };

  const cultoNumberStyles = {
    fontSize:   theme.sizes?.number || '110px',
    fontWeight: 900,
    fontFamily: theme.fonts?.secondary || theme.fonts?.primary,
    textShadow: '3px 3px 12px rgba(0,0,0,0.9)',
    color:      slideText,
    lineHeight: 1,
  };

  const totalStyles = {
    fontSize:      '120px',
    fontWeight:    900,
    fontFamily:    theme.fonts?.primary,
    textTransform: 'uppercase',
    letterSpacing: '6px',
    textShadow:    '4px 4px 20px rgba(0,0,0,0.9), 0 0 40px rgba(255,255,255,0.1)',
    color:         slideText,
    lineHeight:    1,
  };

  return (
    <div style={slideStyles}>
      {overlayStyles && <div style={overlayStyles} />}

      {/* Logos */}
      {theme.logos?.main?.enabled && theme.logos.main.url && (
        <img src={theme.logos.main.url} alt="Logo principal" style={mainLogoStyles} />
      )}
      {theme.logos?.secondary?.enabled && theme.logos.secondary.url && (
        <img src={theme.logos.secondary.url} alt="Logo secundario" style={secondaryLogoStyles} />
      )}
      {theme.logos?.watermark?.enabled && theme.logos.watermark.url && (
        <img src={theme.logos.watermark.url} alt="Marca de agua" style={watermarkStyles} />
      )}

      {/* Hashtag */}
      {hashtagStyles && (
        <div style={hashtagStyles}>{theme.hashtag.text}</div>
      )}

      {/* Contenido principal */}
      <div style={contentStyles}>

        {/* Titulo ASISTENCIA */}
        <div style={titleStyles}>ASISTENCIA</div>

        {/* Dos cultos */}
        <div style={cultosRowStyles}>
          <div style={{ ...cultoBoxBase, clipPath: 'polygon(0% 0%, 97% 0%, 91% 100%, 0% 100%)' }}>
            <span style={cultoLabelStyles}>{primerCulto.name}</span>
            <span style={cultoNumberStyles}>{primerCulto.total}</span>
          </div>
          <div style={{ ...cultoBoxBase, clipPath: 'polygon(9% 0%, 100% 0%, 100% 100%, 3% 100%)', borderLeft: 'none' }}>
            <span style={cultoLabelStyles}>{segundoCulto.name}</span>
            <span style={cultoNumberStyles}>{segundoCulto.total}</span>
          </div>
        </div>

        {/* Total */}
        <div style={totalStyles}>TOTAL: {grandTotal}</div>

      </div>
    </div>
  );
};

DominicanTemplate.metadata = {
  id:          'dominical',
  name:        'Dominical',
  description: 'Diseño para cultos dominicales con Primer y Segundo culto',
  category:    'professional',
  thumbnail:   '/templates/dominical-thumb.png',
  isDominical: true, // flag para identificar este template
};
