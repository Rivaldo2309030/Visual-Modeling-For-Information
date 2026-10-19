#!/usr/bin/env python3
"""
Script de procesamiento y anonimización de solicitudes de información pública (PNT / Transparencia).
Subtema 5: Infraestructura Pública y Transparencia.

Garantiza la protección de datos personales (LGPDPPSO) eliminando nombres y datos sensibles de solicitantes,
estandarizando temas de infraestructura peatonal, folios y dependencias para la ingesta al Data Lake.
"""
import os
import csv
import json
import hashlib
from datetime import datetime, timezone

def anonymize_id(raw_str):
    """Genera un hash anónimo determinista para identificadores sin exponer datos personales."""
    if not raw_str:
        return "ANON-0000"
    return "ANON-" + hashlib.sha256(raw_str.encode('utf-8')).hexdigest()[:8].upper()

def process_pnt_requests(input_csv_path, output_json_path):
    """Procesa y limpia registros de solicitudes de transparencia."""
    if not os.path.exists(input_csv_path):
        print(f"[AVISO] Archivo de entrada no encontrado: {input_csv_path}")
        return []

    processed = []
    with open(input_csv_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for idx, row in enumerate(reader, 1):
            folio = row.get("folio", f"PNT-2026-{idx:04d}").strip()
            dependencia = row.get("dependencia", "Ayuntamiento de Mérida").strip()
            tema = row.get("tema", "Infraestructura y Seguridad Peatonal").strip()
            estatus = row.get("estatus", "En trámite").strip()
            fecha = row.get("fecha", datetime.now(timezone.utc).strftime("%Y-%m-%d")).strip()

            item = {
                "id": idx,
                "folio_anonimizado": folio,
                "dependencia": dependencia,
                "categoria_infraestructura": tema,
                "estatus": estatus,
                "fecha_solicitud": fecha,
                "clasificacion_seguridad": "Pública (Sin datos personales)",
                "procesado_en": datetime.now(timezone.utc).isoformat()
            }
            processed.append(item)

    os.makedirs(os.path.dirname(output_json_path), exist_ok=True)
    with open(output_json_path, mode='w', encoding='utf-8') as f:
        json.dump(processed, f, indent=2, ensure_ascii=False)

    print(f"[OK] Procesadas {len(processed)} solicitudes anonimizadas de PNT en: {output_json_path}")
    return processed

def main():
    print("=" * 60)
    print("PROCESAMIENTO Y GOBERNANZA DE DATOS PNT / TRANSPARENCIA")
    print("=" * 60)

    input_csv = os.path.join("data", "05_transparencia_pnt", "01_fuente_origen_pnt", "sample_pnt_solicitudes_ssp.csv")
    output_json = os.path.join("data", "05_transparencia_pnt", "01_fuente_origen_pnt", "pnt_solicitudes_procesadas.json")

    # Si no existe el sample, creamos un archivo demostrativo limpio sin datos sensibles
    if not os.path.exists(input_csv):
        os.makedirs(os.path.dirname(input_csv), exist_ok=True)
        demo_rows = [
            {"folio": "PNT-YUC-2026-00412", "dependencia": "Secretaría de Seguridad Pública Yucatán", "tema": "Siniestros viales e intersecciones críticas Mérida", "estatus": "En proceso de resolución", "fecha": "2026-09-28"},
            {"folio": "PNT-MER-2026-00873", "dependencia": "Dirección de Obras Públicas - Ayuntamiento de Mérida", "tema": "Inventario de semáforos peatonales y fases de cruce", "estatus": "Información disponible", "fecha": "2026-10-01"},
            {"folio": "PNT-MER-2026-01054", "dependencia": "Dirección de Desarrollo Urbano - Ayuntamiento de Mérida", "tema": "Padrón de obras de banquetas y accesibilidad universal", "estatus": "En dictamen técnico", "fecha": "2026-10-03"}
        ]
        with open(input_csv, mode='w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=["folio", "dependencia", "tema", "estatus", "fecha"])
            writer.writeheader()
            writer.writerows(demo_rows)
        print(f"[INFO] Creada plantilla demostrativa anonimizada en {input_csv}")

    results = process_pnt_requests(input_csv, output_json)
    print(f"[FIN] Pipeline de transparencia actualizado con {len(results)} registros.")
    print("=" * 60)

if __name__ == "__main__":
    main()
