/**
 * COMPONENTE: BatchExport
 * Ahora usa useBatchExport hook compartido.
 */

import React from 'react';
import { useBatchExport } from '../hooks/useBatchExport';
import { GiCardboardBox } from 'react-icons/gi';
import { IoReloadSharp } from 'react-icons/io5';

export const BatchExport = ({
  services,
  getFormattedData,
  getFormattedAccumulatedData,
  getServiceTotal,
  accumulatedTotal,
  onSuccess,
  onError,
}) => {
  const { handleBatchExport, isExporting, progress } = useBatchExport({
    services, getFormattedData, getFormattedAccumulatedData,
    getServiceTotal, accumulatedTotal, onSuccess, onError,
  });

  const enabledCount = services.filter(s => s.enabled).length;

  return (
    <div className="batch-export">
      <button
        className="btn-batch-export"
        onClick={handleBatchExport}
        disabled={isExporting}
      >
        {isExporting ? (
          <><span className="spinner"><IoReloadSharp className="icon" /></span>Exportando... {progress}%</>
        ) : (
          <><GiCardboardBox className="icon" /> Exportar Todos ({enabledCount + 1} slides)</>
        )}
      </button>

      {isExporting && (
        <div className="export-progress">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      <p className="batch-export-help">
        Exporta todos los servicios activos + total acumulado en un solo click
      </p>
    </div>
  );
};
