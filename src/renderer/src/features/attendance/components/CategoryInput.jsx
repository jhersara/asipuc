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
    if (/^\d*$/.test(newValue)) {
      onChange(name, newValue);
    }
  };

  // Al enfocar el input, si el valor es 0 lo limpia para escribir directo
  const handleFocus = (e) => {
    if (String(value) === '0' || value === 0) {
      onChange(name, '');
    } else {
      // Seleccionar todo el texto para sobreescribir directo
      setTimeout(() => e.target.select(), 0);
    }
  };

  // Al perder el foco, si queda vacío vuelve a 0
  const handleBlur = (e) => {
    if (e.target.value === '' || e.target.value === null) {
      onChange(name, 0);
    }
  };

  // Enter mueve al siguiente input, o ejecuta onSave si es el último
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputs = Array.from(
        document.querySelectorAll('.input-group input:not(:disabled)')
      );
      const currentIndex = inputs.indexOf(e.target);
      if (currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      } else {
        // Es el último input — enfocar el botón Guardar
        const saveBtn = document.querySelector('.btn-primary:not(:disabled)');
        if (saveBtn) saveBtn.focus();
      }
    }
  };

  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="text"
        inputMode="numeric"
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={`Cantidad de ${label.toLowerCase()}`}
      />
    </div>
  );
};
