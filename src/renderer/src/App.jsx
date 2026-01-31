/**
 * COMPONENTE PRINCIPAL: App
 * 
 * Orquesta todos los componentes y features.
 * Ahora es mucho más limpio y mantenible.
 * 
 * Mejoras implementadas:
 * - Separación de responsabilidades
 * - Componentes reutilizables
 * - Hooks personalizados
 * - Sistema de temas
 * - Mejor manejo de estados
 */

import React from 'react';
import { ThemeProvider } from './core/theme/ThemeProvider';
import { useTheme } from './core/hooks/useTheme';
import { useAttendance } from './features/attendance/hooks/useAttendanceForm';
import { useImageExport } from './core/hooks/useImageExport';
import { AttendanceForm } from './features/attendance/components/AttendanceForm';
import { SlidePreview } from './features/slide-generator/components/SlidePreview';
import { DEFAULT_RESOLUTION } from './core/config/constants';
import './App.css';

/**
 * Componente interno que usa el contexto de tema
 */
const AppContent = () => {
  const { theme } = useTheme();
  const attendance = useAttendance();
  const { exportImage, isExporting, exportError } = useImageExport();

  /**
   * Manejar exportación de imagen
   */
  const handleExport = async () => {
    const result = await exportImage('slide-preview', {
      filename: `Asistencia-${new Date().toLocaleDateString().replace(/\//g, '-')}.png`,
      width: DEFAULT_RESOLUTION.width,
      height: DEFAULT_RESOLUTION.height
    });

    if (result.success) {
      console.log('Imagen exportada correctamente');
    } else {
      alert('Error al exportar imagen: ' + result.error);
    }
  };

  return (
    <div className="app-container">
      {/* Panel de control izquierdo */}
      <AttendanceForm
        data={attendance.data}
        total={attendance.total}
        onFieldChange={attendance.updateField}
        onSave={attendance.save}
        onExport={handleExport}
        isSaving={attendance.isSaving || isExporting}
      />

      {/* Vista previa del slide derecho */}
      <SlidePreview
        data={attendance.getFormattedData()}
        total={attendance.total}
        theme={theme}
        resolution={DEFAULT_RESOLUTION}
        id="slide-preview"
      />

      {/* Mostrar errores si existen */}
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

/**
 * Componente principal con Provider
 */
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
