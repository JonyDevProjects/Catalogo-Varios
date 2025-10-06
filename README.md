# Catálogo Refactorizado - Sistema Basado en Objetos

## 📁 Estructura del Proyecto

```
/
├── Articulos.json          # 🎯 Base de datos principal (objetos estructurados)
├── catalog.js              # 🚀 Motor del catálogo (renderizado dinámico)
├── i## 📊 Sistema de Reportes Profesionales

### Generación Automática de Informes HTML

El sistema incluye un generador de reportes profesionales que analiza los productos vendidos y genera informes empresariales optimizados para visualización e impresión.

#### Script de Generación: `generar_resumen.py`

```python
# Ejecutar para generar informe de ventas
python3 generar_resumen.py
```

**Características del Reporte:**
- ✅ **Análisis automático** de productos vendidos por categorías
- ✅ **Diseño profesional** con paleta sobria (#2c3e50, #34495e)
- ✅ **Resumen ejecutivo** con estadísticas clave
- ✅ **Tablas detalladas** por tipo de producto
- ✅ **Cálculos automáticos** de totales y promedios
- ✅ **Optimización para impresión** A4 con estilos específicos

#### Archivo Generado: `resumen_vendidos.html`

**Contenido del Informe:**
1. **Resumen Ejecutivo Dashboard**
   - Total de productos vendidos
   - Valor total de ventas
   - Precio promedio por unidad

2. **Análisis por Categorías**
   - Cuadros vendidos (cantidad y valor)
   - Artículos varios vendidos (cantidad y valor)

3. **Tablas Detalladas**
   - Información completa de cada producto vendido
   - Precios, medidas, materiales y estados

4. **Sección de Firma Profesional**
   - Fecha de generación automática
   - Espacio para firma del responsable

### 🖨️ Optimización para Impresión

**Características de Impresión:**
- **Formato A4** con márgenes apropiados (2cm todos los lados)
- **Tipografía optimizada** (Segoe UI, 11pt base)
- **Colores en escala de grises** para impresión económica
- **Elementos ocultos** innecesarios (botones, enlaces)
- **Prevención de saltos** de página en elementos críticos
- **Headers y footers** automáticos con numeración

**Acceso al Informe:**
```bash
# Servidor local para visualización
python3 -m http.server 8003
# Abrir: http://localhost:8003/resumen_vendidos.html
```

### 📈 Estadísticas Actuales del Catálogo

**Estado del inventario (ejemplo):**
- 📦 **Total productos:** 60+ items
- 🎨 **Cuadros:** 40+ obras de arte
- 🔧 **Artículos varios:** 20+ items coleccionables
- 🟣 **Vendidos:** 8 productos (125€ facturados)
- 🔴 **Reservados:** Variable según demanda
- 🟢 **Disponibles:** Mayoría del catálogo

## 🎉 Resultado

El catálogo ahora es:
- **Más fácil de mantener**: Solo editar JSON
- **Más escalable**: Propiedades flexibles
- **Más organizado**: Separación clara de responsabilidades
- **Igual de funcional**: Toda la experiencia de usuario preservada
- **Profesionalmente reportado**: Informes empresariales automáticos
- **Optimizado para impresión**: Documentos listos para negocioml              # 🎨 Interfaz de usuario (simplificada)
├── index.css               # 💄 Estilos visuales
├── index.js                # ⚠️  Obsoleto (solo compatibilidad)
├── imagenes_jpg/           # 🖼️  Imágenes del catálogo
└── [archivos de respaldo]  # 📦 Versiones anteriores
```

## 🚀 Nueva Arquitectura

