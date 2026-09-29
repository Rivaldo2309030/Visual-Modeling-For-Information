# Vista 4: La Ciudad a Escala Humana (GeoPortal Mérida - Semáforos y Banquetas)

## 📌 Información del Módulo
* **Subtema:** 4. La Ciudad a Escala Humana (Anatomía del Barrio y Semáforos)
* **Fuente Principal:** GeoPortal del Ayuntamiento de Mérida & OpenStreetMap
* **Responsable:** Elisabeth

---

## 📊 Fuentes de Información (3 Fuentes):
1. **GeoPortal Mérida GIS:** Capas vectoriales de infraestructura municipal, banquetas y postes.
2. **Inventario de Semáforos Municipal:** Registro de 80 nodos semaforizados principales.
3. **OpenStreetMap Overpass API:** Consulta georreferenciada de nodos `highway=traffic_signals`.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Formato:** `.json` / `.geojson`
* **Protocolo de Ingesta:** Carga por SSH a `/raw/municipal/geoportal/`.
* **Procesamiento:** Mapa interactivo Leaflet.js (OpenStreetMap / Esri Dark) con 80 nodos neón.
