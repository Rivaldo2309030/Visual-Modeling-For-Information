#!/usr/bin/env python3
"""
Generador reproducible de los archivos finales para el booklet:
  booklet/datos/escena-1.csv
  booklet/datos/escena-1-cruces-resumen.csv
  booklet/datos/escena-2.csv
  booklet/datos/escena-3.csv
  booklet/datos/merida_ageb_simplificado.geojson

Lee exclusivamente de las capas Silver/Gold y del Data Mart 04 dentro del repositorio
usando rutas relativas (sin rutas locales ni valores simulados).
"""

from pathlib import Path
import json
import pandas as pd
import geopandas as gpd

REPO_ROOT = Path(__file__).resolve().parents[1]
BOOKLET_DATA = REPO_ROOT / "booklet" / "datos"
BOOKLET_DATA.mkdir(parents=True, exist_ok=True)


def clean_colonia_name(raw: str) -> str:
    if pd.isna(raw) or not str(raw).strip():
        return "Sin colonia oficial (zona periférica/rural)"
    s = str(raw).strip()
    # Normalizar mayúsculas a formato legible en español
    s = s.replace(", MERIDA", "").replace(", MÉRIDA", "").strip()
    replacements = {
        "COL. ": "Col. ",
        "FRACC. ": "Fracc. ",
        "UNID. HAB. ": "Unid. Hab. ",
        "PRIV. ": "Priv. ",
        "AMPL. ": "Ampl. ",
    }
    titled = s.title()
    for orig_upper, nice in [
        ("Col. ", "Col. "),
        ("Fracc. ", "Fracc. "),
        (" De ", " de "),
        (" Del ", " del "),
        (" La ", " la "),
        (" Las ", " las "),
        (" Los ", " los "),
        (" Y ", " y "),
        (" Iii", " III"),
        (" Ii", " II"),
        (" Iv", " IV"),
        (" Xxi", " XXI"),
        ("Merida", "Mérida"),
        ("Chuburna", "Chuburná"),
        ("Itzimna", "Itzimná"),
        ("Mexico", "México"),
        ("Garcia Gineres", "García Ginerés"),
        ("San Ramon", "San Ramón"),
        ("Maximo", "Máximo"),
        ("Aleman", "Alemán"),
        ("Jesus", "Jesús"),
        ("Maria", "María"),
        ("Jose", "José"),
        ("Copo", "Copó"),
        ("Canton", "Cantón"),
        ("Periferico", "Periférico"),
        ("Bojorquez", "Bojórquez"),
        ("Dzitya", "Dzityá"),
        ("Cholul", "Cholul"),
        ("Temozon", "Temozón"),
    ]:
        titled = titled.replace(orig_upper, nice)
    return titled


