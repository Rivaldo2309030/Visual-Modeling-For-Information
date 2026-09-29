# Vista 6: El Rumor Digital (Web Scraping Prensa Local)

## 📌 Información del Módulo
* **Subtema:** 6. El Rumor Digital (Minería Semántica y Noticias)
* **Fuente Principal:** Web Scraping (Diario de Yucatán, Por Esto!, Novedades)
* **Responsable:** Christopher

---

## 📊 Fuentes de Información (3 Fuentes):
1. **Scraping Diario de Yucatán:** Noticias de percances peatonales y atropellamientos.
2. **Mining Por Esto! Yucatán:** Reportes periodísticos de infraestructura deficiente.
3. **Comentarios en Redes Sociales:** Extracción pública sobre #PeriféricoPeligroso.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Formato:** `.json` (192 notas recopiladas)
* **Protocolo de Ingesta:** Ingesta por streaming Kafka o SSH a `/raw/scraping/prensa/`.
* **Procesamiento:** Ticker de noticias en vivo, nube de etiquetas y análisis de sentimiento.
