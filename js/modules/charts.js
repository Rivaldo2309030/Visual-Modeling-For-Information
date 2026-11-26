/**
 * Módulo de gráficas deterministas en D3 v7.9.0.
 * Paleta oficial del booklet: Morado #600d8b, Oro #ed9f22, Oro oscuro #b45309, Gris #9ca3af.
 * Cero generación aleatoria y cero datos inventados.
 */
window.DataStoryApp = window.DataStoryApp || {};

window.DataStoryApp.ChartModule = (function () {
  const P = {
    morado: "#600d8b",
    oro: "#ed9f22",
    oroOscuro: "#b45309",
    gris: "#9ca3af",
    tinta: "#0d0d0d",
    borde: "#e5e7eb"
  };

  const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const fmtInt = (n) => new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(n);
  const fmtDec = (n, d = 1) => new Intl.NumberFormat("es-MX", { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);

  function getTooltip() {
    let tt = d3.select("body").select(".main-tooltip");
    if (tt.empty()) tt = d3.select("body").append("div").attr("class", "main-tooltip");
    return tt;
  }

  function renderPedestrianSeries(containerSelector, mensual, yearFilter = "all") {
    const container = d3.select(containerSelector);
    container.html("");
    const data = (yearFilter === "recent" ? mensual.filter((d) => d.anio >= 2023) : mensual)
      .map((d) => ({ ...d, fecha: new Date(d.anio, d.mes - 1, 1) }))
      .sort((a, b) => a.fecha - b.fecha);

    const w = 880, h = 395, m = { top: 44, right: 28, bottom: 48, left: 50 };
    const iw = w - m.left - m.right, ih = h - m.top - m.bottom;
    const svg = container.append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);
    const tt = getTooltip();

    const x = d3.scaleTime().domain(d3.extent(data, (d) => d.fecha)).range([0, iw]);
    const y = d3.scaleLinear().domain([0, d3.max(data, (d) => Math.max(d.accidentes_peaton, d.peatones_heridos)) + 2]).nice().range([ih, 0]);

    g.append("g").selectAll("line").data(y.ticks(6)).join("line")
      .attr("x1", 0).attr("x2", iw).attr("y1", (d) => y(d)).attr("y2", (d) => y(d))
      .attr("stroke", P.borde);

    g.append("g").call(d3.axisLeft(y).ticks(6).tickSize(0).tickPadding(8))
      .call((s) => s.select(".domain").remove())
      .selectAll("text").attr("font-size", 11).attr("fill", "#4b5563");

    const tickDates = data.filter((d) => (yearFilter === "recent" ? d.mes % 2 === 1 : [1, 4, 7, 10].includes(d.mes))).map((d) => d.fecha);
    g.append("g").attr("transform", `translate(0,${ih})`)
      .call(d3.axisBottom(x).tickValues(tickDates).tickFormat((d) => (d.getMonth() === 0 ? `${MESES[d.getMonth()]} ${d.getFullYear()}` : MESES[d.getMonth()])))
      .selectAll("text").attr("font-size", 10.5).attr("fill", P.tinta);

    g.append("path").datum(data)
      .attr("d", d3.area().x((d) => x(d.fecha)).y0(ih).y1((d) => y(d.accidentes_peaton)).curve(d3.curveMonotoneX))
      .attr("fill", P.morado).attr("fill-opacity", 0.09);

    g.append("path").datum(data)
      .attr("d", d3.line().x((d) => x(d.fecha)).y((d) => y(d.peatones_heridos)).curve(d3.curveMonotoneX))
      .attr("fill", "none").attr("stroke", P.oro).attr("stroke-width", 2.2).attr("stroke-dasharray", "6,3");

    g.append("path").datum(data)
      .attr("d", d3.line().x((d) => x(d.fecha)).y((d) => y(d.accidentes_peaton)).curve(d3.curveMonotoneX))
      .attr("fill", "none").attr("stroke", P.morado).attr("stroke-width", 2.8);

    g.selectAll("circle.pt").data(data).join("circle")
      .attr("cx", (d) => x(d.fecha)).attr("cy", (d) => y(d.accidentes_peaton))
      .attr("r", 3.6).attr("fill", P.morado).attr("stroke", "#fff").attr("stroke-width", 0.9)
      .style("cursor", "pointer")
      .on("mousemove", (event, d) => {
        tt.style("opacity", 1).style("left", `${event.clientX + 12}px`).style("top", `${event.clientY - 12}px`)
          .html(`<strong>${MESES[d.mes - 1].toUpperCase()} ${d.anio}</strong><br>Siniestros peatón: ${fmtInt(d.accidentes_peaton)}<br>Peatones heridos: ${fmtInt(d.peatones_heridos)}`);
      })
      .on("mouseleave", () => tt.style("opacity", 0));

    // Leyenda directa
    const leg = svg.append("g").attr("transform", `translate(${m.left}, 18)`);
    leg.append("line").attr("x1", 0).attr("x2", 20).attr("y1", 4).attr("y2", 4).attr("stroke", P.morado).attr("stroke-width", 3);
    leg.append("text").attr("x", 26).attr("y", 8).attr("font-size", 11.5).attr("font-weight", 700).attr("fill", P.tinta)
      .text(`Siniestros con peatón (${fmtInt(d3.sum(data, (d) => d.accidentes_peaton))})`);
    leg.append("line").attr("x1", 230).attr("x2", 250).attr("y1", 4).attr("y2", 4).attr("stroke", P.oro).attr("stroke-width", 2.4).attr("stroke-dasharray", "6,3");
    leg.append("text").attr("x", 256).attr("y", 8).attr("font-size", 11.5).attr("font-weight", 700).attr("fill", P.oroOscuro)
      .text(`Peatones heridos (${fmtInt(d3.sum(data, (d) => d.peatones_heridos))})`);
  }

  function renderSictSeries(containerSelector, sictMerida, sictResto, mode = "compare") {
    const container = d3.select(containerSelector);
    container.html("");
    const w = 880, h = 395, m = { top: 44, right: 34, bottom: 48, left: 66 };
    const iw = w - m.left - m.right, ih = h - m.top - m.bottom;
    const svg = container.append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);
    const tt = getTooltip();

    const field = mode === "max" ? "tdpa_maximo" : "tdpa_promedio";
    const x = d3.scaleLinear().domain(d3.extent(sictMerida, (d) => d.anio)).range([0, iw]);
    const yMax = d3.max([...sictMerida, ...sictResto], (d) => d[field]) * 1.15;
    const y = d3.scaleLinear().domain([0, yMax]).nice().range([ih, 0]);

    g.append("g").selectAll("line").data(y.ticks(6)).join("line")
      .attr("x1", 0).attr("x2", iw).attr("y1", (d) => y(d)).attr("y2", (d) => y(d)).attr("stroke", P.borde);

    g.append("g").call(d3.axisLeft(y).ticks(6).tickFormat((d) => fmtInt(d)).tickSize(0).tickPadding(8))
      .call((s) => s.select(".domain").remove())
      .selectAll("text").attr("font-size", 11).attr("fill", "#4b5563");

    g.append("g").attr("transform", `translate(0,${ih})`)
      .call(d3.axisBottom(x).ticks(sictMerida.length).tickFormat(d3.format("d")))
      .selectAll("text").attr("font-size", 11).attr("fill", P.tinta);

    const drawLine = (arr, color, label) => {
      g.append("path").datum(arr)
        .attr("d", d3.line().x((d) => x(d.anio)).y((d) => y(d[field])).curve(d3.curveMonotoneX))
        .attr("fill", "none").attr("stroke", color).attr("stroke-width", 2.8);

      g.selectAll(null).data(arr).join("circle")
        .attr("cx", (d) => x(d.anio)).attr("cy", (d) => y(d[field]))
        .attr("r", 4).attr("fill", color).attr("stroke", "#fff").attr("stroke-width", 1)
        .style("cursor", "pointer")
        .on("mousemove", (event, d) => {
          tt.style("opacity", 1).style("left", `${event.clientX + 12}px`).style("top", `${event.clientY - 12}px`)
            .html(`<strong>${label} (${d.anio})</strong><br>${mode === "max" ? "TDPA máximo" : "TDPA promedio"}: ${fmtInt(Math.round(d[field]))} veh/día<br>Estaciones: ${fmtInt(d.estaciones_aforo)}`);
        })
        .on("mouseleave", () => tt.style("opacity", 0));

      const last = arr[arr.length - 1];
      if (last) {
        g.append("text")
          .attr("x", x(last.anio) - 6)
          .attr("y", y(last[field]) - 10)
          .attr("text-anchor", "end")
          .attr("font-size", 11)
          .attr("font-weight", 700)
          .attr("fill", color)
          .text(`${fmtInt(Math.round(last[field]))} veh/día`);
      }
    };

    drawLine(sictResto, P.oro, "Resto de Yucatán");
    drawLine(sictMerida, P.morado, "Corredores Mérida");

    const leg = svg.append("g").attr("transform", `translate(${m.left}, 18)`);
    leg.append("line").attr("x1", 0).attr("x2", 20).attr("y1", 4).attr("y2", 4).attr("stroke", P.morado).attr("stroke-width", 3);
    leg.append("text").attr("x", 26).attr("y", 8).attr("font-size", 11.5).attr("font-weight", 700).attr("fill", P.tinta)
      .text(mode === "max" ? "TDPA máximo · Corredores Mérida" : "TDPA promedio · Corredores Mérida");
    leg.append("line").attr("x1", 280).attr("x2", 300).attr("y1", 4).attr("y2", 4).attr("stroke", P.oro).attr("stroke-width", 3);
    leg.append("text").attr("x", 306).attr("y", 8).attr("font-size", 11.5).attr("font-weight", 700).attr("fill", P.oroOscuro)
      .text("Resto de la red estatal Yucatán");
  }

  function renderHorizontalBars(containerSelector, items, opts = {}) {
    const container = d3.select(containerSelector);
    container.html("");
    const w = 880, h = 395, m = { top: 36, right: 120, bottom: 32, left: 230 };
    const iw = w - m.left - m.right, ih = h - m.top - m.bottom;
    const svg = container.append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

    const y = d3.scaleBand().domain(items.map((d) => d.label)).range([0, ih]).padding(0.28);
    const x = d3.scaleLinear().domain([0, d3.max(items, (d) => d.value) * 1.15]).range([0, iw]);

    g.append("g").selectAll("rect.bg").data(items).join("rect")
      .attr("x", 0).attr("y", (d) => y(d.label)).attr("width", iw).attr("height", y.bandwidth())
      .attr("rx", 5).attr("fill", "#f3f4f6");

    g.append("g").selectAll("rect.bar").data(items).join("rect")
      .attr("x", 0).attr("y", (d) => y(d.label))
      .attr("width", (d) => Math.max(5, x(d.value)))
      .attr("height", y.bandwidth())
      .attr("rx", 5)
      .attr("fill", (d) => d.color || P.morado);

    g.append("g").selectAll("text.lbl").data(items).join("text")
      .attr("x", -10).attr("y", (d) => y(d.label) + y.bandwidth() / 2 + 4)
      .attr("text-anchor", "end").attr("font-size", 12).attr("font-weight", 600).attr("fill", P.tinta)
      .text((d) => d.label);

    g.append("g").selectAll("text.val").data(items).join("text")
      .attr("x", (d) => x(d.value) + 8).attr("y", (d) => y(d.label) + y.bandwidth() / 2 + 4)
      .attr("font-size", 12).attr("font-weight", 700).attr("fill", P.tinta)
      .text((d) => (d.suffix ? `${fmtInt(d.value)} (${d.suffix})` : fmtInt(d.value)));

    if (opts.title) {
      svg.append("text").attr("x", m.left).attr("y", 20).attr("font-size", 12.5).attr("font-weight", 700).attr("fill", P.morado).text(opts.title);
    }
  }

  return { renderPedestrianSeries, renderSictSeries, renderHorizontalBars };
})();
