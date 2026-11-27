/**
 * Escena 3 · Capítulo 04 · Caminar Mérida
 * Mapa coroplético D3 del índice de prioridad peatonal (550 AGEB) + Top 10 AGEB críticas.
 * Tipografía ajustada (>= 15 unidades SVG en viewBox de 980) para asegurar >= 8 pt al imprimir en carta.
 * Lee exclusivamente desde ../datos/escena-3.csv y ../datos/merida_ageb_simplificado.geojson.
 */
(function () {
  const PALETA = {
    morado: "#600d8b",
    oro: "#ed9f22",
    oroOscuro: "#b45309",
    gris: "#9ca3af",
    tinta: "#0d0d0d",
    borde: "#e5e7eb"
  };

  const fmtInt = (n) => new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(n);
  const fmtDec = (n, d = 1) => new Intl.NumberFormat("es-MX", { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);

  function getTooltip() {
    let tt = d3.select("body").select(".booklet-tooltip");
    if (tt.empty()) {
      tt = d3.select("body").append("div").attr("class", "booklet-tooltip");
    }
    return tt;
  }

  async function renderEscena3(containerSelector, baseDatos = "../datos") {
    const container = d3.select(containerSelector);
    if (container.empty()) return;
    container.html("");

    const [geo, rows] = await Promise.all([
      d3.json(`${baseDatos}/merida_ageb_simplificado.geojson`),
      d3.csv(`${baseDatos}/escena-3.csv`, (d) => ({
        cvegeo_ageb: d.cvegeo_ageb,
        tipo_ageb: d.tipo_ageb,
        colonia: d.colonia,
        poblacion_2020: +d.poblacion_2020,
        establecimientos_denue: +d.establecimientos_denue,
        accidentes_peaton: +d.accidentes_peaton,
        peatones_heridos: +d.peatones_heridos,
        semaforos_osm: +d.semaforos_osm,
        cruces_peatonales_osm: +d.cruces_peatonales_osm,
        red_peatonal_km: +d.red_peatonal_km,
        paraderos_vayven: +d.paraderos_vayven,
        elevacion_media_msnm: +d.elevacion_media_msnm,
        pendiente_media_pct: +d.pendiente_media_pct,
        indice_prioridad_peatonal: +d.indice_prioridad_peatonal
      }))
    ]);

    const byAgeb = new Map(rows.map((r) => [r.cvegeo_ageb, r]));
    const sinRed = rows.filter((r) => r.red_peatonal_km === 0).length;
    const pctSinRed = (100 * sinRed) / rows.length;
    const elevMedia = d3.mean(rows, (r) => r.elevacion_media_msnm);
    const maxScore = d3.max(rows, (r) => r.indice_prioridad_peatonal);

    const top10 = [...rows]
      .sort((a, b) => b.indice_prioridad_peatonal - a.indice_prioridad_peatonal)
      .slice(0, 10);
    const topIds = new Set(top10.slice(0, 5).map((d) => d.cvegeo_ageb));

    const width = 980;
    const height = 740;
    const svg = container
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("role", "img")
      .attr("aria-label", "Mapa coroplético de prioridad peatonal por AGEB y las 10 zonas más urgentes de Mérida");

    const tooltip = getTooltip();

    // Escala secuencial estricta blanco -> morado (regla del booklet)
    const colorScale = d3.scaleSequential()
      .domain([0, maxScore])
      .interpolator(d3.interpolateRgbBasis(["#ffffff", "#e9d5f5", "#9d4edd", "#600d8b"]));

    // --- PANEL IZQUIERDO: MAPA COROPLÉTICO DE AGEB URBANAS ---
    const mapBox = { x: 14, y: 16, w: 434, h: 708 };
    svg.append("rect")
      .attr("x", mapBox.x)
      .attr("y", mapBox.y)
      .attr("width", mapBox.w)
      .attr("height", mapBox.h)
      .attr("rx", 10)
      .attr("fill", "#f8fafc")
      .attr("stroke", PALETA.borde);

    svg.append("text")
      .attr("x", mapBox.x + 16)
      .attr("y", mapBox.y + 30)
      .attr("font-size", 16.5)
      .attr("font-weight", 700)
      .attr("fill", PALETA.tinta)
      .text("Prioridad peatonal por AGEB (0–100)");

    const urbanas = {
      type: "FeatureCollection",
      features: geo.features.filter((f) => f.properties.tipo_ageb === "URBANA")
    };

    const projection = d3.geoMercator().fitExtent(
      [[mapBox.x + 14, mapBox.y + 48], [mapBox.x + mapBox.w - 14, mapBox.y + mapBox.h - 114]],
      urbanas
    );
    const path = d3.geoPath(projection);

    const gMap = svg.append("g");
    gMap.selectAll("path.ageb-choropleth")
      .data(urbanas.features)
      .join("path")
      .attr("class", "ageb-choropleth")
      .attr("d", path)
      .attr("fill", (f) => {
        const rec = byAgeb.get(f.properties.cvegeo_ageb);
        return rec ? colorScale(rec.indice_prioridad_peatonal) : "#ffffff";
      })
      .attr("stroke", (f) => (topIds.has(f.properties.cvegeo_ageb) ? PALETA.oroOscuro : "#d1d5db"))
      .attr("stroke-width", (f) => (topIds.has(f.properties.cvegeo_ageb) ? 1.8 : 0.45))
      .style("cursor", "pointer")
      .on("mousemove", (event, f) => {
        const r = byAgeb.get(f.properties.cvegeo_ageb);
        if (!r) return;
        tooltip
          .style("opacity", 1)
          .style("left", `${event.clientX + 12}px`)
          .style("top", `${event.clientY - 12}px`)
          .html(`
            <div class="tt-titulo">${r.colonia}</div>
            <div class="tt-dato">AGEB: ${r.cvegeo_ageb} · Índice: ${fmtDec(r.indice_prioridad_peatonal)}</div>
            <div class="tt-dato">Siniestros peatón: ${fmtInt(r.accidentes_peaton)} (${fmtInt(r.peatones_heridos)} heridos)</div>
            <div class="tt-dato">Red peatonal: ${fmtDec(r.red_peatonal_km, 2)} km · Semáforos: ${fmtInt(r.semaforos_osm)}</div>
            <div class="tt-dato">Elevación media: ${fmtDec(r.elevacion_media_msnm, 2)} msnm</div>
          `);
      })
      .on("mouseleave", () => tooltip.style("opacity", 0));

    // Leyenda de rampa continua (blanco -> morado) con letra >= 15
    const defs = svg.append("defs");
    const grad = defs.append("linearGradient").attr("id", "grad-prioridad-e3");
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#ffffff");
    grad.append("stop").attr("offset", "40%").attr("stop-color", "#e9d5f5");
    grad.append("stop").attr("offset", "75%").attr("stop-color", "#9d4edd");
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#600d8b");

    const legX = mapBox.x + 16;
    const legY = mapBox.y + mapBox.h - 76;
    const legW = mapBox.w - 32;
    svg.append("text")
      .attr("x", legX)
      .attr("y", legY - 8)
      .attr("font-size", 15)
      .attr("font-weight", 600)
      .attr("fill", "#4b5563")
      .text("Menor (0)");

    svg.append("text")
      .attr("x", legX + legW)
      .attr("y", legY - 8)
      .attr("text-anchor", "end")
      .attr("font-size", 15)
      .attr("font-weight", 700)
      .attr("fill", PALETA.morado)
      .text(`Mayor (${fmtDec(maxScore)})`);

    svg.append("rect")
      .attr("x", legX)
      .attr("y", legY)
      .attr("width", legW)
      .attr("height", 14)
      .attr("rx", 3)
      .attr("fill", "url(#grad-prioridad-e3)")
      .attr("stroke", "#d1d5db");

    svg.append("text")
      .attr("x", legX)
      .attr("y", legY + 36)
      .attr("font-size", 15)
      .attr("fill", PALETA.oroOscuro)
      .attr("font-weight", 700)
      .text("Borde oro: Top 5 AGEB prioritarias");

    svg.append("text")
      .attr("x", legX)
      .attr("y", legY + 58)
      .attr("font-size", 15)
      .attr("fill", "#4b5563")
      .text(`Elevación media: ${fmtDec(elevMedia, 2)} msnm`);

    // --- PANEL DERECHO: TOP 10 AGEB PRIORITARIAS ---
    const rankBox = { x: 464, y: 16, w: 502, h: 708 };
    svg.append("rect")
      .attr("x", rankBox.x)
      .attr("y", rankBox.y)
      .attr("width", rankBox.w)
      .attr("height", rankBox.h)
      .attr("rx", 10)
      .attr("fill", "#ffffff")
      .attr("stroke", PALETA.borde);

    svg.append("text")
      .attr("x", rankBox.x + 16)
      .attr("y", rankBox.y + 30)
      .attr("font-size", 16.5)
      .attr("font-weight", 700)
      .attr("fill", PALETA.tinta)
      .text("Las 10 AGEB con mayor prioridad peatonal");

    // Leyenda de color (15 SVG units, holgada en 2 bloques)
    const legR = svg.append("g").attr("transform", `translate(${rankBox.x + 16}, ${rankBox.y + 44})`);
    legR.append("rect").attr("x", 0).attr("y", 2).attr("width", 13).attr("height", 13).attr("rx", 2.5).attr("fill", PALETA.morado);
    legR.append("text").attr("x", 19).attr("y", 14).attr("font-size", 15).attr("font-weight", 600).attr("fill", PALETA.tinta)
      .text("Con banquetas en OSM");
    legR.append("rect").attr("x", 224).attr("y", 2).attr("width", 13).attr("height", 13).attr("rx", 2.5).attr("fill", PALETA.oro);
    legR.append("text").attr("x", 243).attr("y", 14).attr("font-size", 15).attr("font-weight", 600).attr("fill", PALETA.oroOscuro)
      .text("0 km mapeados");

    const trackW = rankBox.w - 32;
    const xScore = d3.scaleLinear()
      .domain([0, 175])
      .range([0, trackW]);

    const startY = rankBox.y + 90;
    const stepY = 53;

    top10.forEach((d, i) => {
      const y = startY + i * stepY;
      const sinBanqueta = d.red_peatonal_km === 0;
      const barColor = sinBanqueta ? PALETA.oro : PALETA.morado;
      const agebShort = d.cvegeo_ageb.slice(-4);
      const colLabel = d.colonia.length > 29 ? `${d.colonia.slice(0, 28)}…` : d.colonia;

      svg.append("text")
        .attr("x", rankBox.x + 16)
        .attr("y", y)
        .attr("font-size", 15)
        .attr("font-weight", 700)
        .attr("fill", PALETA.tinta)
        .text(`${i + 1}. ${colLabel} `)
        .append("tspan")
        .attr("font-weight", 400)
        .attr("fill", "#6b7280")
        .text(`(${agebShort})`);

      svg.append("rect")
        .attr("x", rankBox.x + 16)
        .attr("y", y + 7)
        .attr("width", trackW)
        .attr("height", 23)
        .attr("rx", 4)
        .attr("fill", "#f3f4f6");

      const bw = Math.max(48, xScore(d.indice_prioridad_peatonal));
      svg.append("rect")
        .attr("x", rankBox.x + 16)
        .attr("y", y + 7)
        .attr("width", bw)
        .attr("height", 23)
        .attr("rx", 4)
        .attr("fill", barColor);

      svg.append("text")
        .attr("x", rankBox.x + 23)
        .attr("y", y + 24)
        .attr("font-size", 15)
        .attr("font-weight", 700)
        .attr("fill", "#ffffff")
        .text(fmtDec(d.indice_prioridad_peatonal));

      const kmTxt = d.red_peatonal_km === 0
        ? "0 km"
        : (d.red_peatonal_km < 0.1 ? `${fmtInt(Math.round(d.red_peatonal_km * 1000))} m` : `${fmtDec(d.red_peatonal_km, 1)} km`);
      const detail = `${fmtInt(d.accidentes_peaton)} atrop. · ${fmtInt(d.semaforos_osm)} sem. · ${kmTxt}`;
      svg.append("text")
        .attr("x", rankBox.x + 24 + bw)
        .attr("y", y + 24)
        .attr("font-size", 15)
        .attr("font-weight", sinBanqueta ? 700 : 500)
        .attr("fill", sinBanqueta ? PALETA.oroOscuro : "#4b5563")
        .text(detail);
    });

    // Resumen de brecha territorial al pie del panel derecho (>= 15)
    const footY = rankBox.y + rankBox.h - 74;
    svg.append("rect")
      .attr("x", rankBox.x + 16)
      .attr("y", footY)
      .attr("width", rankBox.w - 32)
      .attr("height", 60)
      .attr("rx", 7)
      .attr("fill", "#fffbeb")
      .attr("stroke", PALETA.oro);

    svg.append("text")
      .attr("x", rankBox.x + 26)
      .attr("y", footY + 25)
      .attr("font-size", 15)
      .attr("font-weight", 800)
      .attr("fill", PALETA.oroOscuro)
      .text(`${fmtInt(sinRed)} de ${fmtInt(rows.length)} AGEB (${fmtDec(pctSinRed)} %) sin red peatonal`);

    svg.append("text")
      .attr("x", rankBox.x + 26)
      .attr("y", footY + 48)
      .attr("font-size", 15)
      .attr("fill", PALETA.tinta)
      .text("3 de las 10 más críticas tienen 0 km en OSM.");
  }

  window.renderEscena3 = renderEscena3;
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#grafica-escena-3")) {
      renderEscena3("#grafica-escena-3");
    }
  });
})();
