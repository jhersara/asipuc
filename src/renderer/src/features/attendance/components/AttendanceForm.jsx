/**
 * COMPONENTE: AttendanceForm
 * 
 * Formulario principal para registro de asistencia.
 * Agrupa todos los inputs y controles.
 */

import React from 'react';
import { CategoryInput } from './CategoryInput';
import { TotalDisplay } from './TotalDisplay';

export const AttendanceForm = ({
  data,
  total,
  onFieldChange,
  onSave,
  onExport,
  isSaving = false
}) => {
  return (
    <>
      <div className="inputs-container">
        {data.map(item => (
          <CategoryInput
            key={item.key}
            name={item.key}
            label={item.label}
            value={item.value}
            onChange={onFieldChange}
            disabled={isSaving}
          />
        ))}
      </div>

      <hr className="divider" />

      <TotalDisplay total={total} />

      <div className="actions-container">
        <button 
          className="btn-action btn-primary"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? 'Guardando...' : 'Guardar Asistencia'}
        </button>

        <button 
          className="btn-action btn-success"
          onClick={onExport}
          disabled={isSaving}
        >
          Descargar Imagen
        </button>
      </div>
    </>
  );
};
