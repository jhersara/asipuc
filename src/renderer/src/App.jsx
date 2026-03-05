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
import { FaChartBar } from "react-icons/fa";
import './App.css';
import './features/multi-service/components/MultiService.css';
import { IoReloadSharp } from 'react-icons/io5';
import { useToast } from './core/hooks/useToast';
import { useBatchExport } from './features/multi-service/hooks/useBatchExport';
import { ToastContainer } from './core/theme/ToastContainer';
import { SideNavbar } from './core/theme/SideNavbar';
import { SidePanel } from './core/theme/SidePanel';
import { ConfirmModal } from './core/theme/ConfirmModal';
import { PanelHistory } from './features/panels/PanelHistory';
import { PanelStats } from './features/panels/PanelStats';
import { PanelExport } from './features/panels/PanelExport';
import { PanelAbout } from './features/panels/PanelAbout';

const AppContent = () => {
  const multiService = useMultiService();
  const { exportImage, isExporting } = useImageExport();

  const [activePanel, setActivePanel] = useState(null);
  const [navExpanded, setNavExpanded] = useState(false);
  const [showAccumulated, setShowAccumulated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const { toasts, toast, removeToast } = useToast();

  const { handleBatchExport, isExporting: isBatchExporting, progress: batchProgress } = useBatchExport({
    services: multiService.services,
    getFormattedData: multiService.getFormattedData,
    getFormattedAccumulatedData: multiService.getFormattedAccumulatedData,
    getServiceTotal: multiService.getServiceTotal,
    accumulatedTotal: multiService.accumulatedTotal,
    onSuccess: (msg) => toast.success('Exportación completa', msg),
    onError:   (msg) => toast.error('Error al exportar', msg),
  });

  const showSettings     = activePanel === 'settings';
  const showServiceManager = activePanel === 'services';

  const handlePanelChange = (panelId) => {
    setActivePanel(prev => prev === panelId ? null : panelId);
  };

  // Servicios con totales para la vista acumulada
  const dominicalServices = multiService.services
    .filter(s => s.enabled)
    .map(s => ({
      ...s,
      total: multiService.getServiceTotal(s.id)
    }));

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
      toast.success('Imagen exportada', `Guardada como ${filename}`);
    } else {
      toast.error('Error al exportar', result.error);
    }
  };

  /**
   * Guardar todos los servicios en BD
   */
  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const result = await multiService.saveAll();
      if (result.success) {
        toast.success('Asistencia guardada', 'Los datos fueron guardados correctamente.');
      } else {
        toast.error('Error al guardar', result.error || 'Ocurrio un error inesperado.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="app-container">
      {/* Navbar lateral derecho */}
      <SideNavbar
        activePanel={activePanel}
        onPanelChange={handlePanelChange}
        onExpandChange={setNavExpanded}
      />

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
            isSaving={isSaving}
            isExporting={isExporting}
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
            onClick={() => setConfirmReset(true)}
          >
            <IoReloadSharp className='icon'/> Resetear Todo
          </button>
        </div>
      </div>

      {/* Vista previa del slide */}
      <div
        className={[
          'slide-preview-container',
          !showSettings && 'with-control-panel',
          !showSettings && 'settings-closed'
        ].filter(Boolean).join(' ')}
        style={{ right: navExpanded ? '200px' : '60px' }}
      >
        <SlidePreview
          data={currentData}
          total={currentTotal}
          services={dominicalServices}
          isAccumulated={showAccumulated}
          resolution={DEFAULT_RESOLUTION}
          id="slide-preview"
        />
      </div>

      {/* Panel: Gestionar Servicios */}
      <SidePanel
        title="Gestionar Servicios"
        isOpen={activePanel === 'services'}
        onClose={() => setActivePanel(null)}
        navWidth={navExpanded ? 200 : 60}
      >
        <ServiceManager
          services={multiService.services}
          onAddService={multiService.addService}
          onRemoveService={multiService.removeService}
          onUpdateService={multiService.updateService}
          onToggleService={multiService.toggleService}
        />
      </SidePanel>

      {/* Panel: Configuracion */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setActivePanel(null)}
      />

      {/* Panel: Historial */}
      <SidePanel
        title="Historial de Registros"
        isOpen={activePanel === 'history'}
        onClose={() => setActivePanel(null)}
        navWidth={navExpanded ? 200 : 60}
      >
        <PanelHistory />
      </SidePanel>

      {/* Panel: Estadisticas */}
      <SidePanel
        title="Estadisticas"
        isOpen={activePanel === 'stats'}
        onClose={() => setActivePanel(null)}
        navWidth={navExpanded ? 200 : 60}
      >
        <PanelStats />
      </SidePanel>

      {/* Panel: Exportacion */}
      <SidePanel
        title="Exportacion"
        isOpen={activePanel === 'export'}
        onClose={() => setActivePanel(null)}
        navWidth={navExpanded ? 200 : 60}
      >
        <PanelExport
          services={multiService.services}
          getServiceTotal={multiService.getServiceTotal}
          accumulatedTotal={multiService.accumulatedTotal}
          onExportCurrent={handleExport}
          onBatchExport={handleBatchExport}
          isExporting={isExporting || isBatchExporting}
          batchProgress={batchProgress}
        />
      </SidePanel>

      {/* Panel: Acerca de */}
      <SidePanel
        title="Acerca de ASIPUC"
        isOpen={activePanel === 'about'}
        onClose={() => setActivePanel(null)}
        navWidth={navExpanded ? 200 : 60}
      >
        <PanelAbout />
      </SidePanel>

      {/* Modal confirmacion resetear */}
      <ConfirmModal
        isOpen={confirmReset}
        title="Resetear todos los datos"
        message="Se borrarán los conteos de todos los servicios del día. Esta acción no se puede deshacer."
        confirmLabel="Sí, resetear"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={() => { multiService.resetAll(); setConfirmReset(false); toast.success('Datos reseteados', 'Todos los conteos fueron a cero.'); }}
        onCancel={() => setConfirmReset(false)}
      />

      {/* Notificaciones toast */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
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
