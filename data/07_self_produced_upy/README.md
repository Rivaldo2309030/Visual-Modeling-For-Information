# Vista 7: La Voz del Terreno (Self-Produced Auditoría UPY)

## 📌 Información del Módulo
* **Subtema:** 7. La Voz del Terreno (Auditoría de Campo)
* **Fuente Principal (Titular):** Self-Produced Data (Levantamiento UPY)
* **Responsable:** Christopher

---

## 📖 Descripción del Módulo
Levantamiento presencial midiendo huellas, ancho de banquetas y tiempos de semáforo.

---

## 📂 Estructura de Subcarpetas de Datos (3 Fuentes):
* **`01_fuente_origen_...`**: Dataset de la fuente titular principal.
* **`02_fuente_extra_...`**: Dataset de la fuente complementaria secundaria.
* **`03_fuente_extra_...`**: Dataset de la fuente complementaria terciaria.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Protocolo de Ingesta:** Carga por SSH / FTP al directorio `/raw/` en HDFS.
* **Procesamiento:** Script ETL en Python / PySpark para transformar los datos crudos en la visualización interactiva.
