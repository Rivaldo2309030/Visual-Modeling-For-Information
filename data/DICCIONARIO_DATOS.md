# Diccionario de Datos — Sentir la Calle (Equipo 4)

**Fecha de generación:** `2026-11-25T18:37:24Z`  
**Estándar:** `Structured_GeoSpatial_Data_Team` (Medallion Architecture: Silver & Gold en Parquet / GeoParquet)  
**Claves territoriales homologadas:** `cve_ent = '31'`, `cve_mun = '31050'` (Mérida), `cvegeo_ageb` (13 caracteres, Marco Geoestadístico dic 2025), `id_colonia` (GeoPortal Mérida)  
**Sistema de Referencia de Coordenadas (CRS):** `EPSG:4326` (WGS84) para intercambio y `EPSG:32616` / `EPSG:6371` (UTM 16N) para cálculos métricos.
## `dim_ageb_merida` (`data/silver/dim_ageb_merida.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `cvegeo_ageb` | `str` | 550 | Llave primaria geoestadística AGEB (13 caracteres) | `3105000015456` |
| `cve_ent` | `str` | 550 | Atributo estandarizado `cve_ent` | `31` |
| `cve_mun` | `str` | 550 | Clave municipio INEGI (31050 = Mérida) | `31050` |
| `cve_loc` | `str` | 550 | Atributo estandarizado `cve_loc` | `0001` |
| `cve_ageb` | `str` | 550 | Atributo estandarizado `cve_ageb` | `5456` |
| `tipo_ageb` | `str` | 550 | Atributo estandarizado `tipo_ageb` | `URBANA` |
| `pob_total` | `int32` | 550 | Población total Censo 2020 | `699` |
| `pob_masculina` | `int32` | 550 | Atributo estandarizado `pob_masculina` | `350` |
| `pob_femenina` | `int32` | 550 | Atributo estandarizado `pob_femenina` | `349` |
| `total_viviendas_habitadas` | `int32` | 550 | Atributo estandarizado `total_viviendas_habitadas` | `183` |
| `area_km2` | `float64` | 550 | Superficie calculada en UTM 16N (km²) | `0.0832` |
| `centroide_lat` | `float64` | 550 | Atributo estandarizado `centroide_lat` | `20.912221` |
| `centroide_lon` | `float64` | 550 | Atributo estandarizado `centroide_lon` | `-89.653625` |
| `geometry` | `Geometry (EPSG:4326)` | 550 | Geometría espacial validada en WGS84 | `MultiPolygon` |

## `dim_colonia_merida` (`data/silver/dim_colonia_merida.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `idgeo` | `int32` | 500 | Atributo estandarizado `idgeo` | `46` |
| `id_colonia` | `str` | 500 | Identificador canónico municipal de colonia | `258.0` |
| `nombre_colonia_canonico` | `str` | 500 | Nombre oficial de colonia o fraccionamiento | `FRACC. MANZANA 115, MERIDA` |
| `unidad_habitacional` | `str` | 500 | Atributo estandarizado `unidad_habitacional` | `FRACC. MANZANA 115` |
| `localidad` | `str` | 500 | Atributo estandarizado `localidad` | `MERIDA` |
| `codigo_postal` | `str` | 500 | Atributo estandarizado `codigo_postal` | `97267` |
| `centroide_lat` | `float64` | 500 | Atributo estandarizado `centroide_lat` | `20.945491` |
| `centroide_lon` | `float64` | 500 | Atributo estandarizado `centroide_lon` | `-89.642935` |
| `geometry` | `Geometry (EPSG:4326)` | 500 | Geometría espacial validada en WGS84 | `Polygon` |
| `cve_mun` | `str` | 500 | Atributo estandarizado `cve_mun` | `31050` |
| `cve_ent` | `str` | 500 | Atributo estandarizado `cve_ent` | `31` |

