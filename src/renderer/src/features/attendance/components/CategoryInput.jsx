/**
 * COMPONENTE: CategoryInput
 * 
 * Input individual para una categoría de asistencia.
 * Componente reutilizable con validación.
 */

import React from 'react';

export const CategoryInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  disabled = false 
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    // Solo permitir números
    if (/^\d*$/.test(newValue)) {
      onChange(name, newValue);
    }
  };

  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="number"
        name={name}
        value={value}
        onChange={handleChange}
        min="0"
        disabled={disabled}
        aria-label={`Cantidad de ${label.toLowerCase()}`}
      />
    </div>
  );
};
