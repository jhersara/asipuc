/**
 * COMPONENTE: AttendanceForm
 * 
 * Formulario principal para registro de asistencia.
 * Agrupa todos los inputs y controles.
 */

import React from 'react';
import { CategoryInput } from './CategoryInput';
import { TotalDisplay } from './TotalDisplay';
import { ATTENDANCE_CATEGORIES } from '../../../core/config/constants';

export const AttendanceForm = ({
  data,
  total,
  onFieldChange,
  onSave,
  onExport,
  isSaving = false
}) => {
  const handleSave = async () => {
    const result = await onSave();
    if (result.success) {
      alert('¡Datos guardados correctamente!');
    } else {
      alert('Error al guardar: ' + result.error);
    }
  };

  return (
    <div className="control-panel">
      <h2 className="panel-title">REGISTRO DE ASISTENCIA</h2>

      <div className="inputs-container">
        {ATTENDANCE_CATEGORIES.map(category => (
          <CategoryInput
            key={category.key}
            name={category.key}
            label={category.label}
            value={data[category.key]}
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
          onClick={handleSave}
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
    </div>
  );
};
