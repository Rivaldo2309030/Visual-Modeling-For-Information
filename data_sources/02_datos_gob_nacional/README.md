# Vista 2: La Curva de la Movilidad Peatonal (Datos.gob.mx)

## 📌 Información del Módulo
* **Subtema:** 2. La Curva de la Movilidad Peatonal (Siniestros Viales Nacionales)
* **Fuente Principal:** Datos.gob.mx
* **Responsable:** Elisabeth

---

## 📊 Fuentes de Información (3 Fuentes):
1. **Catálogo Nacional de Siniestros Viales:** Datos abiertos de movilidad y accidentes viales.
2. **Base de Datos Viales Abiertos:** Inventario de vialidades primarias y secundarias.
3. **Registro Nacional de Movilidad:** Indicadores de flujo y vulnerabilidad peatonal.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Formato:** `.json` / `.csv`
* **Protocolo de Ingesta:** Carga remota vía PuTTY / SSH a `/raw/nacional/datos_gob/` en HDFS.
* **Procesamiento:** Diagrama Sankey y curvas de tendencia de cruce peatonal.
