/**
 * HOOK: useMultiService
 * 
 * Gestiona múltiples servicios con datos independientes.
 * Calcula totales acumulados automáticamente.
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import { ATTENDANCE_CATEGORIES } from '../../../core/config/constants';

const DEFAULT_SERVICES = [
  { id: 1, name: 'Servicio Mañana', time: '09:00', enabled: true },
  { id: 2, name: 'Servicio Tarde', time: '16:00', enabled: true }
];

const STORAGE_KEY = 'asipuc_services_data';

export const useMultiService = () => {
  // Servicios disponibles
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem('asipuc_services_config');
      return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
    } catch {
      return DEFAULT_SERVICES;
    }
  });

  // Servicio actualmente seleccionado
  const [activeServiceId, setActiveServiceId] = useState(1);

  // Datos de asistencia por servicio
  const [servicesData, setServicesData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error cargando datos:', error);
    }

    // Inicializar datos vacíos para cada servicio
    const initialData = {};
    DEFAULT_SERVICES.forEach(service => {
      initialData[service.id] = getEmptyServiceData();
    });
    return initialData;
  });

  /**
   * Obtener datos vacíos para un servicio
   */
  function getEmptyServiceData() {
    const data = {};
    ATTENDANCE_CATEGORIES.forEach(cat => {
      data[cat.key] = 0;
    });
    return data;
  }

  /**
   * Guardar en localStorage cuando cambian los datos
   */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(servicesData));
    } catch (error) {
      console.error('Error guardando datos:', error);
    }
  }, [servicesData]);

  /**
   * Guardar configuración de servicios
   */
  useEffect(() => {
    try {
      localStorage.setItem('asipuc_services_config', JSON.stringify(services));
    } catch (error) {
      console.error('Error guardando servicios:', error);
    }
  }, [services]);

  /**
   * Obtener datos del servicio activo
   */
  const activeServiceData = useMemo(() => {
    return servicesData[activeServiceId] || getEmptyServiceData();
  }, [servicesData, activeServiceId]);

  /**
   * Calcular total de un servicio
   */
  const getServiceTotal = useCallback((serviceId) => {
    const data = servicesData[serviceId] || getEmptyServiceData();
    return Object.values(data).reduce((acc, val) => acc + Number(val), 0);
  }, [servicesData]);

  /**
   * Total del servicio activo
   */
  const activeServiceTotal = useMemo(() => {
    return getServiceTotal(activeServiceId);
  }, [getServiceTotal, activeServiceId]);

  /**
   * Calcular TOTAL ACUMULADO de todos los servicios habilitados
   */
  const accumulatedTotal = useMemo(() => {
    return services
      .filter(s => s.enabled)
      .reduce((total, service) => {
        return total + getServiceTotal(service.id);
      }, 0);
  }, [services, getServiceTotal]);

  /**
   * Obtener datos acumulados (suma de todos los servicios)
   */
  const accumulatedData = useMemo(() => {
    const accumulated = getEmptyServiceData();
    
    services
      .filter(s => s.enabled)
      .forEach(service => {
        const serviceData = servicesData[service.id] || getEmptyServiceData();
        ATTENDANCE_CATEGORIES.forEach(cat => {
          accumulated[cat.key] += Number(serviceData[cat.key] || 0);
        });
      });

    return accumulated;
  }, [services, servicesData]);

  /**
   * Actualizar un campo del servicio activo
   */
  const updateField = useCallback((fieldName, value) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    
    setServicesData(prev => ({
      ...prev,
      [activeServiceId]: {
        ...(prev[activeServiceId] || getEmptyServiceData()),
        [fieldName]: numValue
      }
    }));
  }, [activeServiceId]);

  /**
   * Cambiar servicio activo
   */
  const changeService = useCallback((serviceId) => {
    setActiveServiceId(serviceId);
  }, []);

  /**
   * Agregar nuevo servicio
   */
  const addService = useCallback((name = 'Nuevo Servicio', time = '12:00') => {
    const newId = Math.max(...services.map(s => s.id), 0) + 1;
    const newService = {
      id: newId,
      name,
      time,
      enabled: true
    };

    setServices(prev => [...prev, newService]);
    setServicesData(prev => ({
      ...prev,
      [newId]: getEmptyServiceData()
    }));

    return newId;
  }, [services]);

  /**
   * Eliminar servicio
   */
  const removeService = useCallback((serviceId) => {
    if (services.length <= 1) {
      alert('Debe haber al menos un servicio');
      return;
    }

    setServices(prev => prev.filter(s => s.id !== serviceId));
    
    setServicesData(prev => {
      const newData = { ...prev };
      delete newData[serviceId];
      return newData;
    });

    // Si eliminamos el servicio activo, cambiar al primero disponible
    if (serviceId === activeServiceId) {
      const remaining = services.filter(s => s.id !== serviceId);
      if (remaining.length > 0) {
        setActiveServiceId(remaining[0].id);
      }
    }
  }, [services, activeServiceId]);

  /**
   * Actualizar nombre/hora de servicio
   */
  const updateService = useCallback((serviceId, updates) => {
    setServices(prev => prev.map(s => 
      s.id === serviceId ? { ...s, ...updates } : s
    ));
  }, []);

  /**
   * Toggle habilitado/deshabilitado
   */
  const toggleService = useCallback((serviceId) => {
    setServices(prev => prev.map(s => 
      s.id === serviceId ? { ...s, enabled: !s.enabled } : s
    ));
  }, []);

  /**
   * Resetear datos de un servicio
   */
  const resetService = useCallback((serviceId) => {
    setServicesData(prev => ({
      ...prev,
      [serviceId]: getEmptyServiceData()
    }));
  }, []);

  /**
   * Resetear todos los servicios
   */
  const resetAll = useCallback(() => {
    const emptyData = {};
    services.forEach(service => {
      emptyData[service.id] = getEmptyServiceData();
    });
    setServicesData(emptyData);
  }, [services]);

  /**
   * Guardar en base de datos
   */
  const saveAll = useCallback(async () => {
    try {
      if (!window.api) {
        throw new Error('API no disponible');
      }

      const promises = services
        .filter(s => s.enabled)
        .map(service => {
          const data = servicesData[service.id] || getEmptyServiceData();
          return window.api.guardarAsistencia({
            ...data,
            total: getServiceTotal(service.id),
            fecha: new Date().toISOString(),
            serviceName: service.name,
            serviceTime: service.time
          });
        });

      await Promise.all(promises);
      return { success: true };
    } catch (error) {
      console.error('Error guardando:', error);
      return { success: false, error: error.message };
    }
  }, [services, servicesData, getServiceTotal]);

  /**
   * Obtener datos formateados para un servicio
   */
  const getFormattedData = useCallback((serviceId) => {
    const data = servicesData[serviceId] || getEmptyServiceData();
    return ATTENDANCE_CATEGORIES.map(cat => ({
      key: cat.key,
      label: cat.label,
      value: data[cat.key]
    }));
  }, [servicesData]);

  /**
   * Obtener datos formateados del total acumulado
   */
  const getFormattedAccumulatedData = useCallback(() => {
    return ATTENDANCE_CATEGORIES.map(cat => ({
      key: cat.key,
      label: cat.label,
      value: accumulatedData[cat.key]
    }));
  }, [accumulatedData]);

  return {
    // Servicios
    services,
    activeServiceId,
    changeService,
    addService,
    removeService,
    updateService,
    toggleService,

    // Datos del servicio activo
    activeServiceData,
    activeServiceTotal,
    updateField,
    resetService,

    // Datos acumulados
    accumulatedData,
    accumulatedTotal,

    // Utilidades
    getServiceTotal,
    getFormattedData,
    getFormattedAccumulatedData,
    saveAll,
    resetAll
  };
};