## `siniestros_peaton_ciclista_merida` (`data/silver/siniestros_peaton_ciclista_merida.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `id` | `str` | 501 | Identificador ATUS del siniestro | `1011747-999-124` |
| `fecha` | `str` | 501 | Atributo estandarizado `fecha` | `2021-01-07` |
| `anio` | `int32` | 501 | Atributo estandarizado `anio` | `2021` |
| `mes` | `int32` | 501 | Atributo estandarizado `mes` | `1` |
| `hora` | `int32` | 501 | Atributo estandarizado `hora` | `20` |
| `diasemana_desc` | `str` | 501 | Atributo estandarizado `diasemana_desc` | `No especificado` |
| `tipaccid_desc` | `str` | 501 | Atributo estandarizado `tipaccid_desc` | `No especificado` |
| `clase_desc` | `str` | 501 | Atributo estandarizado `clase_desc` | `No especificado` |
| `causaacci_desc` | `str` | 501 | Atributo estandarizado `causaacci_desc` | `No especificado` |
| `peatmuerto` | `int32` | 501 | Peatones fallecidos | `0` |
| `peatherido` | `int32` | 501 | Peatones lesionados | `0` |
| `ciclmuerto` | `int32` | 501 | Atributo estandarizado `ciclmuerto` | `0` |
| `ciclherido` | `int32` | 501 | Atributo estandarizado `ciclherido` | `1` |
| `calle1` | `str` | 501 | Atributo estandarizado `calle1` | `14 (16A)` |
| `calle2` | `str` | 501 | Atributo estandarizado `calle2` | `13` |
| `interseccion` | `str` | 501 | Atributo estandarizado `interseccion` | `14 (16A) x 13` |
| `cvegeo_ageb` | `str` | 501 | AGEB asignada por spatial join | `No especificado` |
| `latitud` | `float64` | 501 | Atributo estandarizado `latitud` | `21.0191398` |
| `longitud` | `float64` | 501 | Atributo estandarizado `longitud` | `-89.6289798` |
| `geometry` | `Geometry (EPSG:4326)` | 501 | Geometría espacial validada en WGS84 | `Point` |
| `cve_ent` | `str` | 501 | Atributo estandarizado `cve_ent` | `31` |
| `cve_mun` | `str` | 501 | Atributo estandarizado `cve_mun` | `31050` |

## `estaciones_aforo_sict_yucatan` (`data/silver/estaciones_aforo_sict_yucatan.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `anio_ultimo_aforo` | `int32` | 277 | Atributo estandarizado `anio_ultimo_aforo` | `2024` |
| `carretera` | `str` | 277 | Tramo carretero federal/estatal | `Campeche-Merida` |
| `ruta` | `str` | 277 | Atributo estandarizado `ruta` | `MEX-180` |
| `punto_generador` | `str` | 277 | Atributo estandarizado `punto_generador` | `Campeche` |
| `km_numeric` | `float64` | 277 | Atributo estandarizado `km_numeric` | `0.0` |
| `tdpa_numeric` | `float64` | 277 | Tránsito Diario Promedio Anual (veh/día) | `4132.0` |
| `a_numeric` | `float64` | 277 | Atributo estandarizado `a_numeric` | `79.7` |
| `b_numeric` | `float64` | 277 | Atributo estandarizado `b_numeric` | `0.8` |
| `inside_merida_boundary` | `bool` | 277 | Atributo estandarizado `inside_merida_boundary` | `False` |
| `latitud_numeric` | `float64` | 277 | Atributo estandarizado `latitud_numeric` | `19.890148` |
| `longitud_numeric` | `float64` | 277 | Atributo estandarizado `longitud_numeric` | `-90.468154` |
| `geometry` | `Geometry (EPSG:4326)` | 277 | Geometría espacial validada en WGS84 | `Point` |
| `cve_ent` | `str` | 277 | Atributo estandarizado `cve_ent` | `31` |

## `catalogo_rutas_aty_vayven` (`data/silver/catalogo_rutas_aty_vayven.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `codigo_ruta` | `str` | 110 | Clave oficial ATY | `R1` |
| `nombre_ruta` | `str` | 110 | Atributo estandarizado `nombre_ruta` | `Conoce los paraderos` |
| `modalidad` | `str` | 110 | Modalidad operativa (Va-y-Ven, Nocturna, IE-TRAM) | `Va-y-Ven Urbano / Metropolitano` |
| `url_oficial_aty` | `str` | 110 | Atributo estandarizado `url_oficial_aty` | `https://transporteyucatan.org.mx/rutas/R1` |
| `cve_ent` | `str` | 110 | Atributo estandarizado `cve_ent` | `31` |
| `cve_mun` | `str` | 110 | Atributo estandarizado `cve_mun` | `31050` |

