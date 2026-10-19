# Vista 5: Voces en el Papel (PNT / Transparencia)

## 📌 Información del Módulo
* **Subtema:** 5. Voces en el Papel (Peticiones Vecinales e Infraestructura Pública)
* **Fuente Principal (Titular):** Plataforma Nacional de Transparencia (PNT / SISAI 2.0) & Transparencia Ayuntamiento de Mérida
* **Responsable:** Elisabeth

---

## 📖 Descripción del Módulo
Gestión y seguimiento de solicitudes formales de información pública relativas a infraestructura peatonal, padrón de semáforos, fases de cruce y peticiones ciudadanas de seguridad vial ante la Secretaría de Seguridad Pública (SSP) y el Ayuntamiento de Mérida.

---

## 🔒 Gobernanza de Datos y Protección de Datos Personales (LGPDPPSO)
* **Anonimización Estricta:** Ningún registro contiene nombres, correos electrónicos, números telefónicos ni domicilios particulares de solicitantes.
* **Trazabilidad:** Cada solicitud se procesa mediante identificadores de folio anonimizados (`PNT-...`) y clasificación temática exclusiva de infraestructura vial y movilidad.
* **Procesamiento Automatizado:** Script disponible en [`scripts/process_transparencia_pnt.py`](../../scripts/process_transparencia_pnt.py).

---

## 📂 Estructura de Subcarpetas de Datos (3 Fuentes):
* **`01_fuente_origen_pnt/`**: Solicitudes de información pública anonimizadas procesadas desde la PNT y SISAI 2.0.
* **`02_fuente_extra_datos_gob/`**: Datasets complementarios abiertos de infraestructura federal y estatal.
* **`03_fuente_extra_denue/`**: Cruce con unidades económicas y equipamiento urbano (INEGI DENUE).

---

## 📡 Pipeline de Ingesta & Data Lake
* **Protocolo de Ingesta:** Carga normalizada hacia la zona Raw del Data Lake en `/raw/team_rivaldo/05_transparencia/`.
* **Procesamiento:** Transformación mediante `scripts/process_transparencia_pnt.py` generando archivos estructurados JSON para la interfaz de visualización interactiva.

