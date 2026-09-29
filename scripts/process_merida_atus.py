import zipfile
import csv
import io
import os

def process_atus_zip():
    zip_path = "data/nacional/temp_atus.zip"
    output_merida = "data/nacional/atus_merida_yucatan.csv"
    
    if not os.path.exists(zip_path):
        print(f"No se encuentra el archivo {zip_path}")
        return
        
    print(f"Abriendo {zip_path}...")
    with zipfile.ZipFile(zip_path, 'r') as z:
        # Tomar los archivos de datos anuales (ej: 2018 a 2023)
        dataset_files = [f for f in z.namelist() if f.startswith('conjunto_de_datos/atus_anual_') and f.endswith('.csv')]
        dataset_files.sort(reverse=True) # Los más recientes primero (2023, 2022, 2021...)
        print("Archivos de datos encontrados:", dataset_files[:5])
        
        # Procesar los 3 años más recientes (ej: 2021, 2022, 2023)
        recent_files = dataset_files[:3]
        print(f"Extrayendo y unificando registros de Mérida para los años: {recent_files}")
        
        total_yuc = 0
        total_mid = 0
        headers_written = False
        
        with open(output_merida, 'w', encoding='utf-8', newline='') as f_out:
            writer = csv.writer(f_out)
            
            for dfile in recent_files:
                print(f"Leyendo: {dfile}...")
                with z.open(dfile) as f_in:
                    text_stream = io.TextIOWrapper(f_in, encoding='latin-1', errors='replace')
                    reader = csv.reader(text_stream)
                    
                    headers = next(reader)
                    if not headers_written:
                        writer.writerow(["ANIO_ARCHIVO"] + headers)
                        headers_written = True
                        
                    ent_idx = -1
                    mun_idx = -1
                    for i, h in enumerate(headers):
                        h_clean = h.strip().upper()
                        if h_clean in ['ID_ENTIDAD', 'CVE_ENT', 'ENTIDAD']:
                            ent_idx = i
                        elif h_clean in ['ID_MUNICIPIO', 'CVE_MUN', 'MUNICIPIO']:
                            mun_idx = i
                            
                    for row in reader:
                        if not row or len(row) <= max(ent_idx, mun_idx):
                            continue
                        ent = row[ent_idx].strip().lstrip('0')
                        mun = row[mun_idx].strip().lstrip('0')
                        if ent == '31': # Yucatán
                            total_yuc += 1
                            if mun == '50': # Mérida
                                total_mid += 1
                                # Guardar identificando el archivo de origen
                                writer.writerow([dfile.split('_')[-1].replace('.csv', '')] + row)
                                
        print("=" * 50)
        print(f"Total registros filtrados de Yucatán: {total_yuc}")
        print(f"Total accidentes viales filtrados de Mérida: {total_mid}")
        print(f"Dataset guardado exitosamente en: {output_merida}")
        print("=" * 50)

if __name__ == "__main__":
    process_atus_zip()
