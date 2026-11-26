# Fuentes y metodología — Capítulo 04 · Caminar Mérida

Todos los archivos de esta carpeta provienen de datos públicos reales procesados de forma reproducible mediante `scripts/build_booklet_data.py` a partir de las capas Silver y Gold del repositorio (`data/silver/`, `data/gold/` y `datamart/`). Ningún archivo contiene datos sintéticos, valores inventados ni información personal.

---

## 1. `escena-1.csv` y `escena-1-cruces-resumen.csv`

- **Qué contiene `escena-1.csv`:** Los 190 nodos de semáforos (`highway=traffic_signals`) dentro del municipio de Mérida (`cve_mun = 31050`), con coordenadas en `EPSG:4326`, colonia oficial del Ayuntamiento, clave AGEB (`cvegeo_ageb`) y banderas de accesibilidad registradas en OpenStreetMap (`tiene_cruce_marcado`, `tiene_sonido`, `tiene_boton`).
- **Qué contiene `escena-1-cruces-resumen.csv`:** Desglose de los 4,092 cruces peatonales (`highway=crossing`) dentro del municipio de Mérida por tipo de señalización (`unmarked`, `uncontrolled`, `unspecified`, `marked/traffic_signals` y etiqueta genérica `yes`).
- **Fuentes originales:**
  - OpenStreetMap (extracción Overpass API para Mérida): <https://overpass-api.de/> y <https://www.openstreetmap.org/>
  - Catálogo de colonias oficiales del GeoPortal del Ayuntamiento de Mérida: <https://isla.merida.gob.mx/serviciosinternet/geoportal/>
  - Marco Geoestadístico Municipal y AGEB de Mérida (INEGI, diciembre 2025): <https://www.inegi.org.mx/temas/mg/>
