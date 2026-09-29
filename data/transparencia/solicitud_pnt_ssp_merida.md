# Guía y Formato para la Solicitud de Información Pública (PNT / Datos Gob)
# Proyecto: Seguridad Vial y Cruceros Conflictivos en Mérida, Yucatán

## 1. Sujeto Obligado ante el cual se solicita:
* **Dependencia Principal:** Secretaría de Seguridad Pública del Estado de Yucatán (SSP Yucatán).
* **Dependencia Municipal Alternativa:** Ayuntamiento de Mérida — Dirección de Policía Municipal / Dirección de Obras Públicas.

---

## 2. Redacción Oficial para la Solicitud (Plataforma Nacional de Transparencia - PNT)

> **Asunto:** Solicitud de información estadística y geoespacial sobre hechos de tránsito y semaforización en el municipio de Mérida (2021-2025).
> 
> **Texto de la Solicitud:**
> "Por medio de la presente, con fundamento en el Artículo 6° de la Constitución Política de los Estados Unidos Mexicanos y la Ley General de Transparencia y Acceso a la Información Pública, solicito de manera respetuosa en formato abierto (CSV, XLSX o SHP) la siguiente información correspondiente al municipio de Mérida, abarcando del 1 de enero de 2021 a la fecha más reciente disponible de 2025:
> 
> 1. Relación desglosada de los cruceros, intersecciones viales, glorietas y tramos del Anillo Periférico con mayor registro de hechos de tránsito terrestre (colisiones, volcaduras y atropellamientos a peatones/ciclistas).
> 2. Padrón o inventario de intersecciones semaforizadas a cargo de la corporación en la zona metropolitana de Mérida, indicando ubicación (calle/avenida/cruzamiento), tipo de control (fijo, centralizado inteligente o manual) y presencia de semáforos peatonales audibles o visuales.
> 3. Número de víctimas fatales y personas lesionadas registradas en el lugar de los hechos derivadas de siniestros viales en el municipio de Mérida, desglosadas por tipo de usuario de la vía (conductor, pasajero, motociclista, ciclista, peatón).
> 
> Agradezco de antemano la entrega de la información en formato digital a través de la presente plataforma."

---

## 3. Estructura esperada de los datos una vez recibida la respuesta:
| Campo | Tipo de Dato | Descripción |
|---|---|---|
| `id_siniestro` | Cadena | Folio o identificador del reporte policial |
| `fecha` | Fecha (YYYY-MM-DD) | Fecha del percance vial |
| `hora` | Hora (HH:MM) | Hora aproximada del reporte |
| `ubicacion_cruce` | Cadena | Calles que conforman la intersección o kilómetro de periférico |
| `tipo_siniestro` | Categórico | Choque por alcance, invasión de carril, atropellamiento, etc. |
| `personas_lesionadas`| Entero | Número de lesionados |
| `personas_fallecidas`| Entero | Número de decesos |
| `semaforo_activo` | Booleano | Si la intersección contaba con semáforo funcionando |
