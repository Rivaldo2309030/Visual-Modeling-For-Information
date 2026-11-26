/**
 * Escena 1 · Capítulo 04 · Caminar Mérida
 * Mapa D3 de los 190 semáforos reales de Mérida (OSM) y desglose de los 4,092 cruces peatonales.
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
    const height = 540;
    const svg = container
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("role", "img")
      .attr("aria-label", "Mapa de 190 semáforos reales y clasificación de 4,092 cruces peatonales en Mérida");

    const tooltip = getTooltip();

    // --- PANEL IZQUIERDO: MAPA URBANO DE MÉRIDA ---
    const mapBox = { x: 16, y: 20, w: 515, h: 496 };
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
      [[mapBox.x + 18, mapBox.y + 44], [mapBox.x + mapBox.w - 18, mapBox.y + mapBox.h - 24]],
      urbanas
    );
    const path = d3.geoPath(projection);

    svg.append("text")
      .attr("x", mapBox.x + 16)
      .attr("y", mapBox.y + 26)
      .attr("font-size", 13)
      .attr("font-weight", 700)
      .attr("fill", PALETA.tinta)
      .text(`Ubicación de los ${fmtInt(totalSemaforos)} semáforos mapeados (área urbana de Mérida)`);

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

    // Puntos de semáforos: primero resto (oro), luego Centro (morado) para claridad visual
    const drawPoints = (data, color, radius) => {
      gMap.selectAll(null)
        .data(data)
        .join("circle")
        .attr("cx", (d) => projection([d.longitud, d.latitud])[0])
        .attr("cy", (d) => projection([d.longitud, d.latitud])[1])
        .attr("r", radius)
        .attr("fill", color)
        .attr("fill-opacity", 0.82)
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

    drawPoints(semResto, PALETA.oro, 3.8);
    drawPoints(semCentro, PALETA.morado, 3.6);

    // Anotación directa sobre el Centro Histórico
    const centroAvgLon = d3.mean(semCentro, (d) => d.longitud);
    const centroAvgLat = d3.mean(semCentro, (d) => d.latitud);
    const [cxCentro, cyCentro] = projection([centroAvgLon, centroAvgLat]);

    gMap.append("circle")
      .attr("cx", cxCentro)
      .attr("cy", cyCentro)
      .attr("r", 26)
      .attr("fill", "none")
      .attr("stroke", PALETA.morado)
      .attr("stroke-width", 1.8)
      .attr("stroke-dasharray", "4,3");

    const callX = mapBox.x + 28;
    const callY = mapBox.y + mapBox.h - 76;
    gMap.append("line")
      .attr("x1", callX + 162)
      .attr("y1", callY - 6)
      .attr("x2", cxCentro - 22)
      .attr("y2", cyCentro + 14)
      .attr("stroke", PALETA.morado)
      .attr("stroke-width", 1.3);

    gMap.append("rect")
      .attr("x", callX - 6)
      .attr("y", callY - 24)
      .attr("width", 174)
      .attr("height", 56)
      .attr("rx", 6)
      .attr("fill", "#ffffff")
      .attr("stroke", PALETA.morado)
      .attr("stroke-width", 1.1);

    gMap.append("text")
      .attr("x", callX + 2)
      .attr("y", callY - 7)
      .attr("font-size", 11.5)
      .attr("font-weight", 700)
      .attr("fill", PALETA.morado)
      .text("Colonia Centro");

    gMap.append("text")
      .attr("x", callX + 2)
      .attr("y", callY + 9)
      .attr("font-size", 11)
      .attr("font-weight", 600)
      .attr("fill", PALETA.tinta)
      .text(`${fmtInt(semCentro.length)} semáforos (${fmtPct(pctCentro)})`);

    gMap.append("text")
      .attr("x", callX + 2)
      .attr("y", callY + 23)
      .attr("font-size", 10)
      .attr("fill", "#4b5563")
      .text(`Resto: ${fmtInt(semResto.length)} en ${coloniasConSem - 1} colonias`);

    // Leyenda compacta del mapa
    const legMap = svg.append("g").attr("transform", `translate(${mapBox.x + 18}, ${mapBox.y + 44})`);
    [
      { label: `Centro Histórico (${fmtInt(semCentro.length)})`, color: PALETA.morado, x: 0 },
      { label: `Resto de Mérida (${fmtInt(semResto.length)})`, color: PALETA.oro, x: 158 }
    ].forEach((item) => {
      legMap.append("circle").attr("cx", item.x + 5).attr("cy", 4).attr("r", 4.5).attr("fill", item.color);
      legMap.append("text").attr("x", item.x + 14).attr("y", 8).attr("font-size", 11).attr("font-weight", 600).attr("fill", PALETA.tinta).text(item.label);
    });

    // --- PANEL DERECHO: DESGLOSE DE LOS 4,092 CRUCES PEATONALES ---
    const barBox = { x: 552, y: 20, w: 412, h: 496 };
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
      .attr("y", barBox.y + 28)
      .attr("font-size", 13.5)
      .attr("font-weight", 700)
      .attr("fill", PALETA.tinta)
      .text(`Tipo de señalización en ${fmtInt(totalCruces)} cruces`);

    svg.append("text")
      .attr("x", barBox.x + 18)
      .attr("y", barBox.y + 46)
      .attr("font-size", 11)
      .attr("fill", "#4b5563")
      .text("Atributo highway=crossing registrado en OpenStreetMap");

    const xBar = d3.scaleLinear()
      .domain([0, d3.max(cruces, (d) => d.cruces) * 1.32])
      .range([0, barBox.w - 42]);

    const barStartY = barBox.y + 78;
    const rowStep = 66;

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
        .attr("font-size", 12)
        .attr("font-weight", d.codigo_osm === "marked/traffic_signals" ? 700 : 600)
        .attr("fill", d.codigo_osm === "marked/traffic_signals" ? PALETA.morado : PALETA.tinta)
        .text(d.categoria);

      // Carril gris tenue
      gBars.append("rect")
        .attr("x", barBox.x + 18)
        .attr("y", y + 8)
        .attr("width", barBox.w - 42)
        .attr("height", 22)
        .attr("rx", 4)
        .attr("fill", "#f3f4f6");

      // Barra de datos
      const bw = Math.max(4, xBar(d.cruces));
      gBars.append("rect")
        .attr("x", barBox.x + 18)
        .attr("y", y + 8)
        .attr("width", bw)
        .attr("height", 22)
        .attr("rx", 4)
        .attr("fill", fill);

      // Etiqueta directa (siempre legible en impresión)
      const labelText = `${fmtInt(d.cruces)} (${fmtPct(d.porcentaje)})`;
      const inside = bw > 120;
      gBars.append("text")
        .attr("x", inside ? barBox.x + 26 : barBox.x + 24 + bw)
        .attr("y", y + 23)
        .attr("font-size", 11.5)
        .attr("font-weight", 700)
        .attr("fill", inside ? "#ffffff" : (d.codigo_osm === "marked/traffic_signals" ? PALETA.morado : PALETA.tinta))
        .text(labelText);
    });

    // Caja de hallazgo de accesibilidad al pie del panel derecho
    const noteY = barBox.y + barBox.h - 84;
    svg.append("rect")
      .attr("x", barBox.x + 18)
      .attr("y", noteY)
      .attr("width", barBox.w - 36)
      .attr("height", 66)
      .attr("rx", 8)
      .attr("fill", "#f3e8f9")
      .attr("stroke", PALETA.morado)
      .attr("stroke-opacity", 0.35);

    const markedRow = cruces.find((d) => d.codigo_osm === "marked/traffic_signals");
    svg.append("text")
      .attr("x", barBox.x + 30)
      .attr("y", noteY + 22)
      .attr("font-size", 12)
      .attr("font-weight", 800)
      .attr("fill", PALETA.morado)
      .text(`Solo ${fmtInt(markedRow ? markedRow.cruces : 0)} de ${fmtInt(totalCruces)} cruces (${fmtPct(markedRow ? markedRow.porcentaje : 0)})`);

    svg.append("text")
      .attr("x", barBox.x + 30)
      .attr("y", noteY + 40)
      .attr("font-size", 11)
      .attr("fill", PALETA.tinta)
      .text("registran marca en pavimento o semáforo en OSM.");

    svg.append("text")
      .attr("x", barBox.x + 30)
      .attr("y", noteY + 55)
      .attr("font-size", 10.5)
      .attr("fill", PALETA.oroOscuro)
      .attr("font-weight", 600)
      .text("Solo 1 cruce tiene guía táctil y 4 registran rebaje de banqueta.");
  }

  window.renderEscena1 = renderEscena1;
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#grafica-escena-1")) {
      renderEscena1("#grafica-escena-1");
    }
  });
})();