## `red_vayven_paraderos_merida` (`data/silver/red_vayven_paraderos_merida.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `name` | `str` | 494 | Nombre de ruta o paradero | `R901 - Estación Tren Maya Teya => IE-TRAM Pla` |
| `ref` | `str` | 494 | Atributo estandarizado `ref` | `1` |
| `route` | `str` | 494 | Atributo estandarizado `route` | `bus` |
| `highway` | `str` | 494 | Atributo estandarizado `highway` | `No especificado` |
| `public_transport` | `str` | 494 | Tipo de nodo/vía de transporte público | `No especificado` |
| `operator` | `str` | 494 | Atributo estandarizado `operator` | `Mobility ADO` |
| `network` | `str` | 494 | Atributo estandarizado `network` | `IE-TRAM` |
| `shelter` | `str` | 494 | Atributo estandarizado `shelter` | `No especificado` |
| `bench` | `str` | 494 | Atributo estandarizado `bench` | `No especificado` |
| `lit` | `str` | 494 | Atributo estandarizado `lit` | `No especificado` |
| `geometry` | `Geometry (EPSG:4326)` | 494 | Geometría espacial validada en WGS84 | `MultiLineString` |
| `cve_ent` | `str` | 494 | Atributo estandarizado `cve_ent` | `31` |
| `cve_mun` | `str` | 494 | Atributo estandarizado `cve_mun` | `31050` |

## `semaforos_osm_merida` (`data/silver/semaforos_osm_merida.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `osm_id` | `int64` | 190 | ID de nodo OpenStreetMap | `287021104` |
| `highway` | `str` | 190 | Atributo estandarizado `highway` | `traffic_signals` |
| `crossing` | `str` | 190 | Atributo estandarizado `crossing` | `unspecified` |
| `traffic_signals_direction` | `str` | 190 | Atributo estandarizado `traffic_signals_direction` | `No especificado` |
| `sound` | `str` | 190 | Atributo estandarizado `sound` | `no` |
| `vibration` | `str` | 190 | Atributo estandarizado `vibration` | `no` |
| `button_operated` | `str` | 190 | Atributo estandarizado `button_operated` | `unspecified` |
| `nombre_interseccion` | `str` | 190 | Atributo estandarizado `nombre_interseccion` | `No especificado` |
| `latitud` | `float64` | 190 | Atributo estandarizado `latitud` | `20.961257` |
| `longitud` | `float64` | 190 | Atributo estandarizado `longitud` | `-89.641895` |
| `cve_mun_geo` | `str` | 190 | Atributo estandarizado `cve_mun_geo` | `31050` |
| `cvegeo_ageb` | `str` | 190 | AGEB donde se ubica el semáforo | `3105000010489` |
| `id_colonia` | `float64` | 190 | Atributo estandarizado `id_colonia` | `348.0` |
| `colonia` | `str` | 190 | Colonia oficial GeoPortal | `COL. SAMBULA, MERIDA` |
| `geometry` | `Geometry (EPSG:4326)` | 190 | Geometría espacial validada en WGS84 | `Point` |
| `cve_ent` | `str` | 190 | Atributo estandarizado `cve_ent` | `31` |
| `cve_mun` | `str` | 190 | Atributo estandarizado `cve_mun` | `31050` |

## `equipamiento_alumbrado_peatonal_merida` (`data/silver/equipamiento_alumbrado_peatonal_merida.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `osm_id` | `int64` | 562 | Atributo estandarizado `osm_id` | `3044903645` |
| `tipo_equipamiento` | `str` | 562 | Tipo de mobiliario o luminaria (street_lamp, bench, shelter, bus_stop) | `bus_stop` |
| `shelter` | `str` | 562 | Atributo estandarizado `shelter` | `No especificado` |
| `lit` | `str` | 562 | Atributo estandarizado `lit` | `No especificado` |
| `backrest` | `str` | 562 | Atributo estandarizado `backrest` | `No especificado` |
| `nombre` | `str` | 562 | Atributo estandarizado `nombre` | `66 Ibérica Av. 42, Av. 61 y Av. 58` |
| `latitud` | `float64` | 562 | Atributo estandarizado `latitud` | `20.965024` |
| `longitud` | `float64` | 562 | Atributo estandarizado `longitud` | `-89.619398` |
| `cve_mun` | `str` | 562 | Atributo estandarizado `cve_mun` | `31050` |
| `cvegeo_ageb` | `str` | 562 | Atributo estandarizado `cvegeo_ageb` | `3105000010510` |
| `geometry` | `Geometry (EPSG:4326)` | 562 | Geometría espacial validada en WGS84 | `Point` |
| `cve_ent` | `str` | 562 | Atributo estandarizado `cve_ent` | `31` |

