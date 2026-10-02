#!/usr/bin/env python3
"""
Generador de datos sintéticos/simulados para la encuesta de movilidad peatonal (Subtema 7 - UPY).
Genera data/07_self_produced_upy/synthetic/form_responses_SINTETICO.csv con 60 filas y semilla fija (seed=42).
"""
import os
import csv
import random
from datetime import datetime, timedelta

def main():
    random.seed(42)

    output_dir = os.path.join("data", "07_self_produced_upy", "synthetic")
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, "form_responses_SINTETICO.csv")

    headers = [
        "timestamp",
        "ubicacion",
        "banqueta_continua",
        "ancho_banqueta",
        "estado_piso",
        "obstaculos",
        "paso_peatonal",
        "semaforo_peatonal",
        "rampa",
        "cruza_a_tiempo",
        "sombra",
        "iluminacion_noche",
        "seguridad_percibida",
        "origen"
    ]

    ubicaciones = [
        "UPY Campus Ciudad Ucu",
        "Carretera Merida-Tetiz Km 4.5",
        "Pueblo Ucu Centro",
        "Cd. Caucel Sec. Los Almendros",
        "Cd. Caucel Herradura",
        "Av. Jacinto Canek Cruce Caucel",
        "Fracc. Santa Fe Caucel",
        "Periferico Poniente Entrada Ucu",
        "San Antonio Caucel",
        "Zona Industrial Hunucma - Acceso UPY"
    ]

    banqueta_opts = ["Si", "Parcial", "No"]
    ancho_opts = ["Menos de 1 m", "1 a 1.5 m", "Mas de 1.5 m"]
    piso_opts = ["Bueno", "Regular", "Malo"]
    obstaculos_opts = ["Ninguno", "Poste", "Vehiculo estacionado", "Vegetacion", "Otro"]
    paso_opts = ["Si", "No", "Borrado"]
    semaforo_opts = ["Si", "No"]
    rampa_opts = ["Si", "No", "En mal estado"]
    cruza_opts = ["Si", "Justo", "No"]
    sombra_opts = ["Mucha", "Poca", "Nada"]
    iluminacion_opts = ["Buena", "Regular", "Mala", "No se"]

    start_date = datetime(2026, 9, 20, 8, 0, 0)
    rows = []

    for i in range(60):
        # Generate random timestamp within a 10-day window
        dt = start_date + timedelta(days=random.randint(0, 9), hours=random.randint(0, 12), minutes=random.randint(0, 59))
        
        row = {
            "timestamp": dt.strftime("%Y-%m-%d %H:%M:%S"),
            "ubicacion": random.choice(ubicaciones),
            "banqueta_continua": random.choice(banqueta_opts),
            "ancho_banqueta": random.choice(ancho_opts),
            "estado_piso": random.choice(piso_opts),
            "obstaculos": random.choice(obstaculos_opts),
            "paso_peatonal": random.choice(paso_opts),
            "semaforo_peatonal": random.choice(semaforo_opts),
            "rampa": random.choice(rampa_opts),
            "cruza_a_tiempo": random.choice(cruza_opts),
            "sombra": random.choice(sombra_opts),
            "iluminacion_noche": random.choice(iluminacion_opts),
            "seguridad_percibida": random.randint(1, 5),
            "origen": "sintetico"
        }
        rows.append(row)

    with open(output_file, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        writer.writerows(rows)

    print(f"[OK] Generado exitosamente {output_file} con {len(rows)} filas de datos sinteticos.")

if __name__ == "__main__":
    main()
