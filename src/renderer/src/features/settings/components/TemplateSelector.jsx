/**
 * COMPONENTE: TemplateSelector
 * 
 * Selector visual de templates con preview.
 */

import React, { useState } from 'react';
import { useTheme } from '../../../core/hooks/useTheme';
import { getAllTemplates, TEMPLATE_CATEGORIES } from '../../slide-generator/templates';
import { FiAlertOctagon, FiCheckCircle } from 'react-icons/fi';

export const TemplateSelector = () => {
  const { selectedTemplate, changeTemplate } = useTheme();
  const templates = getAllTemplates();
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  /**
   * Seleccionar template
   */
  const handleSelectTemplate = (templateId) => {
    changeTemplate(templateId);
  };

  /**
   * Agrupar templates por categoría
   */
  const templatesByCategory = templates.reduce((acc, template) => {
    const category = template.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(template);
    return acc;
  }, {});

  return (
    <div className="template-selector">
      <h3 className="section-title">Seleccionar Diseño</h3>
      
      <p className="section-description">
        Elige el diseño que mejor se adapte a tu estilo
      </p>

      <div className="templates-container">
        {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
          <div key={category} className="template-category">
            <h4 className="category-title">{TEMPLATE_CATEGORIES[category]}</h4>
            
            <div className="templates-grid">
              {categoryTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`template-card ${selectedTemplate === template.id ? 'selected' : ''} ${hoveredTemplate === template.id ? 'hovered' : ''}`}
                  onClick={() => handleSelectTemplate(template.id)}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                >
                  {/* Preview del template */}
                  <div className="template-preview">
                    <div className={`template-preview-${template.id}`}>
                      {/* Simulación visual del template */}
                      {template.id === 'modern' && (
                        <div className="preview-modern">
                          <div className="preview-title">ASISTENCIA</div>
                          <div className="preview-grid">
                            <div className="preview-cell"></div>
                            <div className="preview-cell"></div>
                            <div className="preview-cell"></div>
                            <div className="preview-cell"></div>
                          </div>
                        </div>
                      )}
                      
                      {template.id === 'classic' && (
                        <div className="preview-classic">
                          <div className="preview-title-classic">Asistencia</div>
                          <div className="preview-list">
                            <div className="preview-line"></div>
                            <div className="preview-line"></div>
                            <div className="preview-line"></div>
                          </div>
                        </div>
                      )}
                      
                      {template.id === 'minimal' && (
                        <div className="preview-minimal">
                          <div className="preview-title-minimal">ASISTENCIA</div>
                          <div className="preview-cards">
                            <div className="preview-mini-card"></div>
                            <div className="preview-mini-card"></div>
                            <div className="preview-mini-card"></div>
                          </div>
                        </div>
                      )}
                      
                      {template.id === 'elegant' && (
                        <div className="preview-elegant">
                          <div className="preview-ornament"></div>
                          <div className="preview-title-elegant">ASISTENCIA</div>
                          <div className="preview-elegant-grid">
                            <div className="preview-elegant-line"></div>
                            <div className="preview-elegant-line"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {selectedTemplate === template.id && (
                      <div className="selected-overlay">
                        <span className="check-icon"><FiCheckCircle/></span>
                      </div>
                    )}
                  </div>

                  {/* Info del template */}
                  <div className="template-info">
                    <h5 className="template-name">{template.name}</h5>
                    <p className="template-description">{template.description}</p>
                  </div>

                  {/* Badge de seleccionado */}
                  {selectedTemplate === template.id && (
                    <div className="selected-badge">
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Preview del template seleccionado */}
      <div className="current-template-info">
        <div className="info-icon"><FiAlertOctagon/></div>
        <div>
          <strong>Template Actual:</strong>{' '}
          {templates.find(t => t.id === selectedTemplate)?.name}
        </div>
      </div>
    </div>
  );
};
