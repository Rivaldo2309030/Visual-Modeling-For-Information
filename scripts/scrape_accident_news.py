import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import json
import csv

def scrape_merida_accidents():
    queries = [
        "accidente periferico merida",
        "choque cruce merida yucatan",
        "atropellado peaton merida"
    ]
    
    all_news = {}
    
    for q in queries:
        print(f"Buscando noticias con consulta: '{q}'...")
        url = f"https://news.google.com/rss/search?q={urllib.parse.quote(q)}&hl=es-419&gl=MX&ceid=MX:es-419"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                xml_text = resp.read().decode('utf-8')
                root = ET.fromstring(xml_text)
                for item in root.findall('.//item'):
                    title = item.findtext('title') or ''
                    link = item.findtext('link') or ''
                    pub_date = item.findtext('pubDate') or ''
                    source = item.findtext('source') or ''
                    if title and title not in all_news:
                        all_news[title] = {
                            "titulo": title,
                            "enlace": link,
                            "fecha_publicacion": pub_date,
                            "fuente": source,
                            "consulta_origen": q
                        }
        except Exception as e:
            print(f"Error consultando '{q}': {e}")
            
    news_list = list(all_news.values())
    print(f"\nTotal de noticias recopiladas (sin duplicados): {len(news_list)}")
    
    # Guardar en JSON
    json_path = "data/scraping/merida_siniestros_noticias.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(news_list, f, ensure_ascii=False, indent=2)
    print(f"Guardado en JSON: {json_path}")
    
    # Guardar en CSV
    csv_path = "data/scraping/merida_siniestros_noticias.csv"
    with open(csv_path, "w", encoding="utf-8", newline='') as f:
        writer = csv.DictWriter(f, fieldnames=["titulo", "enlace", "fecha_publicacion", "fuente", "consulta_origen"])
        writer.writeheader()
        writer.writerows(news_list)
    print(f"Guardado en CSV: {csv_path}")

if __name__ == "__main__":
    scrape_merida_accidents()
