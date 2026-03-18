# ASIPUC

Aplicacion de escritorio para la gestion y visualizacion de asistencia eclesiastica. Permite registrar la asistencia por categorias, generar slides de presentacion con imagen de fondo personalizada y exportarlos en resolucion Full HD (1920x1080).

---

## Tecnologias

- Electron 39
- React 19
- Vite + electron-vite
- better-sqlite3
- html-to-image

---

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

---

## Instalacion

```bash
git clone https://github.com/TU_USUARIO/asipuc.git
cd asipuc
npm install
```

---

## Uso en desarrollo

```bash
npm run dev
```

---

## Compilar instalador

**Windows:**
```bash
npm run build:win
```

El instalador se genera en la carpeta `dist/` con el nombre `asipuc-1.0.0-setup.exe`.

---

## Estructura del proyecto

```
asipuc/
├── build/                  # Iconos para el empaquetado
│   └── icon.ico
├── resources/
│   ├── assets/
│   │   └── backgrounds/    # Fondos del sistema
│   ├── user-uploads/       # Archivos subidos por el usuario
│   └── icon.png
├── src/
│   ├── main/               # Proceso principal de Electron
│   │   └── index.js
│   ├── preload/            # Bridge IPC
│   │   └── index.js
│   └── renderer/           # Aplicacion React
│       └── src/
│           ├── core/       # Temas, hooks y servicios globales
│           ├── features/   # Modulos funcionales
│           └── shared/     # Utilidades compartidas
```

---

## Funcionalidades

- Registro de asistencia por categorias: ancianos, adultos, jovenes, adolescentes, ninos y visitas
- Soporte para multiples servicios por dia con totales acumulados
- Generacion de slides con 4 templates: Moderno, Clasico, Minimal y Elegante
- Imagen de fondo personalizable con galeria de fondos disponibles
- Configuracion de logos (principal, secundario y marca de agua)
- Hashtag configurable con posicion ajustable
- Exportacion de slides en PNG a 1920x1080
- Exportacion por lotes de todos los servicios
- Guardado de registros en base de datos SQLite local
- Persistencia de configuracion entre sesiones

---

## Configuracion de recursos

Para agregar fondos predeterminados al sistema, coloca imagenes JPG, PNG o WEBP en:

```
resources/assets/backgrounds/
```

Para agregar logos predeterminados:

```
resources/assets/logos/
```

---

## Licencia

Uso privado. Todos los derechos reservados.