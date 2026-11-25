# Subtema 5: Infraestructura Pública y Equipamiento Urbano Municipal

## 📌 Información del Módulo
* **Subtema:** 5. Infraestructura Pública Municipal (Alumbrado, Mobiliario Peatonal y Capas de Obra Pública)
* **Fuentes de Referencia:** Portales de Transparencia del Ayuntamiento de Mérida, Catálogo SIG de Obras Públicas y OpenStreetMap
* **Responsable:** Rivaldo

---

## 🔒 Nota de Gobernanza y Acceso Técnico
1. **Exclusión de Solicitudes PAE / PNT:** Por acuerdo del equipo, se descartó el uso de solicitudes pendientes ante PNT/PAE para trabajar exclusivamente con datos públicos abiertos y verificables.
2. **Restricción por CAPTCHA en descarga automatizada:** Los portales municipales `infraestructuraAbierta.php`, `infociudadana.php` y `contrato_umap.php` presentan protección activa **Radware Captcha Page** ante scripts automatizados. Respetando los controles del sitio, el pipeline automatizado consolida tres insumos públicos abiertos verificados:
   - **`merida_equipamiento_alumbrado_peatonal_osm.geojson` (562 registros en `EPSG:4326`):** Luminarias viales (`street_lamp`), bancas (`bench`), refugios peatonales (`shelter`) y paradas dentro del límite municipal de Mérida (`31050`), cruzadas por `cvegeo` de AGEB.
   - **`merida_catalogo_capas_infraestructura_municipal.csv` (66 capas SIG):** Subconjunto oficial de capas de Obras Públicas, Vialidad, Alumbrado, Drenaje Pluvial y Transporte del GeoPortal de Mérida.
   - **`merida_actividad_urbana_municipal_resumen.csv` (38 filas):** Serie histórica anual (2015–2026) de licencias de funcionamiento y actividad urbana municipal en el Centro de Mérida.
