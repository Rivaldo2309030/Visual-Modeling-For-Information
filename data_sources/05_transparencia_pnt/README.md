# Vista 5: Voces en el Papel (PNT / Transparencia)

## 📌 Información del Módulo
* **Subtema:** 5. Voces en el Papel (Peticiones Ciudadanas y Oficios)
* **Fuente Principal:** Plataforma Nacional de Transparencia (PNT) & SSP
* **Responsable:** Elisabeth

---

## 📊 Fuentes de Información (3 Fuentes):
1. **Solicitud PNT SSP Yucatán:** Oficios oficiales solicitando datos de cruceros conflictivos.
2. **Buzón Municipal de Atención:** Peticiones vecinales de alumbrado público y banquetas.
3. **Informes C5i SSP:** Puntos de monitoreo con cámaras y radares de velocidad.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Formato:** `.json` / `.pdf`
* **Protocolo de Ingesta:** Carga manual/programada vía FTP a `/raw/transparencia/pnt/`.
* **Procesamiento:** Buzón filtrable de cartas y gráficos Raincloud plots.