## `corpus_prensa_movilidad_merida` (`data/silver/corpus_prensa_movilidad_merida.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `id_nota` | `int64` | 338 | Identificador secuencial del artículo | `1` |
| `fecha_publicacion` | `str` | 338 | Atributo estandarizado `fecha_publicacion` | `2026-11` |
| `medio` | `str` | 338 | Atributo estandarizado `medio` | `Diario de Yucatán` |
| `titulo` | `str` | 338 | Atributo estandarizado `titulo` | `La seguridad vial en Yucatán, tarea pendiente` |
| `topico_principal` | `str` | 338 | Categoría temática vial/peatonal asignada | `Movilidad Urbana General` |
| `topicos_detectados` | `str` | 338 | Atributo estandarizado `topicos_detectados` | `Movilidad Urbana General` |
| `n_topicos` | `int64` | 338 | Atributo estandarizado `n_topicos` | `1` |
| `metodo_extraccion` | `str` | 338 | Atributo estandarizado `metodo_extraccion` | `scraping_directo_portada` |
| `url` | `str` | 338 | Atributo estandarizado `url` | `https://www.yucatan.com.mx/merida/2026/11/25/` |
| `cve_ent` | `str` | 338 | Atributo estandarizado `cve_ent` | `31` |
| `cve_mun` | `str` | 338 | Atributo estandarizado `cve_mun` | `31050` |

## `cruces_peatonales_osm_merida` (`data/silver/cruces_peatonales_osm_merida.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `osm_id` | `int64` | 4092 | Atributo estandarizado `osm_id` | `289677325` |
| `crossing_type` | `str` | 4092 | Tipología del cruce peatonal | `unmarked` |
| `tactile_paving` | `str` | 4092 | Presencia de pavimento táctil | `unspecified` |
| `kerb` | `str` | 4092 | Atributo estandarizado `kerb` | `unspecified` |
| `lit` | `str` | 4092 | Atributo estandarizado `lit` | `unspecified` |
| `island` | `str` | 4092 | Atributo estandarizado `island` | `no` |
| `supervised` | `str` | 4092 | Atributo estandarizado `supervised` | `no` |
| `latitud` | `float64` | 4092 | Atributo estandarizado `latitud` | `20.961845` |
| `longitud` | `float64` | 4092 | Atributo estandarizado `longitud` | `-89.6441` |
| `cve_mun` | `str` | 4092 | Atributo estandarizado `cve_mun` | `31050` |
| `cvegeo_ageb` | `str` | 4092 | Atributo estandarizado `cvegeo_ageb` | `3105000010597` |
| `geometry` | `Geometry (EPSG:4326)` | 4092 | Geometría espacial validada en WGS84 | `Point` |
| `cve_ent` | `str` | 4092 | Atributo estandarizado `cve_ent` | `31` |

## `huellas_lidar_nasa_gliht_yucatan` (`data/silver/huellas_lidar_nasa_gliht_yucatan.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `campana` | `str` | 369 | Atributo estandarizado `campana` | `NASA G-LiHT Yucatán 2013` |
| `vuelo_archivo` | `str` | 369 | Campaña de vuelo G-LiHT | `AMIGACarb_Out_of_the_Yuc_GLAS_May2013_tiles` |
| `tile_id` | `str` | 369 | Atributo estandarizado `tile_id` | `l0s427` |
| `sensor` | `str` | 369 | Atributo estandarizado `sensor` | `Airborne Scanning LiDAR (G-LiHT)` |
| `resolucion_dtm_m` | `float64` | 369 | Resolución espacial del DTM (m) | `1.0` |
| `geometry` | `Geometry (EPSG:4326)` | 369 | Geometría espacial validada en WGS84 | `Polygon` |
| `cve_ent` | `str` | 369 | Atributo estandarizado `cve_ent` | `31` |

## `edificios_3d_centro_historico_merida` (`data/silver/edificios_3d_centro_historico_merida.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `osm_id` | `int64` | 105 | Atributo estandarizado `osm_id` | `31296521` |
| `nombre` | `str` | 105 | Atributo estandarizado `nombre` | `Catedral de San Ildefonso` |
| `uso_edificio` | `str` | 105 | Atributo estandarizado `uso_edificio` | `church` |
| `niveles_osm` | `float64` | 105 | Atributo estandarizado `niveles_osm` | `0.0` |
| `altura_estimada_m` | `float64` | 105 | Altura de extrusión LoD1 en metros | `5.2` |
| `cota_terreno_inegi_msnm` | `float64` | 105 | Elevación real del desplante sobre nivel del mar (m) | `8.46` |
| `cve_ent` | `str` | 105 | Atributo estandarizado `cve_ent` | `31` |
| `cve_mun` | `str` | 105 | Atributo estandarizado `cve_mun` | `31050` |

