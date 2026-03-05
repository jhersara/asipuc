/**
 * PANEL: Acerca de — version dinamica desde package.json
 */

import React, { useState, useEffect } from 'react';
import { MdGridOn } from 'react-icons/md';
import { IoLogoGithub } from 'react-icons/io5';
import './PanelAbout.css';

export const PanelAbout = () => {
  const [version, setVersion] = useState('...');

  useEffect(() => {
    window.api?.getVersion?.().then(v => { if (v) setVersion(v); });
  }, []);

  const handleGithub = () => {
    window.api?.openExternal?.('https://github.com');
  };

  return (
    <div className="panel-about">
      <div className="about-hero">
        <div className="about-hero__icon"><MdGridOn /></div>
        <h2 className="about-hero__name">ASIPUC</h2>
        <span className="about-hero__version">v{version}</span>
      </div>

      <p className="about-desc">
        Sistema de gestión de asistencia eclesiástica con generación de slides
        para proyección en cultos. Desarrollado para iglesias y congregaciones.
      </p>

      <div className="about-info">
        <div className="about-info__row">
          <span>Versión</span>
          <strong>v{version}</strong>
        </div>
        <div className="about-info__row">
          <span>Plataforma</span>
          <strong>Windows (Electron)</strong>
        </div>
        <div className="about-info__row">
          <span>Base de datos</span>
          <strong>SQLite local</strong>
        </div>
        <div className="about-info__row">
          <span>Exportación</span>
          <strong>PNG 1920×1080</strong>
        </div>
      </div>

      <div className="about-tech">
        <span className="about-tech__label">Construido con</span>
        <div className="about-tech__tags">
          {['Electron', 'React 19', 'Vite', 'SQLite', 'html-to-image'].map(t => (
            <span key={t} className="about-tech__tag">{t}</span>
          ))}
        </div>
      </div>

      <button className="about-github" onClick={handleGithub}>
        <IoLogoGithub /> Ver en GitHub
      </button>
    </div>
  );
};
