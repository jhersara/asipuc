/**
 * TEMPLATE REGISTRY
 * 
 * Registro centralizado de todos los templates disponibles.
 * Facilita la gestión y selección de templates.
 */

import { ModernTemplate } from './ModernTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { ElegantTemplate } from './ElegantTemplate';

/**
 * Registro de templates
 */
export const TEMPLATES = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  elegant: ElegantTemplate
};

/**
 * Obtener todos los templates con sus metadatos
 */
export const getAllTemplates = () => {
  return Object.values(TEMPLATES).map(Template => ({
    ...Template.metadata,
    component: Template
  }));
};

/**
 * Obtener template por ID
 */
export const getTemplateById = (templateId) => {
  return TEMPLATES[templateId] || TEMPLATES.modern;
};

/**
 * Obtener metadatos de un template
 */
export const getTemplateMetadata = (templateId) => {
  const Template = TEMPLATES[templateId];
  return Template ? Template.metadata : null;
};

/**
 * Categorías de templates
 */
export const TEMPLATE_CATEGORIES = {
  professional: 'Profesional',
  traditional: 'Tradicional',
  modern: 'Moderno',
  luxury: 'Lujo'
};

/**
 * Obtener templates por categoría
 */
export const getTemplatesByCategory = (category) => {
  return getAllTemplates().filter(
    template => template.category === category
  );
};

/**
 * Template por defecto
 */
export const DEFAULT_TEMPLATE_ID = 'modern';
