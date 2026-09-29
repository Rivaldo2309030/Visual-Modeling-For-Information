import csv
import json

def generate_self_produced_audit():
    # Plantilla y datos muestra de auditoría física de cruce peatonal levantada por el equipo
    # Caso: Glorieta / Cruce conflictivo de Mérida (ejemplo: Monumento a la Patria / Glorieta del Siglo XXI / Periférico)
    interseccion = {
        "id_auditoria": "AUD-MID-001",
        "nombre_cruce": "Paso Peatonal y Paradero frente a Facultad / Periférico Norte",
        "coordenadas": {"lat": 21.0425, "lon": -89.6289},
        "fecha_levantamiento": "2026-09-22",
        "hora_inicio": "12:00:00",
        "hora_fin": "12:30:00",
        "auditor_equipo": "Equipo Proyecto Vial",
        "ancho_calzada_metros": 14.5,
        "ancho_banqueta_metros": 1.2,
        "rampa_discapacidad_presente": False,
        "tiempo_semaforo_verde_peaton_seg": 15,
        "conteo_vehiculos_30min": 420,
        "conteo_peatones_30min": 85,
        "conteo_ciclistas_30min": 14,
        "observaciones_riesgo": [
            "Falta de señalética vertical y pintura de paso de cebra borrada",
            "Velocidad vehicular promedio estimada en 65 km/h en zona escolar/paradero",
            "Banquetilla invadida por poste y maleza, obligando al peatón a bajar al arroyo vehicular"
        ]
    }
    
    # Guardar JSON
    json_path = "data/self_produced/auditoria_campo_cruce_merida.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(interseccion, f, ensure_ascii=False, indent=2)
        
    # Plantilla CSV para registrar múltiples cruces
    csv_path = "data/self_produced/auditoria_cruces_plantilla.csv"
    with open(csv_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            "id_cruce", "ubicacion_descripcion", "latitud", "longitud", 
            "ancho_calle_m", "tiene_rampa", "tiempo_verde_peatonal_seg", 
            "flujo_vehicular_15min", "flujo_peatonal_15min", "nivel_riesgo_observado"
        ])
        writer.writerow([
            "CRU-01", "Glorieta Siglo XXI / C. 60 Norte", 21.0336, -89.6272, 16.0, "NO", 0, 310, 45, "ALTO"
        ])
        writer.writerow([
            "CRU-02", "C. 60 x Av. Colón", 20.9885, -89.6190, 12.0, "SI", 20, 180, 70, "MEDIO"
        ])
        writer.writerow([
            "CRU-03", "Periférico x Salida Progreso (Bajo puente)", 21.0480, -89.6330, 22.0, "NO", 0, 450, 30, "CRITICO"
        ])
        
    print(f"Archivos self-produced generados exitosamente en:\n- {json_path}\n- {csv_path}")

if __name__ == "__main__":
    generate_self_produced_audit()
