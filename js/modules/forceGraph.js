/**
 * Red semántica determinista en D3 v7.9.0 de co-ocurrencia en prensa local de Mérida.
 * Lee directamente data/gold/ind_peatonal_prensa_coocurrencia.csv.
 * Cero valores aleatorios y cero nodos de COVID/salud.
 */
window.DataStoryApp = window.DataStoryApp || {};

window.DataStoryApp.ForceGraphModule = (function () {
  const P = {
    morado: "#600d8b",
    oro: "#ed9f22",
    oroOscuro: "#b45309",
    gris: "#9ca3af",
    tinta: "#0d0d0d",
    borde: "#e5e7eb"
  };

  function getTooltip() {
    let tt = d3.select("body").select(".main-tooltip");
    if (tt.empty()) tt = d3.select("body").append("div").attr("class", "main-tooltip");
    return tt;
  }

  function renderPressNetwork(containerSelector, topicos, edges, focusTopic = null) {
    const container = d3.select(containerSelector);
    container.html("");
    const tt = getTooltip();

    const w = 880, h = 410;
    const svg = container.append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    const cx = w * 0.38;
    const cy = h * 0.52;
    const rx = 208;
    const ry = 138;

    svg.append("text")
      .attr("x", 18).attr("y", 24).attr("font-size", 13).attr("font-weight", 700).attr("fill", P.tinta)
      .text("Co-ocurrencia entre temas de movilidad y peatones en 338 notas de prensa local");

    // Distribución elíptica determinista (coordenadas exactas por índice)
    const nodes = topicos.map((t, i) => {
      const angle = (i / topicos.length) * 2 * Math.PI - Math.PI / 2;
      return {
        id: t.nodo_origen,
        freq: t.frecuencia,
        pct: t.pct_sobre_corpus,
        x: cx + rx * Math.cos(angle),
        y: cy + ry * Math.sin(angle),
        r: 14 + Math.sqrt(t.frecuencia) * 2.2
      };
    });
    const byId = new Map(nodes.map((n) => [n.id, n]));

    const maxEdge = d3.max(edges, (e) => e.frecuencia) || 1;
    const wEdge = d3.scaleLinear().domain([1, maxEdge]).range([1.2, 7.5]);

    // Aristas reales de co-ocurrencia
    const gEdges = svg.append("g");
    edges.forEach((e) => {
      const s = byId.get(e.nodo_origen);
      const t = byId.get(e.nodo_destino);
      if (!s || !t) return;
      const isFocused = !focusTopic || e.nodo_origen === focusTopic || e.nodo_destino === focusTopic;
      const isPed = e.nodo_origen.includes("Peatón") || e.nodo_destino.includes("Peatón");

      gEdges.append("line")
        .attr("x1", s.x).attr("y1", s.y).attr("x2", t.x).attr("y2", t.y)
        .attr("stroke", isPed ? P.oro : P.morado)
        .attr("stroke-width", wEdge(e.frecuencia))
        .attr("stroke-opacity", isFocused ? 0.65 : 0.12)
        .style("cursor", "pointer")
        .on("mousemove", (event) => {
          tt.style("opacity", 1).style("left", `${event.clientX + 12}px`).style("top", `${event.clientY - 12}px`)
            .html(`<strong>${e.nodo_origen} ↔ ${e.nodo_destino}</strong><br>${e.frecuencia} notas compartidas (${e.pct_sobre_corpus} % del corpus)`);
        })
        .on("mouseleave", () => tt.style("opacity", 0));

      if (e.frecuencia >= 10 && isFocused) {
        gEdges.append("text")
          .attr("x", (s.x + t.x) / 2)
          .attr("y", (s.y + t.y) / 2 - 4)
          .attr("text-anchor", "middle")
          .attr("font-size", 10)
          .attr("font-weight", 700)
          .attr("fill", isPed ? P.oroOscuro : P.morado)
          .text(`${e.frecuencia}`);
      }
    });

    // Nodos de temas
    const gNodes = svg.append("g");
    nodes.forEach((n) => {
      const isPed = n.id.includes("Peatón") || n.id.includes("Banquetas");
      const active = !focusTopic || n.id === focusTopic || edges.some((e) => (e.nodo_origen === focusTopic && e.nodo_destino === n.id) || (e.nodo_destino === focusTopic && e.nodo_origen === n.id));
      const fill = isPed ? P.oro : P.morado;

      gNodes.append("circle")
        .attr("cx", n.x).attr("cy", n.y).attr("r", n.r)
        .attr("fill", fill)
        .attr("fill-opacity", active ? 0.92 : 0.25)
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 2.2)
        .style("cursor", "pointer")
        .on("mousemove", (event) => {
          tt.style("opacity", 1).style("left", `${event.clientX + 12}px`).style("top", `${event.clientY - 12}px`)
            .html(`<strong>${n.id}</strong><br>${n.freq} notas (${n.pct} % del corpus real)`);
        })
        .on("mouseleave", () => tt.style("opacity", 0));

      gNodes.append("text")
        .attr("x", n.x).attr("y", n.y + 4)
        .attr("text-anchor", "middle").attr("font-size", 11.5).attr("font-weight", 800).attr("fill", "#ffffff")
        .text(n.freq);

      gNodes.append("text")
        .attr("x", n.x).attr("y", n.y + n.r + 14)
        .attr("text-anchor", "middle").attr("font-size", 11).attr("font-weight", 700).attr("fill", active ? P.tinta : P.gris)
        .text(n.id);
    });

    // Panel derecho con los pares más frecuentes
    const sx = w - 210;
    svg.append("rect").attr("x", sx).attr("y", 42).attr("width", 196).attr("height", h - 62).attr("rx", 10).attr("fill", "#fafafa").attr("stroke", P.borde);
    svg.append("text").attr("x", sx + 12).attr("y", 64).attr("font-size", 11.5).attr("font-weight", 700).attr("fill", P.morado).text("Pares más frecuentes");
    edges.slice(0, 6).forEach((e, i) => {
      const y = 88 + i * 48;
      svg.append("text").attr("x", sx + 12).attr("y", y).attr("font-size", 10.2).attr("font-weight", 700).attr("fill", P.tinta)
        .text(`${i + 1}. ${e.nodo_origen.split(" ")[0]} + ${e.nodo_destino.split(" ")[0]}`);
      svg.append("text").attr("x", sx + 12).attr("y", y + 14).attr("font-size", 10).attr("fill", P.oroOscuro).attr("font-weight", 600)
        .text(`${e.frecuencia} notas (${e.pct_sobre_corpus} %)`);
    });
  }

  return { renderPressNetwork };
})();
