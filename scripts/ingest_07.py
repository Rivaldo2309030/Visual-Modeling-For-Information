#!/usr/bin/env python3
"""
Script de ingesta al Data Lake para el Subtema 7 (Movilidad Peatonal UPY).
Soporta dos modos de ejecucion:
1. MODO REAL: Si la variable de entorno FORM_RESPONSES_CSV_URL existe, descarga el CSV real de respuestas.
2. MODO SINTETICO: Si no existe la variable, utiliza data/07_self_produced_upy/synthetic/form_responses_SINTETICO.csv.

En ambos casos copia el dataset a la zona Raw del Data Lake bajo raw/team_rivaldo/07_self_produced/ y genera un metadata.json.
"""
import os
import csv
import json
import urllib.request
from datetime import datetime, timezone

def read_csv_rows(filepath_or_url, is_url=False):
    rows = []
    if is_url:
        req = urllib.request.Request(filepath_or_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            lines = [line.decode('utf-8') for line in response.readlines()]
            reader = csv.DictReader(lines)
            fieldnames = reader.fieldnames
            for row in reader:
                rows.append(row)
    else:
        with open(filepath_or_url, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            fieldnames = reader.fieldnames
            for row in reader:
                rows.append(row)
    return fieldnames, rows

def write_csv_rows(filepath, fieldnames, rows, origen_val):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    if 'origen' not in fieldnames:
        fieldnames = list(fieldnames) + ['origen']
    
    for row in rows:
        row['origen'] = origen_val

    with open(filepath, mode='w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

def main():
    url_env = os.environ.get("FORM_RESPONSES_CSV_URL")
    base_datalake_dir = os.path.join("scratch", "datalake", "raw", "team_rivaldo", "07_self_produced")
    
    if url_env and url_env.strip():
        # MODO REAL
        print("==================================================")
        print("[MODO REAL DETECTADO] Descargando respuestas reales del formulario...")
        print(f"URL: {url_env}")
        
        fieldnames, rows = read_csv_rows(url_env, is_url=True)
        origen = "real"
        
        # Guardar en local y data lake
        local_target = os.path.join("data", "07_self_produced_upy", "real", "form_responses_REAL.csv")
        datalake_target_dir = os.path.join(base_datalake_dir, "real")
        datalake_target_file = os.path.join(datalake_target_dir, "form_responses_REAL.csv")
        
        write_csv_rows(local_target, fieldnames, rows, origen_val="real")
        write_csv_rows(datalake_target_file, fieldnames, rows, origen_val="real")
        
        metadata = {
            "fuente": "Google Forms - Respuestas Reales de Campo",
            "ruta_origen": url_env,
            "ingested_at": datetime.now(timezone.utc).isoformat(),
            "num_filas": len(rows),
            "origen": "real"
        }
        
        metadata_path = os.path.join(datalake_target_dir, "metadata.json")
        with open(metadata_path, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, indent=2, ensure_ascii=False)
            
        print(f"[OK] Ingestados {len(rows)} registros REALES en Data Lake: {datalake_target_file}")
        print("==================================================")

    else:
        # MODO SINTETICO
        print("==================================================")
        print("[MODO SINTETICO] No se detecto FORM_RESPONSES_CSV_URL.")
        print("Usando dataset simulado para pruebas de ingesta al Data Lake...")
        
        synthetic_source = os.path.join("data", "07_self_produced_upy", "synthetic", "form_responses_SINTETICO.csv")
        
        if not os.path.exists(synthetic_source):
            print("[INFO] Generando dataset sintético previo a la ingesta...")
            import generate_synthetic_07
            generate_synthetic_07.main()

        fieldnames, rows = read_csv_rows(synthetic_source, is_url=False)
        origen = "sintetico"
        
        datalake_target_dir = os.path.join(base_datalake_dir, "synthetic")
        datalake_target_file = os.path.join(datalake_target_dir, "form_responses_SINTETICO.csv")
        
        write_csv_rows(synthetic_source, fieldnames, rows, origen_val="sintetico")
        write_csv_rows(datalake_target_file, fieldnames, rows, origen_val="sintetico")

        metadata = {
            "fuente": "Datos Demostrativos Simulados (Sintetico)",
            "ruta_origen": synthetic_source,
            "ingested_at": datetime.now(timezone.utc).isoformat(),
            "num_filas": len(rows),
            "origen": "sintetico"
        }
        
        metadata_path = os.path.join(datalake_target_dir, "metadata.json")
        with open(metadata_path, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, indent=2, ensure_ascii=False)

        print(f"[OK] Ingestados {len(rows)} registros SINTETICOS en Data Lake: {datalake_target_file}")
        print("==================================================")

if __name__ == "__main__":
    main()
