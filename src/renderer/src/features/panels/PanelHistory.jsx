/**
 * PANEL: Historial
 * Muestra y permite eliminar registros de la BD.
 */

import React, { useState, useEffect } from 'react';
import { IoTimeSharp, IoTrashSharp, IoRefreshSharp } from 'react-icons/io5';
import './PanelHistory.css';

const CATS = ['ancianos','adultos','jovenes','adolescentes','ninos','visitas'];
const LABELS = {
  ancianos:'Ancianos', adultos:'Adultos', jovenes:'Jóvenes',
  adolescentes:'Adolescentes', ninos:'Niños', visitas:'Visitas'
};

export const PanelHistory = () => {
  const [records, setRecords]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError]       = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await window.api?.getHistorial?.();
      if (res?.success) setRecords(res.data || []);
      else setError('No se pudo cargar el historial.');
    } catch (e) {
      setError('Error de conexión con la base de datos.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      const res = await window.api?.deleteHistorialItem?.(id);
      if (res?.success) setRecords(prev => prev.filter(r => r.id !== id));
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString('es-CO', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch { return iso; }
  };

  if (loading) return (
    <div className="panel-empty">
      <div className="history-spinner" />
      <p>Cargando registros...</p>
    </div>
  );

  if (error) return (
    <div className="panel-empty">
      <IoTimeSharp className="panel-empty__icon" />
      <p style={{ color: '#ff7b88' }}>{error}</p>
      <button className="history-reload" onClick={load}>
        <IoRefreshSharp /> Reintentar
      </button>
    </div>
  );

  if (records.length === 0) return (
    <div className="panel-empty">
      <IoTimeSharp className="panel-empty__icon" />
      <p>No hay registros guardados aún.</p>
      <span>Los datos aparecen aquí después de guardar asistencia.</span>
    </div>
  );

  return (
    <div className="panel-history">
      <div className="history-meta">
        <span>{records.length} registro{records.length !== 1 ? 's' : ''}</span>
        <button className="history-reload" onClick={load}>
          <IoRefreshSharp /> Actualizar
        </button>
      </div>

      {records.map((r) => (
        <div key={r.id} className="history-card">
          <div className="history-card__header">
            <div>
              <div className="history-card__service">
                {r.serviceName || 'Servicio'}
                {r.serviceTime && <span className="history-card__time">{r.serviceTime}</span>}
              </div>
              <div className="history-card__date">{formatDate(r.fecha)}</div>
            </div>
            <button
              className="history-card__delete"
              onClick={() => handleDelete(r.id)}
              disabled={deleting === r.id}
              title="Eliminar registro"
            >
              <IoTrashSharp />
            </button>
          </div>

          <div className="history-card__grid">
            {CATS.map(k => (
              <div key={k} className="history-card__item">
                <span>{LABELS[k]}</span>
                <strong>{r[k] ?? 0}</strong>
              </div>
            ))}
          </div>

          <div className="history-card__total">
            TOTAL: <strong>{r.total}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};
