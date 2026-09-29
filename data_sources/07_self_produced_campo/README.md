# Vista 7: La Voz del Terreno (Self-Produced Data - Auditoría UPY)

## 📌 Información del Módulo
* **Subtema:** 7. La Voz del Terreno (Auditoría de Campo y Medición de Huellas)
* **Fuente Principal:** Self-Produced Data (Levantamiento Presencial UPY)
* **Responsable:** Christopher

---

## 📊 Fuentes de Información (3 Fuentes):
1. **Medición Presencial:** Conteo de afluencia peatonal y cronometraje de tiempo verde.
2. **Auditoría Física de Banquetas:** Medición de ancho efectivo (1.2m vs 2.5m norma).
3. **Encuestas de Confort Térmico:** Entrevistas a peatones expuestos a radiación solar (38°C).

---

## 📡 Pipeline de Ingesta & Data Lake
* **Formato:** `.csv` (Plantilla de campo)
* **Protocolo de Ingesta:** Carga SSH / FTP a `/raw/self_produced/auditoria/`.
* **Procesamiento:** Calculadora interactiva de huellas por perfil de peatón (Joven, Mayor, Reducida).
