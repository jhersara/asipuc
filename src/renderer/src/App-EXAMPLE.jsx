/**
 * GUÍA RÁPIDA: CÓMO CONFIGURAR TU SLIDE
 * 
 * Ejemplo práctico para configurar el diseño como la imagen de referencia.
 * Copia este código en tu App.jsx mientras no tengas UI de configuración.
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

/**
 * Componente interno con configuración automática
 */
const AppContent = () => {
  const { theme, updateHashtag, updateBackgroundImage, updateLogo } = useTheme();
  const attendance = useAttendance();
  const { exportImage, isExporting, exportError } = useImageExport();

  /**
   * CONFIGURACIÓN AUTOMÁTICA AL INICIAR
   * Elimina este useEffect cuando tengas UI de configuración
   */
  useEffect(() => {
    // 1. Configurar hashtag
    updateHashtag({
      enabled: true,
      text: '#SoachaCentral', // Cambia esto por tu hashtag
      position: 'top-right'    // Posición: top-left, top-right, top-center
    });

    // 2. Configurar imagen de fondo
    // OPCIÓN A: Imagen local (coloca tu imagen en resources/assets/backgrounds/)
    // updateBackgroundImage('./resources/assets/backgrounds/galaxy-background.jpg');
    
    // OPCIÓN B: URL externa (temporal para pruebas)
    updateBackgroundImage('https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1920&h=1080&fit=crop');

    // 3. Configurar logo principal (superior izquierda)
    // Descomenta cuando tengas tu logo
    /*
    updateLogo('main', {
      enabled: true,
      url: './resources/assets/logos/church-logo.png',
      size: 150,
      offsetX: 40,
      offsetY: 40
    });
    */

    // 4. Configurar logo secundario (superior derecha)
    /*
    updateLogo('secondary', {
      enabled: true,
      url: './resources/assets/logos/ministry-logo.png',
      size: 150,
      offsetX: 40,
      offsetY: 40
    });
    */

    // 5. Configurar marca de agua (inferior derecha)
    /*
    updateLogo('watermark', {
      enabled: true,
      url: './resources/assets/logos/watermark.png',
      size: 180,
      offsetX: 40,
      offsetY: 40,
      opacity: 1
    });
    */
  }, [updateHashtag, updateBackgroundImage, updateLogo]);

  /**
   * Manejar exportación con configuración óptima
   */
  const handleExport = async () => {
    const result = await exportImage('slide-preview', {
      filename: `Asistencia-${new Date().toLocaleDateString().replace(/\//g, '-')}.png`,
      width: DEFAULT_RESOLUTION.width,    // 1920px
      height: DEFAULT_RESOLUTION.height,  // 1080px
      pixelRatio: 2,                      // Mayor nitidez
      quality: 0.95,                      // 95% calidad
      backgroundColor: '#000000'
    });

    if (result.success) {
      alert('¡Imagen exportada correctamente!');
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

/**
 * Componente principal
 */
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

/**
 * CHECKLIST RÁPIDO:
 * 
 * □ 1. Descarga una imagen de fondo de galaxia desde:
 *      https://unsplash.com/s/photos/galaxy
 * 
 * □ 2. Guárdala en: resources/assets/backgrounds/galaxy-background.jpg
 * 
 * □ 3. Descomenta la línea de updateBackgroundImage con ruta local
 * 
 * □ 4. Si tienes logos, colócalos en resources/assets/logos/
 * 
 * □ 5. Descomenta las secciones de logos y ajusta las rutas
 * 
 * □ 6. Ejecuta: npm run dev
 * 
 * □ 7. Ingresa datos de asistencia
 * 
 * □ 8. Click en "Descargar Imagen"
 * 
 * □ 9. ¡Verifica que la imagen sea 1920x1080 sin bordes!
 * 
 * 
 * TIPS:
 * - Usa la URL externa temporal para probar rápidamente
 * - El hashtag se verá en la esquina superior derecha
 * - Los tamaños de logos se ajustan con la propiedad 'size'
 * - La opacidad del watermark se controla con 'opacity' (0-1)
 */
