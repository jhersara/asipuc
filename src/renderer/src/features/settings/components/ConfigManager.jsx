/**
 * COMPONENTE: ConfigManager
 * 
 * Gestión de configuraciones: export, import, guardar presets.
 */

import React, { useState } from 'react';
import { useTheme } from '../../../core/hooks/useTheme';
import { FiArrowDown, FiArrowUp, FiDelete, FiSave } from 'react-icons/fi';

export const ConfigManager = () => {
  const { theme, customConfig, updateCustomTheme } = useTheme();
  const [savedPresets, setSavedPresets] = useState(() => {
    try {
      const saved = localStorage.getItem('asipuc_presets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [presetName, setPresetName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  /**
   * Exportar configuración actual como JSON
   */
  const handleExport = () => {
    const config = {
      theme: customConfig || theme,
      version: '1.0',
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `asipuc-config-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  /**
   * Importar configuración desde archivo JSON
   */
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const config = JSON.parse(event.target.result);
        if (config.theme) {
          updateCustomTheme(config.theme);
          alert('✅ Configuración importada correctamente');
        } else {
          alert('❌ Archivo de configuración inválido');
        }
      } catch (error) {
        alert('❌ Error al leer el archivo: ' + error.message);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  /**
   * Guardar configuración actual como preset
   */
  const handleSavePreset = () => {
    if (!presetName.trim()) {
      alert('Por favor ingresa un nombre para el preset');
      return;
    }

    const newPreset = {
      id: Date.now(),
      name: presetName,
      config: customConfig || theme,
      createdAt: new Date().toISOString()
    };

    const updatedPresets = [...savedPresets, newPreset];
    setSavedPresets(updatedPresets);
    localStorage.setItem('asipuc_presets', JSON.stringify(updatedPresets));
    
    setPresetName('');
    setShowSaveDialog(false);
    alert('✅ Preset guardado correctamente');
  };

  /**
   * Cargar un preset guardado
   */
  const handleLoadPreset = (preset) => {
    updateCustomTheme(preset.config);
    alert(`✅ Preset "${preset.name}" cargado`);
  };

  /**
   * Eliminar un preset
   */
  const handleDeletePreset = (presetId) => {
    if (!confirm('¿Estás seguro de eliminar este preset?')) return;

    const updatedPresets = savedPresets.filter(p => p.id !== presetId);
    setSavedPresets(updatedPresets);
    localStorage.setItem('asipuc_presets', JSON.stringify(updatedPresets));
  };

  return (
    <div className="config-manager">
      <h3 className="section-title"><FiSave/> Gestión de Configuraciones</h3>

      {/* Export/Import */}
      <div className="config-section">
        <h4 className="subsection-title">Exportar / Importar</h4>
        
        <div className="config-actions">
          <button 
            className="btn-config btn-export"
            onClick={handleExport}
          >
            <FiArrowUp className='icon'/> Exportar Configuración
          </button>

          <label className="btn-config btn-import">
            <FiArrowDown className='icon'/> Importar Configuración
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        <p className="config-help">
          Exporta tu configuración para compartirla o hacer respaldo. 
          Importa configuraciones de otros usuarios o respaldos previos.
        </p>
      </div>

      {/* Presets */}
      <div className="config-section">
        <h4 className="subsection-title">Configuraciones Guardadas</h4>

        {/* Botón para guardar nuevo preset */}
        {!showSaveDialog ? (
          <button 
            className="btn-config btn-new-preset"
            onClick={() => setShowSaveDialog(true)}
          >
            <FiSave/> Guardar Configuración Actual
          </button>
        ) : (
          <div className="save-preset-dialog">
            <input
              type="text"
              className="preset-name-input"
              placeholder="Nombre del preset..."
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSavePreset()}
              autoFocus
            />
            <div className="dialog-actions">
              <button 
                className="btn-save-preset"
                onClick={handleSavePreset}
              >
                Guardar
              </button>
              <button 
                className="btn-cancel-preset"
                onClick={() => {
                  setShowSaveDialog(false);
                  setPresetName('');
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Lista de presets */}
        {savedPresets.length > 0 ? (
          <div className="presets-list">
            {savedPresets.map(preset => (
              <div key={preset.id} className="preset-item">
                <div className="preset-info">
                  <div className="preset-name">{preset.name}</div>
                  <div className="preset-date">
                    {new Date(preset.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="preset-actions">
                  <button
                    className="btn-load-preset"
                    onClick={() => handleLoadPreset(preset)}
                  >
                    Cargar
                  </button>
                  <button
                    className="btn-delete-preset"
                    onClick={() => handleDeletePreset(preset.id)}
                  >
                    <FiDelete/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-presets">
            <p>No tienes configuraciones guardadas todavía.</p>
            <p>Personaliza tu tema y guárdalo para usarlo después!</p>
          </div>
        )}
      </div>
    </div>
  );
};
