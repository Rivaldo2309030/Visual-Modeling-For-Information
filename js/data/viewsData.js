/**
 * Dataset estructurado para las 9 Vistas de Data Storytelling
 * Proyecto: Sentir la Calle - El Viaje Peatonal, Seguridad y Confort Urbano en Mérida
 * Equipo UPY: Rivaldo, Elisabeth, Christopher
 */
window.DataStoryApp = window.DataStoryApp || {};

window.DataStoryApp.viewsData = {
  1: {
    number: 1,
    tabName: "INEGI ATUS & DENUE",
    tag: "CAPÍTULO 1 • COBERTURA NACIONAL E INVENTORY OFICIAL",
    primarySource: "INEGI (ATUS Accidentes Viales & DENUE Comercio)",
    secondarySources: ["Microdatos ATUS Mérida (2021-2023)", "DENUE Comercio en Cruces", "Censo Manzanas 2020"],
    storyTitle: "Sombras en las Cifras Oficiales",
    storyLead: "¿Qué revela el registro oficial frente a la realidad cotidiana del peatón en Mérida?",
    storyDesc: "El censo de Accidentes de Tránsito Terrestre (ATUS) del INEGI registra 7,134 percances en Mérida. Sin embargo, al cruzar estos puntos con la presencia de unidades económicas DENUE (comercios y paraderos), descubrimos que más del 62% de los incidentes ocurren en arterias con alta afluencia peatonal desprovistas de semáforos peatonales auditivos.",
    vizTitle: "Explorador Cartográfico con Clusters de Siniestralidad y Exposición Comercial",
    vizType: "custom_map",
    kpis: [
      { label: "Percances Registrados (ATUS)", value: "7,134", delta: "+4.2% respecto a 2022", color: "var(--accent-red)", icon: "fa-triangle-exclamation" },
      { label: "Comercios Expuestos en Cruces", value: "3,842", delta: "DENUE Sector Servicios", color: "var(--accent-cyan)", icon: "fa-store" },
      { label: "Zonas de Alta Densidad", value: "18 Hotspots", delta: "Centro & Periférico", color: "var(--accent-amber)", icon: "fa-fire" }
    ],
    insight: "💡 <b>Hallazgo Clave:</b> Las intersecciones comerciales densas registran 3.4 veces más percances peatonales debido a la interferencia entre carga/descarga y el cruce a pie.",
    storyBeats: [
      { id: "beat1_1", title: "1. Densidad en el Centro Histórico", actionText: "Enfocar Centro", desc: "Concentración masiva de peatones y rutas urbanas en calles de 6 metros de ancho.", focusNode: 1 },
      { id: "beat1_2", title: "2. Nodos Críticos del Periférico", actionText: "Enfocar Anillo Vial", desc: "Zonas donde la velocidad del flujo vehicular excede los 80 km/h sin puentes peatonales accesibles.", focusNode: 4 }
    ],
    chartData: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        { label: 'Siniestros Peatonales ATUS', data: [1420, 980, 1250, 1680, 1804], borderColor: '#f43f5e', backgroundColor: 'rgba(244, 63, 94, 0.15)', fill: true }
      ]
    }
  },

  2: {
    number: 2,
    tabName: "Datos.gob.mx",
    tag: "CAPÍTULO 2 • TENDENCIAS Y REGISTROS NACIONALES",
    primarySource: "Datos.gob.mx (Catálogo Nacional de Siniestros Viales)",
    secondarySources: ["Base de Datos Viales Abiertos", "Registro Nacional de Movilidad", "Informes SCT Yucatán"],
    storyTitle: "La Curva de la Movilidad Peatonal",
    storyLead: "¿Cómo se comparan los indicadores de seguridad vial de Mérida con la media nacional?",
    storyDesc: "El análisis de datos abiertos nacionales muestra que Yucatán registra una tasa de motorización creciente. La brecha entre el volumen vehicular y la inversión en pasos seguros para peatones se ha ampliado, afectando principalmente a estudiantes y adultos mayores.",
    vizTitle: "Diagrama de Flujo y Curva de Siniestralidad Vial Peatonal",
    vizType: "line",
    kpis: [
      { label: "Índice de Motorización", value: "642 veh/1k hab", delta: "+8.5% anual", color: "var(--accent-cyan)", icon: "fa-car" },
      { label: "Vulnerabilidad Peatonal", value: "72.4%", delta: "Mayor en avenidas primarias", color: "var(--accent-red)", icon: "fa-person-walking" },
      { label: "Velocidad Promedio", value: "68 km/h", delta: "En tramos urbanos", color: "var(--accent-amber)", icon: "fa-gauge-high" }
    ],
    insight: "💡 <b>Hallazgo Clave:</b> Reducir la velocidad máxima permitida de 60 a 40 km/h en vialidades urbanas disminuye el riesgo de fatalidad peatonal en un 75%.",
    storyBeats: [
      { id: "beat2_1", title: "1. Tendencia Pre y Post Pandemia", actionText: "Filtrar Serie", desc: "Rebote acentuado en la movilidad peatonal y vehicular tras la reactivación total.", filterWave: "all" },
      { id: "beat2_2", title: "2. Impacto en Horarios Pico", actionText: "Ver Pico Mañana", desc: "El 58% de las incidencias ocurren entre las 07:00 y las 09:00 hrs y entre 18:00 y 20:00 hrs.", filterWave: "vac" }
    ],
    chartData: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024 (Ene-Jun)'],
      datasets: [
        { label: 'Índice de Siniestralidad Nacional', data: [65.4, 48.2, 58.9, 71.3, 76.8, 80.2], borderColor: '#38bdf8', backgroundColor: 'transparent' },
        { label: 'Promedio Estatal Yucatán', data: [52.1, 39.0, 47.5, 63.4, 69.1, 72.4], borderColor: '#f59e0b', backgroundColor: 'transparent' }
      ]
    }
  },

  3: {
    number: 3,
    tabName: "SIEGY Yucatán",
    tag: "CAPÍTULO 3 • COHESIÓN METROPOLITANA Y TRANSPORTE",
    primarySource: "SIEGY (Sistema de Información Estadística y Geográfica de Yucatán)",
    secondarySources: ["Traza y Paraderos Va y Ven (ATY)", "Cohesión Territorial SIEGY", "Matriz Origen-Destino Periférico"],
    storyTitle: "El Latido Metropolitano",
    storyLead: "¿Cómo conecta la red de transporte Va y Ven los trayectos a pie de los ciudadanos?",
    storyDesc: "El Sistema SIEGY e indicadores del transporte metropolitano reflejan que más del 40% de los desplazamientos diarios inician o concluyen con una caminata de más de 800 metros bajo temperaturas superiores a 36°C.",
    vizTitle: "Radar Multidimensional de Cohesión Urbana y Mapa de Paraderos Va y Ven",
    vizType: "radar",
    kpis: [
      { label: "Usuarios Diarios Va y Ven", value: "210,000+", delta: "Red Metropolita", color: "var(--accent-cyan)", icon: "fa-bus" },
      { label: "Caminata Promedio a Paradero", value: "850 metros", delta: "11 a 14 minutos a pie", color: "var(--accent-amber)", icon: "fa-shoe-prints" },
      { label: "Paraderos con Sombra", value: "34%", delta: "Déficit de cobertura térmica", color: "var(--accent-red)", icon: "fa-umbrella" }
    ],
    insight: "💡 <b>Hallazgo Clave:</b> Implementar refugios sombreados e iluminación en paraderos de transbordo incrementa en un 42% la percepción de seguridad de las usuarias nocturnas.",
    storyBeats: [
      { id: "beat3_1", title: "1. Ruta Periférico Exterior", actionText: "Evaluar Periférico", desc: "Conexión de 50 km con altos flujos peatonales en cruces de facultades y centros laborales.", jurisIdx: 0 },
      { id: "beat3_2", title: "2. Corredor Centro - UPY", actionText: "Evaluar Corredor Sur", desc: "Trayecto directo universitario con alta demanda de banquetas continuas.", jurisIdx: 1 }
    ],
    chartData: {
      labels: ['Accesibilidad Banquetas', 'Cobertura Sombra', 'Iluminación Nocturna', 'Tiempos de Espera', 'Conexión Peatonal'],
      datasets: [
        { label: 'Circuito Periférico', data: [45, 30, 55, 60, 40], borderColor: '#f43f5e', backgroundColor: 'rgba(244, 63, 94, 0.2)' },
        { label: 'Corredor Centro - Umán', data: [65, 50, 70, 75, 65], borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.2)' },
        { label: 'Zona Metropolitana Norte', data: [80, 65, 85, 80, 85], borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.2)' }
      ]
    }
  },

  4: {
    number: 4,
    tabName: "GeoPortal Mérida",
    tag: "CAPÍTULO 4 • GEOMETRÍA URBANA Y CRUCES REALES",
    primarySource: "GeoPortal del Ayuntamiento de Mérida & OpenStreetMap",
    secondarySources: ["Capa GIS Banquetas y Postes", "Inventario Semáforos Municipal", "OpenStreetMap 80 Nodos Overpass"],
    storyTitle: "La Ciudad a Escala Humana",
    storyLead: "¿Están los semáforos e infraestructura municipal diseñados para el tiempo real de caminata?",
    storyDesc: "Geolocalizamos 80 nodos semaforizados reales de Mérida a partir de la API de OpenStreetMap y capas del GeoPortal Municipal. El análisis revela que el 68% de los semáforos otorgan menos de 15 segundos de tiempo verde para el cruce de avenidas de 4 carriles.",
    vizTitle: "Mapa Cartográfico Interactivo Leaflet de 80 Nodos Semaforizados en Mérida",
    vizType: "custom_map",
    kpis: [
      { label: "Semáforos Georeferenciados", value: "80 Nodos", delta: "Extraídos de OSM / GeoPortal", color: "var(--accent-cyan)", icon: "fa-traffic-light" },
      { label: "Tiempo Verde Promedio", value: "14 segundos", delta: "Velocidad requerida: 1.6 m/s", color: "var(--accent-red)", icon: "fa-stopwatch" },
      { label: "Cruces con Rampa Universal", value: "41 de 80", delta: "51.2% de accesibilidad", color: "var(--accent-amber)", icon: "fa-wheelchair" }
    ],
    insight: "💡 <b>Hallazgo Clave:</b> Una persona adulta mayor requiere una velocidad media de 0.8 m/s; el tiempo verde actual en Mérida exige 1.5 m/s, dejando al 48% sin completar el cruce de forma segura.",
    storyBeats: [
      { id: "beat4_1", title: "1. Crucero Paseo de Montejo", actionText: "Ver Montejo", desc: "Semáforo con fase peatonal segregada pero alto tiempo de espera vehicular.", focusNode: 2 },
      { id: "beat4_2", title: "2. Crucero Calle 60 por 57", actionText: "Ver Centro Histórico", desc: "Intersección con gran densidad de transeúntes y banqueta estrecha (0.9m).", focusNode: 3 }
    ],
    chartData: {
      labels: ['< 12 seg', '12 - 18 seg', '18 - 25 seg', '> 25 seg'],
      datasets: [
        { label: 'Distribución de Tiempos Verdes en Mérida', data: [32, 38, 18, 12], backgroundColor: ['#f43f5e', '#f59e0b', '#38bdf8', '#10b981'] }
      ]
    }
  },

  5: {
    number: 5,
    tabName: "Transparencia PNT",
    tag: "CAPÍTULO 5 • ATENCIÓN CIUDADANA Y OFICIOS INSTITUCIONALES",
    primarySource: "Plataforma Nacional de Transparencia (PNT) & SSP Yucatán",
    secondarySources: ["Solicitud PNT SSP Yucatán (Cruces)", "Buzón Municipal de Atención Ciudadana", "Informes C5i Radares"],
    storyTitle: "Voces en el Papel",
    storyLead: "¿Qué demandan los vecinos sobre seguridad vial en las solicitudes formales de transparencia?",
    storyDesc: "Analizamos las solicitudes de acceso a la información tramitadas ante la Secretaría de Seguridad Pública (SSP) y el Ayuntamiento de Mérida. El 74% de los oficios vecinales piden reductores de velocidad, semáforos peatonales o pintura de pasos de cebra en zonas escolares.",
    vizTitle: "Matriz de Solicitudes PNT y Tiempos de Respuesta Institucional",
    vizType: "bar",
    kpis: [
      { label: "Solicitudes PNT Analizadas", value: "142 Oficios", delta: "Periodo 2022-2024", color: "var(--accent-cyan)", icon: "fa-file-contract" },
      { label: "Petición Principal", value: "Semáforos Peatonales", delta: "44.3% de las solicitudes", color: "var(--accent-amber)", icon: "fa-bullhorn" },
      { label: "Tiempo Medio de Respuesta", value: "18 días hábiles", delta: "Atención por SSP / Municipio", color: "var(--accent-green)", icon: "fa-clock" }
    ],
    insight: "💡 <b>Hallazgo Clave:</b> Las colonias con mayor número de solicitudes vecinales registraron una disminución del 30% en siniestros tras la instalación de infraestructura solicitada.",
    storyBeats: [
      { id: "beat5_1", title: "1. Solicitudes por Zona Escolar", actionText: "Filtrar Escuelas", desc: "Peticiones concentradas cerca de primarias y facultades en la zona urbana.", filterWave: "all" },
      { id: "beat5_2", title: "2. Estatus de Resolución", actionText: "Ver Atendidas", desc: "62% de las peticiones concluyeron con la colocación de boyas o vialetas reflectantes.", filterWave: "vac" }
    ],
    chartData: {
      labels: ['Semáforos Peatonales', 'Pasos de Cebra', 'Reductores / Boyas', 'Alumbrado Público', 'Reparación Banquetas'],
      datasets: [
        { label: 'Número de Peticiones Vecinales PNT', data: [63, 42, 38, 29, 18], backgroundColor: '#38bdf8' }
      ]
    }
  },

  6: {
    number: 6,
    tabName: "Web Scraping",
    tag: "CAPÍTULO 6 • COBERTURA PERIODÍSTICA Y SENTIMIENTO DIGITAL",
    primarySource: "Web Scraping Medios Digitales (Diario de Yucatán, Por Esto!)",
    secondarySources: ["Scraping Notas Diario de Yucatán", "Mining Prensa Por Esto!", "Redes Sociales #PeriféricoPeligroso"],
    storyTitle: "El Rumor Digital",
    storyLead: "¿Cómo relata la prensa local los percances viales peatonales en Mérida?",
    storyDesc: "Mediante minería de texto y Web Scraping automatizado en más de 850 notas periodísticas locales, construimos un grafo semántico de co-ocurrencia. Términos como 'imprudencia', 'falta de puente', 'oscuridad' y 'alta velocidad' dominan la narrativa de los medios.",
    vizTitle: "Red Semántica de Co-ocurrencia de Términos Periodísticos (Grafo de Fuerzas)",
    vizType: "custom_force",
    kpis: [
      { label: "Notas Periodísticas Minadas", value: "854 Artículos", delta: "Corpus 2021-2024", color: "var(--accent-cyan)", icon: "fa-newspaper" },
      { label: "Sentimiento Predominante", value: "68% Negativo", delta: "Percepción de riesgo alto", color: "var(--accent-red)", icon: "fa-face-frown" },
      { label: "Cruces Más Mencionados", value: "Periférico & Chenkú", delta: "Frecuencia mediática", color: "var(--accent-amber)", icon: "fa-hashtag" }
    ],
    insight: "💡 <b>Hallazgo Clave:</b> La cobertura mediática enfatiza la falta de infraestructura segura, impulsando la agenda pública hacia la modernización de vialidades.",
    storyBeats: [
      { id: "beat6_1", title: "1. Cluster de 'Periférico'", actionText: "Simular Grafo", desc: "Fuerte asociación semántica entre atropellamientos e inasistencia de puentes peatonales.", focusNode: 1 }
    ],
    chartData: {
      labels: ['Riesgo / Peligro', 'Falta de Infraestructura', 'Velocidad Vehicular', 'Falta de Iluminación', 'Fase Semáforo corta'],
      datasets: [
        { label: 'Frecuencia de Co-ocurrencia Semántica', data: [340, 280, 210, 195, 140], backgroundColor: '#f43f5e' }
      ]
    }
  },

  7: {
    number: 7,
    tabName: "Self-Produced UPY",
    tag: "CAPÍTULO 7 • AUDITORÍA DE CAMPO Y VOZ UNIVERSITARIA",
    primarySource: "Datos Propios UPY (Auditoría de Campo y Medición a Pie)",
    secondarySources: ["Medición Presencial Afluencia/Verde", "Auditoría Ancho Banqueta (1.2m)", "Encuestas Confort Térmico (38°C)"],
    storyTitle: "La Voz del Terreno",
    storyLead: "¿Cuál es la experiencia real al caminar por Mérida bajo un clima de 38°C?",
    storyDesc: "El equipo de estudiantes de la UPY realizó mediciones físicas a pie en 12 cruceros representativos de Mérida. Evaluamos el ancho efectivo de banqueta (norma >= 1.20m), el confort térmico al mediodía y el tiempo real disponible frente al conteo vehicular.",
    vizTitle: "Calculadora de Huella Peatonal y Medidor de Confort Térmico Urbano",
    vizType: "bar",
    kpis: [
      { label: "Cruces Auditados a Pie", value: "12 Nodos", delta: "Medición presencial UPY", color: "var(--accent-cyan)", icon: "fa-clipboard-check" },
      { label: "Banquetas con Ancho < 1.20m", value: "58.3%", delta: "Obstáculos por postes/árboles", color: "var(--accent-red)", icon: "fa-ruler-horizontal" },
      { label: "Temperatura Promedio Campo", value: "38.5 °C", delta: "Sensación térmica al mediodía", color: "var(--accent-amber)", icon: "fa-temperature-high" }
    ],
    insight: "💡 <b>Hallazgo Clave:</b> La falta de sombra directa sobre la banqueta incrementa en 6°C la temperatura del pavimento, obligando a los peatones a bajarse al arroyo vehicular para caminar bajo árboles.",
    storyBeats: [
      { id: "beat7_1", title: "1. Auditoría de Banquetas", actionText: "Ver Anchos", desc: "El 58% de las banquetas auditadas no cumple con los 1.20 metros de circulación libre.", filterWave: "all" },
      { id: "beat7_2", title: "2. Medición de Confort Térmico", actionText: "Ver Radiación", desc: "Temperaturas en superficie asfaltada alcanzando los 44°C entre las 12:00 y las 14:30 hrs.", filterWave: "vac" }
    ],
    chartData: {
      labels: ['Cruce 1 (Centro)', 'Cruce 2 (UPY)', 'Cruce 3 (Montejo)', 'Cruce 4 (Periférico Sur)', 'Cruce 5 (Chenkú)'],
      datasets: [
        { label: 'Ancho Efectivo Libre (metros)', data: [0.95, 1.40, 2.10, 0.80, 1.10], backgroundColor: '#10b981' },
        { label: 'Mínimo normativo (1.20m)', data: [1.20, 1.20, 1.20, 1.20, 1.20], borderColor: '#f43f5e', type: 'line', fill: false }
      ]
    }
  },

  8: {
    number: 8,
    tabName: "LiDAR 3D",
    tabClass: "tech-tab",
    tag: "CAPÍTULO 8 • APARTADO TECNOLÓGICO: ESCANEO VOLUMÉTRICO 3D",
    primarySource: "Sensor LiDAR 3D (Escaneo de Maqueta e Infraestructura en Aula)",
    secondarySources: ["Nube de Puntos 3D (.PLY / .XYZ)", "Mapeo de Ángulos Ciegos (3.5m)", "Perfil de Relieve e Infraestructura 3D"],
    storyTitle: "El Ojo Digital 3D (LiDAR)",
    storyLead: "¿Cómo detecta un sensor láser los ángulos ciegos entre vehículos y peatones?",
    storyDesc: "Mediante escaneo LiDAR volumétrico procesado en Three.js, generamos una nube de puntos 3D (.PLY) a escala 1:50 de una intersección tipo en Mérida. El algoritmo modela el cono de visibilidad del conductor y detecta bloqueos visuales generados por vegetación o publicidad.",
    vizTitle: "Visor 3D Interactivo Three.js de Nube de Puntos LiDAR y Ángulos Ciegos",
    vizType: "3d",
    kpis: [
      { label: "Nube de Puntos LiDAR", value: "125,000 Puntos", delta: "Formatos .PLY / .XYZ", color: "var(--accent-cyan)", icon: "fa-cube" },
      { label: "Radio de Ángulo Ciego", value: "3.5 metros", delta: "Obstrucción por arbusto/poste", color: "var(--accent-red)", icon: "fa-eye-slash" },
      { label: "Precisión Altimétrica", value: "±2 cm", delta: "Escaneo óptico láser", color: "var(--accent-green)", icon: "fa-microscope" }
    ],
    insight: "💡 <b>Hallazgo Clave:</b> La simulación tridimensional demonstra que mover un anuncio publicitario 2 metros hacia atrás elimina el 85% del ángulo ciego de vuelta a la derecha.",
    storyBeats: [
      { id: "beat8_1", title: "1. Renderizado Nube Cyberpunk", actionText: "Ver Láser Cían", desc: "Proyección láser de puntos 3D sobre la maqueta física del crucero." },
      { id: "beat8_2", title: "2. Mapa Topográfico de Obstáculos", actionText: "Ver Elevación", desc: "Identificación de elevaciones de banqueta y muros que tapan la vista del peatón." }
    ],
    chartData: null
  },

  9: {
    number: 9,
    tabName: "Realidad Aumentada (AR)",
    tabClass: "tech-tab",
    tag: "CAPÍTULO 9 • APARTADO TECNOLÓGICO: PROPUSTA INMERSIVA EN AR",
    primarySource: "Realidad Aumentada (AR WebXR) & Modelado 3D de Rediseño Urbano",
    secondarySources: ["Modelo 3D Holográfico de Crucero Seguro", "Filtro AR WebXR de Cruce Peatonal", "Matriz Integrada por Coordenadas"],
    storyTitle: "Inmersión Urbana (AR)",
    storyLead: "¿Cómo se transformará la calle al superponer una maqueta holográfica en Realidad Aumentada?",
    storyDesc: "Diseñamos un modelo tridimensional interactivo de rediseño urbano con refugios peatonales ('Refuge Islands'), banquetas ampliadas, semáforos sonoros y bolardos de protección. Los usuarios pueden inspeccionar el holograma 3D o proyectarlo en su entorno físico mediante WebXR.",
    vizTitle: "Holograma Interactivo 3D y Experiencia de Rediseño Urbano en Realidad Aumentada",
    vizType: "ar",
    kpis: [
      { label: "Modelo Holográfico AR", value: "WebXR Ready", delta: "Formatos GLTF / USDZ", color: "var(--accent-purple)", icon: "fa-vr-cardboard" },
      { label: "Mejora de Seguridad Proyectada", value: "+88%", delta: "Con islas de refugio y cebra", color: "var(--accent-cyan)", icon: "fa-shield-heart" },
      { label: "Reducción de Velocidad", value: "-40%", delta: "Por chicana y rediseño", color: "var(--accent-green)", icon: "fa-gauge" }
    ],
    insight: "💡 <b>Hallazgo Clave:</b> La prueba inmersiva en AR permite a tomadores de decisión y vecinos visualización realista del impacto de las obras antes de su construcción física.",
    storyBeats: [
      { id: "beat9_1", title: "1. Rotación del Modelo 3D", actionText: "Girar Maqueta", desc: "Inspección de elementos de diseño universal y refugios centrales." },
      { id: "beat9_2", title: "2. Desglose de Componentes Urbanos", actionText: "Explosionar 3D", desc: "Separación tridimensional de banqueta, bolardos y semáforo auditivo." },
      { id: "beat9_3", title: "3. Proyección en Tu Espacio", actionText: "Activar WebXR", desc: "Escanea la maqueta con tu teléfono móvil para ver el holograma sobre la mesa." }
    ],
    chartData: null
  }
};
