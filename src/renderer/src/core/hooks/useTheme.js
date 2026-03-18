/**
 * CUSTOM HOOK: useTheme
 * 
 * Hook personalizado para acceder al contexto de temas.
 * Simplifica el acceso al tema en cualquier componente.
 * 
 * Uso:
 * const { theme, changeTheme, updateColor } = useTheme();
 */

import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeProvider';

/**
 * Hook para acceder al sistema de temas
 * 
 * @returns {Object} Objeto con el tema actual y funciones para modificarlo
 * @throws {Error} Si se usa fuera del ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme debe ser usado dentro de un ThemeProvider. ' +
      'Asegúrate de envolver tu aplicación con <ThemeProvider>.'
    );
  }

  return context;
};

/**
 * Hook para obtener solo el tema actual (sin funciones)
 * Útil para componentes que solo necesitan leer el tema
 */
export const useThemeValue = () => {
  const { theme } = useTheme();
  return theme;
};
