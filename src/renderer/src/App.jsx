/**
 * COMPONENTE PRINCIPAL: App
 * 
 * Versión actualizada con soporte para FASE 3:
 * - Logos configurables
 * - Hashtag
 * - Imagen de fondo
 * - Exportación perfecta 1920x1080
 */

import React, { useEffect } from 'react';
import { ThemeProvider } from './core/theme/ThemeProvider';
import { useTheme } from './core/hooks/useTheme';
import { useAttendance } from './features/attendance/hooks/useAttendanceForm';
import { useImageExport } from './core/hooks/useImageExport';
import { AttendanceForm } from './features/attendance/components/AttendanceForm';
import { SlidePreview } from './features/slide-generator/components/SlidePreview';
import { DEFAULT_RESOLUTION } from './core/config/constants';
import './App.css';

const AppContent = () => {
  const { theme, updateHashtag, updateBackgroundImage } = useTheme();
  const attendance = useAttendance();
  const { exportImage, isExporting, exportError } = useImageExport();

  /**
   * Configuración inicial (puedes personalizar aquí)
   */
  useEffect(() => {
    // Configurar hashtag (descomenta y personaliza)
    updateHashtag({
      enabled: true,
      text: '#SoachaCentral',
      position: 'top-right'
    });

    // Configurar fondo (usa una URL externa para pruebas rápidas)
    // updateBackgroundImage('https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1920&h=1080&fit=crop');
  }, [updateHashtag, updateBackgroundImage]);

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
      <AttendanceForm
        data={attendance.data}
        total={attendance.total}
        onFieldChange={attendance.updateField}
        onSave={attendance.save}
        onExport={handleExport}
        isSaving={attendance.isSaving || isExporting}
      />

      <SlidePreview
        data={attendance.getFormattedData()}
        total={attendance.total}
        theme={theme}
        resolution={DEFAULT_RESOLUTION}
        id="slide-preview"
      />

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
