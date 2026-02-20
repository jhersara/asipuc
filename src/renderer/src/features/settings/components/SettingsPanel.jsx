/**
 * COMPONENTE: SettingsPanel
 * 
 * Panel principal de configuración con tabs extendidos.
 */

import React, { useState } from 'react';
import { TemplateSelector } from './TemplateSelector';
import { BackgroundSelector } from './BackgroundSelector';
import { LogoConfigurator } from './LogoConfigurator';
import { HashtagEditor } from './HashtagEditor';
import { ThemeCustomizer } from './ThemeCustomizer';
import { ConfigManager } from './ConfigManager';
import './SettingsPanel.css';
import './TemplateSelector.css';
import './ThemeCustomizer.css';
import { FiAirplay, FiArchive, FiBookOpen, FiFlag, FiGrid, FiHash, FiImage, FiSettings } from 'react-icons/fi';

export const SettingsPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('template');

  if (!isOpen) return null;

  const tabs = [
    { id: 'template', label: 'Diseño', icon: (<FiBookOpen/>) },
    { id: 'customize', label: 'Personalizar', icon: (<FiGrid/>) },
    { id: 'background', label: 'Fondo', icon: (<FiImage/>)},
    { id: 'logos', label: 'Logos', icon: (<FiAirplay/>) },
    { id: 'hashtag', label: 'Hashtag', icon: (<FiHash/>) },
    { id: 'config', label: 'Guardar', icon: (<FiArchive/>) }
  ];

  return (
    <>
      {/* Overlay */}
      <div className="settings-overlay" onClick={onClose}></div>

      {/* Panel */}
      <div className="settings-panel">
        {/* Header */}
        <div className="settings-header">
          <h2><FiSettings className='icon'/> Configuración</h2>
          <button className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="settings-content">
          {activeTab === 'template' && <TemplateSelector />}
          {activeTab === 'customize' && <ThemeCustomizer />}
          {activeTab === 'background' && <BackgroundSelector />}
          
          {activeTab === 'logos' && (
            <div className="logos-section">
              <LogoConfigurator 
                logoType="main" 
                title="Logo Principal (Superior Izquierda)"
              />
              <div className="separator"></div>
              <LogoConfigurator 
                logoType="secondary" 
                title="Logo Secundario (Superior Derecha)"
              />
              <div className="separator"></div>
              <LogoConfigurator 
                logoType="watermark" 
                title="Marca de Agua (Inferior Derecha)"
              />
            </div>
          )}
          
          {activeTab === 'hashtag' && <HashtagEditor />}
          {activeTab === 'config' && <ConfigManager />}
        </div>

        {/* Footer */}
        <div className="settings-footer">
          <p className="hint"> Los cambios se aplican automáticamente</p>
        </div>
      </div>
    </>
  );
};
