# Vista 9: Inmersión Urbana (Realidad Aumentada AR)

## 📌 Información del Módulo
* **Subtema:** 9. Inmersión Urbana (Realidad Aumentada AR)
* **Fuente Principal (Titular):** Realidad Aumentada (AR) & WebXR
* **Responsable:** Equipo Completo

---

## 📖 Descripción del Módulo
Modelado holográfico 3D y experiencia AR en WebXR para rediseño de cruceros.

---

## 📂 Estructura de Subcarpetas de Datos (3 Fuentes):
* **`01_fuente_origen_...`**: Dataset de la fuente titular principal.
* **`02_fuente_extra_...`**: Dataset de la fuente complementaria secundaria.
* **`03_fuente_extra_...`**: Dataset de la fuente complementaria terciaria.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Protocolo de Ingesta:** Carga por SSH / FTP al directorio `/raw/` en HDFS.
* **Procesamiento:** Script ETL en Python / PySpark para transformar los datos crudos en la visualización interactiva.
