# Reporte Automatizado de Calidad de Datos — Equipo 4 (Sentir la Calle)

**Ejecución ETL:** `2026-11-25T18:37:24Z`  
**Cobertura:** 9/9 módulos temáticos con datos 100% reales verificables (`0` archivos `sample_*`, `es_dato_simulado = False` en el 100% de las tablas Gold).

## Conciliación y Validación Silver & Gold (Parquet / GeoParquet)

| Tabla | Capa | Reg. Entrada | Reg. Salida | Nulos (%) | Duplicados | Geometrías | CRS | Estado |
| :--- | :---: | ---: | ---: | ---: | ---: | :--- | :--- | :---: |
| `dim_ageb_merida` | `silver` | 550 | 550 | 0.0% | 0 | 100% válidas (550/550) | `EPSG:4326` | **APROBADO** |
| `dim_colonia_merida` | `silver` | 500 | 500 | 0.0% | 0 | 100% válidas (500/500) | `EPSG:4326` | **APROBADO** |
| `siniestros_peaton_ciclista_merida` | `silver` | 8815 | 501 | 0.0% | 0 | 100% válidas (501/501) | `EPSG:4326` | **APROBADO** |
| `estaciones_aforo_sict_yucatan` | `silver` | 4169 | 277 | 0.0% | 0 | 100% válidas (277/277) | `EPSG:4326` | **APROBADO** |
| `catalogo_rutas_aty_vayven` | `silver` | 110 | 110 | 0.0% | 0 | N/A | `N/A` | **APROBADO** |
| `red_vayven_paraderos_merida` | `silver` | 565 | 494 | 0.0% | 0 | 100% válidas (494/494) | `EPSG:4326` | **APROBADO** |
| `semaforos_osm_merida` | `silver` | 190 | 190 | 0.0% | 0 | 100% válidas (190/190) | `EPSG:4326` | **APROBADO** |
| `equipamiento_alumbrado_peatonal_merida` | `silver` | 768 | 562 | 0.0% | 0 | 100% válidas (562/562) | `EPSG:4326` | **APROBADO** |
| `corpus_prensa_movilidad_merida` | `silver` | 338 | 338 | 0.0% | 0 | N/A | `N/A` | **APROBADO** |
| `cruces_peatonales_osm_merida` | `silver` | 4108 | 4092 | 0.0% | 0 | 100% válidas (4092/4092) | `EPSG:4326` | **APROBADO** |
| `huellas_lidar_nasa_gliht_yucatan` | `silver` | 369 | 369 | 0.0% | 0 | 100% válidas (369/369) | `EPSG:4326` | **APROBADO** |
| `edificios_3d_centro_historico_merida` | `silver` | 105 | 105 | 0.0% | 0 | N/A | `N/A` | **APROBADO** |
| `fct_peatonal_siniestros_mensual` | `gold` | 8815 | 48 | 0.0% | 0 | N/A | `N/A` | **APROBADO** |
| `fct_peatonal_presion_vial_sict` | `gold` | 4169 | 24 | 0.0% | 0 | N/A | `N/A` | **APROBADO** |
| `ind_peatonal_transporte_sostenible` | `gold` | 6 | 6 | 0.0% | 0 | N/A | `N/A` | **APROBADO** |
| `ind_peatonal_semaforos_por_colonia` | `gold` | 190 | 42 | 0.0% | 0 | N/A | `N/A` | **APROBADO** |
| `dim_capas_infraestructura_merida` | `gold` | 284 | 66 | 0.0% | 0 | N/A | `N/A` | **APROBADO** |
| `ind_peatonal_prensa_coocurrencia` | `gold` | 338 | 26 | 0.0% | 0 | N/A | `N/A` | **APROBADO** |
| `ind_seguridad_caminabilidad_ageb` | `gold` | 550 | 550 | 0.0% | 0 | N/A | `N/A` | **APROBADO** |
| `ind_peatonal_relieve_pendiente_ageb` | `gold` | 550 | 550 | 0.0% | 0 | N/A | `N/A` | **APROBADO** |
| `dim_catalogo_activos_espaciales_eq4` | `gold` | 5 | 5 | 0.0% | 0 | N/A | `N/A` | **APROBADO** |

## Reglas de Calidad Verificadas
- Codificación `UTF-8` en todos los archivos CSV, JSON, CityJSON y Markdown.
- Cero valores nulos (`0.0%`) y cero filas duplicadas (`0`) en las 21 tablas Silver y Gold.
- Claves territoriales conformadas (`cve_ent = '31'`, `cve_mun = '31050'`, `cvegeo_ageb` de 13 dígitos sobre las 550 AGEBs oficiales de Mérida).
- Geometrías vectoriales reparadas y validadas al 100% (`shapely.is_valid`) en `EPSG:4326` y exportadas simultáneamente en `GeoParquet` y `GeoJSON`.
- Activos 3D y LiDAR (`merida_centro_historico_lod1_real.glb`, `merida_centro_inegi_mdt_1_5m_real.ply`, `CityJSON v2.0`) mantenidos fuera de las tablas de hechos y referenciados con `SHA-256` en `dim_catalogo_activos_espaciales_eq4`.
