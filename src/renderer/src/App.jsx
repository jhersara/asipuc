/**
 * COMPONENTE PRINCIPAL: App
 * 
 * Versión completa con panel de configuración.
 */

import React, { useState } from 'react';
import { ThemeProvider } from './core/theme/ThemeProvider';
import { useTheme } from './core/hooks/useTheme';
import { useAttendance } from './features/attendance/hooks/useAttendanceForm';
import { useImageExport } from './core/hooks/useImageExport';
import { AttendanceForm } from './features/attendance/components/AttendanceForm';
import { SlidePreview } from './features/slide-generator/components/SlidePreview';
import { SettingsPanel } from './features/settings/components/SettingsPanel';
import { DEFAULT_RESOLUTION } from './core/config/constants';
import './App.css';

const AppContent = () => {
  const { theme } = useTheme();
  const attendance = useAttendance();
  const { exportImage, isExporting, exportError } = useImageExport();
  const [showSettings, setShowSettings] = useState(false);

  /**
   * Exportar imagen con configuración óptima
   */
  const handleExport = async () => {
    const result = await exportImage('slide-preview', {
      filename: `Asistencia-${new Date().toLocaleDateString().replace(/\//g, '-')}.png`,
      width: DEFAULT_RESOLUTION.width,
      height: DEFAULT_RESOLUTION.height,
      pixelRatio: 2,
      quality: 0.95,
      backgroundColor: '#000000'
    });

    if (result.success) {
      console.log('✅ Imagen exportada correctamente en 1920x1080px');
    } else {
      alert('Error al exportar imagen: ' + result.error);
    }
  };

  return (
    <div className="app-container">
      {/* Botón de configuración flotante */}
      <button 
        className="btn-settings-float"
        onClick={() => setShowSettings(true)}
        title="Configuración"
      >
        ⚙️
      </button>

      {/* Panel de control */}
      <AttendanceForm
        data={attendance.data}
        total={attendance.total}
        onFieldChange={attendance.updateField}
        onSave={attendance.save}
        onExport={handleExport}
        isSaving={attendance.isSaving || isExporting}
      />

      {/* Vista previa del slide */}
      <SlidePreview
        data={attendance.getFormattedData()}
        total={attendance.total}
        theme={theme}
        resolution={DEFAULT_RESOLUTION}
        id="slide-preview"
      />

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
      
      {attendance.saveError && (
        <div className="error-toast">
          Error al guardar: {attendance.saveError}
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
