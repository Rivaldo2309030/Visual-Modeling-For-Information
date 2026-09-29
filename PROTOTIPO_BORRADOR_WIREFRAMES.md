# Prototipo, Wireframes y Diseño de Interfaz (UI/UX)
### *Proyecto Data Viz UPY: Sentir la Calle - El Viaje Peatonal, Seguridad y Confort Urbano en Mérida*

---

## 🎨 Guía de Estilo y Sistema de Diseño (Design System)

El diseño del tablero interactivo sigue un enfoque **Sleek Dark Mode / Urban Tech Aesthetic** con alto contraste, tipografía moderna (`Outfit` / `Inter`) y paleta de colores optimizada para visualización cartográfica nocturna y diurna.

### Paleta de Colores
- **Fondo Principal:** `#0b0f19` (Azul Noche Profundo)
- **Superficie de Tarjetas (Glassmorphism):** `rgba(15, 23, 42, 0.75)` con borde `rgba(255, 255, 255, 0.1)`
- **Acento Primario (Peatón / Seguridad):** `#38bdf8` (Azul Neón Cían)
- **Alerta / Siniestros (Peligro):** `#f43f5e` (Rojo Carmesí)
- **Zonas Confortables / Verde:** `#10b981` (Verde Esmeralda)
- **Advertencia / Semáforos:** `#f59e0b` (Ámbar)

---

## 📐 Estructura General del Dashboard (Wireframe Global)

```
+-----------------------------------------------------------------------------------+
|  [HEADER / NAVIGATION BAR]                                                        |
|  Title: SENTIR LA CALLE | UPY Data Viz | Team: Rivaldo, Elisabeth, Christopher    |
|  Tabs: [1.INEGI] [2.Datos.gob] [3.SIEGY] [4.GeoPortal] [5.PNT] [6.Scraping]       |
|        [7.Campo] [8.LiDAR 3D] [9.AR Inmersión]                                    |
+-----------------------------------------------------------------------------------+
|  [KPI SUMMARY METRICS BAR]                                                         |
|  - Total Cruces: 80  | - Accidentes ATUS: 7,134  | - Confort Medio: 38.5°C        |
+-----------------------------------------------------------------------------------+
|  [SIDEBAR FILTROS & CONTROLES]  |  [CANVAS PRINCIPAL DE VISUALIZACIÓN]             |
|  - Filtro por Horario (Día/Noche) |  - Mapa Interactivo Leaflet (OSM / Esri Dark)   |
|  - Selector de Fuente             |  - Visor 3D Three.js (Nube LiDAR .PLY)         |
|  - Buscador de Cruces / Nodos     |  - Gráficos Estadísticos (Chart.js)            |
|  - Simulación Verde Semáforo      |  - Modelo Holográfico en AR WebXR              |
+-----------------------------------------------------------------------------------+
|  [FOOTER & DATALAKE CREDITS]                                                      |
|  Enterprise Data Lake Pipeline: SSH/FTP -> HDFS -> PySpark -> Data Viz            |
+-----------------------------------------------------------------------------------+
```

---

## 🖼️ Especificación Detallada de Pantallas (Wireframes por Vista)

### Vista 1: Sombras en las Cifras Oficiales (INEGI ATUS & DENUE)
- **Layout:** Mapa a pantalla completa con capa de mapas de calor (Heatmap) de accidentes viales según ATUS INEGI.
- **Componentes:** Panel desplegable con desglose de accidentes por tipo (atropellamiento, colisión, choque) y conteo de negocios DENUE a 50m.

### Vista 2: La Curva de la Movilidad Peatonal (Datos.gob.mx)
- **Layout:** Gráfico Sankey / Diagrama de Flujo combinado con gráfica multilineal de tendencias anuales.
- **Componentes:** Selector de rango de años (2018-2024) y métricas de velocidad vehicular promedio vs. índice de vulnerabilidad peatonal.

### Vista 3: El Latido Metropolitano (SIEGY Yucatán)
- **Layout:** Mapa de rutas Va y Ven superpuesto con polígonos de densidad de demanda peatonal SIEGY.
- **Componentes:** Radar Multidimensional de calidad de transporte y calculadora de tiempos de transbordo en paraderos.

### Vista 4: La Ciudad a Escala Humana (GeoPortal Mérida)
- **Layout:** Mapa interactivo Leaflet con los 80 nodos semaforizados reales de Mérida y polígonos de banquetas.
- **Componentes:** Marcadores interactivos que despliegan fotos de calle, estado de la señalización y presencia de rampas de accesibilidad.

### Vista 5: Voces en el Papel (PNT / Transparencia)
- **Layout:** Visor de oficios y peticiones ciudadanas con distribución tipo Raincloud Plot de tiempos de respuesta institucional.
- **Componentes:** Buscador por palabra clave ("semáforo", "paso cebra", "alumbrado", "boyas") y línea de tiempo de atención gubernamental.

### Vista 6: El Rumor Digital (Web Scraping Prensa)
- **Layout:** Grafo interactivo de co-ocurrencia de términos periodísticos y nube de análisis de sentimiento (NLP).
- **Componentes:** Ticker en vivo de noticias minadas de Diario de Yucatán y Por Esto! con enlace a la fuente directa.

### Vista 7: La Voz del Terreno (Datos Propios UPY)
- **Layout:** Panel interactivo de auditoría de campo con simulador de tiempo de cruce peatonal vs. tiempo en verde.
- **Componentes:** Calculadora de huella peatonal y termómetro de confort térmico según hora del día en Mérida.

### Vista 8: El Ojo Digital 3D (LiDAR 3D)
- **Layout:** Canvas tridimensional renderizado con Three.js mostrando la nube de puntos .PLY de un crucero conflictivo.
- **Componentes:** Control OrbitControl (rotación, zoom, pan), simulador de cono de visión de choferes y medición de distancia a obstáculos.

### Vista 9: Inmersión Urbana (Realidad Aumentada AR)
- **Layout:** Visor AR WebXR / Canvas interactivo 3D con propuesta de rediseño urbano seguro.
- **Componentes:** Botón de activación de cámara AR, toggle de elementos urbanos (ampliación de banqueta, bolardos, semáforo auditivo).

---

## 🛠️ Tecnologías Empleadas en el Front-End
- **Estructura:** HTML5 semántico con estándares SEO y accesibilidad WCAG.
- **Estilos:** CSS Vanilla puro con custom properties, CSS Grid y Flexbox.
- **Mapeo:** Leaflet.js v1.9.4 con mosaicos de Esri World Dark Gray y OpenStreetMap.
- **Visualización 3D:** Three.js r128 para nubes de puntos LiDAR y modelos urbanos.
- **Gráficos Estadísticos:** Chart.js v4.4 para histogramas y comparativas.
