import React, { useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import './App.css';

function App() {
  // Estado inicial
  const [datos, setDatos] = useState({
    ancianos: 0,
    adultos: 0,
    jovenes: 0,
    adolescentes: 0,
    ninos: 0, // 'niños' a veces da problemas por la ñ, uso 'ninos' internamente
    visitas: 0
  });

  // Calculamos total automáticamente
  const total = Object.values(datos).reduce((acc, curr) => acc + Number(curr), 0);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  // Función 1: Guardar en Base de Datos (Local)
  const guardarEnDB = () => {
    // Usamos el puente (window.api) que crearemos en el preload
    if (window.api) {
      window.api.guardarAsistencia({ ...datos, total, fecha: new Date().toISOString() });
      alert("¡Datos guardados correctamente!");
    } else {
      console.log("API no disponible (¿Estás corriendo en modo web?)");
    }
  };

  // Función 2: Descargar Imagen
  const descargarImagen = () => {
    const nodo = document.getElementById('area-de-captura');
    
    toPng(nodo, { quality: 0.95, backgroundColor: '#000' }) // Asegura fondo negro si no carga imagen
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `Reporte-${new Date().toLocaleDateString().replace(/\//g, '-')}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error al generar la imagen', err);
      });
  };

  return (
    <div className="app-container">
      
      {/* IZQUIERDA: Panel de control para el usuario */}
      <div className="control-panel">
        <h2 style={{textAlign:'center', marginBottom: '10px'}}>REGISTRO</h2>
        
        {/* Generamos los inputs dinámicamente */}
        {Object.keys(datos).map((categoria) => (
          <div className="input-group" key={categoria}>
            <label>{categoria === 'ninos' ? 'NIÑOS' : categoria}</label>
            <input 
              type="number" 
              name={categoria} 
              value={datos[categoria]} 
              onChange={handleChange} 
              min="0"
            />
          </div>
        ))}

        <hr style={{margin: '10px 0'}}/>
        <div style={{fontSize: '20px', textAlign: 'center'}}>TOTAL: <strong>{total}</strong></div>
        
        <button className="btn-action" onClick={guardarEnDB}> Guardar Asistencia</button>
        <button className="btn-action" style={{background:'#28a745'}} onClick={descargarImagen}> Descargar Imagen</button>
      </div>

      {/* DERECHA: La Plantilla Visual (Lo que se convierte en imagen) */}
      <div id="area-de-captura" className="slide-preview">
        {/* LOGO (Opcional, descomentar si tienes logo) */}
        {/* <img src={logo} style={{position: 'absolute', top: 30, left: 30, width: 100}} /> */}

        <h1 className="header-title">ASISTENCIA</h1>

        <div className="grid-container">
          <div className="grid-item">
            <span className="label-text">ANCIANOS</span>
            <span className="number-text">{datos.ancianos}</span>
          </div>
          <div className="grid-item">
            <span className="label-text">ADULTOS</span>
            <span className="number-text">{datos.adultos}</span>
          </div>
          <div className="grid-item">
            <span className="label-text">JÓVENES</span>
            <span className="number-text">{datos.jovenes}</span>
          </div>
          <div className="grid-item">
            <span className="label-text">ADOLESCENTES</span>
            <span className="number-text">{datos.adolescentes}</span>
          </div>
          <div className="grid-item">
            <span className="label-text">NIÑOS</span>
            <span className="number-text">{datos.ninos}</span>
          </div>
          <div className="grid-item">
            <span className="label-text">VISITAS</span>
            <span className="number-text">{datos.visitas}</span>
          </div>
        </div>

        <div className="footer-total">
          TOTAL: {total}
        </div>
      </div>

    </div>
  );
}

export default App;