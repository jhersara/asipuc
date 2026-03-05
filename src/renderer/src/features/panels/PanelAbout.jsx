/**
 * PANEL: Acerca de
 */

import React from 'react';
import { MdGridOn } from 'react-icons/md';
import { IoLogoGithub, IoOpenOutline } from 'react-icons/io5';
import './PanelAbout.css';

const VERSION = '1.2.0';

export const PanelAbout = () => {
  return (
    <div className="panel-about">
      <div className="about-hero">
        <div className="about-hero__icon"><MdGridOn /></div>
        <h2 className="about-hero__name">ASIPUC</h2>
        <span className="about-hero__version">v{VERSION}</span>
      </div>

      <p className="about-desc">
        Sistema de gestion de asistencia eclesiastica con generacion de slides
        para proyeccion en cultos. Desarrollado para iglesias y congregaciones.
      </p>

      <div className="about-info">
        <div className="about-info__row">
          <span>Version</span>
          <strong>{VERSION}</strong>
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
          <span>Exportacion</span>
          <strong>PNG 1920x1080</strong>
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

      <a
        className="about-github"
        onClick={() => window.api?.openExternal?.('https://github.com')}
      >
        <IoLogoGithub /> Ver en GitHub
      </a>
    </div>
  );
};
