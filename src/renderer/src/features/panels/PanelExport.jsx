/**
 * PANEL: Exportacion
 */

import React, { useState } from 'react';
import { IoDownloadSharp, IoImageSharp, IoGridSharp, IoDocumentTextSharp, IoCheckmarkCircleSharp } from 'react-icons/io5';
import './PanelExport.css';

const FORMATS = [
  {
    id: 'png',
    icon: <IoImageSharp />,
    label: 'PNG',
    description: 'Imagen del slide en alta resolución 1920×1080',
    color: '#5b9ef9',
    available: true,
  },
  {
    id: 'xlsx',
    icon: <IoGridSharp />,
    label: 'Excel',
    description: 'Tabla de asistencia en formato .xlsx',
    color: '#5dd879',
    available: false,
  },
  {
    id: 'csv',
    icon: <IoDocumentTextSharp />,
    label: 'CSV',
    description: 'Datos separados por comas, compatible con cualquier planilla',
    color: '#ffd04d',
    available: false,
  },
];

export const PanelExport = ({
  services = [],
  getServiceTotal,
  accumulatedTotal,
  onExportCurrent,
  onBatchExport,
  isExporting,
}) => {
  const [selected, setSelected] = useState('png');
  const [exportedIds, setExportedIds] = useState([]);

  const handleExportService = async (serviceId, serviceName) => {
    await onExportCurrent?.(serviceId, serviceName);
    setExportedIds(prev => [...prev, serviceId]);
    setTimeout(() => setExportedIds(prev => prev.filter(id => id !== serviceId)), 3000);
  };

  const activeServices = services.filter(s => s.enabled);

  return (
    <div className="panel-export">

      {/* Selector de formato */}
      <p className="export-subtitle">Formato de exportación</p>
      <div className="export-formats">
        {FORMATS.map(fmt => (
          <button
            key={fmt.id}
            className={`export-format ${selected === fmt.id ? 'export-format--active' : ''} ${!fmt.available ? 'export-format--disabled' : ''}`}
            onClick={() => fmt.available && setSelected(fmt.id)}
            style={{ '--fmt-color': fmt.color }}
          >
            <span className="export-format__icon" style={{ color: fmt.color }}>{fmt.icon}</span>
            <div className="export-format__info">
              <strong>{fmt.label}</strong>
              <span>{fmt.description}</span>
            </div>
            {!fmt.available && <span className="export-format__badge">Próximamente</span>}
          </button>
        ))}
      </div>

      {selected === 'png' && (
        <>
          {/* Exportar slide actual */}
          <div className="export-section">
            <h4 className="export-section__title">Slide actual</h4>
            <button
              className="btn-export-action btn-export-action--primary"
              onClick={() => onExportCurrent?.()}
              disabled={isExporting}
            >
              <IoDownloadSharp />
              {isExporting ? 'Exportando...' : 'Descargar slide actual'}
            </button>
          </div>

          {/* Exportar por servicio */}
          <div className="export-section">
            <h4 className="export-section__title">Por servicio</h4>
            <div className="export-services">
              {activeServices.length === 0 && (
                <p className="export-empty">No hay servicios activos.</p>
              )}
              {activeServices.map(service => {
                const done = exportedIds.includes(service.id);
                return (
                  <div key={service.id} className="export-service-row">
                    <div className="export-service-info">
                      <span>{service.name}</span>
                      <strong>{getServiceTotal?.(service.id) ?? 0} personas</strong>
                    </div>
                    <button
                      className={`btn-export-small ${done ? 'btn-export-small--done' : ''}`}
                      onClick={() => handleExportService(service.id, service.name)}
                      disabled={isExporting}
                    >
                      {done ? <IoCheckmarkCircleSharp /> : <IoDownloadSharp />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exportar todo */}
          <div className="export-section">
            <h4 className="export-section__title">Exportación completa</h4>
            <div className="export-summary">
              <span>Total acumulado</span>
              <strong>{accumulatedTotal ?? 0} personas</strong>
            </div>
            <button
              className="btn-export-action btn-export-action--batch"
              onClick={onBatchExport}
              disabled={isExporting}
            >
              <IoDownloadSharp />
              {isExporting ? 'Exportando...' : `Descargar todos (${activeServices.length} slides)`}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
