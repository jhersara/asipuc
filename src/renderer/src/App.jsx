/**
 * COMPONENTE PRINCIPAL: App
 * 
 * Versión con sistema multi-servicio completo.
 */

import React, { useState } from 'react';
import { ThemeProvider } from './core/theme/ThemeProvider';
import { useMultiService } from './features/multi-service/hooks/useMultiService';
import { useImageExport } from './core/hooks/useImageExport';
import { AttendanceForm } from './features/attendance/components/AttendanceForm';
import { SlidePreview } from './features/slide-generator/components/SlidePreview';
import { SettingsPanel } from './features/settings/components/SettingsPanel';
import { ServiceTabs } from './features/multi-service/components/ServiceTabs';
import { ServiceManager } from './features/multi-service/components/ServiceManager';
import { BatchExport } from './features/multi-service/components/BatchExport';
import { DEFAULT_RESOLUTION } from './core/config/constants';
import { FaChartBar, FaListAlt } from "react-icons/fa";
import './App.css';
import './features/multi-service/components/MultiService.css';
import { IoReloadSharp, IoSettingsSharp } from 'react-icons/io5';

const AppContent = () => {
  const multiService = useMultiService();
  const { exportImage, isExporting, exportError } = useImageExport();
  
  const [showSettings, setShowSettings] = useState(false);
  const [showServiceManager, setShowServiceManager] = useState(false);
  const [showAccumulated, setShowAccumulated] = useState(false);

  /**
   * Datos y total a mostrar
   */
  const currentData = showAccumulated 
    ? multiService.getFormattedAccumulatedData()
    : multiService.getFormattedData(multiService.activeServiceId);

  const currentTotal = showAccumulated
    ? multiService.accumulatedTotal
    : multiService.activeServiceTotal;

  /**
   * Nombre del slide actual
   */
  const currentSlideName = showAccumulated
    ? 'TOTAL ACUMULADO'
    : multiService.services.find(s => s.id === multiService.activeServiceId)?.name || '';

  /**
   * Exportar slide actual
   */
  const handleExport = async () => {
    const date = new Date().toLocaleDateString().replace(/\//g, '-');
    const filename = showAccumulated
      ? `${date}-TOTAL-ACUMULADO.png`
      : `${date}-${currentSlideName.replace(/\s+/g, '-')}.png`;

    const result = await exportImage('slide-preview', {
      filename,
      width: DEFAULT_RESOLUTION.width,
      height: DEFAULT_RESOLUTION.height,
      pixelRatio: 2,
      quality: 0.95,
      backgroundColor: '#000000'
    });

    if (result.success) {
      console.log(' Imagen exportada:', filename);
    } else {
      alert('Error al exportar: ' + result.error);
    }
  };

  /**
   * Guardar todos los servicios en BD
   */
  const handleSaveAll = async () => {
    const result = await multiService.saveAll();
    if (result.success) {
      alert(' Todos los servicios guardados en la base de datos');
    } else {
      alert(' Error al guardar: ' + result.error);
    }
  };

  return (
    <div className="app-container">
      {/* Botón flotante de configuración */}
      <button 
        className="btn-settings-float"
        onClick={() => setShowSettings(true)}
        title="Configuración"
      >
        <IoSettingsSharp/>
      </button>

      {/* Botón flotante de gestión de servicios */}
      <button 
        className="btn-services-float"
        onClick={() => setShowServiceManager(!showServiceManager)}
        title="Gestionar Servicios"
      >
        <FaListAlt />
      </button>

      {/* Panel de control izquierdo */}
      <div className={`control-panel ${showSettings ? 'control-panel--hidden' : ''}`}>
        <h2 className="panel-title">Asistencia del Día</h2>

        {/* Tabs de servicios */}
        <ServiceTabs
          services={multiService.services}
          activeServiceId={multiService.activeServiceId}
          onServiceChange={multiService.changeService}
          showAccumulated={showAccumulated}
          onShowAccumulated={setShowAccumulated}
          getServiceTotal={multiService.getServiceTotal}
        />

        {/* Título del servicio actual */}
        <div className="current-service-header">
          <h3>{currentSlideName}</h3>
          {!showAccumulated && (
            <span className="service-time">
              {multiService.services.find(s => s.id === multiService.activeServiceId)?.time}
            </span>
          )}
        </div>

        {/* Formulario de asistencia */}
        {!showAccumulated ? (
          <AttendanceForm
            data={Object.entries(multiService.activeServiceData).map(([key, value]) => ({
              key,
              value,
              label: key.toUpperCase()
            }))}
            total={multiService.activeServiceTotal}
            onFieldChange={multiService.updateField}
            onSave={handleSaveAll}
            onExport={handleExport}
            isSaving={isExporting}
          />
        ) : (
          // Vista del total acumulado (solo lectura)
          <div className="accumulated-view">
            <div className="accumulated-notice">
              <FaChartBar className='icon'/> Este es el total acumulado de todos los servicios activos
            </div>
            
            <div className="inputs-container">
              {currentData.map((item) => (
                <div key={item.key} className="input-group">
                  <label>{item.label}</label>
                  <input
                    type="number"
                    value={item.value}
                    readOnly
                    disabled
                  />
                </div>
              ))}
            </div>

            <hr className="divider" />

            <div className="total-display">
              <span className="total-label">TOTAL ACUMULADO:</span>
              <span className="total-value">{currentTotal}</span>
            </div>

            <div className="actions-container">
              <button 
                className="btn-action btn-success"
                onClick={handleExport}
                disabled={isExporting}
              >
                {isExporting ? 'Exportando...' : 'Descargar Total Acumulado'}
              </button>
            </div>
          </div>
        )}

        {/* Exportación por lotes */}
        <div className="batch-section">
          <hr className="divider" />
          <BatchExport
            services={multiService.services}
            getFormattedData={multiService.getFormattedData}
            getFormattedAccumulatedData={multiService.getFormattedAccumulatedData}
            getServiceTotal={multiService.getServiceTotal}
            accumulatedTotal={multiService.accumulatedTotal}
          />
        </div>

        {/* Botones de utilidad */}
        <div className="utility-buttons">
          <button 
            className="btn-reset-all"
            onClick={() => {
              if (confirm('¿Resetear TODOS los servicios? Esta acción no se puede deshacer.')) {
                multiService.resetAll();
              }
            }}
          >
            <IoReloadSharp className='icon'/> Resetear Todo
          </button>
        </div>
      </div>

      {/* Vista previa del slide */}
      <div className={[
        'slide-preview-container',
        !showSettings && 'with-control-panel',
        !showSettings && 'settings-closed'
      ].filter(Boolean).join(' ')}>
        <SlidePreview
          data={currentData}
          total={currentTotal}
          resolution={DEFAULT_RESOLUTION}
          id="slide-preview"
        />
      </div>

      {/* Panel de gestión de servicios */}
      {showServiceManager && (
        <div className="service-manager-overlay">
          <div className="service-manager-panel">
            <button 
              className="btn-close-manager"
              onClick={() => setShowServiceManager(false)}
            >
              ✕
            </button>
            <ServiceManager
              services={multiService.services}
              onAddService={multiService.addService}
              onRemoveService={multiService.removeService}
              onUpdateService={multiService.updateService}
              onToggleService={multiService.toggleService}
            />
          </div>
        </div>
      )}

      {/* Panel de configuración */}
      <SettingsPanel 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Mensajes de error */}
      {exportError && (
        <div className="error-toast">
          Error al exportar: {exportError}
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
