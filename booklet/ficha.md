# CAPÍTULO 04 · CAMINAR MÉRIDA
**Acto 3 — Moverse** · Equipo 4: *Sentir la Calle* (Rivaldo, Elisabeth y Christopher)

---

## En Mérida, 86.7 % de las AGEB no tienen semáforo y los atropellamientos subieron 71.2 % de 2021 a 2024

Caminar por Mérida cambia por completo al salir del primer cuadro. Mientras la colonia Centro concentra casi la mitad de todos los semáforos mapeados del municipio, cuatro de cada diez AGEB carecen de banquetas registradas y los siniestros con peatones involucrados pasaron de 52 en 2021 a 89 en 2024. Este capítulo cruza dónde camina la gente, dónde faltan cruces seguros y en qué zonas el riesgo peatonal se acumula con mayor fuerza.

---

## La historia en 10 segundos

| Dato clave | Descripción y contexto | Fuente y fecha de corte |
| :--- | :--- | :--- |
| **304 siniestros con peatón** | Dejaron **333 peatones heridos** y **2 fallecidos en sitio** entre 2021 y 2024 (**+71.2 %** de 2021 a 2024). | INEGI ATUS georreferenciado 2021–2024 (`escena-2.csv`). |
| **190 semáforos en todo el municipio** | **88 (46.3 %)** están en la colonia Centro; **477 de las 550 AGEB (86.7 %)** no tienen semáforo registrado. | OpenStreetMap + GeoPortal Mérida, corte nov 2026 (`escena-1.csv`). |
| **225 de las 550 AGEB sin red peatonal** | El **40.9 %** de las AGEB del municipio tienen **0 km** de banquetas o andadores mapeados frente a **697.6 km** concentrados en 325 AGEB. | OpenStreetMap + Marco Geoestadístico INEGI dic 2025 (`escena-3.csv`). |

---

## Escena 1 · El Centro concentra 46.3 % de los 190 semáforos de Mérida y solo 1.4 % de los cruces están marcados o semaforizados

- **Subtítulo:** Distribución espacial de los 190 semáforos reales y clasificación de los 4,092 cruces peatonales mapeados en Mérida (`cve_mun = 31050`).
- **Archivos:** [`datos/escena-1.csv`](datos/escena-1.csv), [`datos/escena-1-cruces-resumen.csv`](datos/escena-1-cruces-resumen.csv), [`datos/merida_ageb_simplificado.geojson`](datos/merida_ageb_simplificado.geojson) · **Gráfica D3:** [`graficas/escena-1.html`](graficas/escena-1.html)
- **Cómo leer esta escena:** Cada punto morado marca un semáforo dentro de la colonia Centro (88 nodos) y cada punto oro señala uno en el resto del municipio (102 nodos repartidos en apenas 41 colonias de las 500 oficiales). El panel lateral desglosa los 4,092 cruces peatonales mapeados: 1,658 no tienen pintura en el pavimento (40.5 %), 1,415 carecen de semáforo (34.6 %), 952 no especifican tipo (23.3 %) y apenas 59 (1.4 %) aparecen marcados o semaforizados; solo un cruce en todo el municipio registra guía táctil.
- **Fuente:** OpenStreetMap (Overpass API, corte nov 2026), GeoPortal del Ayuntamiento de Mérida y Marco Geoestadístico INEGI (dic 2025).

---

## Escena 2 · Los siniestros con peatones subieron de 52 en 2021 a 89 en 2024 y dejaron 333 personas heridas

- **Subtítulo:** Evolución mensual de accidentes viales con peatón involucrado y peatones lesionados en Mérida, enero 2021 a diciembre 2024.
- **Archivo:** [`datos/escena-2.csv`](datos/escena-2.csv) · **Gráfica D3:** [`graficas/escena-2.html`](graficas/escena-2.html)
- **Cómo leer esta escena:** A diferencia del capítulo de siniestralidad general del municipio (Equipo 6), aquí se aíslan los 304 hechos donde hubo un peatón directamente involucrado. La línea morada muestra los siniestros mensuales y la línea oro los peatones heridos en cada mes. Tras 52 casos en 2021, el registro saltó a 87 en 2022, bajó ligeramente a 76 en 2023 y alcanzó su máximo de 89 en 2024 (+71.2 % de 2021 a 2024), con su pico mensual en mayo de 2024 (14 siniestros y 15 peatones heridos) y septiembre de 2024 (12 siniestros y 15 heridos).
- **Fuente:** INEGI, Estadística de Accidentes de Tránsito Terrestre en Zonas Urbanas y Suburbanas (ATUS 2021–2024, municipio 31050).

---

