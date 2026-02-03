import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  // Asistencia
  guardarAsistencia: (datos) => ipcRenderer.send('guardar-datos', datos),
  
  // Recursos - Escaneo
  scanResources: () => ipcRenderer.invoke('scan-resources'),
  
  // Recursos - Guardado
  saveUserResource: (data) => ipcRenderer.invoke('save-user-resource', data),
  
  // Recursos - Eliminación
  deleteUserResource: (data) => ipcRenderer.invoke('delete-user-resource', data),
  
  // Recursos - Obtener rutas
  getResourcePath: (type, filename) => ipcRenderer.invoke('get-resource-path', type, filename),
  
  // Diálogo de archivos
  showOpenDialog: (options) => ipcRenderer.invoke('show-open-dialog', options),
  
  // Sistema de archivos
  readFile: (path) => ipcRenderer.invoke('read-file', path),
  writeFile: (path, data) => ipcRenderer.invoke('write-file', path, data)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
