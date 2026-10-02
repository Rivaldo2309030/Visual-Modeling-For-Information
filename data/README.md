# 📁 Repositorio Central de Datos: Data Storytelling Mérida Peatonal
### *Proyecto Data Viz UPY: Sentir la Calle - El Viaje Peatonal, Seguridad y Confort Urbano en Mérida*

Este directorio alberga la estructura unificada de datos para las **9 Vistas / Módulos de Visualización** de la plataforma. Cada carpeta corresponde a una visualización específica y contiene la **Fuente Principal (Origen)** y **Fuentes Secundarias de Apoyo (Cruce de Datos)**, asignadas a los integrantes del equipo: **Rivaldo**, **Elisabeth** y **Christopher**.

---

## 👥 Matriz de Asignaciones y Procedencia de Datos

| No. | Módulo / Visualización | Carpeta del Repositorio | Integrante | Fuente Origen / Dataset Específico | Método & Formato |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **01** | **INEGI ATUS & DENUE** | [`01_inegi_denue/`](01_inegi_denue) | **Elisabeth** | INEGI ATUS (Accidentes Tránsito) & DENUE Sector Comercio/Servicios | Descarga Directa INEGI (`CSV` / `GeoJSON`) |
| **02** | **SICT / IMT Viales** | [`02_datos_gob/`](02_datos_gob) | **Elisabeth** | SICT Datos Viales & IMT Red Nacional de Caminos (`datos.gob.mx`) | Descarga Portal Abierto (`CSV` / `API`) |
| **03** | **SIEGY Yucatán & ATY** | [`03_siegy_yucatan/`](03_siegy_yucatan) | **Elisabeth** | SIEGY CEIEG Yucatán & Rutas/Paraderos Va-y-Ven (Agencia de Transporte ATY) | Portal Estadístico & GTFS/GIS (`GeoJSON` / `JSON`) |
| **04** | **GeoPortal Mérida & OSM** | [`04_geoportal_merida/`](04_geoportal_merida) | **Christopher** | GeoPortal Mérida (Capa Banquetas) & OSM Overpass API (Semáforos) | API Overpass & Capa SIG (`GeoJSON` / `JSON`) |
| **05** | **Infraestructura Mérida** | [`05_transparencia_pnt/`](05_transparencia_pnt) | **Rivaldo** | Infraestructura Abierta Mérida, Obras Realizadas & Contratos Obra Pública | Portal Abierto & OCP (`CSV` / `JSON`) |
| **06** | **Web Scraping Prensa** | [`06_web_scraping/`](06_web_scraping) | **Christopher** | Corpus Hemerográfico Local (*Diario de Yucatán*, *Por Esto!*) | Scraper Python BeautifulSoup (`JSON` / `CSV`) |
| **07** | **Movilidad Peatonal** | [`07_self_produced_upy/`](07_self_produced_upy) | **Christopher** | OSM Footways Mérida, OSM Crossings Mérida & Matriz Campo UPY | Overpass API & Campo (`GeoJSON` / `CSV`) |
| **08** | **LiDAR 3D & Benchmark** | [`08_lidar_3d/`](08_lidar_3d) | **Rivaldo** | INEGI Continuo Elevaciones (CEM 1.5m) + Waymo Open Perception & ApolloScape LiDAR | MDE LiDAR & Nube Puntos (`PLY` / `XYZ` / `GeoTIFF`) |
| **09** | **Modelado 3D & GeoWebXR** | [`09_realidad_aumentada_ar/`](09_realidad_aumentada_ar) | **Rivaldo** | DLR Urban Intersection (Zenodo) + CityJSON Rotterdam 3D (2.7MB) & OpenCityModel | Datasets 3D & CityJSON (`CityJSON` / `Parquet` / `JSON`) |

> ⚠️ **Nota sobre Subtema 7 (`07_self_produced_upy`):** Los datos de `07_self_produced` en `synthetic/` son simulados y se usan solo para validar el pipeline. Serán sustituidos por las respuestas reales del formulario.

---

## 🔍 Reproducibilidad y Evidencia Técnica (Consultas Overpass OSM)

Para la **Vista 4 y Vista 7**, los semáforos y banquetas peatonales se extraen mediante las siguientes consultas Overpass en el Bounding Box de Mérida `(20.90,-89.68,21.05,-89.55)`:

```query
/* Consulta 4.3 Overpass API - Semáforos en Mérida: https://overpass-turbo.eu/s/1Z7y */
[out:json][timeout:25];
( node["highway"="traffic_signals"](20.90,-89.68,21.05,-89.55); );
out body; >; out skel qt;

/* Consulta 7.1 Overpass API - Red Peatonal de Mérida: https://overpass-turbo.eu/s/1Z7z */
[out:json][timeout:60];
(
  way["highway"="footway"](20.90,-89.68,21.05,-89.55);
  way["highway"="pedestrian"](20.90,-89.68,21.05,-89.55);
  way["highway"="path"](20.90,-89.68,21.05,-89.55);
);
out geom;

/* Consulta 7.2 Overpass API - Cruces Peatonales de Mérida: https://overpass-turbo.eu/s/1Z80 */
[out:json][timeout:25];
( node["highway"="crossing"](20.90,-89.68,21.05,-89.55); );
out body; >; out skel qt;
```

---

## 📋 Reglas de Estandarización y Encabezados de Procedencia de Archivos

Cada archivo descargado o procesado dentro del repositorio incluye su correspondiente **encabezado de procedencia de datos (Data Provenance Metadata Header)**:

```yaml
# Data Provenance Metadata
Tipo: Datos Reales Muestreados / Prototipado / Benchmark Abierto
Fuente Origen: INEGI / GeoPortal Mérida / OpenStreetMap Overpass / SICT / Transparencia Mérida / CityJSON Rotterdam
Fecha de Consulta: 2026-10-01
Método de Obtención: API REST / Extracción WFS / Descarga Directa / CityJSON 2.7MB
Área Geográfica: Zona Metropolitana de Mérida, Yucatán (WGS84 EPSG:4326)
Licencia: Datos Abiertos / CC-BY 4.0 / ODbL
Transformaciones: Filtrado espacial a la delimitación municipal de Mérida y normalización UTF-8.
```
