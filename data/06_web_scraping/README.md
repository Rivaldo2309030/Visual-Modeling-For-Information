# Vista 6: El Rumor Digital (Web Scraping Prensa Local)

## 📌 Información del Módulo
* **Subtema:** 6. El Rumor Digital (Noticias Periodísticas)
* **Fuente Principal (Titular):** Web Scraping Prensa (Diario de Yucatán / Por Esto!)
* **Responsable:** Christopher

---

## 📖 Descripción del Módulo
Corpus de 192 noticias y minería semántica sobre percances peatonales en Yucatán.

---

## 📂 Estructura de Subcarpetas de Datos (3 Fuentes):
* **`01_fuente_origen_...`**: Dataset de la fuente titular principal.
* **`02_fuente_extra_...`**: Dataset de la fuente complementaria secundaria.
* **`03_fuente_extra_...`**: Dataset de la fuente complementaria terciaria.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Protocolo de Ingesta:** Carga por SSH / FTP al directorio `/raw/` en HDFS.
* **Procesamiento:** Script ETL en Python / PySpark para transformar los datos crudos en la visualización interactiva.
