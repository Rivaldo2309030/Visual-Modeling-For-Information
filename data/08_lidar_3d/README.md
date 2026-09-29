# Vista 8: El Ojo Digital 3D (Sensor LiDAR Aula)

## 📌 Información del Módulo
* **Subtema:** 8. El Ojo Digital 3D (LiDAR y Nube de Puntos)
* **Fuente Principal (Titular):** Sensor LiDAR (Escaneo en Aula)
* **Responsable:** Rivaldo

---

## 📖 Descripción del Módulo
Escaneo láser 3D de maqueta a escala 1:50 realizado en el aula para evaluar puntos ciegos.

---

## 📂 Estructura de Subcarpetas de Datos (3 Fuentes):
* **`01_fuente_origen_...`**: Dataset de la fuente titular principal.
* **`02_fuente_extra_...`**: Dataset de la fuente complementaria secundaria.
* **`03_fuente_extra_...`**: Dataset de la fuente complementaria terciaria.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Protocolo de Ingesta:** Carga por SSH / FTP al directorio `/raw/` en HDFS.
* **Procesamiento:** Script ETL en Python / PySpark para transformar los datos crudos en la visualización interactiva.