## `fct_peatonal_siniestros_mensual` (`data/gold/fct_peatonal_siniestros_mensual.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `anio` | `int64` | 48 | Atributo estandarizado `anio` | `2021` |
| `mes` | `int64` | 48 | Atributo estandarizado `mes` | `1` |
| `total_accidentes` | `int64` | 48 | Atributo estandarizado `total_accidentes` | `155` |
| `accidentes_peaton` | `int64` | 48 | Siniestros con peatón involucrado | `5` |
| `accidentes_ciclista` | `int64` | 48 | Atributo estandarizado `accidentes_ciclista` | `5` |
| `peatones_heridos` | `int64` | 48 | Atributo estandarizado `peatones_heridos` | `5` |
| `peatones_muertos` | `int64` | 48 | Atributo estandarizado `peatones_muertos` | `0` |
| `total_heridos` | `int64` | 48 | Atributo estandarizado `total_heridos` | `150` |
| `total_muertos` | `int64` | 48 | Atributo estandarizado `total_muertos` | `0` |
| `periodo` | `str` | 48 | Año-mes ISO (YYYY-MM) | `2021-01` |
| `id_fuente` | `str` | 48 | Atributo estandarizado `id_fuente` | `INEGI_ATUS_2021_2024` |
| `es_dato_simulado` | `bool` | 48 | Bandera de autenticidad (False = 100% real) | `False` |
| `fecha_corte_dato` | `str` | 48 | Atributo estandarizado `fecha_corte_dato` | `2026-11-25` |
| `cve_mun` | `str` | 48 | Atributo estandarizado `cve_mun` | `31050` |

## `fct_peatonal_presion_vial_sict` (`data/gold/fct_peatonal_presion_vial_sict.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `anio` | `int64` | 24 | Atributo estandarizado `anio` | `2013` |
| `zona_merida` | `str` | 24 | Atributo estandarizado `zona_merida` | `Corredores Metropolitanos Mérida` |
| `estaciones_aforo` | `int64` | 24 | Atributo estandarizado `estaciones_aforo` | `166` |
| `tdpa_promedio` | `float64` | 24 | Tránsito Diario Promedio Anual medio (veh/día) | `5167.4` |
| `tdpa_maximo` | `int64` | 24 | Atributo estandarizado `tdpa_maximo` | `25400` |
| `pct_autos_promedio` | `float64` | 24 | Atributo estandarizado `pct_autos_promedio` | `78.08` |
| `pct_autobuses_promedio` | `float64` | 24 | Atributo estandarizado `pct_autobuses_promedio` | `2.86` |
| `pct_carga_pesada_est` | `float64` | 24 | Porcentaje estimado de vehículos de carga (%) | `19.06` |
| `id_fuente` | `str` | 24 | Atributo estandarizado `id_fuente` | `SICT_DATOS_VIALES_2013_2024` |
| `es_dato_simulado` | `bool` | 24 | Atributo estandarizado `es_dato_simulado` | `False` |
| `fecha_corte_dato` | `str` | 24 | Atributo estandarizado `fecha_corte_dato` | `2026-11-25` |

## `ind_peatonal_transporte_sostenible` (`data/gold/ind_peatonal_transporte_sostenible.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `indicador_id` | `str` | 6 | Atributo estandarizado `indicador_id` | `seguridad_transporte_publico` |
| `indicador` | `str` | 6 | Atributo estandarizado `indicador` | `Personas que se sienten seguras en el transpo` |
| `valor` | `float64` | 6 | Atributo estandarizado `valor` | `78.8` |
| `unidad` | `str` | 6 | Atributo estandarizado `unidad` | `porcentaje` |
| `periodo` | `str` | 6 | Atributo estandarizado `periodo` | `2025-T3` |
| `geografia` | `str` | 6 | Atributo estandarizado `geografia` | `Mérida` |
| `nivel_geografico` | `str` | 6 | Atributo estandarizado `nivel_geografico` | `ciudad reportada por ENSU` |
| `referencia_nacional` | `float64` | 6 | Atributo estandarizado `referencia_nacional` | `0.0` |
| `comparacion_reportada` | `str` | 6 | Atributo estandarizado `comparacion_reportada` | `Incremento de 12.3 puntos porcentuales respec` |
| `fuente_original_reportada` | `str` | 6 | Atributo estandarizado `fuente_original_reportada` | `INEGI. ENSU. 3T 2025.` |
| `publicacion_siegy` | `str` | 6 | Atributo estandarizado `publicacion_siegy` | `Boletín 2025-11 — Día Mundial del Transporte ` |
| `url_fuente` | `str` | 6 | Atributo estandarizado `url_fuente` | `https://datos.yucatan.gob.mx/storage/boletine` |
| `clave_geografica_origen` | `float64` | 6 | Atributo estandarizado `clave_geografica_origen` | `0.0` |
| `metodo_union_futuro` | `str` | 6 | Atributo estandarizado `metodo_union_futuro` | `El PDF no publica clave. Normalizar el nombre` |
| `observacion_calidad` | `str` | 6 | Atributo estandarizado `observacion_calidad` | `No especificado` |
| `id_fuente` | `str` | 6 | Atributo estandarizado `id_fuente` | `SIEGY_BOLETIN_2025_11` |
| `es_dato_simulado` | `bool` | 6 | Bandera de autenticidad (False = 100% real) | `False` |
| `fecha_corte_dato` | `str` | 6 | Atributo estandarizado `fecha_corte_dato` | `2026-11-25` |

