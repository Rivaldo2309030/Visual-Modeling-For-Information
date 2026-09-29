# Vista 3: El Latido Metropolitano (SIEGY Yucatán - Va y Ven)

## 📌 Información del Módulo
* **Subtema:** 3. El Latido Metropolitano (Red Va y Ven y Paraderos)
* **Fuente Principal (Titular):** SIEGY Yucatán / ATY
* **Responsable:** Elisabeth

---

## 📖 Descripción del Módulo
Traza oficial de rutas y 69 paraderos del sistema de transporte Va y Ven en el Periférico de Mérida.

---

## 📂 Estructura de Subcarpetas de Datos (3 Fuentes):
* **`01_fuente_origen_...`**: Dataset de la fuente titular principal.
* **`02_fuente_extra_...`**: Dataset de la fuente complementaria secundaria.
* **`03_fuente_extra_...`**: Dataset de la fuente complementaria terciaria.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Protocolo de Ingesta:** Carga por SSH / FTP al directorio `/raw/` en HDFS.
* **Procesamiento:** Script ETL en Python / PySpark para transformar los datos crudos en la visualización interactiva.
