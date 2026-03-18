/**
 * COMPONENTE: TotalDisplay
 * 
 * Muestra el total de asistencia de forma destacada.
 */

import React from 'react';

export const TotalDisplay = ({ total }) => {
  return (
    <div className="total-display">
      <span className="total-label">TOTAL:</span>
      <span className="total-value">{total}</span>
    </div>
  );
};
