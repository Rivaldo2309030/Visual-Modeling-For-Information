# Plan del Proyecto: Sentir la Calle (Data Storytelling Peatonal en Mérida)

## 📌 Descripción General
"Sentir la Calle" es una propuesta de **Data Storytelling interactivo** diseñada para el libro colectivo de la materia. El proyecto aborda la percepción de seguridad, accesibilidad y confort del peatón en Mérida, Yucatán, mediante una narrativa dividida en **9 Vistas (Capítulos)** que conectan 7 fuentes de datos de distintas escalas y culminan con la visualización tridimensional mediante **LiDAR escaneado en el aula**.

---

## 🎭 Estructura Narrativa de las 9 Vistas (Style UPY DataViz)

| Vista | Título Único de la Vista | Fuente de Datos / Componente | La Historia que Cuenta | Integrante Responsable |
|---|---|---|---|---|
| **1. Panorama General** | INEGI (ATUS) — Nacional | `data/nacional/` | *Sombras en las Cifras Oficiales:* El marco masivo de siniestralidad oficial en Mérida. | **Rivaldo** |
| **2. Flujos Metropolitanos** | SIEGEY — Estatal | `data/estatal/` | *El Ritmo del Va y Ven:* La movilidad en los paraderos de alta velocidad. | **Elisabeth** |
| **3. Anatomía del Barrio** | Geoportal Mérida — Municipal | `data/municipal/` | *Faros y Sombras Urbanas:* El mapa de 80 semáforos y banquetas que protegen o desamparan. | **Elisabeth** |
| **4. Cartas a la Ciudad** | PNT / SSP — Transparencia | `data/transparencia/` | *Voces en el Papel:* Las peticiones oficiales de los vecinos pidiendo iluminación y vigilancia. | **Elisabeth** |
| **5. El Rumor Digital** | Web Scraping — Medios Locales | `data/scraping/` | *192 Noticias y Testimonios:* La conversación cotidiana sobre cruces peligrosos en redes. | **Christopher** |
| **6. Pasos en el Terreno** | Self-Produced — Auditoría | `data/self_produced/` | *Caminando Mérida:* Tiempos de verde medidos a pie vs. la velocidad real de los coches. | **Christopher** |
| **7. Clima y Horarios** | Análisis Ambiental | `data/ambiental/` | *Sol y Penumbra:* Cómo las temperaturas extremas y la noche modifican el caminar. | **Christopher** |
| **8. El Ojo Digital 3D** | Sensor LiDAR — Captura Aula | `data/lidar/` | *Modelado Tridimensional:* Visor 3D de la nube de puntos `.PLY` para medir ángulos ciegos. | **Rivaldo** |
| **9. Síntesis y Futuro** | Síntesis del Equipo | `PLAN_DE_PROYECTO.md` | *Hacia una Ciudad Humana:* Matriz integrada de hallazgos y recomendaciones de diseño urbano. | **Equipo** |

---

## 👥 Asignación de Roles del Equipo

| Integrante | Rol en la Historia | Responsabilidades Clave |
|---|---|---|
| **Rivaldo** | **Coordinador Técnico & LiDAR / INEGI** | • Procesamiento de la nube de puntos 3D LiDAR (Vista 8).<br>• Análisis de la fuente Nacional INEGI ATUS (Vista 1).<br>• Arquitectura general de datos e indexación geoespacial. |
| **Elisabeth** | **Especialista Institucional & Transparencia** | • Extracción y seguimiento de peticiones PNT / SSP (Vista 4).<br>• Análisis de corredores SIEGEY Va y Ven (Vista 2).<br>• Mapeo de semáforos y banquetas en el Geoportal de Mérida (Vista 3). |
| **Christopher** | **Especialista de Campo & Scraping** | • Scraper de noticias y testimonios en prensa local (Vista 5).<br>• Levantamiento presencial y encuesta de confort en campo (Vista 6).<br>• Análisis ambiental de clima/horarios (Vista 7) y diseño visual. |

---

## 🌐 Prototipo Interactivo
El sitio web interactivo de 9 Vistas al estilo UPY DataViz está disponible en [`index.html`](index.html).
