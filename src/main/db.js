// Estructura básica de la tabla
// CREATE TABLE asistencia (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   fecha TEXT,
//   niños INTEGER,
//   adolescentes INTEGER,
//   jovenes INTEGER,
//   adultos INTEGER,
//   ancianos INTEGER,
//   visitas INTEGER,
//   total INTEGER
// )

const sqlite3 = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');

// Guardamos la DB en la carpeta de datos del usuario para que no se borre al actualizar
const dbPath = path.join(app.getPath('userData'), 'asistencia.db');
const db = new sqlite3(dbPath);

// Creamos la tabla en caso de que no esxitas
db.exec(`
  CREATE TABLE IF NOT EXISTS asistencias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT,
    ancianos INTEGER,
    adultos INTEGER,
    jovenes INTEGER,
    adolescentes INTEGER,
    ninos INTEGER,
    visitas INTEGER,
    total INTEGER
  )
`);

export default db;
