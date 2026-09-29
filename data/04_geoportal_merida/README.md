# Vista 4: La Ciudad a Escala Humana (GeoPortal Mérida - Semáforos)

## 📌 Información del Módulo
* **Subtema:** 4. La Ciudad a Escala Humana (Anatomía del Barrio)
* **Fuente Principal (Titular):** GeoPortal Mérida & OpenStreetMap
* **Responsable:** Elisabeth

---

## 📖 Descripción del Módulo
Geolocalización vector de 80 nodos semaforizados principales y ancho de banquetas en Mérida.

---

## 📂 Estructura de Subcarpetas de Datos (3 Fuentes):
* **`01_fuente_origen_...`**: Dataset de la fuente titular principal.
* **`02_fuente_extra_...`**: Dataset de la fuente complementaria secundaria.
* **`03_fuente_extra_...`**: Dataset de la fuente complementaria terciaria.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Protocolo de Ingesta:** Carga por SSH / FTP al directorio `/raw/` en HDFS.
* **Procesamiento:** Script ETL en Python / PySpark para transformar los datos crudos en la visualización interactiva.
