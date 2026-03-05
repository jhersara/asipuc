/**
 * COMPONENTE: ConfirmModal
 * Modal de confirmacion sin usar confirm() nativo.
 */

import React from 'react';
import { IoWarningSharp } from 'react-icons/io5';
import './ConfirmModal.css';

export const ConfirmModal = ({ isOpen, title, message, confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar', variant = 'danger', onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-backdrop" onClick={onCancel}>
      <div className="confirm-modal" onClick={e => e.stopPropagation()}>
        <div className={`confirm-modal__icon confirm-modal__icon--${variant}`}>
          <IoWarningSharp />
        </div>
        <h3 className="confirm-modal__title">{title}</h3>
        <p className="confirm-modal__message">{message}</p>
        <div className="confirm-modal__actions">
          <button className="confirm-btn confirm-btn--cancel" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className={`confirm-btn confirm-btn--${variant}`} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
