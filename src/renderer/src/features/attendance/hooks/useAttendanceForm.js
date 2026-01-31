/**
 * CUSTOM HOOK: useAttendance
 * 
 * Maneja toda la lógica de asistencia:
 * - Estado de los datos
 * - Validaciones
 * - Cálculo de totales
 * - Guardado en base de datos
 * 
 * Separa la lógica de negocio de la UI (Single Responsibility Principle)
 */

import { useState, useCallback, useMemo } from 'react';
import { ATTENDANCE_CATEGORIES } from '../../../core/config/constants';

/**
 * Hook para manejar asistencia
 * 
 * @param {Object} initialData - Datos iniciales (opcional)
 * @returns {Object} Estado y funciones para manejar asistencia
 */
export const useAttendance = (initialData = {}) => {
  // Estado inicial basado en las categorías definidas
  const getInitialState = () => {
    const initial = {};
    ATTENDANCE_CATEGORIES.forEach(category => {
      initial[category.key] = initialData[category.key] || 0;
    });
    return initial;
  };

  const [data, setData] = useState(getInitialState);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  /**
   * Calcular total automáticamente
   * Usa useMemo para evitar recálculos innecesarios
   */
  const total = useMemo(() => {
    return Object.values(data).reduce((acc, curr) => acc + Number(curr), 0);
  }, [data]);

  /**
   * Actualizar un campo específico
   */
  const updateField = useCallback((fieldName, value) => {
    // Validar que el valor sea un número no negativo
    const numValue = Math.max(0, parseInt(value) || 0);
    
    setData(prev => ({
      ...prev,
      [fieldName]: numValue
    }));
  }, []);

  /**
   * Actualizar múltiples campos
   */
  const updateMultipleFields = useCallback((updates) => {
    setData(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  /**
   * Resetear todos los campos a cero
   */
  const reset = useCallback(() => {
    setData(getInitialState());
    setSaveError(null);
  }, []);

  /**
   * Guardar en base de datos
   */
  const save = useCallback(async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      if (window.api) {
        const dataToSave = {
          ...data,
          total,
          fecha: new Date().toISOString()
        };

        await window.api.guardarAsistencia(dataToSave);
        return { success: true, data: dataToSave };
      } else {
        throw new Error('API no disponible');
      }
    } catch (error) {
      console.error('Error al guardar asistencia:', error);
      setSaveError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsSaving(false);
    }
  }, [data, total]);

  /**
   * Validar si hay datos ingresados
   */
  const hasData = useMemo(() => {
    return total > 0;
  }, [total]);

  /**
   * Obtener datos formateados para exportar
   */
  const getFormattedData = useCallback(() => {
    return ATTENDANCE_CATEGORIES.map(category => ({
      key: category.key,
      label: category.label,
      value: data[category.key]
    }));
  }, [data]);

  return {
    data,
    total,
    updateField,
    updateMultipleFields,
    reset,
    save,
    isSaving,
    saveError,
    hasData,
    getFormattedData
  };
};
