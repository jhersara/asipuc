/**
 * COMPONENTE: ServiceTabs
 * 
 * Tabs para navegar entre servicios + tab de total acumulado.
 */

import React from 'react';
import { TfiCup } from 'react-icons/tfi';

export const ServiceTabs = ({ 
  services, 
  activeServiceId, 
  onServiceChange,
  showAccumulated = false,
  onShowAccumulated,
  getServiceTotal
}) => {
  return (
    <div className="service-tabs">
      {/* Tabs de servicios individuales */}
      {services.map(service => (
        <button
          key={service.id}
          className={`service-tab ${activeServiceId === service.id && !showAccumulated ? 'active' : ''} ${!service.enabled ? 'disabled' : ''}`}
          onClick={() => {
            onShowAccumulated(false);
            onServiceChange(service.id);
          }}
          disabled={!service.enabled}
        >
          <div className="tab-info">
            <span className="tab-name">{service.name}</span>
            <span className="tab-time">{service.time}</span>
          </div>
          <div className="tab-total">
            {getServiceTotal(service.id)}
          </div>
        </button>
      ))}

      {/* Tab de TOTAL ACUMULADO */}
      <button
        className={`service-tab accumulated-tab ${showAccumulated ? 'active' : ''}`}
        onClick={() => onShowAccumulated(true)}
      >
        <div className="tab-info">
          <span className="tab-name"><TfiCup className='icon'/> TOTAL ACUMULADO</span>
          <span className="tab-time">Todos los servicios</span>
        </div>
        <div className="tab-total total-highlight">
          {services
            .filter(s => s.enabled)
            .reduce((sum, s) => sum + getServiceTotal(s.id), 0)}
        </div>
      </button>
    </div>
  );
};
