/**
 * PANEL: Estadisticas
 */

import React, { useState, useEffect } from 'react';
import { IoStatsChartSharp } from 'react-icons/io5';
import './PanelStats.css';

export const PanelStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadStats(); }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await window.api?.getHistorial?.() || [];
      if (data.length === 0) { setStats(null); setLoading(false); return; }

      const totals = data.map(r => r.total || 0);
      const max    = Math.max(...totals);
      const min    = Math.min(...totals);
      const avg    = Math.round(totals.reduce((a, b) => a + b, 0) / totals.length);
      const sum    = totals.reduce((a, b) => a + b, 0);

      // Categorias acumuladas
      const cats = {
        ancianos: 0, adultos: 0, jovenes: 0,
        adolescentes: 0, ninos: 0, visitas: 0
      };
      data.forEach(r => {
        Object.keys(cats).forEach(k => { cats[k] += Number(r[k] || 0); });
      });

      setStats({ max, min, avg, sum, cats, count: data.length });
    } catch {
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="panel-empty">Cargando estadisticas...</div>;

  if (!stats) {
    return (
      <div className="panel-empty">
        <IoStatsChartSharp className="panel-empty__icon" />
        <p>No hay datos suficientes aun.</p>
        <span>Guarda al menos un registro para ver estadisticas.</span>
      </div>
    );
  }

  const catLabels = {
    ancianos: 'Ancianos', adultos: 'Adultos', jovenes: 'Jovenes',
    adolescentes: 'Adolescentes', ninos: 'Ninos', visitas: 'Visitas'
  };

  const maxCat = Math.max(...Object.values(stats.cats));

  return (
    <div className="panel-stats">
      <p className="stats-subtitle">Basado en {stats.count} registro{stats.count !== 1 ? 's' : ''}</p>

      <div className="stats-grid">
        <div className="stats-card stats-card--blue">
          <span>Total acumulado</span>
          <strong>{stats.sum}</strong>
        </div>
        <div className="stats-card stats-card--green">
          <span>Promedio por servicio</span>
          <strong>{stats.avg}</strong>
        </div>
        <div className="stats-card stats-card--yellow">
          <span>Maximo registrado</span>
          <strong>{stats.max}</strong>
        </div>
        <div className="stats-card stats-card--red">
          <span>Minimo registrado</span>
          <strong>{stats.min}</strong>
        </div>
      </div>

      <h4 className="stats-section-title">Distribucion por categoria</h4>
      <div className="stats-bars">
        {Object.entries(stats.cats).map(([key, val]) => (
          <div key={key} className="stats-bar">
            <div className="stats-bar__label">
              <span>{catLabels[key]}</span>
              <strong>{val}</strong>
            </div>
            <div className="stats-bar__track">
              <div
                className="stats-bar__fill"
                style={{ width: maxCat > 0 ? `${(val / maxCat) * 100}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
