# Vista 8: El Ojo Digital 3D (Sensor LiDAR - Escaneo en Aula)

## 📌 Información del Módulo
* **Subtema:** 8. El Ojo Digital 3D (LiDAR y Nube de Puntos)
* **Fuente Principal:** Sensor LiDAR (Escaneo en Aula de Maqueta 1:50)
* **Responsable:** Rivaldo (Coordinador Técnico)

---

## 📊 Fuentes de Información (3 Fuentes):
1. **Sensor LiDAR Nube .PLY:** 5,400 puntos XYZ+RGB capturados en el salón sobre maqueta.
2. **Mapeo de Punto Ciego:** Cálculo de obstrucción visual causada por muros y follaje (3.5m).
3. **Perfil de Relieve e Infraestructura 3D:** Modelo volumétrico de la calle y banqueta.

---

## 📡 Pipeline de Ingesta & Data Lake
* **Formato:** `.ply` / `.json` (Point Cloud)
* **Protocolo de Ingesta:** Carga por SSH / FTP a `/raw/lidar/maquetacion/`.
* **Procesamiento:** Visor 3D interactivo en Three.js con 3 perspectivas de cámara.
