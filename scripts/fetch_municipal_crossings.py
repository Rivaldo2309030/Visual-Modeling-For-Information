import urllib.request
import json
import time

def fetch_signals():
    # Endpoints alternativos de Overpass API
    endpoints = [
        "https://overpass.kumi.systems/api/interpreter",
        "https://overpass-api.de/api/interpreter",
        "https://maps.mail.ru/osm/tools/overpass/api/interpreter"
    ]
    query = """[out:json][timeout:25];(node["highway"="traffic_signals"](20.94,-89.66,21.04,-89.57);node["highway"="crossing"](20.94,-89.66,21.04,-89.57););out body 300;"""

    for ep in endpoints:
        print(f"Probando endpoint: {ep}")
        try:
            req = urllib.request.Request(
                ep, 
                data=query.encode('utf-8'), 
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                elements = data.get("elements", [])
                print(f"-> Éxito! {len(elements)} elementos encontrados.")
                
                with open("data/municipal/merida_cruces_semaforos_osm.json", "w", encoding="utf-8") as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                print("Guardado en data/municipal/merida_cruces_semaforos_osm.json")
                return True
        except Exception as e:
            print(f"Fallo en {ep}: {e}")
            time.sleep(1)
    return False

if __name__ == "__main__":
    fetch_signals()
