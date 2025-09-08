# Catálogo Refactorizado - Sistema Basado en Objetos

## 📁 Estructura del Proyecto

```
/
├── Articulos.json          # 🎯 Base de datos principal (objetos estructurados)
├── catalog.js              # 🚀 Motor del catálogo (renderizado dinámico)
├── index.html              # 🎨 Interfaz de usuario (simplificada)
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
      "reservado": false
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
- ✅ **Indicadores de estado** (RESERVADO/DISPONIBLE)
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

## 📝 Cómo Añadir Nuevos Artículos

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
  "reservado": false
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
  "reservado": false
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

### Específicas de Cuadros:
- `autor`: Autor de la obra
- `tecnica`: Técnica artística

### Específicas de Artículos:
- `material`: Material del artículo

## 🔄 Migración Completada

- ✅ **42 Cuadros** migrados con todas sus propiedades
- ✅ **18 Artículos** varios migrados
- ✅ **Enlaces de Wallapop** preservados
- ✅ **Estados de reserva** mantenidos
- ✅ **Múltiples imágenes** por artículo soportadas

## 📚 Archivos de Respaldo

- `index-old.html`: HTML original
- `index-old.js`: JavaScript original
- `index-new.html`: Versión refactorizada (ahora index.html)

## 🎉 Resultado

El catálogo ahora es:
- **Más fácil de mantener**: Solo editar JSON
- **Más escalable**: Propiedades flexibles
- **Más organizado**: Separación clara de responsabilidades
- **Igual de funcional**: Toda la experiencia de usuario preservada
