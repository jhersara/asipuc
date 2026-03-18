/**
 * PANEL: Estadisticas con filtros de fecha
 */

import React, { useState, useEffect, useMemo } from 'react';
import { IoStatsChartSharp, IoRefreshSharp } from 'react-icons/io5';
import './PanelStats.css';

const FILTERS = [
  { id: 'week',  label: 'Esta semana' },
  { id: 'month', label: 'Este mes'    },
  { id: 'all',   label: 'Todo'        },
];

const CATS = {
  ancianos:'Ancianos', adultos:'Adultos', jovenes:'Jóvenes',
  adolescentes:'Adolescentes', ninos:'Niños', visitas:'Visitas'
};

const filterByPeriod = (records, period) => {
  const now = new Date();
  return records.filter(r => {
    const d = new Date(r.fecha);
    if (period === 'week') {
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      start.setHours(0,0,0,0);
      return d >= start;
    }
    if (period === 'month') {
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }
    return true;
  });
};

const buildStats = (data) => {
  if (!data.length) return null;
  const totals = data.map(r => r.total || 0);
  const sum = totals.reduce((a,b) => a+b, 0);
  const max = Math.max(...totals);
  const min = Math.min(...totals);
  const avg = Math.round(sum / totals.length);
  const cats = Object.fromEntries(Object.keys(CATS).map(k => [k, 0]));
  data.forEach(r => Object.keys(cats).forEach(k => { cats[k] += Number(r[k]||0); }));
  return { sum, max, min, avg, cats, count: data.length };
};

export const PanelStats = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState('month');
  const [error, setError]           = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await window.api?.getHistorial?.();
      if (res?.success) setAllRecords(res.data || []);
      else setError('No se pudo cargar el historial.');
    } catch {
      setError('Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const filtered = filterByPeriod(allRecords, filter);
    return buildStats(filtered);
  }, [allRecords, filter]);

  const maxCat = stats ? Math.max(...Object.values(stats.cats), 1) : 1;

  if (loading) return (
    <div className="panel-empty">
      <div className="history-spinner" />
      <p>Cargando estadísticas...</p>
    </div>
  );

  if (error) return (
    <div className="panel-empty">
      <IoStatsChartSharp className="panel-empty__icon" />
      <p style={{ color:'#ff7b88' }}>{error}</p>
      <button className="history-reload" onClick={load}><IoRefreshSharp /> Reintentar</button>
    </div>
  );

  return (
    <div className="panel-stats">

      {/* Filtros */}
      <div className="stats-filters">
        {FILTERS.map(f => (
          <button
            key={f.id}
            className={`stats-filter ${filter === f.id ? 'stats-filter--active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
        <button className="stats-refresh" onClick={load} title="Actualizar">
          <IoRefreshSharp />
        </button>
      </div>

      {!stats ? (
        <div className="panel-empty" style={{ minHeight: 140 }}>
          <IoStatsChartSharp className="panel-empty__icon" />
          <p>Sin registros en este período.</p>
          <span>Prueba cambiando el filtro a "Todo".</span>
        </div>
      ) : (
        <>
          <p className="stats-subtitle">
            {stats.count} registro{stats.count !== 1 ? 's' : ''} — {FILTERS.find(f=>f.id===filter)?.label}
          </p>

          <div className="stats-grid">
            <div className="stats-card stats-card--blue">
              <span>Total acumulado</span>
              <strong>{stats.sum}</strong>
            </div>
            <div className="stats-card stats-card--green">
              <span>Promedio</span>
              <strong>{stats.avg}</strong>
            </div>
            <div className="stats-card stats-card--yellow">
              <span>Máximo</span>
              <strong>{stats.max}</strong>
            </div>
            <div className="stats-card stats-card--red">
              <span>Mínimo</span>
              <strong>{stats.min}</strong>
            </div>
          </div>

          <h4 className="stats-section-title">Distribución por categoría</h4>
          <div className="stats-bars">
            {Object.entries(stats.cats).map(([key, val]) => (
              <div key={key} className="stats-bar">
                <div className="stats-bar__label">
                  <span>{CATS[key]}</span>
                  <strong>{val}</strong>
                </div>
                <div className="stats-bar__track">
                  <div
                    className="stats-bar__fill"
                    style={{ width: `${(val / maxCat) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