### 1. **Articulos.json** - Datos Centralizados
```json
{
  "cuadros": [
    {
      "id": "cuadro1",
      "categoria": "Cuadro",
      "titulo": "Cuadro 1: Oleo sobre tabla",
      "descripcion": "Paisaje de la Pampa argentina en tonos cálidos.",
      "autor": "Liscarinci",
      "tecnica": "Óleo sobre tabla",
      "medidas": "59 x 49 cm",
      "precio": 50,
      "imagenes": ["imagenes_jpg/Cuadro1.jpg", "imagenes_jpg/Cuadro1_1.jpg"],
      "alt": "Óleo sobre tabla: Pampa argentina",
      "adUrl": "https://es.wallapop.com/item/...",
      "reservado": false,
      "vendido": false
    }
  ],
  "articulos": [
    {
      "id": "articulo1",
      "categoria": "Coleccionismo",
      "titulo": "Tocadiscos Portable Vintage",
      "material": "Piel y plástico",
      "precio": 50,
      // ... más propiedades
    }
  ]
}
```

### 2. **catalog.js** - Motor de Renderizado
- **Clase CatalogRenderer**: Gestión completa del catálogo
- **Carga dinámica**: Fetch de Articulos.json
- **Renderizado inteligente**: Generación automática de HTML
- **Funcionalidades preservadas**: Lightbox, filtros, galerías, indicadores

### 3. **index.html** - Interfaz Simplificada
- Solo estructura base y contenedores
- Sin contenido hardcodeado
- Carga dinámica de todo el contenido

## ✅ Funcionalidades Mantenidas

- ✅ **Lightbox** con navegación y dots
- ✅ **Galerías** con auto-detección de variantes de imagen
- ✅ **Filtros** dinámicos por autor y técnica
- ✅ **Sistema de estados** (VENDIDO/RESERVADO/DISPONIBLE)
- ✅ **Botones de anuncio** con enlaces a Wallapop
- ✅ **Navegación** entre secciones (Cuadros/Artículos Varios)
- ✅ **Diseño responsive** y experiencia de usuario original

## 🎯 Beneficios de la Refactorización

### **Mantenimiento Simplificado**
- ➕ Añadir artículo: Solo editar JSON
- ✏️ Modificar precio: Solo cambiar valor en JSON
- 🔄 Actualizar enlace: Solo editar URL en JSON

### **Escalabilidad**
- 📈 Soporte para propiedades ilimitadas
- 🏷️ Categorización flexible
- 🔍 Filtros automáticos basados en datos

### **Separación de Responsabilidades**
- 📊 **Datos**: Articulos.json
- 🎨 **Vista**: index.html + index.css  
- ⚙️ **Lógica**: catalog.js

## � Gestión de Estados de Productos

### Marcar como VENDIDO:
```json
{
  "reservado": false,
  "vendido": true    // ← Cambiar a true
}
```

### Marcar como RESERVADO:
```json
{
  "reservado": true,   // ← Cambiar a true
  "vendido": false
}
```

### Marcar como DISPONIBLE:
```json
{
  "reservado": false,  // ← Ambos en false
  "vendido": false
}
```

### Cambio de Estado RESERVADO → VENDIDO:
```json
{
  "reservado": true,   // ← Puede quedar true o false
  "vendido": true      // ← Cambiar a true (tiene prioridad)
}
```

## �📝 Cómo Añadir Nuevos Artículos

### Cuadro:
```json
{
  "id": "cuadro43",
  "categoria": "Cuadro",
  "titulo": "Nuevo Cuadro",
  "descripcion": "Descripción del cuadro",
  "autor": "Nombre del Autor",
  "tecnica": "Técnica utilizada",
  "medidas": "dimensiones",
  "precio": 100,
  "imagenes": ["ruta/imagen.jpg"],
  "alt": "Texto alternativo",
  "adUrl": "https://enlace-opcional.com",
  "reservado": false,
  "vendido": false
}
```

