/**
 * Módulo Cartográfico D3 v7.9.0 del Equipo 4 (Sentir la Calle — Mérida).
 * Reemplaza por completo la plantilla anterior de salud/Valladolid.
 * Lee polígonos reales de AGEBs de Mérida, semáforos OSM y puntos ATUS.
 */
window.DataStoryApp = window.DataStoryApp || {};

window.DataStoryApp.GisMapModule = (function () {
  const P = {
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
    let tt = d3.select("body").select(".main-tooltip");
    if (tt.empty()) tt = d3.select("body").append("div").attr("class", "main-tooltip");
    return tt;
  }

  function renderPriorityMap(containerSelector, rawData, mode = "priority_with_points") {
    const container = d3.select(containerSelector);
    container.html("");
    const tt = getTooltip();

    const w = 880, h = 420;
    const svg = container.append("svg").attr("viewBox", `0 0 ${w} ${h}`);

    const urbanas = {
      type: "FeatureCollection",
      features: rawData.geoAgeb.features.filter((f) => f.properties.tipo_ageb === "URBANA")
    };
    const byAgeb = new Map(rawData.ageb.map((r) => [r.cvegeo_ageb, r]));
    const maxScore = d3.max(rawData.ageb, (r) => r.indice_prioridad_peatonal);

    const colorScale = d3.scaleSequential()
      .domain([0, maxScore])
      .interpolator(d3.interpolateRgbBasis(["#ffffff", "#e9d5f5", "#9d4edd", "#600d8b"]));

    const projection = d3.geoMercator().fitExtent([[18, 36], [w - 250, h - 18]], urbanas);
    const path = d3.geoPath(projection);

    svg.append("text")
      .attr("x", 18).attr("y", 22).attr("font-size", 13).attr("font-weight", 700).attr("fill", P.tinta)
      .text(mode === "gap_sidewalks"
        ? "Brecha de banquetas en Mérida: AGEBs con 0 km mapeados en OSM (en oro)"
        : "Prioridad peatonal por AGEB y siniestros ATUS con peatón/ciclista");

    const gMap = svg.append("g");
    gMap.selectAll("path.ageb")
      .data(urbanas.features)
      .join("path")
      .attr("d", path)
      .attr("fill", (f) => {
        const rec = byAgeb.get(f.properties.cvegeo_ageb);
        if (!rec) return "#ffffff";
        if (mode === "gap_sidewalks") {
          return rec.red_peatonal_km === 0 ? "#fde68a" : "#f3e8f9";
        }
        return colorScale(rec.indice_prioridad_peatonal);
      })
      .attr("stroke", (f) => {
        const rec = byAgeb.get(f.properties.cvegeo_ageb);
        if (mode === "gap_sidewalks" && rec && rec.red_peatonal_km === 0) return P.oroOscuro;
        return "#cbd5e1";
      })
      .attr("stroke-width", 0.5)
      .style("cursor", "pointer")
      .on("mousemove", (event, f) => {
        const r = byAgeb.get(f.properties.cvegeo_ageb);
        if (!r) return;
        tt.style("opacity", 1).style("left", `${event.clientX + 12}px`).style("top", `${event.clientY - 12}px`)
          .html(`<strong>${r.colonia}</strong> (AGEB ${r.cvegeo_ageb.slice(-4)})<br>Prioridad: ${fmtDec(r.indice_prioridad_peatonal)} / 100<br>Siniestros peatón: ${fmtInt(r.accidentes_peaton)} · Semáforos: ${fmtInt(r.semaforos_osm)}<br>Red peatonal: ${fmtDec(r.red_peatonal_km, 2)} km`);
      })
      .on("mouseleave", () => tt.style("opacity", 0));

    if (mode !== "gap_sidewalks" && rawData.atusPuntos && rawData.atusPuntos.features) {
      const peatones = rawData.atusPuntos.features.filter((f) => (f.properties.PEATHERIDO || 0) > 0 || (f.properties.PEATMUERTO || 0) > 0);
      gMap.selectAll("circle.atus")
        .data(peatones)
        .join("circle")
        .attr("cx", (f) => projection(f.geometry.coordinates)[0])
        .attr("cy", (f) => projection(f.geometry.coordinates)[1])
        .attr("r", 2.4)
        .attr("fill", P.oro)
        .attr("fill-opacity", 0.85)
        .attr("stroke", P.tinta)
        .attr("stroke-width", 0.35);
    }

    // Panel lateral de resumen calculado en vivo
    const sideX = w - 236;
    svg.append("rect").attr("x", sideX).attr("y", 36).attr("width", 220).attr("height", h - 54).attr("rx", 10).attr("fill", "#fafafa").attr("stroke", P.borde);
    svg.append("text").attr("x", sideX + 14).attr("y", 60).attr("font-size", 12).attr("font-weight", 700).attr("fill", P.morado).text("Top 5 AGEBs prioritarias");

    const top5 = [...rawData.ageb].sort((a, b) => b.indice_prioridad_peatonal - a.indice_prioridad_peatonal).slice(0, 5);
    top5.forEach((r, i) => {
      const y = 86 + i * 56;
      svg.append("text").attr("x", sideX + 14).attr("y", y).attr("font-size", 10.6).attr("font-weight", 700).attr("fill", P.tinta)
        .text(`${i + 1}. ${r.colonia.length > 26 ? r.colonia.slice(0, 25) + "…" : r.colonia}`);
      svg.append("text").attr("x", sideX + 14).attr("y", y + 15).attr("font-size", 10.2).attr("fill", "#4b5563")
        .text(`Índice ${fmtDec(r.indice_prioridad_peatonal)} · ${fmtInt(r.accidentes_peaton)} atrop. · ${fmtInt(r.semaforos_osm)} sem.`);
      svg.append("text").attr("x", sideX + 14).attr("y", y + 29).attr("font-size", 9.8).attr("fill", r.red_peatonal_km === 0 ? P.oroOscuro : P.morado).attr("font-weight", 600)
        .text(`Red peatonal: ${fmtDec(r.red_peatonal_km, 1)} km`);
    });
  }

  function renderSignalsMap(containerSelector, rawData, focus = "all") {
    const container = d3.select(containerSelector);
    container.html("");
    const tt = getTooltip();

    const w = 880, h = 420;
    const svg = container.append("svg").attr("viewBox", `0 0 ${w} ${h}`);

    const urbanas = {
      type: "FeatureCollection",
      features: rawData.geoAgeb.features.filter((f) => {
        if (f.properties.tipo_ageb !== "URBANA") return false;
        if (focus === "centro") return f.properties.colonia && f.properties.colonia.includes("Centro");
        return true;
      })
    };

    const sem = focus === "centro"
      ? rawData.semaforos.filter((d) => d.es_centro === "Centro Histórico")
      : rawData.semaforos;

    const projection = d3.geoMercator().fitExtent([[20, 40], [w - 260, h - 20]], urbanas);
    const path = d3.geoPath(projection);

    svg.append("text").attr("x", 20).attr("y", 24).attr("font-size", 13).attr("font-weight", 700).attr("fill", P.tinta)
      .text(focus === "centro"
        ? `Zoom al Centro Histórico: ${fmtInt(sem.length)} semáforos reales (46.3 % del municipio)`
        : `Distribución municipal de ${fmtInt(sem.length)} semáforos reales en Mérida`);

    const gMap = svg.append("g");
    gMap.selectAll("path.ageb").data(urbanas.features).join("path")
      .attr("d", path).attr("fill", "#f8fafc").attr("stroke", "#cbd5e1").attr("stroke-width", 0.6);

    gMap.selectAll("circle.sem").data(sem).join("circle")
      .attr("cx", (d) => projection([d.longitud, d.latitud])[0])
      .attr("cy", (d) => projection([d.longitud, d.latitud])[1])
      .attr("r", focus === "centro" ? 4.8 : 3.6)
      .attr("fill", (d) => (d.es_centro === "Centro Histórico" ? P.morado : P.oro))
      .attr("fill-opacity", 0.85)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.7)
      .style("cursor", "pointer")
      .on("mousemove", (event, d) => {
        tt.style("opacity", 1).style("left", `${event.clientX + 12}px`).style("top", `${event.clientY - 12}px`)
          .html(`<strong>${d.colonia}</strong><br>Zona: ${d.es_centro}<br>AGEB: ${d.cvegeo_ageb || "Fuera de AGEB"}`);
      })
      .on("mouseleave", () => tt.style("opacity", 0));

    // Top 6 colonias con más semáforos a la derecha
    const sideX = w - 246;
    svg.append("rect").attr("x", sideX).attr("y", 40).attr("width", 230).attr("height", h - 60).attr("rx", 10).attr("fill", "#fafafa").attr("stroke", P.borde);
    svg.append("text").attr("x", sideX + 14).attr("y", 64).attr("font-size", 12).attr("font-weight", 700).attr("fill", P.morado).text("Colonias con más semáforos");

    const topCol = rawData.semColonia.slice(0, 7);
    const xBar = d3.scaleLinear().domain([0, topCol[0] ? topCol[0].semaforos_count : 1]).range([0, 145]);
    topCol.forEach((c, i) => {
      const y = 86 + i * 42;
      const cleanName = c.colonia.replace(", MERIDA", "").replace("COL. ", "").slice(0, 22);
      svg.append("text").attr("x", sideX + 14).attr("y", y).attr("font-size", 10.5).attr("font-weight", 600).attr("fill", P.tinta).text(cleanName);
      svg.append("rect").attr("x", sideX + 14).attr("y", y + 5).attr("width", Math.max(6, xBar(c.semaforos_count))).attr("height", 13).attr("rx", 3)
        .attr("fill", i === 0 ? P.morado : P.oro);
      svg.append("text").attr("x", sideX + 20 + Math.max(6, xBar(c.semaforos_count))).attr("y", y + 15).attr("font-size", 10.5).attr("font-weight", 700).attr("fill", P.tinta)
        .text(fmtInt(c.semaforos_count));
    });
  }

  return { renderPriorityMap, renderSignalsMap };
})();
