/**
 * Escena 1 · Capítulo 04 · Caminar Mérida
 * Mapa D3 de los 190 semáforos reales de Mérida (OSM) y desglose de los 4,092 cruces peatonales.
 * Tipografía ajustada (>= 15 unidades SVG en viewBox de 980) para asegurar >= 8 pt al imprimir en carta.
 * Lee exclusivamente desde ../datos/ (sin datos fijos en el código).
 */
(function () {
  const PALETA = {
    morado: "#600d8b",
    oro: "#ed9f22",
    oroOscuro: "#b45309",
    gris: "#9ca3af",
    tinta: "#0d0d0d",
    borde: "#e5e7eb",
    fondoMapa: "#f8fafc"
  };

  const fmtInt = (n) => new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(n);
  const fmtPct = (n) => `${new Intl.NumberFormat("es-MX", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n)} %`;

  function getTooltip() {
    let tt = d3.select("body").select(".booklet-tooltip");
    if (tt.empty()) {
      tt = d3.select("body").append("div").attr("class", "booklet-tooltip");
    }
    return tt;
  }

  async function renderEscena1(containerSelector, baseDatos = "../datos") {
    const container = d3.select(containerSelector);
    if (container.empty()) return;
    container.html("");

    const [geo, semaforos, cruces] = await Promise.all([
      d3.json(`${baseDatos}/merida_ageb_simplificado.geojson`),
      d3.csv(`${baseDatos}/escena-1.csv`, (d) => ({
        id_semaforo: d.id_semaforo,
        latitud: +d.latitud,
        longitud: +d.longitud,
        colonia: d.colonia,
        cvegeo_ageb: d.cvegeo_ageb,
        es_centro: d.es_centro,
        tiene_cruce_marcado: d.tiene_cruce_marcado,
        tiene_sonido: d.tiene_sonido,
        tiene_boton: d.tiene_boton
      })),
      d3.csv(`${baseDatos}/escena-1-cruces-resumen.csv`, (d) => ({
        categoria: d.categoria,
        codigo_osm: d.codigo_osm,
        cruces: +d.cruces,
        porcentaje: +d.porcentaje
      }))
    ]);

    const totalSemaforos = semaforos.length;
    const semCentro = semaforos.filter((d) => d.es_centro === "Centro Histórico");
    const semResto = semaforos.filter((d) => d.es_centro !== "Centro Histórico");
    const pctCentro = (100 * semCentro.length) / totalSemaforos;
    const totalCruces = d3.sum(cruces, (d) => d.cruces);
    const coloniasConSem = new Set(semaforos.map((d) => d.colonia).filter((c) => !c.startsWith("Sin colonia"))).size;

    const width = 980;
    const height = 650;
    const svg = container
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("role", "img")
      .attr("aria-label", "Mapa de 190 semáforos reales y clasificación de 4,092 cruces peatonales en Mérida");

    const tooltip = getTooltip();

    // --- PANEL IZQUIERDO: MAPA URBANO DE MÉRIDA ---
    const mapBox = { x: 14, y: 16, w: 500, h: 618 };
    svg.append("rect")
      .attr("x", mapBox.x)
      .attr("y", mapBox.y)
      .attr("width", mapBox.w)
      .attr("height", mapBox.h)
      .attr("rx", 10)
      .attr("fill", PALETA.fondoMapa)
      .attr("stroke", PALETA.borde);

    const urbanas = {
      type: "FeatureCollection",
      features: geo.features.filter((f) => f.properties.tipo_ageb === "URBANA")
    };

    const projection = d3.geoMercator().fitExtent(
      [[mapBox.x + 16, mapBox.y + 84], [mapBox.x + mapBox.w - 16, mapBox.y + mapBox.h - 24]],
      urbanas
    );
    const path = d3.geoPath(projection);

    svg.append("text")
      .attr("x", mapBox.x + 16)
      .attr("y", mapBox.y + 28)
      .attr("font-size", 16.5)
      .attr("font-weight", 700)
      .attr("fill", PALETA.tinta)
      .text(`${fmtInt(totalSemaforos)} semáforos mapeados en Mérida`);

    // Leyenda compacta del mapa (15.5 SVG units >= 8 pt en carta)
    const legMap = svg.append("g").attr("transform", `translate(${mapBox.x + 16}, ${mapBox.y + 44})`);
    [
      { label: `Centro (${fmtInt(semCentro.length)})`, color: PALETA.morado, x: 0 },
      { label: `Resto de Mérida (${fmtInt(semResto.length)})`, color: PALETA.oro, x: 148 }
    ].forEach((item) => {
      legMap.append("circle").attr("cx", item.x + 6).attr("cy", 10).attr("r", 5.5).attr("fill", item.color);
      legMap.append("text").attr("x", item.x + 18).attr("y", 15).attr("font-size", 15.5).attr("font-weight", 600).attr("fill", PALETA.tinta).text(item.label);
    });

    // Polígonos AGEB urbanos
    const gMap = svg.append("g");
    gMap.selectAll("path.ageb")
      .data(urbanas.features)
      .join("path")
      .attr("class", "ageb")
      .attr("d", path)
      .attr("fill", "#ffffff")
      .attr("stroke", "#d1d5db")
      .attr("stroke-width", 0.55);

    const drawPoints = (data, color, radius) => {
      gMap.selectAll(null)
        .data(data)
        .join("circle")
        .attr("cx", (d) => projection([d.longitud, d.latitud])[0])
        .attr("cy", (d) => projection([d.longitud, d.latitud])[1])
        .attr("r", radius)
        .attr("fill", color)
        .attr("fill-opacity", 0.85)
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 0.7)
        .style("cursor", "pointer")
        .on("mousemove", (event, d) => {
          tooltip
            .style("opacity", 1)
            .style("left", `${event.clientX + 12}px`)
            .style("top", `${event.clientY - 12}px`)
            .html(`
              <div class="tt-titulo">${d.colonia}</div>
              <div class="tt-dato">Zona: ${d.es_centro}</div>
              <div class="tt-dato">AGEB: ${d.cvegeo_ageb || "Fuera de AGEB"}</div>
              <div class="tt-dato">Botón peatonal: ${d.tiene_boton} · Sonido: ${d.tiene_sonido}</div>
            `);
        })
        .on("mouseleave", () => tooltip.style("opacity", 0));
    };

    drawPoints(semResto, PALETA.oro, 4.1);
    drawPoints(semCentro, PALETA.morado, 3.8);

    // Anotación directa sobre el Centro Histórico (letra >= 15)
    const centroAvgLon = d3.mean(semCentro, (d) => d.longitud);
    const centroAvgLat = d3.mean(semCentro, (d) => d.latitud);
    const [cxCentro, cyCentro] = projection([centroAvgLon, centroAvgLat]);

    gMap.append("circle")
      .attr("cx", cxCentro)
      .attr("cy", cyCentro)
      .attr("r", 26)
      .attr("fill", "none")
      .attr("stroke", PALETA.morado)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4,3");

    const callX = mapBox.x + 18;
    const callY = mapBox.y + mapBox.h - 102;
    gMap.append("line")
      .attr("x1", callX + 225)
      .attr("y1", callY + 18)
      .attr("x2", cxCentro - 20)
      .attr("y2", cyCentro + 16)
      .attr("stroke", PALETA.morado)
      .attr("stroke-width", 1.5);

    gMap.append("rect")
      .attr("x", callX)
      .attr("y", callY)
      .attr("width", 232)
      .attr("height", 84)
      .attr("rx", 7)
      .attr("fill", "#ffffff")
      .attr("stroke", PALETA.morado)
      .attr("stroke-width", 1.3);

    gMap.append("text")
      .attr("x", callX + 10)
      .attr("y", callY + 23)
      .attr("font-size", 15.5)
      .attr("font-weight", 800)
      .attr("fill", PALETA.morado)
      .text("Colonia Centro");

    gMap.append("text")
      .attr("x", callX + 10)
      .attr("y", callY + 46)
      .attr("font-size", 15)
      .attr("font-weight", 700)
      .attr("fill", PALETA.tinta)
      .text(`${fmtInt(semCentro.length)} nodos (${fmtPct(pctCentro)})`);

    gMap.append("text")
      .attr("x", callX + 10)
      .attr("y", callY + 69)
      .attr("font-size", 15)
      .attr("fill", "#4b5563")
      .text(`Resto: ${fmtInt(semResto.length)} en ${coloniasConSem - 1} col.`);

    // --- PANEL DERECHO: DESGLOSE DE LOS 4,092 CRUCES PEATONALES ---
    const barBox = { x: 530, y: 16, w: 436, h: 618 };
    svg.append("rect")
      .attr("x", barBox.x)
      .attr("y", barBox.y)
      .attr("width", barBox.w)
      .attr("height", barBox.h)
      .attr("rx", 10)
      .attr("fill", "#ffffff")
      .attr("stroke", PALETA.borde);

    svg.append("text")
      .attr("x", barBox.x + 18)
      .attr("y", barBox.y + 30)
      .attr("font-size", 16.5)
      .attr("font-weight", 700)
      .attr("fill", PALETA.tinta)
      .text(`Señalización en ${fmtInt(totalCruces)} cruces`);

    svg.append("text")
      .attr("x", barBox.x + 18)
      .attr("y", barBox.y + 53)
      .attr("font-size", 15)
      .attr("fill", "#4b5563")
      .text("Cruces peatonales registrados en OSM");

    const xBar = d3.scaleLinear()
      .domain([0, d3.max(cruces, (d) => d.cruces) * 1.45])
      .range([0, barBox.w - 38]);

    const barStartY = barBox.y + 94;
    const rowStep = 79;

    const colorForCode = (code) => {
      if (code === "marked/traffic_signals") return PALETA.morado;
      if (code === "unmarked" || code === "uncontrolled") return PALETA.oro;
      return PALETA.gris;
    };

    const gBars = svg.append("g");
    cruces.forEach((d, i) => {
      const y = barStartY + i * rowStep;
      const fill = colorForCode(d.codigo_osm);

      gBars.append("text")
        .attr("x", barBox.x + 18)
        .attr("y", y)
        .attr("font-size", 15.5)
        .attr("font-weight", d.codigo_osm === "marked/traffic_signals" ? 700 : 600)
        .attr("fill", d.codigo_osm === "marked/traffic_signals" ? PALETA.morado : PALETA.tinta)
        .text(d.categoria);

      gBars.append("rect")
        .attr("x", barBox.x + 18)
        .attr("y", y + 10)
        .attr("width", barBox.w - 38)
        .attr("height", 28)
        .attr("rx", 5)
        .attr("fill", "#f3f4f6");

      const bw = Math.max(6, xBar(d.cruces));
      gBars.append("rect")
        .attr("x", barBox.x + 18)
        .attr("y", y + 10)
        .attr("width", bw)
        .attr("height", 28)
        .attr("rx", 5)
        .attr("fill", fill);

      const labelText = `${fmtInt(d.cruces)} (${fmtPct(d.porcentaje)})`;
      const inside = bw > 175;
      gBars.append("text")
        .attr("x", inside ? barBox.x + 28 : barBox.x + 26 + bw)
        .attr("y", y + 29)
        .attr("font-size", 15)
        .attr("font-weight", 700)
        .attr("fill", inside ? "#ffffff" : (d.codigo_osm === "marked/traffic_signals" ? PALETA.morado : PALETA.tinta))
        .text(labelText);
    });

    // Caja de hallazgo de accesibilidad al pie del panel derecho (>= 15)
    const noteY = barBox.y + barBox.h - 108;
    svg.append("rect")
      .attr("x", barBox.x + 16)
      .attr("y", noteY)
      .attr("width", barBox.w - 32)
      .attr("height", 92)
      .attr("rx", 8)
      .attr("fill", "#f3e8f9")
      .attr("stroke", PALETA.morado)
      .attr("stroke-opacity", 0.35);

    const markedRow = cruces.find((d) => d.codigo_osm === "marked/traffic_signals");
    svg.append("text")
      .attr("x", barBox.x + 28)
      .attr("y", noteY + 26)
      .attr("font-size", 15.5)
      .attr("font-weight", 800)
      .attr("fill", PALETA.morado)
      .text(`Solo ${fmtInt(markedRow ? markedRow.cruces : 0)} de ${fmtInt(totalCruces)} cruces (${fmtPct(markedRow ? markedRow.porcentaje : 0)})`);

    svg.append("text")
      .attr("x", barBox.x + 28)
      .attr("y", noteY + 51)
      .attr("font-size", 15)
      .attr("fill", PALETA.tinta)
      .text("tienen marca en piso o semáforo.");

    svg.append("text")
      .attr("x", barBox.x + 28)
      .attr("y", noteY + 75)
      .attr("font-size", 15)
      .attr("fill", PALETA.oroOscuro)
      .attr("font-weight", 700)
      .text("Solo 1 tiene guía táctil y 4 rebaje.");
  }

  window.renderEscena1 = renderEscena1;
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#grafica-escena-1")) {
      renderEscena1("#grafica-escena-1");
    }
  });
})();
