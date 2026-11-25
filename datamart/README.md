# Data Mart 04 — Sentir la Calle (Mérida, Yucatán)

**Equipo 4:** Rivaldo (Coordinador Técnico, LiDAR & 3D), Elisabeth (Fuentes Institucionales & Movilidad), Christopher (Infraestructura Peatonal OSM & Scraping)  
**Clave territorial estándar del grupo:** `cvegeo` (AGEB de 13 dígitos — Marco Geoestadístico INEGI dic 2025, `31050` Mérida: `545` urbanas + `5` rurales = `550` AGEBs en `EPSG:4326`).

---

## Propósito y Estado Actual

Este directorio contiene las **tablas dimensionales, tablas de hechos (capa Gold), geometrías validadas, DDL SQL/PostGIS y catálogo de calidad con SHA-256** listos para ingesta directa al **Data Warehouse grupal (Supabase PostgreSQL + PostGIS)** y consumo por el **Data Visualization Team**.

- **Cero archivos `sample_*` o simulados:** Los 29 activos registrados en [`CATALOGO_ACTIVOS_Y_CALIDAD.csv`](CATALOGO_ACTIVOS_Y_CALIDAD.csv) provienen de fuentes abiertas reales y verificables.
- **Reproducibilidad:** Todo el Data Mart y las 9 carpetas de [`../data/`](../data/) se regeneran ejecutando:
  ```bash
  python scripts/build_datamart_sentir_la_calle.py
  ```

---

## Tablas y Capas del Data Mart 04

| Archivo | Rol en el DW | Registros | Grano / Clave Primaria | Contenido Principal |
| :--- | :--- | ---: | :--- | :--- |
| [`dim_ageb_merida.geojson`](dim_ageb_merida.geojson) / [`.csv`](dim_ageb_merida.csv) | Dimensión espacial maestra (`PostGIS`) | **550** | `cvegeo` (13 dígitos) | Polígonos `EPSG:4326` validados (`ST_MakeValid`), población Censo 2020, viviendas, área en $\text{km}^2$ y centroide. |
| [`dim_colonia_merida.csv`](dim_colonia_merida.csv) | Dimensión territorial complementaria | **500** | `idcolonia` | Catálogo oficial de colonias y fraccionamientos del GeoPortal de Mérida. |
| [`fact_caminabilidad_seguridad_ageb.csv`](fact_caminabilidad_seguridad_ageb.csv) | **Tabla de hechos principal (Gold)** | **550** | `cvegeo` | Cruza por AGEB: `establecimientos_denue` (56,908), `accidentes_totales` ATUS (8,815), `accidentes_peaton` (304), `semaforos_osm` (190), `cruces_peatonales_osm` (4,092), `longitud_red_peatonal_km` (697.6 km), `paraderos_vayven` (547), `elev_media_msnm`, `pendiente_media_pct` e `indice_prioridad_peatonal_0_100`. |
| [`fact_siniestros_serie_mensual_2021_2024.csv`](fact_siniestros_serie_mensual_2021_2024.csv) | Tabla de hechos temporal | **48** | `periodo` (`YYYY-MM`) | Evolución mensual 2021–2024 de accidentes totales, atropellamientos, ciclistas, heridos y fallecidos en Mérida. |
| [`fact_presion_vial_sict_anual.csv`](fact_presion_vial_sict_anual.csv) | Tabla de hechos sectorial | **24** | `anio` + `zona_merida` | Serie 2013–2024 de TDPA promedio/máximo y porcentaje de carga pesada en corredores metropolitanos de Mérida vs. resto de Yucatán (4,169 aforos SICT). |
| [`fact_prensa_topicos_merida.csv`](fact_prensa_topicos_merida.csv) | Tabla de hechos hemerográfica | **26** | `tipo_registro` + nodos | Frecuencia de tópicos y matriz de co-ocurrencia semántica calculada sobre 338 notas reales de prensa local. |
| [`sql/create_datamart_04_postgis.sql`](sql/create_datamart_04_postgis.sql) | DDL PostgreSQL / PostGIS | — | Esquema `dm04_sentir_la_calle` | Creación de tablas, llaves foráneas, índice espacial `GIST` y tabla `spatial_asset_catalog`. |
| [`CATALOGO_ACTIVOS_Y_CALIDAD.csv`](CATALOGO_ACTIVOS_Y_CALIDAD.csv) | Gobernanza y trazabilidad | **29** | `clave_activo` | URL de origen, fecha UTC, CRS, unidad, licencia, responsable y hash `SHA-256` de cada archivo. |

---

## Reglas de Gobernanza para Activos Volumétricos y Documentales

Siguiendo lineamientos de arquitectura del grupo:
1. **Rasters y LiDAR crudos fuera de tablas de hechos:** Los 29 GeoTIFF originales del MDT 1.5 m de INEGI (~1 GB) permanecen en almacenamiento raw (servidor UPY); el Data Mart almacena únicamente las **métricas zonales derivadas por AGEB** y una submuestra ligera optimizada ([`merida_centro_inegi_mdt_1_5m_real.ply`](../data/08_lidar_3d/merida_centro_inegi_mdt_1_5m_real.ply), 354 KB).
2. **Modelos 3D web optimizados:** El modelo urbano real del Centro Histórico ([`merida_centro_historico_lod1_real.glb`](../data/09_realidad_aumentada_ar/merida_centro_historico_lod1_real.glb), 121.8 KB, 105 edificios extruidos sobre cotas reales INEGI) está listo para Supabase Storage / visores Three.js y WebXR.
3. **Exclusión de solicitudes PAE/PNT:** Se descartó el uso de solicitudes pendientes ante PNT/PAE; el Subtema 5 emplea exclusivamente datos públicos abiertos de infraestructura urbana y equipamiento municipal, documentando el bloqueo por Radware CAPTCHA en descargas automatizadas de `merida.gob.mx`.