## Escena 3 · El riesgo peatonal se concentra tanto en el Centro saturado como en colonias periféricas sin banquetas mapeadas

- **Subtítulo:** Índice de prioridad peatonal (0–100) en las 550 AGEB de Mérida y las 10 zonas con mayor urgencia de intervención.
- **Archivos:** [`datos/escena-3.csv`](datos/escena-3.csv), [`datos/merida_ageb_simplificado.geojson`](datos/merida_ageb_simplificado.geojson) · **Gráfica D3:** [`graficas/escena-3.html`](graficas/escena-3.html)
- **Cómo leer esta escena:** El mapa coroplético ordena las 550 AGEB por su índice de prioridad peatonal (blanco a morado) y el ranking horizontal muestra las 10 zonas más críticas. Dos perfiles opuestos comparten la cima: por un lado, el Centro Histórico (`AGEB 3105000010510`, índice 74.3, 2,932 establecimientos DENUE, 49 paraderos Va-y-Ven y 7 siniestros con peatón); por el otro, colonias de expansión o borde vial con 0 km de banquetas mapeadas en sus AGEB, como Santa Gertrudis Copó (índice 59.2, 3 atropellamientos y 0 semáforos), Emiliano Zapata Sur III (42.9, 5 atropellamientos y 0 semáforos) y Delio Moreno Cantón (40.0, 4 atropellamientos y apenas 1 semáforo en toda su AGEB).
- **Fuente:** Integración por AGEB de INEGI (ATUS 2021–2024, Censo 2020, DENUE 2025/2026, MDT 1.5 m), OpenStreetMap (nov 2026) y ATY Va-y-Ven.

---

## Exploración 3D complementaria (fuera del booklet impreso)

Para inspeccionar la escala real de las manzanas y el microrelieve peatonal del Centro Histórico, el repositorio incluye dos activos 3D reales en la plataforma web interactiva (`index.html`):

- **Nube de terreno real 1.5 m (`merida_centro_inegi_mdt_1_5m_real.ply`):** 11,554 puntos reales de la carta INEGI F16C52A1.
- **Maqueta volumétrica LoD1 (`merida_centro_historico_lod1_real.glb`):** 105 edificios reales del Centro Histórico extruidos sobre cotas INEGI (121.8 KB, glTF 2.0).

---

## Lo que estos datos no dicen

1. **Cobertura incompleta de banquetas y cruces en OpenStreetMap:** Que una AGEB aparezca con 0 km de red peatonal o sin semáforos en OSM (225 y 477 de las 550 AGEB —545 urbanas y 5 rurales—, respectivamente) combina dos fenómenos que estos archivos no separan por sí solos: carencia real de infraestructura física en la periferia y ausencia de mapeo voluntario en calle.
2. **Ancho físico de banqueta y umbral normativo de 1.20 m:** OpenStreetMap no registra de forma sistemática el ancho en centímetros ni los obstáculos (postes, registros rotos, autos estacionados) de las banquetas de Mérida. Cuando se evalúa accesibilidad peatonal en campo, la referencia oficial en México es la **NOM-004-SEDATU-2023** (*Estructura y diseño para vías urbanas. Especificaciones y aplicación*, Tabla 38) y el **Manual de Calles SEDATU/BID (2019)**, que fijan **1.20 m** como el ancho libre mínimo absoluto de la franja de circulación peatonal para garantizar accesibilidad universal (y **1.80 m** o más como estándar óptimo).
3. **Subregistro de fallecimientos y accidentes fuera de polígono AGEB:** ATUS contabiliza únicamente defunciones ocurridas en el sitio del accidente (2 peatones en 2021–2024) y no incorpora muertes posteriores en hospitales ni incidentes no reportados ante la autoridad vial. Además, 13 de los 304 siniestros con peatón ocurrieron sobre ejes carreteros o derechos de vía fuera de los polígonos AGEB (291 sí caen dentro de las 550 AGEB).
4. **Resolución del relieve:** Las 29 teselas del INEGI usadas para elevación y pendiente son un Modelo Digital de Terreno fotogramétrico de 1.5 m (no escaneo LiDAR terrestre de banqueta), suficiente para detectar zonas bajas pero no escalones o grietas menores a un metro.

---

## Puente hacia el Acto 4 · Plana sobre el agua

En las 550 AGEB medidas sobre el MDT de 1.5 m del INEGI, Mérida promedia apenas **7.39 metros sobre el nivel del mar** y una pendiente media de **1.36 %**: cuando llueve sobre una ciudad casi completamente plana, las mismas banquetas sin infraestructura continua y los cruces sin señalización quedan convertidos en charcos y encharcamientos que detienen el paso.
