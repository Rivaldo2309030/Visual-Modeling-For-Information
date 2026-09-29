# 📁 Repositorio Central de Datos: Data Storytelling Mérida Peatonal
### *Proyecto Data Viz UPY: Sentir la Calle - El Viaje Peatonal, Seguridad y Confort Urbano en Mérida*

Este directorio alberga la estructura unificada de datos para las **9 Vistas / Módulos de Visualización** de la plataforma. Cada carpeta corresponde a una visualización específica y contiene la **Fuente Principal (Origen)** y al menos **Dos Fuentes Secundarias de Apoyo (Cruce de Datos)**, asignadas a los integrantes del equipo: **Rivaldo**, **Elisabeth** y **Christopher**.

---

## 👥 Matriz de Asignaciones y Responsabilidades del Equipo

| No. | Módulo / Visualización | Carpeta del Repositorio | Integrante Responsable | Fuente Origen (Principal) | Fuente Extra 1 | Fuente Extra 2 |
| :---: | :--- | :--- | :---: | :--- | :--- | :--- |
| **01** | **INEGI ATUS & DENUE** | [`01_inegi_denue/`](01_inegi_denue) | **Elisabeth** | INEGI ATUS Accidentes Mérida (`CSV` / `API` / `GeoJSON`) | DENUE Comercio en Cruces (`CSV` / `GeoJSON`) | Censo Manzanas INEGI 2020 (`CSV` / `XLSX`) |
| **02** | **Datos.gob.mx** | [`02_datos_gob/`](02_datos_gob) | **Elisabeth** | Catálogo Nacional Siniestros Viales (`CSV` / `API`) | Base Viales Abiertos (`CSV`) | Registro Nacional Movilidad (`CSV` / `XLSX`) |
| **03** | **SIEGY Yucatán** | [`03_siegy_yucatan/`](03_siegy_yucatan) | **Elisabeth** | SIEGY / Traza Va y Ven (`CSV` / `SHP` / `GeoJSON`) | Cohesión Territorial SIEGY (`CSV`) | Matriz Origen-Destino Periférico (`CSV` / `GeoJSON`) |
| **04** | **GeoPortal Mérida** | [`04_geoportal_merida/`](04_geoportal_merida) | **Christopher** | GeoPortal Mérida Capa Banquetas (`GeoJSON` / `SHP`) | Inventario Semáforos Municipal (`CSV` / `GeoJSON`) | OpenStreetMap Mérida 80 Nodos (`JSON` / `GeoJSON`) |
| **05** | **Transparencia PNT** | [`05_transparencia_pnt/`](05_transparencia_pnt) | **Rivaldo** | Solicitud PNT a SSP Yucatán (`CSV` / `PDF` / `MD`) | Buzón Municipal Atención (`CSV` / `JSON`) | Informes C5i Radares (`CSV` / `GeoJSON`) |
| **06** | **Web Scraping Prensa** | [`06_web_scraping/`](06_web_scraping) | **Christopher** | Minería Diario de Yucatán / Por Esto! (`JSON` / `CSV`) | Redes Sociales #PeriféricoPeligroso (`JSON`) | Comunicados Oficiales Tránsito (`JSON` / `CSV`) |
| **07** | **Self-Produced UPY** | [`07_self_produced_upy/`](07_self_produced_upy) | **Christopher** | Auditoría Campo Afluencia Peatonal (`CSV` / `JSON`) | Ancho Efectivo Banquetas 1.2m (`GeoJSON`) | Encuestas Confort Térmico 38°C (`CSV`) |
| **08** | **LiDAR 3D** | [`08_lidar_3d/`](08_lidar_3d) | **Rivaldo** | Nube de Puntos 3D LiDAR Maqueta (`PLY` / `LAS` / `XYZ` / `JSON`) | Malla Urbana Ángulos Ciegos (`GeoJSON` / `OBJ`) | Perfil Relieve Rampas (`CSV` / `GeoJSON`) |
| **09** | **Realidad Aumentada (AR)** | [`09_realidad_aumentada_ar/`](09_realidad_aumentada_ar) | **Rivaldo** | Modelo Holográfico 3D Crucero Seguro (`GLTF` / `GLB` / `JSON`) | Filtro AR WebXR Cruce Peatonal (`GLTF` / `OBJ`) | Matriz Calificación Urbana (`PNG` / `JSON`) |

---

## 📋 Reglas de Subida y Estandarización de Archivos para GitHub

1. **Formato preferido:**
   - **Datos tabulares:** Archivos delimitados por comas (`.csv`) en codificación `UTF-8`.
   - **Datos geoespaciales:** GeoJSON (`.geojson`) con proyección WGS84 (`EPSG:4326`).
   - **Datos no estructurados/textuales:** JSON estructurado (`.json`).
   - **Modelos 3D y AR:** Formato GLTF/GLB binario optimizado (`.glb` / `.gltf`, `.ply`, `.xyz`).
2. **Límite de tamaño en GitHub:**
   - No subir archivos individuales mayores a **50 MB** directamente. Si el archivo crudo es muy pesado (e.g. nubes de puntos `.las` completas de varios GB), aplicar preprocesamiento para extraer la muestra relevante (e.g. cruces de Mérida).
3. **Documentación requerida en cada carpeta:**
   - Cada carpeta contiene su propio `README.md` donde se documenta el tipo de dato, origen, método de obtención, fecha de consulta y diccionario de variables.
