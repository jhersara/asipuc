# 📁 GUÍA DE ASSETS - ASIPUC

Esta guía explica dónde colocar los archivos de fuentes, imágenes y otros recursos.

---

## 🔤 FUENTES PERSONALIZADAS

### Ubicación:
```
src/renderer/src/assets/fonts/
```

### Tipos de archivos soportados:
- `.ttf` (TrueType Font)
- `.otf` (OpenType Font)
- `.woff` (Web Open Font Format)
- `.woff2` (Web Open Font Format 2 - Recomendado)

### Ejemplo de estructura:
```
src/renderer/src/assets/fonts/
├── Montserrat-Bold.woff2
├── Montserrat-Regular.woff2
├── Roboto-Bold.ttf
├── Roboto-Regular.ttf
├── Impact.ttf
└── BebasNeue-Regular.ttf
```

### Cómo agregar una fuente:

1. **Descarga la fuente** (de Google Fonts, DaFont, etc.)
2. **Copia el archivo** a `src/renderer/src/assets/fonts/`
3. La aplicación la detectará automáticamente
4. Podrás seleccionarla desde el panel de configuración

### Fuentes recomendadas para iglesias:
- **Impact** (títulos grandes y llamativos)
- **Bebas Neue** (moderna y elegante)
- **Montserrat** (limpia y profesional)
- **Oswald** (condensada para espacios reducidos)
- **Poppins** (moderna y legible)

---

## 🖼️ IMÁGENES

### Logos de la iglesia:
```
src/renderer/src/assets/images/logos/
```

**Formatos soportados**: PNG, JPG, SVG  
**Recomendación**: PNG con fondo transparente  
**Tamaño sugerido**: 300x300px o 500x500px

Ejemplo:
```
logos/
├── logo-principal.png
├── logo-blanco.png
└── logo-color.png
```

---

### Fondos para slides:
```
src/renderer/src/assets/images/backgrounds/
```

**Formatos soportados**: PNG, JPG  
**Resolución REQUERIDA**: 1920x1080px (Full HD)  
**Peso recomendado**: < 2MB

Ejemplo:
```
backgrounds/
├── fondo-estrellas.jpg
├── fondo-abstracto.png
├── fondo-oscuro.jpg
└── fondo-iglesia.jpg
```

⚠️ **IMPORTANTE**: Los fondos DEBEN ser exactamente 1920x1080px para evitar recortes o bordes negros.

---

## 📦 IMÁGENES PREDETERMINADAS DEL SISTEMA

### Ubicación para recursos del sistema:
```
resources/images/
```

Esta carpeta es para recursos que vienen incluidos con la aplicación.

Estructura:
```
resources/
├── images/
│   ├── logos/
│   │   └── default-logo.png
│   └── backgrounds/
│       ├── default-dark.jpg
│       └── default-stars.jpg
└── fonts/
    ├── Impact.ttf
    └── Montserrat-Regular.woff2
```

---

## 🎨 PALETA DE COLORES ACTUAL

Basada en la UI moderna que proporcionaste:

- **Amarillo principal**: `#f8d613`
- **Azul oscuro**: `#111835`
- **Azul brillante**: `#0248c1`
- **Blanco**: `#fbfcfc`
- **Violeta/Morado**: `#6366f1` (para acentos UI)

---

## 🔄 CARGA DINÁMICA DE ASSETS

La aplicación permite dos formas de usar assets:

### 1. Assets pre-incluidos (sistema):
- Se colocan en `src/renderer/src/assets/`
- Se importan en el código
- Siempre disponibles

### 2. Assets subidos por el usuario:
- Se seleccionan desde el panel de configuración
- Se guardan en `localStorage` o en la carpeta de datos del usuario
- Persisten entre sesiones

---

## 📝 EJEMPLO DE USO

### Para desarrolladores:
```javascript
// Importar logo predeterminado
import logoDefault from '@/assets/images/logos/default-logo.png';

// Importar fondo predeterminado
import backgroundDefault from '@/assets/images/backgrounds/default-dark.jpg';
```

### Para usuarios finales:
1. Abrir panel de configuración
2. Hacer clic en "Subir logo" o "Subir fondo"
3. Seleccionar archivo desde su computadora
4. La aplicación lo guardará automáticamente

---

## ✅ CHECKLIST DE INSTALACIÓN

Para configurar los assets iniciales:

- [ ] Descargar fuentes recomendadas
- [ ] Copiar fuentes a `src/renderer/src/assets/fonts/`
- [ ] Preparar logos de la iglesia (1-3 variantes)
- [ ] Copiar logos a `src/renderer/src/assets/images/logos/`
- [ ] Preparar fondos en 1920x1080px
- [ ] Copiar fondos a `src/renderer/src/assets/images/backgrounds/`
- [ ] Ejecutar `npm run dev` para probar

---

## 🔗 RECURSOS RECOMENDADOS

### Fuentes gratuitas:
- Google Fonts: https://fonts.google.com
- DaFont: https://www.dafont.com
- Font Squirrel: https://www.fontsquirrel.com

### Imágenes de fondo:
- Unsplash: https://unsplash.com
- Pexels: https://www.pexels.com
- Pixabay: https://pixabay.com

### Herramientas de edición:
- Redimensionar imágenes: https://www.iloveimg.com/resize-image
- Remover fondo: https://www.remove.bg
- Optimizar imágenes: https://tinypng.com

---

## ⚠️ NOTAS IMPORTANTES

1. **Resolución exacta**: Los fondos DEBEN ser 1920x1080px
2. **Formatos de fuente**: Preferir .woff2 (mejor compresión)
3. **Tamaño de archivos**: Mantener < 2MB para rendimiento
4. **Licencias**: Asegurarse de tener derecho a usar las fuentes/imágenes
5. **Nombres de archivos**: Sin espacios, usar guiones: `mi-fondo.jpg` ✅ vs `mi fondo.jpg` ❌
