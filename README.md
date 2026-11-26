# Sentir la Calle · Caminar Mérida (Equipo 4)
### *Seguridad vial, accesibilidad e infraestructura peatonal en Mérida, Yucatán*

> **Capítulo 04 del booklet («Caminar Mérida» — Acto 3: Moverse):**
> - Ficha editorial final: [`booklet/ficha.md`](booklet/ficha.md)
> - Gráficas finales en D3 v7.9.0 (paleta morado y oro): [`booklet/graficas/index.html`](booklet/graficas/index.html)
> - Datos finales por escena y fuentes: [`booklet/datos/FUENTES.md`](booklet/datos/FUENTES.md)
> - Plataforma interactiva y visor 3D real: [https://rivaldo2309030.github.io/Visual-Modeling-For-Information/](https://rivaldo2309030.github.io/Visual-Modeling-For-Information/)
> - Data Mart 04 (arquitectura Medallion y PostGIS): [`datamart/README.md`](datamart/README.md)

---

## Resumen de datos reales y arquitectura

Este repositorio reúne las fuentes públicas reales, capas geoespaciales (`EPSG:4326`), activos 3D reales (`.ply`, `.glb`, `CityJSON v2.0`), tablas Bronze/Silver/Gold y el paquete final del **Capítulo 04 («Caminar Mérida»)** del Equipo 4 (*Rivaldo, Elisabeth y Christopher*).

Todos los archivos de muestra y scripts sintéticos fueron eliminados. Tanto las escenas del booklet (`booklet/graficas/`) como la plataforma web principal (`index.html`) leen en vivo los archivos reales del repositorio (sin valores escritos a mano ni generación aleatoria).

| Subtema | Carpeta | Activos reales integrados | Volumen verificado |
| :---: | :--- | :--- | :--- |
| **01** | [`data/01_inegi_denue/`](data/01_inegi_denue) | Siniestros viales ATUS Mérida (2021–2024), incidentes con peatones y ciclistas, exposición comercial DENUE y Censo 2020 por AGEB | **304** siniestros con peatón (**333** heridos) · **56,908** comercios DENUE · **550** AGEBs |
| **02** | [`data/02_datos_gob/`](data/02_datos_gob) | Serie histórica de Tránsito Diario Promedio Anual (TDPA) y carga pesada SICT/IMT en accesos a Mérida vs. Yucatán | **4,169** aforos (2013–2024) · **277** estaciones georreferenciadas |
| **03** | [`data/03_siegy_yucatan/`](data/03_siegy_yucatan) | Catálogo de rutas ATY (Va-y-Ven e IE-TRAM), paraderos georreferenciados e indicadores SIEGY | **110** rutas oficiales ATY · **565** trazas y paraderos · **6** indicadores SIEGY |
| **04** | [`data/04_geoportal_merida/`](data/04_geoportal_merida) | Polígonos de colonias, Centro Histórico, zonas patrimoniales y semáforos reales de Mérida | **500** colonias · **74** zonas patrimoniales · **190** semáforos reales (OSM) |
| **05** | [`data/05_transparencia_pnt/`](data/05_transparencia_pnt) | Mobiliario y alumbrado peatonal abierto, catálogo SIG de Obras Públicas y serie urbana municipal | **562** elementos de mobiliario/alumbrado · **66** capas SIG municipales |
| **06** | [`data/06_web_scraping/`](data/06_web_scraping) | Corpus hemerográfico real de prensa local de Mérida y red de co-ocurrencia temática | **338** notas periodísticas únicas · **26** relaciones semánticas |
| **07** | [`data/07_self_produced_upy/`](data/07_self_produced_upy) | Red peatonal real (banquetas, andadores y escaleras) y cruces peatonales con atributos de accesibilidad | **4,092** cruces peatonales · **9,857** tramos (**697.6 km** de red peatonal) |
| **08** | [`data/08_lidar_3d/`](data/08_lidar_3d) | Estadísticas zonales de elevación y pendiente sobre **29 teselas INEGI MDT 1.5 m**, nube `.ply` real y vuelos LiDAR NASA G-LiHT | **550/550** AGEBs con elevación/pendiente · **11,554** pts `.ply` · **369** polígonos G-LiHT |
| **09** | [`data/09_realidad_aumentada_ar/`](data/09_realidad_aumentada_ar) | Maqueta 3D real del Centro Histórico extruida sobre cotas INEGI 1.5 m en `.glb` y `CityJSON v2.0` | **105** edificios reales en `.glb` (**121.8 KB**, 2,328 triángulos) y `CityJSON v2.0` |

---

## Paquete de entrega del booklet (`booklet/`)

- [`booklet/ficha.md`](booklet/ficha.md): Ficha editorial completa del Capítulo 04 (Acto 3 — Moverse), con cifra de apertura, tres indicadores clave, tres escenas, limitaciones metodológicas con referencia a **NOM-004-SEDATU-2023** (umbral de **1.20 m** de banqueta) y puente hacia el Acto 4.
- [`booklet/datos/`](booklet/datos/): Tablas finales limpias (`escena-1.csv`, `escena-1-cruces-resumen.csv`, `escena-2.csv`, `escena-3.csv`, `merida_ageb_simplificado.geojson`) y documentación en [`FUENTES.md`](booklet/datos/FUENTES.md).
- [`booklet/graficas/`](booklet/graficas/): Visualizaciones interactivas y listas para impresión en **D3 v7.9.0** (`escena-1.html`, `escena-2.html`, `escena-3.html` y vista unificada `index.html`).

---

## Reproducibilidad

Para regenerar las tablas finales del booklet desde las capas Silver/Gold del repositorio:

```bash
python scripts/build_booklet_data.py
```

Para regenerar el pipeline completo Medallion (Bronze, Silver, Gold y reportes de calidad):

```bash
python scripts/etl/01_extract_bronze.py
python scripts/etl/02_transform_silver_gold.py
```

Las 27 fuentes originales entregadas en la Semana 1 se conservan en [`ENTREGABLE_SEMANA_1_FUENTES.md`](ENTREGABLE_SEMANA_1_FUENTES.md).

---

## Equipo y responsabilidades

| Integrante | Subtemas en Equipo 4 | Rol transversal |
| :--- | :--- | :--- |
| **Rivaldo** | 05 (Infraestructura Municipal), 08 (Elevación/LiDAR 3D), 09 (Modelos 3D `.glb` / CityJSON) | Equipo de Datos Espaciales (LiDAR, modelos 3D y capas espaciales) |
| **Elisabeth** | 01 (INEGI ATUS/DENUE/Censo), 02 (SICT/IMT), 03 (ATY Va-y-Ven y SIEGY) | Equipo de Datos Espaciales (extracción documental y validación) |
| **Christopher** | 04 (GeoPortal y semáforos OSM), 06 (Prensa local), 07 (Red peatonal y cruces OSM) | Equipo de Datos Estructurados (tablas Bronze/Silver/Gold y ETL) |
