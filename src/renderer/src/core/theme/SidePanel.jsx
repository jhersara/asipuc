/**
 * COMPONENTE: SidePanel
 * Panel lateral que se abre desde el navbar.
 */

import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import './SidePanel.css';

export const SidePanel = ({ title, isOpen, onClose, children, navWidth = 60 }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="side-panel-backdrop" onClick={onClose} />
      <div className="side-panel" style={{ right: `${navWidth}px` }}>
        <div className="side-panel__header">
          <h2 className="side-panel__title">{title}</h2>
          <button className="side-panel__close" onClick={onClose}>
            <IoCloseSharp />
          </button>
        </div>
        <div className="side-panel__content">
          {children}
        </div>
      </div>
    </>
  );
};
