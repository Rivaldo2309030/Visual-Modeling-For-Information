# Vista 2: La Curva de la Movilidad Peatonal (Datos.gob.mx)

## 📌 Información del Módulo
* **Subtema:** 2. La Curva de la Movilidad Peatonal (Siniestros Viales)
* **Fuente Principal (Titular):** Datos.gob.mx
* **Responsable:** Elisabeth

---

## 📖 Descripción del Módulo
Catálogo nacional de siniestros viales y rutas de cruce peatonal.

---

## 📂 Estructura de Subcarpetas de Datos (3 Fuentes):
* **`01_fuente_origen_...`**: Dataset de la fuente titular principal.
* **`02_fuente_extra_...`**: Dataset de la fuente complementaria secundaria.
* **`03_fuente_extra_...`**: Dataset de la fuente complementaria terciaria.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Protocolo de Ingesta:** Carga por SSH / FTP al directorio `/raw/` en HDFS.
* **Procesamiento:** Script ETL en Python / PySpark para transformar los datos crudos en la visualización interactiva.
