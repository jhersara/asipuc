/**
 * THEME SELECTOR
 * Componente para cambiar entre temas disponibles
 * 
 * Este es un componente temporal para testing.
 * En la FASE 5 crearemos el panel completo de configuración.
 */

import React from 'react';
import { useTheme } from '../../core/hooks/useTheme';
import { themesList } from '../../core/theme/themes';

const ThemeSelector = () => {
  const { theme, changeTheme } = useTheme();

  const containerStyles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: theme.colors.surface,
    padding: '15px',
    borderRadius: '8px',
    border: `1px solid ${theme.colors.border}`,
    zIndex: 1000,
    minWidth: '200px'
  };

  const labelStyles = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: theme.colors.text
  };

  const selectStyles = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontSize: '14px',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyles}>
      <label style={labelStyles}>🎨 Tema:</label>
      <select 
        value={theme.id} 
        onChange={(e) => changeTheme(e.target.value)}
        style={selectStyles}
      >
        {themesList.map((themeOption) => (
          <option key={themeOption.id} value={themeOption.id}>
            {themeOption.name}
          </option>
        ))}
      </select>
      
      <div style={{ 
        marginTop: '10px', 
        fontSize: '12px', 
        color: theme.colors.textSecondary,
        textAlign: 'center'
      }}>
        Tema actual: <strong>{theme.name}</strong>
      </div>
    </div>
  );
};

export default ThemeSelector;
