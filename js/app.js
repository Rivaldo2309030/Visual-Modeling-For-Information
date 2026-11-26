/**
 * Orquestador principal de Sentir la Calle (Equipo 4 — Mérida).
 * Carga en vivo los archivos reales del repositorio y renderiza cada vista en D3 o Three.js.
 */
document.addEventListener("DOMContentLoaded", async () => {
  const App = window.DataStoryApp;
  let currentChapter = 1;
  let views = {};
  let rawData = {};

  const els = {
    chapterNav: document.getElementById("chapterNav"),
    storyTag: document.getElementById("storyTag"),
    storyTitle: document.getElementById("storyTitle"),
    storyLead: document.getElementById("storyLead"),
    storyDesc: document.getElementById("storyDesc"),
    primarySource: document.getElementById("primarySource"),
    secondarySources: document.getElementById("secondarySources"),
    storyBeats: document.getElementById("storyBeats"),
    vizTitle: document.getElementById("vizTitle"),
    kpiGrid: document.getElementById("kpiGrid"),
    insightBar: document.getElementById("insightBar"),
    canvasStage: document.getElementById("canvasStage"),
    d3Stage: document.getElementById("d3StageContainer"),
    threeStage: document.getElementById("threeStageContainer"),
    dataStatusBadge: document.getElementById("dataStatusBadge")
  };

  function buildNav() {
    els.chapterNav.innerHTML = "";
    Object.values(views).forEach((v) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `chap-tab ${v.number >= 8 ? "tech-tab" : ""}`;
      btn.dataset.chap = v.number;
      btn.innerHTML = `<span class="chap-num">0${v.number}</span> ${v.tabName}`;
      btn.addEventListener("click", () => {
        App.StorytellingModule.stopAutoPlay();
        loadChapter(v.number);
      });
      els.chapterNav.appendChild(btn);
    });
  }

  function renderViewVisual(view, beat) {
    App.ThreeModule.dispose();
    const is3d = view.vizType === "three_ply" || view.vizType === "three_glb";

    els.canvasStage.classList.toggle("dark-stage", is3d);
    els.d3Stage.style.display = is3d ? "none" : "block";
    els.threeStage.style.display = is3d ? "block" : "none";

    if (view.vizType === "gis_priority") {
      App.GisMapModule.renderPriorityMap("#d3StageContainer", rawData, beat && beat.mapMode ? beat.mapMode : "priority_with_points");
    } else if (view.vizType === "line_pedestrian") {
      App.ChartModule.renderPedestrianSeries("#d3StageContainer", rawData.mensual, beat && beat.yearFilter ? beat.yearFilter : "all");
    } else if (view.vizType === "line_sict") {
      App.ChartModule.renderSictSeries("#d3StageContainer", rawData.sictMerida, rawData.sictResto, beat && beat.sictMode ? beat.sictMode : "compare");
    } else if (view.vizType === "gis_signals") {
      App.GisMapModule.renderSignalsMap("#d3StageContainer", rawData, beat && beat.signalFocus ? beat.signalFocus : "all");
    } else if (view.vizType === "bar_infra") {
      const items = rawData.infraPorCat.map((d, i) => ({
        label: d.label,
        value: d.value,
        color: i === 0 ? "#600d8b" : "#ed9f22"
      }));
      App.ChartModule.renderHorizontalBars("#d3StageContainer", items, { title: "Capas municipales del catálogo SIG por categoría" });
    } else if (view.vizType === "force_press") {
      App.ForceGraphModule.renderPressNetwork("#d3StageContainer", rawData.prensaTopicos, rawData.prensaEdges, beat && "focusTopic" in beat ? beat.focusTopic : null);
    } else if (view.vizType === "bar_crossings") {
      const items = rawData.crucesResumen.map((d) => ({
        label: d.categoria,
        value: d.cruces,
        suffix: `${d.porcentaje} %`,
        color: d.codigo_osm === "marked/traffic_signals" ? "#600d8b" : (d.codigo_osm === "unmarked" || d.codigo_osm === "uncontrolled" ? "#ed9f22" : "#9ca3af")
      }));
      App.ChartModule.renderHorizontalBars("#d3StageContainer", items, { title: "Clasificación real de los 4,092 cruces peatonales en OSM" });
    } else if (view.vizType === "three_ply") {
      App.ThreeModule.initRealPly("threeStageContainer");
    } else if (view.vizType === "three_glb") {
      App.ThreeModule.initRealGlb("threeStageContainer");
    }
  }

  function loadChapter(num) {
    currentChapter = num;
    const view = views[num];
    if (!view) return;

    document.querySelectorAll(".chap-tab").forEach((t) => {
      t.classList.toggle("active", Number(t.dataset.chap) === num);
    });

    els.storyTag.textContent = view.tag;
    els.storyTitle.textContent = view.storyTitle;
    els.storyLead.textContent = view.storyLead;
    els.storyDesc.innerHTML = view.storyDesc;
    els.primarySource.textContent = view.primarySource;
    els.secondarySources.innerHTML = view.secondarySources.map((s) => `<span class="source-pill">${s}</span>`).join("");
    els.vizTitle.textContent = view.vizTitle;
    els.insightBar.innerHTML = view.insight;

    els.kpiGrid.innerHTML = view.kpis.map((k, idx) => `
      <div class="kpi-card" style="border-top-color:${idx === 1 ? "#ed9f22" : "#9d4edd"};">
        <div class="kpi-label">${k.label}</div>
        <div class="kpi-val">${k.value}</div>
        <div class="kpi-delta">${k.delta}</div>
      </div>
    `).join("");

    els.storyBeats.innerHTML = "";
    view.storyBeats.forEach((beat, idx) => {
      const card = document.createElement("div");
      card.className = `beat-card ${idx === 0 ? "active-beat" : ""}`;
      card.innerHTML = `
        <div class="beat-header">
          <span class="beat-title">${beat.title}</span>
          <span class="beat-btn">${beat.actionText}</span>
        </div>
        <div class="beat-desc">${beat.desc}</div>
      `;
      card.addEventListener("click", () => {
        els.storyBeats.querySelectorAll(".beat-card").forEach((c) => c.classList.remove("active-beat"));
        card.classList.add("active-beat");
        if (beat.camPreset && (view.vizType === "three_ply" || view.vizType === "three_glb")) {
          App.ThreeModule.setCameraPreset(beat.camPreset);
        } else {
          renderViewVisual(view, beat);
        }
      });
      els.storyBeats.appendChild(card);
    });

    renderViewVisual(view, view.storyBeats[0]);
  }

  async function bootstrap() {
    els.dataStatusBadge.textContent = "Cargando archivos reales…";
    try {
      const loaded = await App.loadViewsFromData();
      views = loaded.views;
      rawData = loaded.rawData;
      els.dataStatusBadge.textContent = "Datos reales leídos en vivo";
      buildNav();
      loadChapter(currentChapter);
    } catch (err) {
      els.dataStatusBadge.textContent = "Error al cargar archivos";
      els.storyLead.textContent = `No se pudieron leer los CSV/GeoJSON locales (${err.message}). Abre este sitio desde un servidor HTTP (por ejemplo python -m http.server o GitHub Pages).`;
    }
  }

  document.getElementById("btnPrev").addEventListener("click", () => {
    App.StorytellingModule.stopAutoPlay();
    loadChapter(currentChapter > 1 ? currentChapter - 1 : 9);
  });

  document.getElementById("btnNext").addEventListener("click", () => {
    App.StorytellingModule.stopAutoPlay();
    loadChapter(currentChapter < 9 ? currentChapter + 1 : 1);
  });

  document.getElementById("btnAutoPlay").addEventListener("click", () => {
    App.StorytellingModule.toggleAutoPlay(() => {
      loadChapter(currentChapter < 9 ? currentChapter + 1 : 1);
    });
  });

  document.getElementById("btnReloadData").addEventListener("click", () => {
    bootstrap();
  });

  document.getElementById("btnExportSvg").addEventListener("click", () => {
    const svg = els.d3Stage.querySelector("svg");
    if (!svg) return;
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sentir_la_calle_bloque_${currentChapter}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  });

  bootstrap();
});
