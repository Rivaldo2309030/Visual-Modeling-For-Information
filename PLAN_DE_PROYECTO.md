# Plan del Proyecto: Sentir la Calle (Data Storytelling Peatonal en Mérida)

> 🌐 **Sitio Web Interactivo:** [https://rivaldo2309030.github.io/Visual-Modeling-For-Information/](https://rivaldo2309030.github.io/Visual-Modeling-For-Information/)

---

## 📌 Descripción General
"Sentir la Calle" es una propuesta de **Data Storytelling interactivo** diseñada para el libro colectivo de la materia. El proyecto aborda la percepción de seguridad, accesibilidad y confort del peatón en Mérida, Yucatán, mediante una narrativa dividida en **9 Vistas (Capítulos)** que conectan 7 fuentes de datos de distintas escalas y 2 módulos tecnológicos inmersivos (**LiDAR 3D** escaneado en el aula y **Realidad Aumentada AR**).

---

## 🎭 Estructura Narrativa de las 9 Vistas (Style UPY DataViz)

| Vista | Título Único de la Vista | Fuente de Datos Principal | 3 Fuentes Complementarias Específicas | Experiencia Visual Compleja | Integrante Responsable |
|---|---|---|---|---|---|
| **1. Sombras en las Cifras Oficiales** | INEGI (ATUS) — Nacional | `data/nacional/` | 1. ATUS Mérida 2021-2023<br>2. DENUE Comercio en Cruces<br>3. Censo Poblacional INEGI 2020 | Explorador Cartográfico & Cluster de Siniestralidad | **Rivaldo** |
| **2. La Curva de la Movilidad** | Datos.gob.mx — Nacional | `data/nacional/` | 1. Catálogo Nacional Siniestros<br>2. Base Viales Abiertos<br>3. Registro Movilidad | Diagrama Sankey de Rutas Peatonales vs. Tráfico | **Elisabeth** |
| **3. El Latido Metropolitano** | SIEGEY — Estatal | `data/estatal/` | 1. Traza y Paraderos Va y Ven<br>2. Cohesión Territorial SIEGY<br>3. Matriz Origen-Destino Periférico | Radar Multidimensional & Mapa Leaflet de Paraderos | **Elisabeth** |
| **4. La Ciudad a Escala Humana** | GeoPortal Mérida — Municipal | `data/municipal/` | 1. Capa GIS Banquetas/Postes<br>2. Inventario Semáforos Municipal<br>3. OpenStreetMap Mérida Overpass API | Mapa Interactivo Leaflet (OSM/Esri) de 80 Nodos | **Elisabeth** |
| **5. Voces en el Papel** | PNT / SSP — Transparencia | `data/transparencia/` | 1. Solicitud PNT a SSP Yucatán<br>2. Buzón Municipal Atención<br>3. Informes C5i Cámaras/Radares | Raincloud Plots & Buzón Visual de Oficios | **Elisabeth** |
| **6. El Rumor Digital** | Web Scraping — Medios Locales | `data/scraping/` | 1. Scraping Notas Diario Yucatán<br>2. Mining Prensa Por Esto!<br>3. Comentarios Redes (#Periférico) | Red de Co-ocurrencia Semántica & Nube de Sentimiento | **Christopher** |
| **7. La Voz del Terreno** | Self-Produced — Auditoría UPY | `data/self_produced/` | 1. Medición Presencial Afluencia/Verde<br>2. Auditoría Ancho Banqueta (1.2m)<br>3. Encuestas Confort Térmico (38°C) | Calculadora de Huellas y Perfil de Peatón | **Christopher** |
| **8. El Ojo Digital 3D** | Sensor LiDAR 3D — Captura Aula | `data/lidar/` | 1. Nube de Puntos 3D .PLY (Maqueta 1:50)<br>2. Mapeo Punto Ciego Muros (3.5m)<br>3. Perfil Relieve e Infraestructura 3D | Visor 3D Interactivo Three.js de Ángulos Ciegos | **Rivaldo** |
| **9. Inmersión Urbana (AR)** | Realidad Aumentada (AR) — Síntesis | `data/ar/` | 1. Modelo 3D Holográfico Crucero Seguro<br>2. Filtro AR WebXR Cruce Peatonal<br>3. Matriz Integrada por Coordenadas | Holograma Interactivo AR & Maqueta Inmersiva | **Equipo** |

---

## 👥 Asignación de Roles del Equipo

| Integrante | Rol en la Historia | Responsabilidades Clave |
|---|---|---|
| **Rivaldo** | **Coordinador Técnico & LiDAR / INEGI** | • Procesamiento de la nube de puntos 3D LiDAR (Vista 8) y modelado 3D.<br>• Análisis de la fuente Nacional INEGI ATUS (Vista 1).<br>• Arquitectura general de datos e indexación geoespacial. |
| **Elisabeth** | **Especialista Institucional & Transparencia** | • Extracción y seguimiento de peticiones PNT / SSP (Vista 4).<br>• Análisis de corredores SIEGEY Va y Ven (Vista 2).<br>• Mapeo de semáforos y banquetas en el Geoportal de Mérida (Vista 3). |
| **Christopher** | **Especialista de Campo & Scraping** | • Scraper de noticias y testimonios en prensa local (Vista 5).<br>• Levantamiento presencial y encuesta de confort en campo (Vista 6).<br>• Análisis ambiental de clima/horarios (Vista 7) y diseño visual. |

---

## 🌐 Prototipo Interactivo
El sitio web interactivo de 9 Vistas al estilo UPY DataViz está disponible en [`index.html`](index.html) y publicado en **[GitHub Pages](https://rivaldo2309030.github.io/Visual-Modeling-For-Information/)**.
