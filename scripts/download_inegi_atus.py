import urllib.request
import zipfile
import io
import csv
import os

def download_and_filter_atus():
    url = "https://www.inegi.org.mx/contenidos/programas/accidentes/datosabiertos/atus_anual_csv.zip"
    print(f"Descargando base de datos ATUS desde INEGI: {url}")
    print("Nota: El archivo pesa ~125MB comprimido, descargando...")
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    
    # Descargar directamente a archivo temporal en disco para no saturar memoria RAM
    temp_zip = "data/nacional/temp_atus.zip"
    with urllib.request.urlopen(req) as response, open(temp_zip, 'wb') as out_file:
        total_size = int(response.headers.get('Content-Length', 0))
        downloaded = 0
        chunk_size = 1024 * 1024 * 4 # 4MB chunks
        while True:
            chunk = response.read(chunk_size)
            if not chunk:
                break
            out_file.write(chunk)
            downloaded += len(chunk)
            print(f"Descargado: {downloaded / (1024*1024):.1f} MB / {total_size / (1024*1024):.1f} MB", end="\r")
            
    print("\nDescarga completada. Extrayendo y filtrando datos de Yucatán (31) y Mérida (050)...")
    
    output_merida = "data/nacional/atus_merida_yucatan.csv"
    
    with zipfile.ZipFile(temp_zip, 'r') as z:
        print("Archivos dentro del ZIP:")
        csv_files = [f for f in z.namelist() if f.lower().endswith('.csv')]
        print(csv_files)
        
        # Buscar el archivo principal de accidentes
        target_csv = None
        for f in csv_files:
            if "atus" in f.lower() or "accidente" in f.lower() or "anual" in f.lower():
                target_csv = f
                break
        if not target_csv and csv_files:
            target_csv = csv_files[0]
            
        print(f"Procesando archivo: {target_csv}")
        with z.open(target_csv) as f_in, open(output_merida, 'w', encoding='utf-8', newline='') as f_out:
            # Leer en modo texto
            text_stream = io.TextIOWrapper(f_in, encoding='latin-1', errors='replace')
            reader = csv.reader(text_stream)
            writer = csv.writer(f_out)
            
            headers = next(reader)
            writer.writerow(headers)
            
            # Identificar índices de columna
            # CVE_ENT o ID_ENTIDAD (Yucatan es 31)
            # CVE_MUN o ID_MUNICIPIO (Merida es 50 o 050)
            ent_idx = -1
            mun_idx = -1
            for i, h in enumerate(headers):
                h_clean = h.strip().upper()
                if h_clean in ["CVE_ENT", "ID_ENTIDAD", "ENTIDAD"]:
                    ent_idx = i
                elif h_clean in ["CVE_MUN", "ID_MUNICIPIO", "MUNICIPIO"]:
                    mun_idx = i
                    
            print(f"Columna Entidad: index {ent_idx} ({headers[ent_idx] if ent_idx >= 0 else 'N/A'})")
            print(f"Columna Municipio: index {mun_idx} ({headers[mun_idx] if mun_idx >= 0 else 'N/A'})")
            
            count_yuc = 0
            count_mid = 0
            for row in reader:
                if not row or len(row) <= max(ent_idx, mun_idx):
                    continue
                ent = row[ent_idx].strip().lstrip('0')
                mun = row[mun_idx].strip().lstrip('0')
                if ent == "31": # Yucatan
                    count_yuc += 1
                    if mun == "50": # Merida
                        count_mid += 1
                        writer.writerow(row)
                        
            print(f"Registros encontrados para Yucatán: {count_yuc}")
            print(f"Registros encontrados específicamente para Mérida: {count_mid}")
            print(f"Guardado exitosamente en: {output_merida}")
            
    # Eliminar zip temporal
    if os.path.exists(temp_zip):
        os.remove(temp_zip)
        print("Archivo temporal ZIP eliminado.")

if __name__ == "__main__":
    download_and_filter_atus()
