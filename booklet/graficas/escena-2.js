/**
 * Escena 2 · Capítulo 04 · Caminar Mérida
 * Serie mensual (2021-2024) de accidentes con peatón involucrado y peatones heridos en Mérida.
 * Tipografía ajustada (>= 15 unidades SVG en viewBox de 980) para asegurar >= 8 pt al imprimir en carta.
 * Lee exclusivamente desde ../datos/escena-2.csv (INEGI ATUS).
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

  const MESES_ES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const fmtInt = (n) => new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(n);

  function getTooltip() {
    let tt = d3.select("body").select(".booklet-tooltip");
    if (tt.empty()) {
      tt = d3.select("body").append("div").attr("class", "booklet-tooltip");
    }
    return tt;
  }

  async function renderEscena2(containerSelector, baseDatos = "../datos") {
    const container = d3.select(containerSelector);
    if (container.empty()) return;
    container.html("");

    const raw = await d3.csv(`${baseDatos}/escena-2.csv`, (d) => ({
      periodo: d.periodo,
      anio: +d.anio,
      mes: +d.mes,
      fecha: new Date(+d.anio, +d.mes - 1, 1),
      accidentes_peaton: +d.accidentes_peaton,
      peatones_heridos: +d.peatones_heridos,
      peatones_muertos: +d.peatones_muertos
    }));

    raw.sort((a, b) => a.fecha - b.fecha);

    const totalSiniestros = d3.sum(raw, (d) => d.accidentes_peaton);
    const totalHeridos = d3.sum(raw, (d) => d.peatones_heridos);
    const totalMuertos = d3.sum(raw, (d) => d.peatones_muertos);
    const porAnio = d3.rollups(
      raw,
      (v) => ({
        siniestros: d3.sum(v, (d) => d.accidentes_peaton),
        heridos: d3.sum(v, (d) => d.peatones_heridos),
        muertos: d3.sum(v, (d) => d.peatones_muertos)
      }),
      (d) => d.anio
    );

    const width = 980;
    const height = 560;
    const margin = { top: 124, right: 30, bottom: 64, left: 62 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const svg = container
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("role", "img")
      .attr("aria-label", "Serie mensual 2021 a 2024 de accidentes con peatón involucrado y peatones heridos en Mérida");

    const tooltip = getTooltip();
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(raw, (d) => d.fecha))
      .range([0, innerW]);

    const yMax = Math.max(18, d3.max(raw, (d) => Math.max(d.accidentes_peaton, d.peatones_heridos)) + 3);
    const y = d3.scaleLinear().domain([0, yMax]).nice().range([innerH, 0]);

    // Leyenda superior (>= 15.5)
    const leg = svg.append("g").attr("transform", `translate(${margin.left}, 26)`);
    leg.append("line").attr("x1", 0).attr("x2", 26).attr("y1", 6).attr("y2", 6).attr("stroke", PALETA.morado).attr("stroke-width", 3.5);
    leg.append("text").attr("x", 34).attr("y", 11).attr("font-size", 15.5).attr("font-weight", 700).attr("fill", PALETA.tinta)
      .text(`Siniestros con peatón (${fmtInt(totalSiniestros)})`);

    leg.append("line").attr("x1", 315).attr("x2", 341).attr("y1", 6).attr("y2", 6).attr("stroke", PALETA.oro).attr("stroke-width", 2.8).attr("stroke-dasharray", "6,3");
    leg.append("text").attr("x", 349).attr("y", 11).attr("font-size", 15.5).attr("font-weight", 700).attr("fill", PALETA.oroOscuro)
      .text(`Peatones heridos (${fmtInt(totalHeridos)})`);

    leg.append("text").attr("x", 615).attr("y", 11).attr("font-size", 15).attr("fill", "#4b5563")
      .text(`Fallecidos en sitio (2021): ${fmtInt(totalMuertos)}`);

    // Bandas anuales alternadas con totales anuales directos arriba (>= 15)
    const anios = [2021, 2022, 2023, 2024];
    anios.forEach((anio, idx) => {
      const x0 = x(new Date(anio, 0, 1));
      const x1 = anio < 2024 ? x(new Date(anio + 1, 0, 1)) : innerW;
      const bw = x1 - x0;

      if (idx % 2 === 1) {
        g.append("rect")
          .attr("x", x0)
          .attr("y", 0)
          .attr("width", bw)
          .attr("height", innerH)
          .attr("fill", "#f9fafb");
      }

      if (idx > 0) {
        g.append("line")
          .attr("x1", x0)
          .attr("x2", x0)
          .attr("y1", -58)
          .attr("y2", innerH)
          .attr("stroke", PALETA.borde)
          .attr("stroke-dasharray", "3,3");
      }

      const info = porAnio.find((p) => p[0] === anio)[1];
      const cx = x0 + bw / 2;

      g.append("text")
        .attr("x", cx)
        .attr("y", -38)
        .attr("text-anchor", "middle")
        .attr("font-size", 16.5)
        .attr("font-weight", 800)
        .attr("fill", anio === 2024 ? PALETA.morado : PALETA.tinta)
        .text(`${anio}`);

      g.append("text")
        .attr("x", cx)
        .attr("y", -16)
        .attr("text-anchor", "middle")
        .attr("font-size", 15)
        .attr("font-weight", 700)
        .attr("fill", PALETA.morado)
        .text(`${fmtInt(info.siniestros)} sin.`)
        .append("tspan")
        .attr("fill", PALETA.oroOscuro)
        .attr("font-weight", 600)
        .text(` · ${fmtInt(info.heridos)} her.`);
    });

    // Rejilla horizontal
    g.append("g")
      .selectAll("line")
      .data(y.ticks(5))
      .join("line")
      .attr("x1", 0)
      .attr("x2", innerW)
      .attr("y1", (d) => y(d))
      .attr("y2", (d) => y(d))
      .attr("stroke", PALETA.borde)
      .attr("stroke-width", 1);

    // Eje Y (>= 15)
    g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickSize(0).tickPadding(10))
      .call((s) => s.select(".domain").remove())
      .selectAll("text")
      .attr("font-size", 15)
      .attr("fill", "#4b5563");

    svg.append("text")
      .attr("x", 14)
      .attr("y", margin.top - 64)
      .attr("font-size", 15)
      .attr("font-weight", 600)
      .attr("fill", "#4b5563")
      .text("Casos / mes");

    // Eje X (cada 6 meses para máxima claridad a 15 unidades SVG)
    const xTicks = raw.filter((d) => d.mes === 1 || d.mes === 7).map((d) => d.fecha);
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(
        d3.axisBottom(x)
          .tickValues(xTicks)
          .tickFormat((d) => (d.getMonth() === 0 ? `${MESES_ES[d.getMonth()]} ${d.getFullYear()}` : MESES_ES[d.getMonth()]))
          .tickSize(6)
          .tickPadding(8)
      )
      .call((s) => s.select(".domain").attr("stroke", PALETA.gris))
      .selectAll("text")
      .attr("font-size", 15)
      .attr("font-weight", (d) => (d.getMonth() === 0 ? 700 : 400))
      .attr("fill", (d) => (d.getMonth() === 0 ? PALETA.tinta : "#4b5563"));

    // Área suave bajo siniestros con peatón
    const areaSiniestros = d3.area()
      .x((d) => x(d.fecha))
      .y0(innerH)
      .y1((d) => y(d.accidentes_peaton))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(raw)
      .attr("d", areaSiniestros)
      .attr("fill", PALETA.morado)
      .attr("fill-opacity", 0.08);

    // Línea oro: peatones heridos
    const lineHeridos = d3.line()
      .x((d) => x(d.fecha))
      .y((d) => y(d.peatones_heridos))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(raw)
      .attr("d", lineHeridos)
      .attr("fill", "none")
      .attr("stroke", PALETA.oro)
      .attr("stroke-width", 2.5)
      .attr("stroke-dasharray", "6,3");

    // Línea morada: accidentes con peatón (foco)
    const lineSiniestros = d3.line()
      .x((d) => x(d.fecha))
      .y((d) => y(d.accidentes_peaton))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(raw)
      .attr("d", lineSiniestros)
      .attr("fill", "none")
      .attr("stroke", PALETA.morado)
      .attr("stroke-width", 3.1);

    // Puntos de datos
    g.selectAll("circle.pt-her")
      .data(raw)
      .join("circle")
      .attr("class", "pt-her")
      .attr("cx", (d) => x(d.fecha))
      .attr("cy", (d) => y(d.peatones_heridos))
      .attr("r", 3.4)
      .attr("fill", PALETA.oro)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.9);

    g.selectAll("circle.pt-sin")
      .data(raw)
      .join("circle")
      .attr("class", "pt-sin")
      .attr("cx", (d) => x(d.fecha))
      .attr("cy", (d) => y(d.accidentes_peaton))
      .attr("r", 4.1)
      .attr("fill", PALETA.morado)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1.1)
      .style("cursor", "pointer")
      .on("mousemove", (event, d) => {
        tooltip
          .style("opacity", 1)
          .style("left", `${event.clientX + 12}px`)
          .style("top", `${event.clientY - 12}px`)
          .html(`
            <div class="tt-titulo">${MESES_ES[d.mes - 1].toUpperCase()} ${d.anio}</div>
            <div class="tt-dato">Siniestros con peatón: ${fmtInt(d.accidentes_peaton)}</div>
            <div class="tt-dato">Peatones heridos: ${fmtInt(d.peatones_heridos)}</div>
            <div class="tt-dato">Fallecidos en sitio: ${fmtInt(d.peatones_muertos)}</div>
          `);
      })
      .on("mouseleave", () => tooltip.style("opacity", 0));

    // Anotación directa en el pico máximo mensual (mayo 2024) con letra >= 15
    const pico = raw.reduce((best, cur) => (cur.accidentes_peaton > best.accidentes_peaton ? cur : best), raw[0]);
    const px = x(pico.fecha);
    const py = y(pico.accidentes_peaton);

    g.append("circle")
      .attr("cx", px)
      .attr("cy", py)
      .attr("r", 7.5)
      .attr("fill", "none")
      .attr("stroke", PALETA.morado)
      .attr("stroke-width", 2.2);

    const boxW = 248;
    const boxH = 54;
    const annoX = Math.max(12, px - boxW - 28);
    const annoY = 6;
    g.append("line")
      .attr("x1", annoX + boxW)
      .attr("y1", annoY + 34)
      .attr("x2", px - 7)
      .attr("y2", py - 5)
      .attr("stroke", PALETA.morado)
      .attr("stroke-width", 1.5);

    g.append("rect")
      .attr("x", annoX)
      .attr("y", annoY)
      .attr("width", boxW)
      .attr("height", boxH)
      .attr("rx", 7)
      .attr("fill", "#ffffff")
      .attr("stroke", PALETA.morado)
      .attr("stroke-width", 1.3);

    g.append("text")
      .attr("x", annoX + 12)
      .attr("y", annoY + 22)
      .attr("font-size", 15.5)
      .attr("font-weight", 800)
      .attr("fill", PALETA.morado)
      .text(`Pico: ${MESES_ES[pico.mes - 1]} ${pico.anio}`);

    g.append("text")
      .attr("x", annoX + 12)
      .attr("y", annoY + 43)
      .attr("font-size", 15)
      .attr("font-weight", 600)
      .attr("fill", PALETA.tinta)
      .text(`${fmtInt(pico.accidentes_peaton)} siniestros · ${fmtInt(pico.peatones_heridos)} heridos`);
  }

  window.renderEscena2 = renderEscena2;
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#grafica-escena-2")) {
      renderEscena2("#grafica-escena-2");
    }
  });
})();