## `ind_peatonal_semaforos_por_colonia` (`data/gold/ind_peatonal_semaforos_por_colonia.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `id_colonia` | `float64` | 42 | Atributo estandarizado `id_colonia` | `1.0` |
| `colonia` | `str` | 42 | Atributo estandarizado `colonia` | `COL. CENTRO, MERIDA` |
| `semaforos_count` | `int64` | 42 | Número de intersecciones semaforizadas en la colonia | `88` |
| `cve_mun` | `str` | 42 | Atributo estandarizado `cve_mun` | `31050` |
| `id_fuente` | `str` | 42 | Atributo estandarizado `id_fuente` | `GEOPORTAL_MERIDA_OSM_SIGNALS` |
| `es_dato_simulado` | `bool` | 42 | Atributo estandarizado `es_dato_simulado` | `False` |
| `fecha_corte_dato` | `str` | 42 | Atributo estandarizado `fecha_corte_dato` | `2026-11-25` |

## `dim_capas_infraestructura_merida` (`data/gold/dim_capas_infraestructura_merida.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `categoria` | `str` | 66 | Atributo estandarizado `categoria` | `OBRAS PÚBLICAS` |
| `capa` | `str` | 66 | Atributo estandarizado `capa` | `Sistemas de Agua Potable en Comisarías` |
| `descripcion` | `str` | 66 | Atributo estandarizado `descripcion` | `Ubicación de los pozos existentes en las comi` |
| `tipo_geometria` | `str` | 66 | Atributo estandarizado `tipo_geometria` | `ST_Point` |
| `formato` | `str` | 66 | Atributo estandarizado `formato` | `POSTGIS-WMS` |
| `nombre_en_servidor` | `str` | 66 | Atributo estandarizado `nombre_en_servidor` | `geotecnologia:tf7dc469def97f8b389fb432432317e` |
| `srid` | `int64` | 66 | Atributo estandarizado `srid` | `32616` |
| `programa` | `str` | 66 | Atributo estandarizado `programa` | `No especificado` |
| `tipo_programa` | `str` | 66 | Atributo estandarizado `tipo_programa` | `No especificado` |
| `id_fuente` | `str` | 66 | Atributo estandarizado `id_fuente` | `AYUNTAMIENTO_MERIDA_CATALOGO_SIG` |
| `es_dato_simulado` | `bool` | 66 | Bandera de autenticidad (False = 100% real) | `False` |
| `fecha_corte_dato` | `str` | 66 | Atributo estandarizado `fecha_corte_dato` | `2026-11-25` |

## `ind_peatonal_prensa_coocurrencia` (`data/gold/ind_peatonal_prensa_coocurrencia.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `tipo_registro` | `str` | 26 | Atributo estandarizado `tipo_registro` | `TOPICO` |
| `nodo_origen` | `str` | 26 | Atributo estandarizado `nodo_origen` | `Transporte Va-y-Ven / Paraderos` |
| `nodo_destino` | `str` | 26 | Atributo estandarizado `nodo_destino` | `Transporte Va-y-Ven / Paraderos` |
| `frecuencia` | `int64` | 26 |  Artículos reales que mencionan el tópico o par semántico | `104` |
| `pct_sobre_corpus` | `float64` | 26 | Porcentaje respecto al total de 338 notas (%) | `30.77` |
| `id_fuente` | `str` | 26 | Atributo estandarizado `id_fuente` | `PRENSA_LOCAL_MERIDA_2026` |
| `es_dato_simulado` | `bool` | 26 | Atributo estandarizado `es_dato_simulado` | `False` |
| `fecha_corte_dato` | `str` | 26 | Atributo estandarizado `fecha_corte_dato` | `2026-11-25` |

