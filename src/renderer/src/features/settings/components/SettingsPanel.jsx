/**
 * COMPONENTE: SettingsPanel
 * 
 * Panel principal de configuración con tabs.
 */

import React, { useState } from 'react';
import { BackgroundSelector } from './BackgroundSelector';
import { LogoConfigurator } from './LogoConfigurator';
import { HashtagEditor } from './HashtagEditor';
import './SettingsPanel.css';

export const SettingsPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('background');

  if (!isOpen) return null;

  const tabs = [
    { id: 'background', label: 'Fondo', icon: '🖼️' },
    { id: 'logos', label: 'Logos', icon: '🏷️' },
    { id: 'hashtag', label: 'Hashtag', icon: '#️⃣' }
  ];

  return (
    <>
      {/* Overlay */}
      <div className="settings-overlay" onClick={onClose}></div>

      {/* Panel */}
      <div className="settings-panel">
        {/* Header */}
        <div className="settings-header">
          <h2>⚙️ Configuración</h2>
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
        </div>

        {/* Footer */}
        <div className="settings-footer">
          <p className="hint">💡 Los cambios se aplican automáticamente</p>
        </div>
      </div>
    </>
  );
};
