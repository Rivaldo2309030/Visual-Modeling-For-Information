import os
import json
import csv

def summarize_datasets():
    print("=" * 60)
    print("RESUMEN DE FUENTES DE DATOS EXTRAÍDAS - PROYECTO MÉRIDA VIAL")
    print("=" * 60)
    
    # 1. Scraping
    scraping_file = "data/scraping/merida_siniestros_noticias.json"
    if os.path.exists(scraping_file):
        with open(scraping_file, "r", encoding="utf-8") as f:
            noticias = json.load(f)
            print(f"[OK] Scraping Noticias: {len(noticias)} notas periodísticas sobre siniestros viales.")
            
    # 2. Municipal
    mun_file = "data/municipal/merida_cruces_semaforos.json"
    if os.path.exists(mun_file):
        with open(mun_file, "r", encoding="utf-8") as f:
            mun_data = json.load(f)
            elems = mun_data.get("elements", [])
            print(f"[OK] Municipal (Geoportal / OSM): {len(elems)} semáforos y cruces peatonales georreferenciados.")
            
    # 3. Estatal
    estatal_file = "data/estatal/siegey_corredores_movilidad_yucatan.json"
    if os.path.exists(estatal_file):
        with open(estatal_file, "r", encoding="utf-8") as f:
            estatal_data = json.load(f)
            print(f"[OK] Estatal (SIEGEY / Va y Ven): {len(estatal_data)} corredores metropolitanos clave.")
            
    # 4. Transparencia
    trans_file = "data/transparencia/ssp_intersecciones_conflictivas.json"
    if os.path.exists(trans_file):
        with open(trans_file, "r", encoding="utf-8") as f:
            trans_data = json.load(f)
            print(f"[OK] Solicitud Transparencia (SSP / C5i): {len(trans_data)} cruceros críticos catalogados.")
            
    # 5. Self-Produced
    self_file = "data/self_produced/auditoria_cruces_plantilla.csv"
    if os.path.exists(self_file):
        with open(self_file, "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            rows = list(reader)
            print(f"[OK] Self-Produced (Auditoría de Campo): {len(rows)-1} cruces auditados en plantilla estructurada.")
            
    # 6. LiDAR
    ply_file = "data/lidar/maqueta_aula_cruce.ply"
    if os.path.exists(ply_file):
        size_kb = os.path.getsize(ply_file) / 1024
        print(f"[OK] LiDAR Aula (Nube de Puntos 3D): Archivo .PLY ({size_kb:.1f} KB, 5,400 puntos 3D XYZ+RGB).")
        
    print("=" * 60)

if __name__ == "__main__":
    summarize_datasets()
