# Fuentes de Datos y Plan de Análisis Detallado
### *Proyecto Data Viz UPY: Sentir la Calle - El Viaje Peatonal, Seguridad y Confort Urbano en Mérida*

---

## 📋 Resumen del Plan de Análisis

Este documento establece el inventario exhaustivo de las **9 Vistas y sus 27 Fuentes de Datos Complementarias (3 por vista)**, así como el plan metodológico de extracción, transformación (ETL), análisis descriptivo y modelado geoespacial.

---

## 🗺️ Inventario de Vistas y 27 Fuentes de Datos

### 1. Sombras en las Cifras Oficiales (Vista 1)
- **Fuente Principal:** INEGI ATUS (Accidentes de Tránsito Terrestre en Zonas Urbanas) & DENUE.
- **Sub-fuente 1.1:** Microdatos INEGI ATUS Mérida (2021-2023) — Formato CSV con tipo de hecho, horario, víctimas y causas.
- **Sub-fuente 1.2:** DENUE INEGI Comerio y Servicios en Cruces Peligrosos — Formato GeoJSON de unidades económicas expuestas.
- **Sub-fuente 1.3:** Censo de Población y Vivienda INEGI 2020 (Manzanas de Mérida) — Densidad poblacional por AGEB.

### 2. La Curva de la Movilidad Peatonal (Vista 2)
- **Fuente Principal:** Datos.gob.mx (Portal Abierto Nacional).
- **Sub-fuente 2.1:** Catálogo Nacional de Siniestros Viales en Carreteras y Pasos Urbanos.
- **Sub-fuente 2.2:** Base de Datos Abierta de Movilidad y Transporte Nacional.
- **Sub-fuente 2.3:** Registro de Infraestructura Vial de Jurisdicción Federal en Yucatán.

### 3. El Latido Metropolitano (Vista 3)
- **Fuente Principal:** SIEGY (Sistema de Información Estadística y Geográfica de Yucatán).
- **Sub-fuente 3.1:** Traza de Rutas y Paraderos del Sistema Va y Ven (Agencia de Transporte de Yucatán ATY).
- **Sub-fuente 3.2:** Indicadores de Cohesión Territorial y Accesibilidad Urbana SIEGY.
- **Sub-fuente 3.3:** Matriz Origen-Destino Peatonal del Circuito Periférico de Mérida.

### 4. La Ciudad a Escala Humana (Vista 4)
- **Fuente Principal:** GeoPortal de Mérida & OpenStreetMap Overpass.
- **Sub-fuente 4.1:** Capa GIS Municipal de Infraestructura (Banquetas, Obstáculos y Postes).
- **Sub-fuente 4.2:** Inventario de Semáforos e Intersecciones Semaforizadas de la Ciudad de Mérida.
- **Sub-fuente 4.3:** Extracción OpenStreetMap (OSM Overpass API) de 80 nodos semaforizados georeferenciados.

### 5. Voces en el Papel (Vista 5)
- **Fuente Principal:** Plataforma Nacional de Transparencia (PNT).
- **Sub-fuente 5.1:** Respuesta a Solicitud PNT SSP Yucatán sobre reportes de percances peatonales.
- **Sub-fuente 5.2:** Buzón Único de Atención Ciudadana del Ayuntamiento de Mérida (Peticiones de pasos fluviales/cebras).
- **Sub-fuente 5.3:** Informes del C5i Yucatán sobre monitoreo y radares en zonas escolares y hospitalarias.

### 6. El Rumor Digital (Vista 6)
- **Fuente Principal:** Web Scraping de Prensa Local y Medios Digitales.
- **Sub-fuente 6.1:** Web Scraping automatizado de notas de notas de atropellamientos (Diario de Yucatán).
- **Sub-fuente 6.2:** Minería de noticias y cobertura periodística de infraestructura vial (Por Esto! Yucatán).
- **Sub-fuente 6.3:** Comentarios y menciones en redes sociales sobre intersecciones críticas (#PeriféricoPeligroso).

### 7. La Voz del Terreno (Vista 7)
- **Fuente Principal:** Datos Propios UPY (Auditoría de Campo y Afluencia Peatonal).
- **Sub-fuente 7.1:** Conteo presencial en hora pico de afluencia peatonal vs. segundos de semáforo verde.
- **Sub-fuente 7.2:** Medición física de ancho efectivo de banquetas (estándar normativo >= 1.20m).
- **Sub-fuente 7.3:** Encuestas presenciales de confort térmico peatonal en Mérida (Sensación >= 38°C).

### 8. El Ojo Digital 3D (Vista 8)
- **Fuente Principal:** Levantamiento con Sensor LiDAR 3D.
- **Sub-fuente 8.1:** Nube de Puntos 3D (.PLY / .LAS) de crucero peatonal crítico en Mérida.
- **Sub-fuente 8.2:** Algoritmo de Detección de Ángulos Ciegos por muros, postes y follaje (radio 3.5m).
- **Sub-fuente 8.3:** Perfil topográfico y de elevación de rampas de accesibilidad universal.

### 9. Inmersión Urbana AR (Vista 9)
- **Fuente Principal:** Realidad Aumentada (AR) & Modelado 3D de Rediseño Urbano.
- **Sub-fuente 9.1:** Modelo 3D Holográfico (.GLTF / WebXR) de intersección segura con refuge island y cebras elevadas.
- **Sub-fuente 9.2:** Filtro Interactivo de Realidad Aumentada para superponer en entorno real.
- **Sub-fuente 9.3:** Matriz Integrada de Calificación Urbana por Coordenadas Peatonales.

---

## ⚙️ Flujo Metodológico de Procesamiento ETL (PySpark / HDFS Data Lake)

```
[Fuentes Heterogéneas] ──► [Ingesta SSH / FTP / Scraping] ──► [HDFS Raw Store]
                                                                     │
[Visualización Web] ◄── [Data Warehouse / GeoJSON] ◄── [PySpark Transformations]
```

1. **Ingesta:** Automatización con Python y scripts de descarga diaria/semanal.
2. **Limpieza y Estandarización:** Normalización de coordenadas EPSG:4326 (WGS84), limpieza de nulos y codificación UTF-8.
3. **Enriquecimiento Geoespacial:** Spatial Join de puntos de siniestros con polígonos de manzanas y rutas de transporte.
4. **Exportación Final:** Generación de estructuras de datos ligeras (`.json`, `.geojson`, `.csv`) cargadas dinámicamente por la interfaz HTML5/JS del Dashboard.
