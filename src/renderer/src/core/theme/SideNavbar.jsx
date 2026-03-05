/**
 * COMPONENTE: SideNavbar
 * Barra de navegacion lateral derecha con iconos y tooltips.
 */

import React, { useState } from 'react';
import {
  IoSettingsSharp,
  IoStatsChartSharp,
  IoTimeSharp,
  IoInformationCircleSharp,
  IoDownloadSharp,
  IoChevronBackSharp,
  IoChevronForwardSharp,
} from 'react-icons/io5';
import { FaListAlt } from 'react-icons/fa';
import { MdGridOn } from 'react-icons/md';
import './SideNavbar.css';

const NAV_ITEMS = [
  { id: 'services', icon: <FaListAlt />,             label: 'Gestionar Servicios' },
  { id: 'settings', icon: <IoSettingsSharp />,        label: 'Configuracion'       },
  { id: 'export',   icon: <IoDownloadSharp />,        label: 'Exportacion'         },
  { id: 'history',  icon: <IoTimeSharp />,            label: 'Historial'           },
  { id: 'stats',    icon: <IoStatsChartSharp />,      label: 'Estadisticas'        },
  { id: 'about',    icon: <IoInformationCircleSharp />, label: 'Acerca de'         },
];

export const SideNavbar = ({ activePanel, onPanelChange, onExpandChange }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    const next = !expanded;
    setExpanded(next);
    onExpandChange?.(next);
  };

  return (
    <nav className={`side-navbar ${expanded ? 'side-navbar--expanded' : ''}`}>

      {/* Boton expandir/colapsar */}
      <button
        className="side-navbar__toggle"
        onClick={handleToggleExpand}
        aria-label={expanded ? 'Colapsar menu' : 'Expandir menu'}
      >
        <span className="side-navbar__icon">
          {expanded ? <IoChevronForwardSharp /> : <IoChevronBackSharp />}
        </span>
        {expanded && <span className="side-navbar__label">Colapsar</span>}
      </button>

      <div className="side-navbar__logo">
        <MdGridOn />
        {expanded && <span className="side-navbar__app-name">ASIPUC</span>}
      </div>

      <div className="side-navbar__items">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`side-navbar__item ${activePanel === item.id ? 'side-navbar__item--active' : ''}`}
            onClick={() => onPanelChange(activePanel === item.id ? null : item.id)}
            aria-label={item.label}
          >
            <span className="side-navbar__icon">{item.icon}</span>
            {expanded
              ? <span className="side-navbar__label">{item.label}</span>
              : <span className="side-navbar__tooltip">{item.label}</span>
            }
          </button>
        ))}
      </div>
    </nav>
  );
};
