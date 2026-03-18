# 📁 ESTRUCTURA DE RECURSOS

Esta carpeta contiene todos los recursos estáticos de la aplicación.

## 📂 Estructura

```
resources/
├── assets/                    # Recursos del sistema (incluidos en la app)
│   ├── fonts/                # Fuentes incluidas por defecto
│   ├── backgrounds/          # Imágenes de fondo predeterminadas
│   └── logos/                # Logos de la iglesia/organización
│
└── user-uploads/             # Recursos subidos por el usuario
    ├── fonts/                # Fuentes personalizadas del usuario
    ├── backgrounds/          # Fondos personalizados del usuario
    └── logos/                # Logos personalizados del usuario
```

---

## 🎨 CÓMO AGREGAR RECURSOS DEL SISTEMA

### 1. Fuentes (resources/assets/fonts/)

**Formatos soportados**: `.ttf`, `.otf`, `.woff`, `.woff2`

**Instrucciones**:
1. Descarga las fuentes que quieras incluir
2. Copia los archivos a: `resources/assets/fonts/`
3. Ejemplo de nombres:
   - `Impact-Regular.ttf`
   - `Bebas-Regular.ttf`
   - `Oswald-Bold.ttf`
   - `Anton-Regular.ttf`

**Fuentes recomendadas para títulos grandes**:
- Impact (muy usada en diseños de iglesia)
- Bebas Neue (moderna y legible)
- Oswald (profesional)
- Anton (bold y llamativa)
- Montserrat Black (versátil)

**Dónde descargar**:
- Google Fonts: https://fonts.google.com
- DaFont: https://www.dafont.com

---

### 2. Imágenes de Fondo (resources/assets/backgrounds/)

**Formatos soportados**: `.jpg`, `.jpeg`, `.png`, `.webp`

**Recomendaciones**:
- Resolución mínima: 1920x1080px
- Resolución recomendada: 3840x2160px (para mejor calidad)
- Peso máximo recomendado: 5MB por imagen
- Preferir JPG para fotos (menor tamaño)

**Instrucciones**:
1. Coloca tus imágenes de fondo en: `resources/assets/backgrounds/`
2. Ejemplos de nombres:
   - `galaxy-background.jpg`
   - `church-background.jpg`
   - `abstract-gold.jpg`
   - `gradient-blue.jpg`

**Tipos de fondos recomendados**:
- Galaxias/espaciales (como el ejemplo)
- Texturas abstractas
- Degradados
- Imágenes con overlay oscuro para mejor legibilidad

**Dónde descargar fondos gratuitos**:
- Unsplash: https://unsplash.com
- Pexels: https://www.pexels.com
- Pixabay: https://pixabay.com

---

### 3. Logos (resources/assets/logos/)

**Formatos soportados**: `.png`, `.svg` (PNG con transparencia recomendado)

**Recomendaciones**:
- Usar PNG con fondo transparente
- Resolución mínima: 500x500px
- Resolución recomendada: 1000x1000px o más

**Instrucciones**:
1. Coloca tus logos en: `resources/assets/logos/`
2. Ejemplos de nombres:
   - `church-logo.png` (logo principal izquierda)
   - `ministry-logo.png` (logo secundario derecha)
   - `watermark.png` (marca de agua inferior)

**Posiciones en el slide**:
- Logo principal: Esquina superior izquierda
- Logo secundario: Esquina superior derecha
- Marca de agua: Esquina inferior derecha

---

## 👤 RECURSOS DEL USUARIO

Los usuarios pueden subir sus propios recursos desde la interfaz de la aplicación.
Estos se guardarán automáticamente en `resources/user-uploads/`.

### Ventajas:
- No requiere acceso al sistema de archivos
- Gestión visual desde la app
- Validación automática de formatos y tamaños
- Preview antes de aplicar

---

## 📋 CHECKLIST INICIAL

Para comenzar a usar la aplicación, sigue estos pasos:

### Paso 1: Agregar Fuente Principal
- [ ] Descarga la fuente "Impact" o "Bebas Neue"
- [ ] Copia el archivo .ttf a `resources/assets/fonts/`

### Paso 2: Agregar Fondo
- [ ] Descarga una imagen de fondo tipo galaxia/espacial
- [ ] Guárdala como `default-background.jpg` en `resources/assets/backgrounds/`
- [ ] Asegúrate que sea 1920x1080px o mayor

### Paso 3: Agregar Logos (Opcional)
- [ ] Exporta el logo de tu iglesia como PNG transparente
- [ ] Guárdalo como `church-logo.png` en `resources/assets/logos/`

### Paso 4: Probar
- [ ] Ejecuta `npm run dev`
- [ ] Abre la aplicación
- [ ] Ve a Configuración → Temas
- [ ] Selecciona los recursos agregados

---

## 🔍 VERIFICAR RECURSOS CARGADOS

La aplicación escaneará automáticamente estas carpetas al iniciar.
Los recursos encontrados aparecerán en los selectores de la interfaz.

---

## ⚠️ NOTAS IMPORTANTES

1. **No cambiar la estructura de carpetas** - La app espera esta organización
2. **Nombres sin espacios** - Usa guiones: `mi-fondo.jpg` no `mi fondo.jpg`
3. **Tamaños grandes** - Mejor calidad para exportación
4. **Respaldo** - Guarda copias de tus recursos personalizados
5. **Licencias** - Asegúrate de tener derechos sobre las imágenes/fuentes

---

## 🎯 PRÓXIMOS PASOS

Una vez agregados los recursos:
1. La app los detectará automáticamente
2. Aparecerán en los selectores de configuración
3. Podrás previsualizarlos antes de aplicarlos
4. Se guardarán en tu configuración personalizada
