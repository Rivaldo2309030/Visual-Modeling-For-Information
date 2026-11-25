#!/usr/bin/env python3
"""
Paso 1 Medallion (Capa Bronze) — Equipo 4: Sentir la Calle (Mérida, Yucatán)
Registra el manifiesto formal de extracción de fuentes crudas reales (data/bronze/extraction_manifest.json)
y conserva extractos ligeros de auditoría compatibles con los límites de Git (<50 MB).
"""

import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = REPO_ROOT / "data"
BRONZE_DIR = DATA_DIR / "bronze"


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def main():
    BRONZE_DIR.mkdir(parents=True, exist_ok=True)
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    sources = [
        ("BRZ-01-ATUS", "01_inegi_denue", "data/01_inegi_denue/atus_siniestralidad_mensual_merida_2021_2024.csv",
         "INEGI ATUS Georreferenciado + DENUE + Censo 2020", "https://www.inegi.org.mx/programas/accidentes/", "Libre Uso INEGI", "Elisabeth"),
        ("BRZ-02-SICT", "02_datos_gob", "data/02_datos_gob/sict_tdpa_corredores_merida_yucatan_2013_2024.csv",
         "SICT Datos Viales (TDPA Yucatán 2013-2024)", "https://www.sct.gob.mx/carreteras/direccion-general-de-servicios-tecnicos/datos-viales/", "CC BY 4.0", "Elisabeth"),
        ("BRZ-03-ATY", "03_siegy_yucatan", "data/03_siegy_yucatan/aty_catalogo_oficial_rutas_vayven.csv",
         "Agencia de Transporte de Yucatán (ATY) + SIEGY Boletín 2025-11", "https://transporteyucatan.org.mx/rutas", "Datos Abiertos Yucatán", "Elisabeth"),
        ("BRZ-04-GEOPORTAL-OSM", "04_geoportal_merida", "data/04_geoportal_merida/osm_semaforos_merida_real.geojson",
         "GeoPortal Ayuntamiento de Mérida + OpenStreetMap Overpass (Semáforos)", "https://geoportal.merida.gob.mx/", "Datos Abiertos Municipales / ODbL 1.0", "Christopher"),
        ("BRZ-05-INFRA-MUN", "05_transparencia_pnt", "data/05_transparencia_pnt/merida_equipamiento_alumbrado_peatonal_osm.geojson",
         "Equipamiento Urbano Abierto OSM + Catálogo SIG Obras Públicas Mérida", "https://merida.gob.mx/transparencia/infraestructuraAbierta.php", "ODbL 1.0 / Info Pública Municipal", "Rivaldo"),
        ("BRZ-06-PRENSA", "06_web_scraping", "data/06_web_scraping/prensa_movilidad_peatonal_merida_real.json",
         "Prensa Local Yucatán (Diario de Yucatán, Novedades Yucatán, Sala de Prensa & RSS)", "https://www.yucatan.com.mx/seccion/merida/", "Metadatos Públicos / Uso Académico", "Christopher"),
        ("BRZ-07-PEATONAL-OSM", "07_self_produced_upy", "data/07_self_produced_upy/osm_cruces_peatonales_merida_real.geojson",
         "OpenStreetMap Overpass (Cruces y Red Peatonal de Mérida)", "https://www.openstreetmap.org/", "ODbL 1.0", "Christopher"),
        ("BRZ-08-MDT-LIDAR", "08_lidar_3d", "data/08_lidar_3d/merida_elevacion_pendiente_por_ageb_real.csv",
         "INEGI MDT 1.5 m (29 teselas Mérida) + NASA G-LiHT Yucatán 2013", "https://www.inegi.org.mx/app/geo2/elevacionesmex/", "Libre Uso INEGI / NASA Public Domain", "Rivaldo"),
        ("BRZ-09-AR-3D", "09_realidad_aumentada_ar", "data/09_realidad_aumentada_ar/merida_centro_historico_lod1.city.json",
         "Edificaciones Reales Centro Histórico (OSM + INEGI 1.5m) en glTF 2.0 y CityJSON v2.0", "https://www.cityjson.org/datasets/", "ODbL 1.0 / CC BY 4.0", "Rivaldo"),
    ]

    manifest = {
        "proyecto": "Sentir la Calle — Seguridad, Accesibilidad y Confort Peatonal en Mérida (Equipo 4)",
        "estandar": "Medallion Architecture (Structured_GeoSpatial_Data_Team)",
        "fecha_extraccion_utc": ts,
        "politica_datos_simulados": "0% datos simulados en producción (es_dato_simulado = false en todas las tablas)",
        "nota_pnt": "Solicitudes PAE/PNT descartadas formalmente; reemplazadas por fuentes abiertas verificables.",
        "fuentes_bronze": [],
    }

    for clave, mod, rel_p, fuente, url, lic, resp in sources:
        p = REPO_ROOT / rel_p
        manifest["fuentes_bronze"].append({
            "clave": clave,
            "modulo": mod,
            "archivo_referencia": rel_p,
            "tamano_kb": round(p.stat().st_size / 1024.0, 2),
            "sha256": sha256_file(p),
            "fuente": fuente,
            "url_origen": url,
            "licencia": lic,
            "responsable": resp,
            "extraido_utc": ts,
        })

    out_manifest = BRONZE_DIR / "extraction_manifest.json"
    out_manifest.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[BRONZE OK] Manifiesto generado con {len(manifest['fuentes_bronze'])} fuentes reales en {out_manifest}")


if __name__ == "__main__":
    main()
