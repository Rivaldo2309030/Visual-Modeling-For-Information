# Vista 5: Voces en el Papel (PNT / Transparencia)

## 📌 Información del Módulo
* **Subtema:** 5. Voces en el Papel (Peticiones Vecinales)
* **Fuente Principal (Titular):** Plataforma Nacional de Transparencia (PNT)
* **Responsable:** Elisabeth

---

## 📖 Descripción del Módulo
Oficios y peticiones formales de vecinos solicitando semáforos peatonales e iluminación.

---

## 📂 Estructura de Subcarpetas de Datos (3 Fuentes):
* **`01_fuente_origen_...`**: Dataset de la fuente titular principal.
* **`02_fuente_extra_...`**: Dataset de la fuente complementaria secundaria.
* **`03_fuente_extra_...`**: Dataset de la fuente complementaria terciaria.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Protocolo de Ingesta:** Carga por SSH / FTP al directorio `/raw/` en HDFS.
* **Procesamiento:** Script ETL en Python / PySpark para transformar los datos crudos en la visualización interactiva.
