import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

// Configurar Base de datos
const dbPath = join(app.getPath('userData'), 'iglesia_database.sqlite');
const db = new Database(dbPath);

// Crear tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS asistencia (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT,
    ancianos INTEGER, adultos INTEGER, jovenes INTEGER,
    adolescentes INTEGER, ninos INTEGER, visitas INTEGER,
    total INTEGER
  )
`);

// Rutas de recursos
const RESOURCES_PATH = is.dev
  ? join(process.cwd(), 'resources')
  : join(process.resourcesPath, 'resources');

const SYSTEM_ASSETS_PATH = join(RESOURCES_PATH, 'assets');
const USER_UPLOADS_PATH = join(RESOURCES_PATH, 'user-uploads');

// Crear directorios si no existen
const ensureDirectories = () => {
  const dirs = [
    join(SYSTEM_ASSETS_PATH, 'fonts'),
    join(SYSTEM_ASSETS_PATH, 'backgrounds'),
    join(SYSTEM_ASSETS_PATH, 'logos'),
    join(USER_UPLOADS_PATH, 'fonts'),
    join(USER_UPLOADS_PATH, 'backgrounds'),
    join(USER_UPLOADS_PATH, 'logos')
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// Escanear recursos
const scanResourcesInDirectory = (dirPath, extensions) => {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  try {
    const files = fs.readdirSync(dirPath);
    return files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return extensions.includes(ext);
      })
      .map(file => ({
        name: file,
        path: join(dirPath, file),
        url: `file://${join(dirPath, file).replace(/\\/g, '/')}`
      }));
  } catch (error) {
    console.error('Error escaneando directorio:', error);
    return [];
  }
};

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Crear directorios
  ensureDirectories();

  // ========================================
  // IPC HANDLERS - BASE DE DATOS
  // ========================================
  
  ipcMain.on('guardar-datos', (event, datos) => {
    try {
      const stmt = db.prepare(`
        INSERT INTO asistencia (fecha, ancianos, adultos, jovenes, adolescentes, ninos, visitas, total)
        VALUES (@fecha, @ancianos, @adultos, @jovenes, @adolescentes, @ninos, @visitas, @total)
      `);
      stmt.run(datos);
      console.log("✅ Registro guardado en BD");
    } catch (error) {
      console.error("❌ Error al guardar en BD:", error);
    }
  });

  // ========================================
  // IPC HANDLERS - RECURSOS
  // ========================================

  // Escanear todos los recursos disponibles
  ipcMain.handle('scan-resources', async () => {
    try {
      const resources = {
        system: {
          fonts: scanResourcesInDirectory(
            join(SYSTEM_ASSETS_PATH, 'fonts'),
            ['.ttf', '.otf', '.woff', '.woff2']
          ),
          backgrounds: scanResourcesInDirectory(
            join(SYSTEM_ASSETS_PATH, 'backgrounds'),
            ['.jpg', '.jpeg', '.png', '.webp']
          ),
          logos: scanResourcesInDirectory(
            join(SYSTEM_ASSETS_PATH, 'logos'),
            ['.png', '.svg']
          )
        },
        user: {
          fonts: scanResourcesInDirectory(
            join(USER_UPLOADS_PATH, 'fonts'),
            ['.ttf', '.otf', '.woff', '.woff2']
          ),
          backgrounds: scanResourcesInDirectory(
            join(USER_UPLOADS_PATH, 'backgrounds'),
            ['.jpg', '.jpeg', '.png', '.webp']
          ),
          logos: scanResourcesInDirectory(
            join(USER_UPLOADS_PATH, 'logos'),
            ['.png', '.svg']
          )
        }
      };

      console.log('✅ Recursos escaneados:', resources);
      return resources;
    } catch (error) {
      console.error('❌ Error escaneando recursos:', error);
      return { system: {}, user: {} };
    }
  });

  // Guardar recurso del usuario
  ipcMain.handle('save-user-resource', async (event, { name, type, data }) => {
    try {
      // Determinar carpeta según tipo
      const typeFolder = type === 'font' ? 'fonts' : 
                        type === 'background' ? 'backgrounds' : 
                        type === 'logo' ? 'logos' : null;

      if (!typeFolder) {
        throw new Error('Tipo de recurso no válido');
      }

      const targetDir = join(USER_UPLOADS_PATH, typeFolder);
      const targetPath = join(targetDir, name);

      // Convertir base64 a buffer
      const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      // Guardar archivo
      fs.writeFileSync(targetPath, buffer);

      console.log(`✅ Recurso guardado: ${name}`);

      return {
        success: true,
        resource: {
          name,
          path: targetPath,
          url: `file://${targetPath.replace(/\\/g, '/')}`
        }
      };
    } catch (error) {
      console.error('❌ Error guardando recurso:', error);
      return { success: false, error: error.message };
    }
  });

  // Eliminar recurso del usuario
  ipcMain.handle('delete-user-resource', async (event, { path, type }) => {
    try {
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
        console.log(`✅ Recurso eliminado: ${path}`);
        return { success: true };
      } else {
        return { success: false, error: 'Archivo no encontrado' };
      }
    } catch (error) {
      console.error('❌ Error eliminando recurso:', error);
      return { success: false, error: error.message };
    }
  });

  // Obtener ruta de recurso
  ipcMain.handle('get-resource-path', async (event, type, filename) => {
    try {
      const typeFolder = type === 'font' ? 'fonts' : 
                        type === 'background' ? 'backgrounds' : 
                        type === 'logo' ? 'logos' : null;

      if (!typeFolder) {
        throw new Error('Tipo no válido');
      }

      // Buscar primero en user uploads, luego en system assets
      let resourcePath = join(USER_UPLOADS_PATH, typeFolder, filename);
      if (!fs.existsSync(resourcePath)) {
        resourcePath = join(SYSTEM_ASSETS_PATH, typeFolder, filename);
      }

      if (fs.existsSync(resourcePath)) {
        return {
          success: true,
          path: resourcePath,
          url: `file://${resourcePath.replace(/\\/g, '/')}`
        };
      }

      return { success: false, error: 'Archivo no encontrado' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // Mostrar diálogo de selección de archivos
  ipcMain.handle('show-open-dialog', async (event, options) => {
    try {
      const result = await dialog.showOpenDialog(options);
      return result;
    } catch (error) {
      console.error('Error en diálogo:', error);
      return { canceled: true };
    }
  });

  // Leer archivo
  ipcMain.handle('read-file', async (event, filePath) => {
    try {
      const data = fs.readFileSync(filePath);
      return {
        success: true,
        data: data.toString('base64')
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // Escribir archivo
  ipcMain.handle('write-file', async (event, filePath, data) => {
    try {
      fs.writeFileSync(filePath, data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