## `ind_seguridad_caminabilidad_ageb` (`data/gold/ind_seguridad_caminabilidad_ageb.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `cvegeo_ageb` | `str` | 550 | Llave primaria conformada de AGEB (13 caracteres) | `3105000015456` |
| `cve_ent` | `str` | 550 | Atributo estandarizado `cve_ent` | `31` |
| `cve_mun` | `str` | 550 | Atributo estandarizado `cve_mun` | `31050` |
| `cve_loc` | `int64` | 550 | Atributo estandarizado `cve_loc` | `1` |
| `cve_ageb` | `str` | 550 | Atributo estandarizado `cve_ageb` | `5456` |
| `tipo_ageb` | `str` | 550 | Atributo estandarizado `tipo_ageb` | `URBANA` |
| `pob_total` | `int64` | 550 | Atributo estandarizado `pob_total` | `699` |
| `pob_masculina` | `int64` | 550 | Atributo estandarizado `pob_masculina` | `350` |
| `pob_femenina` | `int64` | 550 | Atributo estandarizado `pob_femenina` | `349` |
| `total_viviendas_habitadas` | `int64` | 550 | Atributo estandarizado `total_viviendas_habitadas` | `183` |
| `area_km2` | `float64` | 550 | Atributo estandarizado `area_km2` | `0.0832` |
| `centroide_lat` | `float64` | 550 | Atributo estandarizado `centroide_lat` | `20.912221` |
| `centroide_lon` | `float64` | 550 | Atributo estandarizado `centroide_lon` | `-89.653625` |
| `establecimientos_denue` | `int64` | 550 | Atributo estandarizado `establecimientos_denue` | `10` |
| `comercios_alimentos_servicios` | `int64` | 550 | Atributo estandarizado `comercios_alimentos_servicios` | `8` |
| `accidentes_totales` | `int64` | 550 | Atributo estandarizado `accidentes_totales` | `3` |
| `accidentes_peaton` | `int64` | 550 | Siniestros ATUS con peatón involucrado (2021-2024) | `0` |
| `accidentes_ciclista` | `int64` | 550 | Atributo estandarizado `accidentes_ciclista` | `0` |
| `peatones_heridos` | `int64` | 550 | Atributo estandarizado `peatones_heridos` | `0` |
| `peatones_muertos` | `int64` | 550 | Atributo estandarizado `peatones_muertos` | `0` |
| `total_heridos` | `int64` | 550 | Atributo estandarizado `total_heridos` | `7` |
| `total_muertos` | `int64` | 550 | Atributo estandarizado `total_muertos` | `0` |
| `accidentes_por_km2` | `float64` | 550 | Atributo estandarizado `accidentes_por_km2` | `36.06` |
| `paraderos_vayven` | `int64` | 550 | Atributo estandarizado `paraderos_vayven` | `0` |
| `semaforos_osm` | `int64` | 550 | Atributo estandarizado `semaforos_osm` | `0` |
| `equipamiento_urbano_osm` | `int64` | 550 | Atributo estandarizado `equipamiento_urbano_osm` | `0` |
| `cruces_peatonales_osm` | `int64` | 550 | Cruces peatonales mapeados en el AGEB | `0` |
| `cruces_con_guia_tactil` | `int64` | 550 | Atributo estandarizado `cruces_con_guia_tactil` | `0` |
| `cruces_semaforizados_o_marcados` | `int64` | 550 | Atributo estandarizado `cruces_semaforizados_o_marcados` | `0` |
| `tramos_peatonales_osm` | `int64` | 550 | Atributo estandarizado `tramos_peatonales_osm` | `0` |
| `longitud_red_peatonal_m` | `float64` | 550 | Atributo estandarizado `longitud_red_peatonal_m` | `0.0` |
| `longitud_red_peatonal_km` | `float64` | 550 | Kilómetros lineales de banquetas y andadores OSM en el AGEB | `0.0` |
| `tramos_iluminados_osm` | `int64` | 550 | Atributo estandarizado `tramos_iluminados_osm` | `0` |
| `elev_min_msnm` | `float64` | 550 | Atributo estandarizado `elev_min_msnm` | `7.97` |
| `elev_media_msnm` | `float64` | 550 | Elevación media del terreno desde 29 teselas INEGI MDT 1.5m (msnm) | `8.87` |
| `elev_max_msnm` | `float64` | 550 | Atributo estandarizado `elev_max_msnm` | `9.89` |
| `desnivel_interno_m` | `float64` | 550 | Atributo estandarizado `desnivel_interno_m` | `1.92` |
| `pendiente_media_pct` | `float64` | 550 | Atributo estandarizado `pendiente_media_pct` | `1.09` |
| `pendiente_p95_pct` | `float64` | 550 | Percentil 95 de pendiente del terreno (%) | `2.65` |
| `densidad_red_peatonal_m_km2` | `float64` | 550 | Atributo estandarizado `densidad_red_peatonal_m_km2` | `0.0` |
| `tasa_siniestros_peaton_1k_hab` | `float64` | 550 | Atributo estandarizado `tasa_siniestros_peaton_1k_hab` | `0.0` |
| `indice_prioridad_peatonal_0_100` | `float64` | 550 | Índice compuesto reproducible de prioridad de intervención peatonal (0-100) | `1.47` |
| `id_fuente` | `str` | 550 | Atributo estandarizado `id_fuente` | `MULTIFUENTE_INEGI_OSM_ATY_MDT15M` |
| `es_dato_simulado` | `bool` | 550 | Bandera obligatoria DW (False = 100% datos reales) | `False` |
| `fecha_corte_dato` | `str` | 550 | Atributo estandarizado `fecha_corte_dato` | `2026-11-25` |

