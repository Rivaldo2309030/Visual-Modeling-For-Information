# Vista 1: Sombras en las Cifras Oficiales (INEGI ATUS & DENUE)

## 📌 Información del Módulo
* **Subtema:** 1. Sombras en las Cifras Oficiales (Siniestralidad Vial Oficial)
* **Fuente Principal:** INEGI ATUS & DENUE
* **Responsable:** Rivaldo (Coordinador Técnico)

---

## 📊 Fuentes de Información (3 Fuentes):
1. **INEGI ATUS:** Microdatos de Accidentes de Tránsito Terrestre en Zonas Urbanas (Mérida 2021-2023).
2. **INEGI DENUE:** Directorio Estadístico Nacional de Unidades Económicas (Comercio y densidad en cruces).
3. **INEGI Censo 2020:** Censo Poblacional y Vivienda (Población por AGEB en Mérida).

---

## 📡 Pipeline de Ingesta & Data Lake
* **Formato:** `.csv` / `.json`
* **Protocolo de Ingesta:** Carga por SSH / FTP al directorio `/raw/nacional/inegi/` en el HDFS Data Lake central.
* **Procesamiento:** Script PySpark ETL para filtrado por municipio (`31050 - Mérida`).
