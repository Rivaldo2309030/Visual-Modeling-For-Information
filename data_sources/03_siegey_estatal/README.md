# Vista 3: El Latido Metropolitano (SIEGY Yucatán - Va y Ven)

## 📌 Información del Módulo
* **Subtema:** 3. El Latido Metropolitano (Red Va y Ven y Paraderos)
* **Fuente Principal:** SIEGY Yucatán / Agencia de Transporte de Yucatán (ATY)
* **Responsable:** Elisabeth

---

## 📊 Fuentes de Información (3 Fuentes):
1. **ATY Va y Ven:** Traza oficial de rutas y 69 paraderos del Periférico de Mérida.
2. **SIEGY Yucatán:** Indicadores de cohesión territorial y movilidad metropolitana.
3. **Matriz Origen-Destino:** Datos de afluencia y tiempos de espera en paraderos exprés.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Formato:** `.json` (GeoJSON)
* **Protocolo de Ingesta:** Streaming de eventos o subida FTP a `/raw/estatal/siegey/`.
* **Procesamiento:** Medidores de congestión e indicadores de accesibilidad a puentes peatonales.
