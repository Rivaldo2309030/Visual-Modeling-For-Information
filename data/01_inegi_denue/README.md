# Vista 1: Sombras en las Cifras Oficiales (INEGI ATUS & DENUE)

## 📌 Información del Módulo
* **Subtema:** 1. Sombras en las Cifras Oficiales (Siniestralidad Vial)
* **Fuente Principal (Titular):** INEGI ATUS & DENUE
* **Responsable:** Rivaldo

---

## 📖 Descripción del Módulo
Microdatos oficiales de accidentes de tránsito terrestre en zonas urbanas de Mérida (2021-2023).

---

## 📂 Estructura de Subcarpetas de Datos (3 Fuentes):
* **`01_fuente_origen_...`**: Dataset de la fuente titular principal.
* **`02_fuente_extra_...`**: Dataset de la fuente complementaria secundaria.
* **`03_fuente_extra_...`**: Dataset de la fuente complementaria terciaria.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Protocolo de Ingesta:** Carga por SSH / FTP al directorio `/raw/` en HDFS.
* **Procesamiento:** Script ETL en Python / PySpark para transformar los datos crudos en la visualización interactiva.