### Artículo Varios:
```json
{
  "id": "articulo19",
  "categoria": "Nueva Categoría",
  "titulo": "Nuevo Artículo",
  "descripcion": "Descripción del artículo",
  "material": "Material del que está hecho",
  "medidas": "dimensiones",
  "precio": 50,
  "imagenes": ["ruta/imagen.jpg"],
  "alt": "Texto alternativo",
  "adUrl": "https://enlace-opcional.com",
  "reservado": false,
  "vendido": false
}
```

## 🔧 Propiedades Flexibles

### Propiedades Comunes:
- `id`: Identificador único
- `categoria`: Categoría del artículo
- `titulo`: Título mostrado
- `descripcion`: Descripción
- `precio`: Precio numérico (0 = "Consultar")
- `precioDes`: Descripción personalizada del precio
- `imagenes`: Array de rutas de imágenes
- `alt`: Texto alternativo para accesibilidad
- `adUrl`: Enlace al anuncio (opcional)
- `reservado`: true/false
- `vendido`: true/false

### Específicas de Cuadros:
- `autor`: Autor de la obra
- `tecnica`: Técnica artística

### Específicas de Artículos:
- `material`: Material del artículo

## 🎯 Sistema de Estados de Productos

### Jerarquía de Estados (por prioridad visual):
1. **🟣 VENDIDO** - Máxima prioridad
   - Color: Violeta (`#7c3aed`)
   - Efectos: Animación pulsante, borde especial, gradiente de fondo
   - Imagen: Opacidad reducida con filtro grayscale sutil
   
2. **🔴 RESERVADO** - Media prioridad
   - Color: Rojo (`#dc2626`)
   - Efectos: Overlay sutil de color
   
3. **🟢 DISPONIBLE** - Mínima prioridad
   - Color: Verde (`#16a34a`)
   - Efectos: Estilo estándar

### Configuración de Estados:
```json
{
  "reservado": false,  // true = producto reservado
  "vendido": true      // true = producto vendido (prioridad sobre reservado)
}
```

### Comportamiento:
- Si `vendido: true` → Muestra "VENDIDO" (ignora estado reservado)
- Si `vendido: false` y `reservado: true` → Muestra "RESERVADO"
- Si ambos `false` → Muestra "DISPONIBLE"

## 🔧 Propiedades Flexibles

## 🔄 Migración Completada

- ✅ **42 Cuadros** migrados con todas sus propiedades
- ✅ **18 Artículos** varios migrados
- ✅ **Enlaces de Wallapop** preservados
- ✅ **Sistema de estados** implementado (vendido/reservado/disponible)
- ✅ **Múltiples imágenes** por artículo soportadas

## 📚 Archivos de Respaldo

- `index-old.html`: HTML original
- `index-old.js`: JavaScript original
- `index-new.html`: Versión refactorizada (ahora index.html)

## � Características Visuales del Sistema de Estados

### Estado VENDIDO:
- **Badge violeta** con animación `pulseGlow`
- **Borde especial** en la tarjeta del producto
- **Gradiente de fondo** sutil violeta
- **Efecto en imagen**: Opacidad 75% + grayscale 10%
- **Interactividad**: Hover restaura opacidad normal

### Estado RESERVADO:
- **Badge rojo** estándar
- **Overlay rojizo** muy sutil en la tarjeta
- **Estilo tradicional** sin efectos especiales

### Estado DISPONIBLE:
- **Badge verde** estándar
- **Estilo limpio** sin efectos adicionales

### Responsive y Accesibilidad:
- ✅ **Móvil-first**: Todos los efectos optimizados para touch
- ✅ **Impresión**: Estados se ocultan automáticamente en PDF
- ✅ **Animaciones suaves**: Sin causar mareos o distracciones
- ✅ **Alto contraste**: Colores accesibles para daltonismo

## �🎉 Resultado

El catálogo ahora es:
- **Más fácil de mantener**: Solo editar JSON
- **Más escalable**: Propiedades flexibles
- **Más organizado**: Separación clara de responsabilidades
- **Igual de funcional**: Toda la experiencia de usuario preservada