## `ind_peatonal_relieve_pendiente_ageb` (`data/gold/ind_peatonal_relieve_pendiente_ageb.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `cvegeo_ageb` | `str` | 550 | Atributo estandarizado `cvegeo_ageb` | `3105000015456` |
| `cve_mun` | `str` | 550 | Atributo estandarizado `cve_mun` | `31050` |
| `tipo_ageb` | `str` | 550 | Atributo estandarizado `tipo_ageb` | `URBANA` |
| `area_km2` | `float64` | 550 | Atributo estandarizado `area_km2` | `0.0832` |
| `elev_min_msnm` | `float64` | 550 | Atributo estandarizado `elev_min_msnm` | `7.97` |
| `elev_media_msnm` | `float64` | 550 | Cota media sobre el nivel del mar (msnm) | `8.87` |
| `elev_max_msnm` | `float64` | 550 | Atributo estandarizado `elev_max_msnm` | `9.89` |
| `desnivel_interno_m` | `float64` | 550 | Atributo estandarizado `desnivel_interno_m` | `1.92` |
| `pendiente_media_pct` | `float64` | 550 | Atributo estandarizado `pendiente_media_pct` | `1.09` |
| `pendiente_p95_pct` | `float64` | 550 | Pendiente local P95 (%) | `2.65` |
| `id_fuente` | `str` | 550 | Atributo estandarizado `id_fuente` | `INEGI_MDT_1_5M_29_TESELAS` |
| `es_dato_simulado` | `bool` | 550 | Atributo estandarizado `es_dato_simulado` | `False` |
| `fecha_corte_dato` | `str` | 550 | Atributo estandarizado `fecha_corte_dato` | `2026-11-25` |

## `dim_catalogo_activos_espaciales_eq4` (`data/gold/dim_catalogo_activos_espaciales_eq4.parquet`)

| Columna | Tipo | No Nulos | Descripción | Ejemplo |
| :--- | :--- | ---: | :--- | :--- |
| `asset_id` | `str` | 5 | Atributo estandarizado `asset_id` | `AST-08-PLY-CENTRO` |
| `cve_mun` | `str` | 5 | Atributo estandarizado `cve_mun` | `31050` |
| `nombre_activo` | `str` | 5 | Atributo estandarizado `nombre_activo` | `Nube de Terreno 3D Centro Histórico Mérida (1` |
| `tipo_activo` | `str` | 5 | Atributo estandarizado `tipo_activo` | `PLY Point Cloud` |
| `asset_uri_relativa` | `str` | 5 | Ruta relativa o URI futura en Cloud Storage / Supabase Storage | `data/08_lidar_3d/merida_centro_inegi_mdt_1_5m` |
| `tamano_kb` | `float64` | 5 | Atributo estandarizado `tamano_kb` | `354.54` |
| `crs` | `str` | 5 | Atributo estandarizado `crs` | `ITRF2008 UTM 16N (local m)` |
| `licencia` | `str` | 5 | Atributo estandarizado `licencia` | `Libre Uso INEGI` |
| `sha256` | `str` | 5 | Suma criptográfica de integridad | `5a532f425d64b092f8270fa74cb1f7cd68863ad29b195` |
| `observaciones` | `str` | 5 | Atributo estandarizado `observaciones` | `Extraída de tesela oficial F16C52A1 MDT 1.5 m` |
| `id_fuente` | `str` | 5 | Atributo estandarizado `id_fuente` | `CATALOGO_ACTIVOS_3D_LIDAR_EQ4` |
| `es_dato_simulado` | `bool` | 5 | Atributo estandarizado `es_dato_simulado` | `False` |
| `fecha_corte_dato` | `str` | 5 | Atributo estandarizado `fecha_corte_dato` | `2026-11-25` |