- **Fecha de corte:** Extracción OSM y unión espacial del 25 de noviembre de 2026; Marco Geoestadístico INEGI diciembre 2025.
- **Licencia:** OpenStreetMap ODbL 1.0 (<https://opendatacommons.org/licenses/odbl/>); INEGI Términos de Libre Uso; Ayuntamiento de Mérida datos abiertos municipales.
- **Cálculo:** Unión espacial (`point-in-polygon` en `EPSG:4326`) contra el polígono municipal `31050`, las 550 AGEBs de Mérida y las 500 colonias oficiales del GeoPortal. La columna `es_centro` clasifica los semáforos ubicados en `Col. Centro` (88 de 190; 46.3 %) frente al resto del municipio (102; 53.7 %).

---

## 2. `escena-2.csv`

- **Qué contiene:** Serie mensual de 48 meses (enero de 2021 a diciembre de 2024) de siniestros viales con peatón involucrado en Mérida (`accidentes_peaton`, `peatones_heridos`, `peatones_muertos`), junto con `accidentes_ciclista` y `total_accidentes_merida` como columnas de contexto.
- **Fuente original:** INEGI, *Estadística de Accidentes de Tránsito Terrestre en Zonas Urbanas y Suburbanas (ATUS)*, microdatos georreferenciados 2021–2024: <https://www.inegi.org.mx/programas/accidentes/>
- **Fecha de corte:** Serie anual cerrada 2021–2024 (publicación oficial INEGI consultada en noviembre de 2026).
- **Licencia:** Términos de Libre Uso de Información del INEGI (<https://www.inegi.org.mx/inegi/terminos.html>).
- **Cálculo:** Filtrado espacial y por clave municipal (`cve_mun = 31050`). Un evento se clasifica como `accidentes_peaton` cuando el registro ATUS reporta al menos un peatón herido (`PEATHERIDO > 0`), un peatón fallecido (`PEATMUERTO > 0`) o tipo de accidente atropellamiento. Acumulado 2021–2024: 304 accidentes con peatón, 333 peatones heridos y 2 peatones fallecidos en sitio.

---

## 3. `escena-3.csv` y `merida_ageb_simplificado.geojson`

- **Qué contiene `escena-3.csv`:** Indicadores de caminabilidad, seguridad peatonal, transporte público y relieve para las 550 AGEBs del municipio de Mérida (545 urbanas y 5 rurales), homologadas con el nombre oficial de su colonia principal.
- **Qué contiene `merida_ageb_simplificado.geojson`:** Polígonos de las 550 AGEBs en `EPSG:4326`, simplificados geométricamente (`0.00018°`, preservando topología) para renderizado ágil en D3 e impresión vectorial.
- **Fuentes originales:**
  - Marco Geoestadístico (dic 2025) y Censo de Población y Vivienda 2020 por AGEB (INEGI): <https://www.inegi.org.mx/programas/ccpv/2020/>
  - Directorio Estadístico Nacional de Unidades Económicas (DENUE 2025/2026, INEGI): <https://www.inegi.org.mx/app/mapa/denue/>
  - Accidentes de Tránsito Terrestre (ATUS 2021–2024, INEGI): <https://www.inegi.org.mx/programas/accidentes/>
  - Red peatonal (`footway`, `pedestrian`, `steps`, `sidewalk`), cruces y semáforos de OpenStreetMap: <https://www.openstreetmap.org/>
  - Red de paraderos del sistema Va-y-Ven (Agencia de Transporte de Yucatán, ATY): <https://transporte.yucatan.gob.mx/>
  - Modelos Digitales de Terreno (MDT) de 1.5 m de resolución, 29 teselas GeoTIFF oficiales (INEGI): <https://www.inegi.org.mx/temas/relieve/continental/>
- **Fecha de corte:** Consolidación multitemática al 25 de noviembre de 2026.
- **Licencia:** INEGI Libre Uso; OpenStreetMap ODbL 1.0; ATY datos públicos estatales.
- **Cálculo:**
  - `red_peatonal_km`: longitud métrica real de los 9,857 tramos peatonales de OSM proyectados a UTM 16N (`EPSG:32616`) y sumados por AGEB (total municipal: 697.64 km; 225 AGEBs con 0 km mapeados).
  - `elevacion_media_msnm` y `pendiente_p95_pct`: estadística zonal por AGEB sobre las 29 teselas del MDT 1.5 m del INEGI procesadas con `rasterio`.
  - `indice_prioridad_peatonal` (escala 0–100): índice compuesto normalizado por percentiles que combina siniestralidad peatonal (ATUS), exposición poblacional y comercial (Censo 2020 y DENUE), demanda de paraderos (ATY) y déficit relativo de señalización e infraestructura peatonal mapeada (OSM).

---

## 4. Referencias normativas sobre ancho de banqueta

- **NOM-004-SEDATU-2023**, *Estructura y diseño para vías urbanas. Especificaciones y aplicación* (Secretaría de Desarrollo Agrario, Territorial y Urbano, Diario Oficial de la Federación, 2024): Tabla 38 establece la franja de circulación peatonal libre de obstáculos con un mínimo accesible de **1.20 m** (ancho mínimo para el tránsito de una silla de ruedas o dos personas, y óptimo desde **1.80 m** en vías urbanas).
- **SEDATU / BID (2019)**, *Manual de calles: diseño vial para ciudades mexicanas*: <https://www.gob.mx/sedatu/documentos/manual-de-calles-diseno-vial-para-ciudades-mexicanas>

---

## 5. Activos 3D y de realidad aumentada vinculados (fuera de D3)

Los modelos 3D reales del Centro Histórico de Mérida viven en el visor interactivo principal del repositorio (`index.html`) y se enlazan desde el capítulo sin incrustarse en D3:

- **Nube de terreno real 1.5 m (`.ply`):** `data/08_lidar_3d/merida_centro_inegi_mdt_1_5m_real.ply` (11,554 puntos reales de la carta INEGI F16C52A1).
- **Maqueta volumétrica LoD1 del Centro Histórico (`.glb`):** `data/09_realidad_aumentada_ar/merida_centro_historico_lod1_real.glb` (105 edificios reales de OSM extruidos sobre cotas reales del MDT INEGI 1.5 m, 121.8 KB, 2,328 triángulos).
