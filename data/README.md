# 📁 Repositorio Central de Datos — Data Warehouse Ready (Equipo 4: Sentir la Calle)

Este directorio contiene los **datos reales, verificables y homologados** del **Equipo 4 (`Rivaldo2309030/Visual-Modeling-For-Information`)** estructurados bajo **Arquitectura Medallion (`Bronze → Silver → Gold`)** conforme a los contratos de [`Structured_GeoSpatial_Data_Team`](https://github.com/RusselKu/Structured_GeoSpatial_Data_Team).

> **Estado de auditoría:** ✅ **0 archivos `sample_*`** · **9/9 módulos con datos reales** · **21/21 tablas Silver/Gold APROBADAS (`0.0%` nulos, `0` duplicados)** · **100% geometrías válidas (`EPSG:4326`)** · **`es_dato_simulado = False`**.

---

## 🏗️ Arquitectura Medallion y Gobernanza

| Capa / Documento | Ruta | Contenido | Formatos |
| :--- | :--- | :--- | :--- |
| **Bronze** | [`bronze/`](bronze) | Manifiesto formal de extracción (`extraction_manifest.json`) con URLs, licencias y `SHA-256`. | `JSON` |
| **Silver** | [`silver/`](silver) | 12 tablas y capas espaciales limpias, UTF-8, `cve_ent='31'`, `cve_mun='31050'`, `cvegeo_ageb`. | `Parquet`, `GeoParquet`, `CSV`, `GeoJSON` |
| **Gold** | [`gold/`](gold) | 9 tablas analíticas (`fct_*`, `ind_*`, `dim_*`) listas para DuckDB, BigQuery, Supabase, Looker Studio o Power BI. | `Parquet`, `CSV` |
| **Catálogo Oficial** | [`CATALOGO_DATOS.csv`](CATALOGO_DATOS.csv) / [`.json`](CATALOGO_DATOS.json) | Registro de 21 activos Silver/Gold con tamaño, granularidad, cobertura, licencia y `SHA-256`. | `CSV`, `JSON` |
| **Diccionario** | [`DICCIONARIO_DATOS.md`](DICCIONARIO_DATOS.md) | Tipos de datos, conteo de no nulos, descripciones y ejemplos por columna. | `Markdown` |
| **Reporte de Calidad** | [`REPORTE_CALIDAD.md`](REPORTE_CALIDAD.md) | Conciliación entrada/salida, nulos (`0.0%`), duplicados (`0`) y validación geométrica. | `Markdown` |

---

## 📊 Inventario de Subcarpetas

| Carpeta | Subtema | Archivos Principales | Registros / Cobertura |
| :--- | :--- | :--- | :--- |
| [`01_inegi_denue/`](01_inegi_denue) | Siniestralidad y exposición comercial | `atus_siniestralidad_mensual_merida_2021_2024.csv`<br>`atus_siniestros_peaton_ciclista_merida.geojson`<br>`ageb_siniestralidad_exposicion_comercial.csv` | 48 meses (8,815 siniestros) · 501 eventos peatón/ciclista · 550 AGEBs con 56,908 comercios DENUE |
| [`02_datos_gob/`](02_datos_gob) | Presión vehicular y conectividad vial | `sict_tdpa_corredores_merida_yucatan_2013_2024.csv`<br>`sict_estaciones_aforo_yucatan.geojson` | Serie anual 2013–2024 (4,169 observaciones SICT) · 277 estaciones georreferenciadas |
| [`03_siegy_yucatan/`](03_siegy_yucatan) | Transporte público metropolitano | `aty_catalogo_oficial_rutas_vayven.csv`<br>`vayven_rutas_y_paraderos_merida.geojson`<br>`siegy_indicadores_transporte_sostenible_2025.csv` | 110 rutas oficiales ATY · 565 trazas y paraderos GIS · 6 indicadores SIEGY |
| [`04_geoportal_merida/`](04_geoportal_merida) | Geometría urbana y semáforos | `geoportal_colonias_merida.geojson`<br>`geoportal_centro_y_zonas_patrimoniales.geojson`<br>`osm_semaforos_merida_real.geojson` | 500 colonias · Centro Histórico + 73 zonas patrimoniales · 190 semáforos reales |
| [`05_transparencia_pnt/`](05_transparencia_pnt) | Infraestructura pública municipal *(sin PAE/PNT)* | `merida_equipamiento_alumbrado_peatonal_osm.geojson`<br>`merida_catalogo_capas_infraestructura_municipal.csv`<br>`merida_actividad_urbana_municipal_resumen.csv` | 562 luminarias/bancas/refugios · 66 capas SIG municipales Obras Públicas · serie 2015–2026 |
| [`06_web_scraping/`](06_web_scraping) | Percepción mediática local | `prensa_movilidad_peatonal_merida_real.csv`<br>`prensa_topicos_y_coocurrencia.csv` | 338 artículos reales verificados · 26 nodos/pares de co-ocurrencia |
| [`07_self_produced_upy/`](07_self_produced_upy) | Infraestructura peatonal (OSM) | `osm_cruces_peatonales_merida_real.geojson`<br>`osm_red_peatonal_por_ageb_merida.csv`<br>`osm_red_peatonal_centro_historico.geojson` | 4,092 cruces peatonales · 9,857 tramos peatonales (697.6 km en Mérida) |
| [`08_lidar_3d/`](08_lidar_3d) | Entorno 3D (Elevación y LiDAR) | `merida_elevacion_pendiente_por_ageb_real.csv`<br>`merida_centro_inegi_mdt_1_5m_real.ply`<br>`nasa_gliht_2013_yucatan_footprints.geojson` | 550 AGEBs con elevación/pendiente (29 teselas 1.5 m) · 11,554 vértices `.ply` · 369 polígonos LiDAR NASA |
| [`09_realidad_aumentada_ar/`](09_realidad_aumentada_ar) | Modelado urbano 3D para AR | `merida_centro_historico_lod1_real.glb`<br>`merida_centro_historico_lod1.city.json`<br>`cityjson_org_official_benchmark_v2.city.json` | 105 edificios reales del Centro Histórico en `.glb` y `CityJSON v2.0` + referencia oficial |

---

## ⚠️ Notas Técnicas de Calidad y Trazabilidad

1. **Elevación en Mérida vs. LiDAR aéreo real (`08_lidar_3d`):** Las 29 teselas 1:10,000 de 1.5 m de INEGI sobre Mérida provienen de restitución fotogramétrica/altimétrica (no LiDAR puro). Para LiDAR aéreo real sobre Yucatán se incluyen las 369 huellas de vuelo de **NASA G-LiHT 2013**.
2. **Portales municipales protegidos por Radware CAPTCHA (`05_transparencia_pnt`):** Las páginas `infraestructuraAbierta.php`, `infociudadana.php` y `contrato_umap.php` bloquean peticiones HTTP automatizadas mediante Radware CAPTCHA. Sin evadir controles de acceso y descartando solicitudes PAE/PNT pendientes, el módulo integra equipamiento público georreferenciado abierto (OSM), el catálogo oficial de 66 capas de Obras Públicas del GeoPortal y registros anuales municipales verificados.
3. **Subtema 7 (`07_self_produced_upy`):** Opera al 100% sobre infraestructura peatonal real de OpenStreetMap (cruces y red peatonal). Cualquier prueba sintética de validación del script `ingest_07.py` se mantiene excluida en `.gitignore` (`synthetic/`).
