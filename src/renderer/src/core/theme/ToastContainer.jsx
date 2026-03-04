/**
 * COMPONENTE: ToastContainer
 * Notificaciones estilo Discord/Notion — sin alert() ni confirm()
 */

import React from 'react';
import { FiCheck, FiX, FiAlertTriangle, FiInfo, FiTrash2 } from 'react-icons/fi';
import './Toast.css';

const ICONS = {
  success: <FiCheck />,
  error:   <FiTrash2 />,
  warning: <FiAlertTriangle />,
  info:    <FiInfo />,
};

export const ToastContainer = ({ toasts, onRemove }) => {
  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          <div className={`toast__icon-wrap toast__icon-wrap--${toast.type}`}>
            {ICONS[toast.type]}
          </div>
          <div className="toast__body">
            <span className={`toast__title toast__title--${toast.type}`}>
              {toast.title}
            </span>
            {toast.message && (
              <span className="toast__message">{toast.message}</span>
            )}
          </div>
          <button className="toast__close" onClick={() => onRemove(toast.id)}>
            <FiX />
          </button>
        </div>
      ))}
    </div>
  );
};