def main():
    print("[1/4] Cargando geometrías base (AGEBs y colonias oficiales de Mérida)...")
    g_ageb = gpd.read_file(REPO_ROOT / "datamart" / "dim_ageb_merida.geojson").to_crs("EPSG:4326")
    g_col = gpd.read_file(REPO_ROOT / "data" / "04_geoportal_merida" / "geoportal_colonias_merida.geojson").to_crs("EPSG:4326")

    # Mapear colonia principal a cada AGEB (primero por centroide dentro de colonia, respaldo por mayor área intersectada)
    ageb_pts = gpd.GeoDataFrame(
        {"cvegeo_ageb": g_ageb["cvegeo"].astype(str)},
        geometry=gpd.points_from_xy(g_ageb["centroide_lon"], g_ageb["centroide_lat"]),
        crs="EPSG:4326",
    )
    join_pt = gpd.sjoin(ageb_pts, g_col[["nombre", "geometry"]], how="left", predicate="within")
    join_pt = join_pt.drop_duplicates("cvegeo_ageb").set_index("cvegeo_ageb")["nombre"].to_dict()

    # Fallback para AGEBs cuyo centroide cayó justo en calle/borde de colonia
    missing_ids = [c for c in g_ageb["cvegeo"].astype(str) if pd.isna(join_pt.get(c))]
    if missing_ids:
        sub_ageb = g_ageb[g_ageb["cvegeo"].astype(str).isin(missing_ids)][["cvegeo", "geometry"]].to_crs("EPSG:32616")
        sub_col = g_col[["nombre", "geometry"]].to_crs("EPSG:32616")
        inter = gpd.overlay(sub_ageb, sub_col, how="intersection")
        if len(inter) > 0:
            inter["area_m2"] = inter.geometry.area
            best = inter.sort_values("area_m2", ascending=False).drop_duplicates("cvegeo")
            for _, r in best.iterrows():
                join_pt[str(r["cvegeo"])] = r["nombre"]

    colonia_map = {str(k): clean_colonia_name(v) for k, v in join_pt.items()}

    # Exportar GeoJSON simplificado de AGEBs de Mérida para D3 (EPSG:4326, ligero y preciso)
    g_simple = g_ageb[["cvegeo", "tipo_ageb", "geometry"]].copy()
    g_simple = g_simple.rename(columns={"cvegeo": "cvegeo_ageb"})
    g_simple["cvegeo_ageb"] = g_simple["cvegeo_ageb"].astype(str)
    g_simple["colonia"] = g_simple["cvegeo_ageb"].map(colonia_map).fillna("Sin colonia oficial")
    g_simple["geometry"] = g_simple["geometry"].simplify(0.00018, preserve_topology=True)
    # Redondear coordenadas a 5 decimales (~1.1 m) para archivo limpio y rápido
    geojson_dict = json.loads(g_simple.to_json())
    def round_coords(coords):
        if isinstance(coords[0], (int, float)):
            return [round(coords[0], 5), round(coords[1], 5)]
        return [round_coords(c) for c in coords]
    for feat in geojson_dict["features"]:
        feat["geometry"]["coordinates"] = round_coords(feat["geometry"]["coordinates"])
        feat.pop("id", None)
    out_geo = BOOKLET_DATA / "merida_ageb_simplificado.geojson"
    out_geo.write_text(json.dumps(geojson_dict, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"  -> {out_geo.name}: {len(g_simple)} polígonos ({out_geo.stat().st_size / 1024:.1f} KB)")

    print("[2/4] Generando escena-1.csv (190 semáforos reales) y escena-1-cruces-resumen.csv (4,092 cruces)...")
    sem = gpd.read_file(REPO_ROOT / "data" / "04_geoportal_merida" / "osm_semaforos_merida_real.geojson")
    sem_df = pd.DataFrame({
        "id_semaforo": sem["osm_id"].astype(str),
        "latitud": sem["latitud"].astype(float).round(6),
        "longitud": sem["longitud"].astype(float).round(6),
        "colonia": sem["colonia"].apply(clean_colonia_name),
        "cvegeo_ageb": sem["cvegeo"].fillna("").astype(str),
        "es_centro": (sem["colonia"].fillna("").astype(str).str.upper().str.contains("COL. CENTRO")).map({True: "Centro Histórico", False: "Resto de Mérida"}),
        "tiene_cruce_marcado": sem["crossing"].fillna("sin_dato").astype(str).apply(lambda v: "Sí" if v not in ("sin_dato", "none", "no", "unmarked", "") else "No registrado"),
        "tiene_sonido": sem["sound"].fillna("sin_dato").astype(str).apply(lambda v: "Sí" if v == "yes" else "No registrado"),
        "tiene_boton": sem["button_operated"].fillna("sin_dato").astype(str).apply(lambda v: "Sí" if v == "yes" else "No registrado"),
    })
    out_e1 = BOOKLET_DATA / "escena-1.csv"
    sem_df.to_csv(out_e1, index=False, encoding="utf-8")
    print(f"  -> {out_e1.name}: {len(sem_df)} filas (Centro: {(sem_df['es_centro']=='Centro Histórico').sum()})")

    cru = gpd.read_file(REPO_ROOT / "data" / "07_self_produced_upy" / "osm_cruces_peatonales_merida_real.geojson")
    total_cruces = len(cru)
    ct = cru["crossing_type"].fillna("unspecified").astype(str).str.lower()
    cruces_rows = [
        {"categoria": "Sin marcar en pavimento", "codigo_osm": "unmarked", "cruces": int((ct == "unmarked").sum())},
        {"categoria": "Sin semáforo (no controlado)", "codigo_osm": "uncontrolled", "cruces": int((ct == "uncontrolled").sum())},
        {"categoria": "Sin tipo especificado en OSM", "codigo_osm": "unspecified", "cruces": int((ct == "unspecified").sum())},
        {"categoria": "Marcado o con semáforo", "codigo_osm": "marked/traffic_signals", "cruces": int(ct.isin(["marked", "traffic_signals", "zebra"]).sum())},
        {"categoria": "Etiqueta genérica (yes)", "codigo_osm": "yes", "cruces": int((~ct.isin(["unmarked", "uncontrolled", "unspecified", "marked", "traffic_signals", "zebra"])).sum())},
    ]
    for r in cruces_rows:
        r["porcentaje"] = round(100.0 * r["cruces"] / total_cruces, 2)
    cru_df = pd.DataFrame(cruces_rows)
    out_e1c = BOOKLET_DATA / "escena-1-cruces-resumen.csv"
    cru_df.to_csv(out_e1c, index=False, encoding="utf-8")
    print(f"  -> {out_e1c.name}: suma={cru_df['cruces'].sum()} (esperado {total_cruces})")

    print("[3/4] Generando escena-2.csv (serie mensual ATUS 2021-2024 enfocada en peatones)...")
    mensual = pd.read_csv(REPO_ROOT / "data" / "gold" / "fct_peatonal_siniestros_mensual.csv")
    mensual = mensual.sort_values(["anio", "mes"]).reset_index(drop=True)
    e2 = mensual[[
        "periodo", "anio", "mes",
        "accidentes_peaton", "peatones_heridos", "peatones_muertos",
        "accidentes_ciclista", "total_accidentes"
    ]].rename(columns={"total_accidentes": "total_accidentes_merida"})
    out_e2 = BOOKLET_DATA / "escena-2.csv"
    e2.to_csv(out_e2, index=False, encoding="utf-8")
    print(f"  -> {out_e2.name}: {len(e2)} meses | accidentes_peaton={e2['accidentes_peaton'].sum()} | peatones_heridos={e2['peatones_heridos'].sum()} | peatones_muertos={e2['peatones_muertos'].sum()}")

    print("[4/4] Generando escena-3.csv (caminabilidad, seguridad peatonal y relieve en 550 AGEBs)...")
    ageb = pd.read_csv(REPO_ROOT / "data" / "gold" / "ind_seguridad_caminabilidad_ageb.csv")
    ageb["cvegeo_ageb"] = ageb["cvegeo_ageb"].astype(str)
    ageb["colonia"] = ageb["cvegeo_ageb"].map(colonia_map).fillna("Sin colonia oficial")
    e3 = pd.DataFrame({
        "cvegeo_ageb": ageb["cvegeo_ageb"],
        "tipo_ageb": ageb["tipo_ageb"],
        "colonia": ageb["colonia"],
        "poblacion_2020": ageb["pob_total"].astype(int),
        "establecimientos_denue": ageb["establecimientos_denue"].astype(int),
        "accidentes_peaton": ageb["accidentes_peaton"].astype(int),
        "peatones_heridos": ageb["peatones_heridos"].astype(int),
        "peatones_muertos": ageb["peatones_muertos"].astype(int),
        "semaforos_osm": ageb["semaforos_osm"].astype(int),
        "cruces_peatonales_osm": ageb["cruces_peatonales_osm"].astype(int),
        "red_peatonal_km": ageb["longitud_red_peatonal_km"].astype(float).round(3),
        "paraderos_vayven": ageb["paraderos_vayven"].astype(int),
        "elevacion_media_msnm": ageb["elev_media_msnm"].astype(float).round(2),
        "pendiente_media_pct": ageb["pendiente_media_pct"].astype(float).round(2),
        "pendiente_p95_pct": ageb["pendiente_p95_pct"].astype(float).round(2),
        "indice_prioridad_peatonal": ageb["indice_prioridad_peatonal_0_100"].astype(float).round(2),
    })
    out_e3 = BOOKLET_DATA / "escena-3.csv"
    e3.to_csv(out_e3, index=False, encoding="utf-8")
    print(f"  -> {out_e3.name}: {len(e3)} AGEBs | sin red peatonal={(e3['red_peatonal_km']==0).sum()} | sin semaforos={(e3['semaforos_osm']==0).sum()}")
    print("\nTop 10 AGEBs en escena-3.csv:")
    print(e3.sort_values("indice_prioridad_peatonal", ascending=False).head(10)[
        ["cvegeo_ageb", "colonia", "indice_prioridad_peatonal", "accidentes_peaton", "semaforos_osm", "red_peatonal_km", "elevacion_media_msnm"]
    ].to_string(index=False))


if __name__ == "__main__":
    main()
