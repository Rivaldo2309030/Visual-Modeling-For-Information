/**
 * Dataset estructurado alimentado con cifras reales verificadas del Data Mart 04
 * Proyecto: Sentir la Calle - Viaje Peatonal, Seguridad y Confort Urbano en Mérida
 * Equipo 4 UPY: Rivaldo, Elisabeth, Christopher
 */
window.DataStoryApp = window.DataStoryApp || {};

window.DataStoryApp.viewsData = {
  1: {
    number: 1,
    tabName: "INEGI ATUS & DENUE",
    tag: "CAPÍTULO 1 • SINIESTRALIDAD VIAL Y EXPOSICIÓN COMERCIAL (INEGI)",
    primarySource: "INEGI (ATUS Georreferenciado 2021–2024, DENUE 2025/2026 & Censo 2020)",
    secondarySources: ["8,815 Siniestros ATUS Mérida", "56,908 Unidades DENUE", "550 AGEBs Marco Geoestadístico dic 2025"],
    storyTitle: "Sombras en las Cifras Oficiales",
    storyLead: "¿Dónde convergen la actividad comercial y los siniestros que afectan a peatones y ciclistas en Mérida?",
    storyDesc: "El registro georreferenciado ATUS del INEGI entre 2021 y 2024 documenta 8,815 accidentes viales dentro del municipio de Mérida (31050), de los cuales 501 involucraron directamente a movilidad activa (304 con peatones y 197 con ciclistas), acumulando 333 peatones heridos. Al cruzar por AGEB con 56,908 establecimientos DENUE, los corredores comerciales concentran la mayor exposición.",
    vizTitle: "Explorador Cartográfico de 8,815 Siniestros ATUS y Densidad Comercial por AGEB",
    vizType: "custom_map",
    kpis: [
      { label: "Siniestros ATUS (2021–2024)", value: "8,815", delta: "304 con peatones · 197 ciclistas", color: "var(--accent-red)", icon: "fa-triangle-exclamation" },
      { label: "Unidades Económicas DENUE", value: "56,908", delta: "Unidas a 550 AGEBs de Mérida", color: "var(--accent-cyan)", icon: "fa-store" },
      { label: "Peatones Lesionados", value: "333", delta: "Serie verificada 2021–2024", color: "var(--accent-amber)", icon: "fa-person-walking" }
    ],
    insight: "💡 <b>Hallazgo Verificado:</b> Entre 2021 y 2024 los siniestros con peatones pasaron de 52 anuales (2021) a 89 anuales (2024), concentrándose en AGEBs con alta densidad de comercios y servicios.",
    storyBeats: [
      { id: "beat1_1", title: "1. Exposición en el Centro Histórico", actionText: "Enfocar Centro", desc: "Alta concentración de unidades económicas DENUE y flujo peatonal continuo.", focusNode: 1 },
      { id: "beat1_2", title: "2. Nodos de Acceso y Periférico", actionText: "Enfocar Anillo Vial", desc: "Interacción crítica entre velocidades de acceso carretero y cruces urbanos.", focusNode: 4 }
    ],
    chartData: {
      labels: ['2021', '2022', '2023', '2024'],
      datasets: [
        { label: 'Accidentes con Peatón Involucrado (ATUS Mérida)', data: [52, 87, 76, 89], borderColor: '#f43f5e', backgroundColor: 'rgba(244, 63, 94, 0.18)', fill: true },
        { label: 'Peatones Heridos (ATUS Mérida)', data: [54, 99, 85, 95], borderColor: '#f59e0b', backgroundColor: 'transparent', fill: false }
      ]
    }
  },

  2: {
    number: 2,
    tabName: "SICT / IMT Viales",
    tag: "CAPÍTULO 2 • PRESIÓN VEHICULAR EN ACCESOS METROPOLITANOS (SICT)",
    primarySource: "SICT Datos Viales (2013–2024) & IMT Red Nacional de Caminos",
    secondarySources: ["4,169 Observaciones SICT Yucatán", "277 Estaciones Georreferenciadas", "Mezcla Vehicular y Carga Pesada"],
    storyTitle: "Presión Vehicular en los Accesos a Mérida",
    storyLead: "¿Cómo ha crecido el volumen diario de vehículos y transporte pesado en los corredores metropolitanos?",
    storyDesc: "A partir de 4,169 registros históricos de aforo vehicular de la SICT en Yucatán (2013–2024), el Tránsito Diario Promedio Anual (TDPA) en los corredores metropolitanos de Mérida creció de 5,167 veh/día en 2013 a 7,846 veh/día en 2023 (+51.8%), con tramos máximos de 43,720 veh/día y ~23.4% de carga pesada.",
    vizTitle: "Evolución del TDPA Promedio (2013–2024): Corredores Mérida vs. Resto de Yucatán",
    vizType: "line",
    kpis: [
      { label: "TDPA Medio Accesos Mérida", value: "7,846 veh/día", delta: "+51.8% entre 2013 y 2023", color: "var(--accent-cyan)", icon: "fa-car" },
      { label: "Aforo Máximo Registrado", value: "43,720 veh/día", delta: "Corredor metropolitano SICT", color: "var(--accent-red)", icon: "fa-gauge-high" },
      { label: "Participación Carga Pesada", value: "23.4%", delta: "277 estaciones georreferenciadas", color: "var(--accent-amber)", icon: "fa-truck" }
    ],
    insight: "💡 <b>Hallazgo Verificado:</b> Los corredores metropolitanos de Mérida soportan casi el triple de flujo vehicular promedio que el resto de la red estatal (7,846 vs. 2,715 veh/día en 2023).",
    storyBeats: [
      { id: "beat2_1", title: "1. Crecimiento Sostenido 2013–2023", actionText: "Filtrar Serie", desc: "Incremento continuo del flujo diario tras la caída temporal de 2020.", filterWave: "all" },
      { id: "beat2_2", title: "2. Peso del Transporte de Carga", actionText: "Ver Mezcla", desc: "Cerca de una cuarta parte del flujo en accesos corresponde a vehículos pesados.", filterWave: "vac" }
    ],
    chartData: {
      labels: ['2015', '2017', '2019', '2020', '2021', '2022', '2023'],
      datasets: [
        { label: 'TDPA Corredores Metropolitanos Mérida', data: [6017, 6509, 7388, 6297, 7059, 7345, 7846], borderColor: '#38bdf8', backgroundColor: 'transparent' },
        { label: 'TDPA Resto Red Estatal Yucatán', data: [1784, 1955, 2320, 2070, 2299, 2543, 2715], borderColor: '#f59e0b', backgroundColor: 'transparent' }
      ]
    }
  },

  3: {
    number: 3,
    tabName: "ATY Va-y-Ven & SIEGY",
    tag: "CAPÍTULO 3 • TRANSPORTE PÚBLICO METROPOLITANO Y PARADEROS",
    primarySource: "Agencia de Transporte de Yucatán (ATY) & SIEGY Boletín 2025-11",
    secondarySources: ["110 Rutas Oficiales ATY (Va-y-Ven / IE-TRAM)", "565 Trazas y Paraderos GIS", "Indicadores SIEGY Transporte Sostenible"],
    storyTitle: "El Latido Metropolitano",
    storyLead: "¿Qué cobertura territorial tienen las rutas y paraderos que inician y terminan cada viaje a pie?",
    storyDesc: "Integramos el catálogo oficial de 110 rutas publicadas por la ATY (incluyendo Va-y-Ven urbano, rutas nocturnas e IE-TRAM) junto con 565 elementos georreferenciados (547 paraderos puntuales y trazas de ruta) e indicadores oficiales del Boletín 2025-11 de Transporte Sostenible del SIEGY.",
    vizTitle: "Cobertura Multidimensional y Red Espacial de 547 Paraderos en Mérida",
    vizType: "radar",
    kpis: [
      { label: "Rutas Oficiales ATY", value: "110 Rutas", delta: "Va-y-Ven, Nocturnas e IE-TRAM", color: "var(--accent-cyan)", icon: "fa-bus" },
      { label: "Paraderos Georreferenciados", value: "547 Nodos", delta: "565 features totales en GIS", color: "var(--accent-amber)", icon: "fa-location-dot" },
      { label: "Indicadores Oficiales SIEGY", value: "Boletín 2025-11", delta: "Transporte Sostenible Yucatán", color: "var(--accent-green)", icon: "fa-chart-line" }
    ],
    insight: "💡 <b>Hallazgo Verificado:</b> Cada paradero funciona como nodo generador de viajes a pie; cruzar su ubicación con banquetas y cruces OSM permite detectar brechas de última milla por AGEB.",
    storyBeats: [
      { id: "beat3_1", title: "1. Conectividad Metropolitana", actionText: "Evaluar Red", desc: "Articulación entre rutas troncales, circuito periférico y corredores IE-TRAM.", jurisIdx: 0 },
      { id: "beat3_2", title: "2. Entorno Peatonal del Paradero", actionText: "Evaluar Entorno", desc: "Presencia desigual de refugios, bancas e iluminación peatonal alrededor de las paradas.", jurisIdx: 1 }
    ],
    chartData: {
      labels: ['Densidad Paraderos', 'Red Peatonal Cercana', 'Cruces Mapeados', 'Semáforos Cercanos', 'Mobiliario / Luz'],
      datasets: [
        { label: 'Centro Histórico', data: [92, 88, 85, 80, 76], borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.2)' },
        { label: 'Corredores Intermedios', data: [65, 58, 54, 52, 45], borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.2)' },
        { label: 'Periferia / Expansión', data: [34, 25, 22, 18, 20], borderColor: '#f43f5e', backgroundColor: 'rgba(244, 63, 94, 0.2)' }
      ]
    }
  },

  4: {
    number: 4,
    tabName: "GeoPortal Mérida & Semáforos",
    tag: "CAPÍTULO 4 • GEOMETRÍA URBANA Y 190 SEMÁFOROS GEORREFERENCIADOS",
    primarySource: "GeoPortal del Ayuntamiento de Mérida & OpenStreetMap (Overpass API)",
    secondarySources: ["500 Colonias Oficiales Mérida", "Centro Histórico + 73 Zonas Patrimoniales", "190 Semáforos Reales en Mérida (31050)"],
    storyTitle: "La Ciudad a Escala Humana",
    storyLead: "¿Cómo se distribuyen los 190 nodos semaforizados reales a lo largo de las 500 colonias de Mérida?",
    storyDesc: "Cruzamos las capas vectoriales oficiales del GeoPortal de Mérida (500 colonias, polígono del Centro Histórico y 73 zonas patrimoniales en EPSG:4326) con la extracción completa de 190 semáforos reales (`highway=traffic_signals`) dentro del municipio de Mérida.",
    vizTitle: "Mapa Cartográfico de 190 Semáforos Reales y Colonias del Municipio de Mérida",
    vizType: "custom_map",
    kpis: [
      { label: "Semáforos Reales en Mérida", value: "190 Nodos", delta: "Filtrados a cve_mun = 31050", color: "var(--accent-cyan)", icon: "fa-traffic-light" },
      { label: "Colonias Oficiales", value: "500 Polígonos", delta: "GeoPortal Mérida EPSG:4326", color: "var(--accent-amber)", icon: "fa-map-location-dot" },
      { label: "Zonas Patrimoniales", value: "74 Polígonos", delta: "Centro Histórico + 73 zonas", color: "var(--accent-green)", icon: "fa-landmark" }
    ],
    insight: "💡 <b>Hallazgo Verificado:</b> La gran mayoría de los nodos semaforizados se concentra en el Centro y ejes radiales primarios, mientras amplias zonas habitacionales periféricas carecen de control semafórico peatonal.",
    storyBeats: [
      { id: "beat4_1", title: "1. Corredor Paseo de Montejo", actionText: "Ver Montejo", desc: "Alta densidad de intersecciones semaforizadas y cruces marcados.", focusNode: 2 },
      { id: "beat4_2", title: "2. Primer Cuadro Centro Histórico", actionText: "Ver Centro", desc: "Polígono patrimonial de ~9.3 km² con intensa convergencia peatonal y comercial.", focusNode: 3 }
    ],
    chartData: {
      labels: ['Colonias Oficiales', 'Semáforos OSM Mérida', 'Zonas Patrimoniales', 'Capas SIG Infraestructura'],
      datasets: [
        { label: 'Activos Geoespaciales Municipales Verificados', data: [500, 190, 74, 66], backgroundColor: ['#38bdf8', '#f43f5e', '#10b981', '#f59e0b'] }
      ]
    }
  },

  5: {
    number: 5,
    tabName: "Infraestructura Municipal",
    tag: "CAPÍTULO 5 • EQUIPAMIENTO PEATONAL Y CAPAS DE OBRA PÚBLICA",
    primarySource: "Catálogo SIG Ayuntamiento de Mérida, Actividad Urbana UMAIP & OpenStreetMap",
    secondarySources: ["562 Luminarias/Bancas/Refugios OSM", "66 Capas SIG Obras Públicas y Vialidad", "Serie Anual Actividad Urbana Centro (2015–2026)"],
    storyTitle: "Infraestructura Pública en la Calle",
    storyLead: "¿Qué infraestructura física de soporte (alumbrado, descanso y refugio) respalda el caminar diario?",
    storyDesc: "Consolidamos fuentes abiertas verificables (sin depender de solicitudes PAE/PNT): 562 unidades georreferenciadas de alumbrado peatonal, bancas y refugios en Mérida, el catálogo oficial de 66 capas SIG municipales de Obras Públicas/Vialidad y la serie anual 2015–2026 de licencias urbanas en el Centro.",
    vizTitle: "Inventario de Equipamiento Peatonal y Capas Municipales de Infraestructura",
    vizType: "bar",
    kpis: [
      { label: "Mobiliario y Luminarias OSM", value: "562 Unidades", delta: "Luminarias, bancas y refugios", color: "var(--accent-cyan)", icon: "fa-lightbulb" },
      { label: "Capas SIG Obras y Vialidad", value: "66 Capas", delta: "Catálogo GeoPortal Mérida", color: "var(--accent-amber)", icon: "fa-layer-group" },
      { label: "Serie Urbana Centro", value: "2015–2026", delta: "Registros anuales UMAIP", color: "var(--accent-green)", icon: "fa-building-columns" }
    ],
    insight: "💡 <b>Nota de Trazabilidad:</b> Ante la protección Radware CAPTCHA para scripts en portales municipales específicos, toda la capa se construyó con registros abiertos reproducibles y verificables.",
    storyBeats: [
      { id: "beat5_1", title: "1. Distribución de Mobiliario y Luz", actionText: "Ver Equipamiento", desc: "Concentración de bancas, paradas cubiertas y alumbrado mapeado por AGEB.", filterWave: "all" },
      { id: "beat5_2", title: "2. Dinámica Urbana 2015–2026", actionText: "Ver Serie", desc: "Evolución de giros comerciales y de servicios que incrementan demanda peatonal en el Centro.", filterWave: "vac" }
    ],
    chartData: {
      labels: ['Mobiliario/Alumbrado OSM', 'Capas SIG Obras/Vialidad', 'Registros Serie Anual Centro'],
      datasets: [
        { label: 'Registros Verificados Subtema 5', data: [562, 66, 38], backgroundColor: '#38bdf8' }
      ]
    }
  },

  6: {
    number: 6,
    tabName: "Web Scraping Prensa",
    tag: "CAPÍTULO 6 • PERCEPCIÓN MEDIÁTICA EN PRENSA LOCAL (338 NOTAS)",
    primarySource: "Diario de Yucatán, Novedades Yucatán, Sala de Prensa Gob. Yucatán & RSS Local",
    secondarySources: ["338 Artículos Únicos Verificados", "7 Tópicos Viales y Peatonales", "Matriz de Co-ocurrencia Semántica"],
    storyTitle: "El Rumor Digital",
    storyLead: "¿Qué temas dominan la agenda mediática local sobre movilidad, calles y riesgo peatonal en Mérida?",
    storyDesc: "Mediante scraping directo y recolección de feeds RSS locales reunimos 338 notas periodísticas reales con enlace verificable. 'Transporte Va-y-Ven / Paraderos' (104 notas, 30.8%), 'Periférico de Mérida' (96 notas, 28.4%), 'Siniestros Viales' (67) y 'Peatón / Atropellamiento' (58) encabezan la cobertura.",
    vizTitle: "Red Semántica de Tópicos y Co-ocurrencias en 338 Notas de Prensa Local",
    vizType: "custom_force",
    kpis: [
      { label: "Notas Reales Recolectadas", value: "338 Artículos", delta: "Con URL y medio verificable", color: "var(--accent-cyan)", icon: "fa-newspaper" },
      { label: "Foco Vial Crítico", value: "96 Notas", delta: "Menciones al Periférico (28.4%)", color: "var(--accent-red)", icon: "fa-road" },
      { label: "Menciones Peatón / Atropello", value: "58 Notas", delta: "17.2% del corpus hemerográfico", color: "var(--accent-amber)", icon: "fa-person-falling-burst" }
    ],
    insight: "💡 <b>Hallazgo Verificado:</b> La co-ocurrencia más frecuente del corpus une 'Periférico de Mérida' con 'Siniestro Vial' (43 notas) y con 'Peatón / Atropellamiento' (19 notas).",
    storyBeats: [
      { id: "beat6_1", title: "1. Nodo Crítico Periférico", actionText: "Simular Grafo", desc: "Principal clúster semántico asociado a siniestros graves y atropellamientos.", focusNode: 1 }
    ],
    chartData: {
      labels: ['Va-y-Ven / Paraderos', 'Periférico Mérida', 'Siniestro / Choque', 'Peatón / Atropello', 'Semáforos / Vialidad', 'Obras y Baches', 'Banquetas y Cruces'],
      datasets: [
        { label: 'Artículos por Tópico (Corpus Real n=338)', data: [104, 96, 67, 58, 42, 26, 15], backgroundColor: '#f43f5e' }
      ]
    }
  },

  7: {
    number: 7,
    tabName: "Red Peatonal OSM",
    tag: "CAPÍTULO 7 • INFRAESTRUCTURA PEATONAL REAL EN OPENSTREETMAP",
    primarySource: "OpenStreetMap (Overpass API / Geofabrik) — Municipio de Mérida",
    secondarySources: ["4,092 Cruces Peatonales Reales", "9,857 Tramos Peatonales (697.6 km)", "Cobertura por 550 AGEBs"],
    storyTitle: "La Red donde Camina Mérida",
    storyLead: "¿Cuántos kilómetros reales de banquetas, andadores y cruces peatonales están mapeados por AGEB?",
    storyDesc: "Procesamos en proyección métrica UTM 16N (EPSG:32616) los 9,857 tramos de infraestructura peatonal (`footway`, `pedestrian`, `steps` y `sidewalk`) y 4,092 cruces peatonales (`highway=crossing`) registrados en OpenStreetMap dentro de Mérida, sumando 697.6 km lineales distribuidos en 325 de las 550 AGEBs.",
    vizTitle: "Distribución de 697.6 km de Red Peatonal y 4,092 Cruces Peatonales en Mérida",
    vizType: "bar",
    kpis: [
      { label: "Red Peatonal Mapeada", value: "697.6 km", delta: "9,857 tramos lineales en Mérida", color: "var(--accent-cyan)", icon: "fa-shoe-prints" },
      { label: "Cruces Peatonales OSM", value: "4,092 Nodos", delta: "Dentro de cve_mun = 31050", color: "var(--accent-green)", icon: "fa-road-spikes" },
      { label: "Cobertura por AGEB", value: "325 / 550", delta: "225 AGEBs sin aceras mapeadas", color: "var(--accent-amber)", icon: "fa-border-all" }
    ],
    insight: "💡 <b>Hallazgo Verificado:</b> 225 de las 550 AGEBs de Mérida aún no registran tramos de banquetas mapeados en OSM, evidenciando tanto rezago físico periférico como brecha cartográfica.",
    storyBeats: [
      { id: "beat7_1", title: "1. Densidad en Centro y Norte", actionText: "Ver Cobertura", desc: "AGEBs consolidadas superan los 9 a 13 km de red peatonal por km².", filterWave: "all" },
      { id: "beat7_2", title: "2. Atributos de Accesibilidad", actionText: "Ver Cruces", desc: "Evaluación de rebajes de guarnición (kerb), iluminación (lit) y pavimento táctil en 4,092 cruces.", filterWave: "vac" }
    ],
    chartData: {
      labels: ['Tramos Peatonales OSM', 'Cruces Peatonales OSM', 'Tramos Centro Histórico', 'AGEBs con Red Peatonal'],
      datasets: [
        { label: 'Conteo Real Verificado en Mérida', data: [9857, 4092, 1910, 325], backgroundColor: '#10b981' }
      ]
    }
  },

  8: {
    number: 8,
    tabName: "Elevación 1.5m & LiDAR",
    tabClass: "tech-tab",
    tag: "CAPÍTULO 8 • MODELO DE TERRENO 1.5m (29 TESELAS INEGI) Y LIDAR NASA G-LIHT",
    primarySource: "INEGI Modelos Digitales de Elevación 1.5 m (29 teselas) + NASA G-LiHT Yucatán",
    secondarySources: ["550/550 AGEBs con Elevación y Pendiente", "Nube .PLY Real (11,554 pts F16C52A1)", "369 Polígonos LiDAR Aéreo NASA G-LiHT"],
    storyTitle: "Relieve, Pendientes y Escaneo 3D",
    storyLead: "¿Qué revelan las 29 teselas de alta resolución (1.5 m) sobre microrelieve y encharcamientos peatonales?",
    storyDesc: "Procesamos con rasterio las 29 teselas GeoTIFF oficiales de 1.5 m del INEGI que cubren el 100% de las 550 AGEBs de Mérida (extrayendo además una nube .PLY real de 11,554 puntos sobre el Centro Histórico en la carta F16C52A1) e integramos los 369 polígonos de vuelo LiDAR aéreo real de NASA G-LiHT en Yucatán.",
    vizTitle: "Visor 3D de Nube de Terreno Real (11,554 pts INEGI 1.5m) y Pendientes por AGEB",
    vizType: "3d",
    kpis: [
      { label: "Cobertura Zonal MDT 1.5m", value: "550 / 550 AGEBs", delta: "29 teselas GeoTIFF procesadas", color: "var(--accent-cyan)", icon: "fa-mountain" },
      { label: "Nube de Terreno Real (.PLY)", value: "11,554 Puntos", delta: "Carta INEGI F16C52A1 Centro", color: "var(--accent-green)", icon: "fa-cube" },
      { label: "Vuelos LiDAR NASA G-LiHT", value: "369 Teselas", delta: "Campaña aérea Yucatán 2013", color: "var(--accent-amber)", icon: "fa-satellite" }
    ],
    insight: "💡 <b>Rigor Técnico:</b> Aunque Mérida es kárstica y plana (cota media ~7–9 msnm), los microdesniveles locales sin drenaje pluvial generan zonas críticas de inundación sobre banquetas y cruces.",
    storyBeats: [
      { id: "beat8_1", title: "1. Malla Real F16C52A1", actionText: "Ver Nube 3D", desc: "Submuestra directa cada 6 m del Modelo Digital de Terreno oficial de 1.5 m." },
      { id: "beat8_2", title: "2. Pendiente P95 por AGEB", actionText: "Ver Pendientes", desc: "Métricas tabulares listas en el Data Mart para cruzar relieve con siniestralidad." }
    ],
    chartData: null
  },

  9: {
    number: 9,
    tabName: "Modelado 3D & AR",
    tabClass: "tech-tab",
    tag: "CAPÍTULO 9 • GEMELO URBANO 3D REAL (.GLB Y CITYJSON V2.0)",
    primarySource: "OpenStreetMap Buildings + INEGI MDT 1.5m + Estándar OGC CityJSON v2.0",
    secondarySources: ["105 Edificios Reales Centro Histórico (.glb)", "Modelo OGC CityJSON v2.0 (86 KB)", "Benchmark Oficial cityjson.org"],
    storyTitle: "Inmersión Urbana 3D y WebXR",
    storyLead: "¿Cómo modelar manzanas reales del Centro Histórico de Mérida para WebXR y análisis espacial 3D?",
    storyDesc: "Extruimos 105 huellas reales de edificaciones de OpenStreetMap del Centro Histórico de Mérida sobre sus cotas reales del terreno INEGI 1.5 m, generando tanto un binario estándar glTF 2.0 (`merida_centro_historico_lod1_real.glb`, 121.8 KB, 2,328 triángulos) como un modelo OGC `CityJSON v2.0`.",
    vizTitle: "Maqueta 3D Real del Centro Histórico de Mérida (.GLB / CityJSON v2.0 para WebXR)",
    vizType: "ar",
    kpis: [
      { label: "Edificios Reales Extruidos", value: "105 Edificios", delta: "Centro Histórico de Mérida", color: "var(--accent-purple)", icon: "fa-city" },
      { label: "Activo Web Optimizado (.GLB)", value: "121.8 KB", delta: "2,328 triángulos · glTF 2.0", color: "var(--accent-cyan)", icon: "fa-vr-cardboard" },
      { label: "Estándar OGC 3D", value: "CityJSON v2.0", delta: "CRS métrico EPSG:6371", color: "var(--accent-green)", icon: "fa-cubes" }
    ],
    insight: "💡 <b>Listo para Producción:</b> Con apenas 121.8 KB, el archivo `.glb` carga instantáneamente en dispositivos móviles, Three.js y visores AR sin saturar Supabase Storage.",
    storyBeats: [
      { id: "beat9_1", title: "1. Inspección Volumétrica LoD1", actionText: "Girar Modelo", desc: "Alturas derivadas de niveles/alturas OSM apoyadas sobre cota real INEGI." },
      { id: "beat9_2", title: "2. Interoperabilidad CityJSON", actionText: "Ver Atributos", desc: "Cada CityObject conserva su osm_id, uso de edificio y cota msnm." },
      { id: "beat9_3", title: "3. Despliegue Ligero WebXR", actionText: "Activar AR", desc: "Optimizado bajo las reglas del Spatial Data Team (<15 MB, licencia abierta)." }
    ],
    chartData: null
  }
};
