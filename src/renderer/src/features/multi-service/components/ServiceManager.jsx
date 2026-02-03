/**
 * COMPONENTE: ServiceManager
 * 
 * Gestión de servicios: agregar, eliminar, editar.
 */

import React, { useState } from 'react';

export const ServiceManager = ({ 
  services, 
  onAddService, 
  onRemoveService,
  onUpdateService,
  onToggleService
}) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceTime, setNewServiceTime] = useState('18:00');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTime, setEditTime] = useState('');

  const handleAddService = () => {
    if (!newServiceName.trim()) {
      alert('Por favor ingresa un nombre para el servicio');
      return;
    }

    onAddService(newServiceName, newServiceTime);
    setNewServiceName('');
    setNewServiceTime('18:00');
    setShowAddDialog(false);
  };

  const startEdit = (service) => {
    setEditingId(service.id);
    setEditName(service.name);
    setEditTime(service.time);
  };

  const saveEdit = (serviceId) => {
    if (!editName.trim()) {
      alert('El nombre no puede estar vacío');
      return;
    }

    onUpdateService(serviceId, {
      name: editName,
      time: editTime
    });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditTime('');
  };

  return (
    <div className="service-manager">
      <div className="manager-header">
        <h3>Gestión de Servicios</h3>
        <button 
          className="btn-add-service"
          onClick={() => setShowAddDialog(!showAddDialog)}
        >
          {showAddDialog ? '✕ Cancelar' : '➕ Agregar Servicio'}
        </button>
      </div>

      {/* Dialog para agregar servicio */}
      {showAddDialog && (
        <div className="add-service-dialog">
          <div className="dialog-field">
            <label>Nombre del Servicio</label>
            <input
              type="text"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              placeholder="Ej: Servicio Noche"
              autoFocus
            />
          </div>
          <div className="dialog-field">
            <label>Hora</label>
            <input
              type="time"
              value={newServiceTime}
              onChange={(e) => setNewServiceTime(e.target.value)}
            />
          </div>
          <button 
            className="btn-confirm-add"
            onClick={handleAddService}
          >
            Agregar
          </button>
        </div>
      )}

      {/* Lista de servicios */}
      <div className="services-list">
        {services.map(service => (
          <div 
            key={service.id} 
            className={`service-item ${!service.enabled ? 'disabled-service' : ''}`}
          >
            {editingId === service.id ? (
              // Modo edición
              <div className="service-edit-mode">
                <div className="edit-fields">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="edit-name-input"
                  />
                  <input
                    type="time"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    className="edit-time-input"
                  />
                </div>
                <div className="edit-actions">
                  <button 
                    className="btn-save-edit"
                    onClick={() => saveEdit(service.id)}
                  >
                    ✓ Guardar
                  </button>
                  <button 
                    className="btn-cancel-edit"
                    onClick={cancelEdit}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              // Modo normal
              <>
                <div className="service-info">
                  <div className="service-name">{service.name}</div>
                  <div className="service-time">{service.time}</div>
                  <div className="service-status">
                    {service.enabled ? '✅ Activo' : '⏸️ Deshabilitado'}
                  </div>
                </div>

                <div className="service-actions">
                  <button
                    className="btn-toggle"
                    onClick={() => onToggleService(service.id)}
                    title={service.enabled ? 'Deshabilitar' : 'Habilitar'}
                  >
                    {service.enabled ? '⏸️' : '▶️'}
                  </button>
                  
                  <button
                    className="btn-edit"
                    onClick={() => startEdit(service)}
                  >
                    ✏️
                  </button>

                  {services.length > 1 && (
                    <button
                      className="btn-delete"
                      onClick={() => {
                        if (confirm(`¿Eliminar "${service.name}"?`)) {
                          onRemoveService(service.id);
                        }
                      }}
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
