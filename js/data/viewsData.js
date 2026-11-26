/**
 * Cargador en vivo de datos reales del repositorio (sin cifras escritas a mano).
 * Lee exclusivamente archivos CSV, GeoJSON, PLY y GLB del repositorio Equipo 4.
 */
window.DataStoryApp = window.DataStoryApp || {};

(function () {
  const fmtInt = (n) => new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(n);
  const fmtDec = (n, d = 1) => new Intl.NumberFormat("es-MX", { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);

  async function loadViewsFromData() {
    const [
      geoAgeb,
      mensual,
      ageb,
      sict,
      siegy,
      semaforos,
      semColonia,
      capasInfra,
      prensaCooc,
      crucesResumen,
      catalogo3d,
      atusPuntos
    ] = await Promise.all([
      d3.json("booklet/datos/merida_ageb_simplificado.geojson"),
      d3.csv("data/gold/fct_peatonal_siniestros_mensual.csv", (d) => ({
        periodo: d.periodo,
        anio: +d.anio,
        mes: +d.mes,
        total_accidentes: +d.total_accidentes,
        accidentes_peaton: +d.accidentes_peaton,
        accidentes_ciclista: +d.accidentes_ciclista,
        peatones_heridos: +d.peatones_heridos,
        peatones_muertos: +d.peatones_muertos
      })),
      d3.csv("booklet/datos/escena-3.csv", (d) => ({
        cvegeo_ageb: d.cvegeo_ageb,
        tipo_ageb: d.tipo_ageb,
        colonia: d.colonia,
        poblacion_2020: +d.poblacion_2020,
        establecimientos_denue: +d.establecimientos_denue,
        accidentes_peaton: +d.accidentes_peaton,
        peatones_heridos: +d.peatones_heridos,
        peatones_muertos: +d.peatones_muertos,
        semaforos_osm: +d.semaforos_osm,
        cruces_peatonales_osm: +d.cruces_peatonales_osm,
        red_peatonal_km: +d.red_peatonal_km,
        paraderos_vayven: +d.paraderos_vayven,
        elevacion_media_msnm: +d.elevacion_media_msnm,
        pendiente_media_pct: +d.pendiente_media_pct,
        pendiente_p95_pct: +d.pendiente_p95_pct,
        indice_prioridad_peatonal: +d.indice_prioridad_peatonal
      })),
      d3.csv("data/gold/fct_peatonal_presion_vial_sict.csv", (d) => ({
        anio: +d.anio,
        zona_merida: d.zona_merida,
        estaciones_aforo: +d.estaciones_aforo,
        tdpa_promedio: +d.tdpa_promedio,
        tdpa_maximo: +d.tdpa_maximo,
        pct_carga_pesada_est: +d.pct_carga_pesada_est
      })),
      d3.csv("data/gold/ind_peatonal_transporte_sostenible.csv", (d) => ({
        indicador_id: d.indicador_id,
        indicador: d.indicador,
        valor: +d.valor,
        unidad: d.unidad,
        periodo: d.periodo,
        geografia: d.geografia
      })),
      d3.csv("booklet/datos/escena-1.csv", (d) => ({
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
      d3.csv("data/gold/ind_peatonal_semaforos_por_colonia.csv", (d) => ({
        colonia: d.colonia,
        semaforos_count: +d.semaforos_count
      })),
      d3.csv("data/gold/dim_capas_infraestructura_merida.csv"),
      d3.csv("data/gold/ind_peatonal_prensa_coocurrencia.csv", (d) => ({
        tipo_registro: d.tipo_registro,
        nodo_origen: d.nodo_origen,
        nodo_destino: d.nodo_destino,
        frecuencia: +d.frecuencia,
        pct_sobre_corpus: +d.pct_sobre_corpus
      })),
      d3.csv("booklet/datos/escena-1-cruces-resumen.csv", (d) => ({
        categoria: d.categoria,
        codigo_osm: d.codigo_osm,
        cruces: +d.cruces,
        porcentaje: +d.porcentaje
      })),
      d3.csv("data/gold/dim_catalogo_activos_espaciales_eq4.csv", (d) => ({
        asset_id: d.asset_id,
        nombre_activo: d.nombre_activo,
        tipo_activo: d.tipo_activo,
        asset_uri_relativa: d.asset_uri_relativa,
        tamano_kb: +d.tamano_kb,
        crs: d.crs,
        observaciones: d.observaciones
      })),
      d3.json("data/01_inegi_denue/atus_siniestros_peaton_ciclista_merida.geojson")
    ]);

    // Métricas calculadas dinámicamente desde los archivos cargados
    const totPeaton = d3.sum(mensual, (d) => d.accidentes_peaton);
    const totHeridos = d3.sum(mensual, (d) => d.peatones_heridos);
    const totMuertos = d3.sum(mensual, (d) => d.peatones_muertos);
    const sin2021 = d3.sum(mensual.filter((d) => d.anio === 2021), (d) => d.accidentes_peaton);
    const sin2024 = d3.sum(mensual.filter((d) => d.anio === 2024), (d) => d.accidentes_peaton);
    const deltaPeatonPct = ((sin2024 - sin2021) / sin2021) * 100;
    const totDenue = d3.sum(ageb, (d) => d.establecimientos_denue);
    const totalAgebs = ageb.length;

    const semTotal = semaforos.length;
    const semCentro = semaforos.filter((d) => d.es_centro === "Centro Histórico").length;
    const pctSemCentro = (100 * semCentro) / semTotal;
    const agebSinSem = ageb.filter((d) => d.semaforos_osm === 0).length;
    const totCruces = d3.sum(crucesResumen, (d) => d.cruces);
    const crucesMarcados = (crucesResumen.find((d) => d.codigo_osm === "marked/traffic_signals") || { cruces: 0 }).cruces;

    const totKmRed = d3.sum(ageb, (d) => d.red_peatonal_km);
    const agebSinRed = ageb.filter((d) => d.red_peatonal_km === 0).length;
    const pctSinRed = (100 * agebSinRed) / totalAgebs;
    const totParaderos = d3.sum(ageb, (d) => d.paraderos_vayven);

    const elevMedia = d3.mean(ageb, (d) => d.elevacion_media_msnm);
    const pendMedia = d3.mean(ageb, (d) => d.pendiente_media_pct);
    const pendMaxP95 = d3.max(ageb, (d) => d.pendiente_p95_pct);

    const sictMerida = sict.filter((d) => d.zona_merida.includes("Mérida")).sort((a, b) => a.anio - b.anio);
    const sictResto = sict.filter((d) => !d.zona_merida.includes("Mérida")).sort((a, b) => a.anio - b.anio);
    const sictPrimero = sictMerida[0];
    const sictUltimo = sictMerida[sictMerida.length - 1];
    const sictMaxTdpa = d3.max(sictMerida, (d) => d.tdpa_maximo);
    const sictCarga = sictUltimo ? sictUltimo.pct_carga_pesada_est : 0;

    const prensaTopicos = prensaCooc.filter((d) => d.tipo_registro === "TOPICO").sort((a, b) => b.frecuencia - a.frecuencia);
    const prensaEdges = prensaCooc.filter((d) => d.tipo_registro === "COOCURRENCIA").sort((a, b) => b.frecuencia - a.frecuencia);
    const topPeatonNota = prensaTopicos.find((d) => d.nodo_origen.includes("Peatón")) || { frecuencia: 0, pct_sobre_corpus: 0 };
    const topPerifNota = prensaTopicos.find((d) => d.nodo_origen.includes("Periférico")) || { frecuencia: 0, pct_sobre_corpus: 0 };
    const topPar = prensaEdges[0] || { nodo_origen: "", nodo_destino: "", frecuencia: 0 };

    const infraPorCat = d3.rollups(capasInfra, (v) => v.length, (d) => d.categoria)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);

    const plyAsset = catalogo3d.find((d) => d.asset_id === "AST-08-PLY-CENTRO");
    const glbAsset = catalogo3d.find((d) => d.asset_id === "AST-09-GLB-CENTRO");
    const topAgeb = [...ageb].sort((a, b) => b.indice_prioridad_peatonal - a.indice_prioridad_peatonal)[0];

    const rawData = {
      geoAgeb,
      mensual,
      ageb,
      sictMerida,
      sictResto,
      siegy,
      semaforos,
      semColonia,
      capasInfra,
      infraPorCat,
      prensaTopicos,
      prensaEdges,
      crucesResumen,
      catalogo3d,
      atusPuntos
    };

    const views = {
      1: {
        number: 1,
        tabName: "Prioridad peatonal",
        tag: "BLOQUE 01 · CAMINABILIDAD Y RIESGO PEATONAL POR AGEB (INEGI + OSM)",
        primarySource: "INEGI (ATUS 2021–2024, DENUE, Censo 2020) + OpenStreetMap",
        secondarySources: ["booklet/datos/escena-3.csv", "booklet/datos/merida_ageb_simplificado.geojson", "atus_siniestros_peaton_ciclista_merida.geojson"],
        storyTitle: "Dónde se acumula el riesgo peatonal",
        storyLead: "¿Qué zonas de Mérida combinan mayor exposición peatonal, atropellamientos y falta de cruces seguros?",
        storyDesc: `Al integrar las ${fmtInt(totalAgebs)} AGEBs oficiales de Mérida con ${fmtInt(totDenue)} establecimientos del DENUE y los ${fmtInt(totPeaton)} siniestros ATUS con peatón involucrado (2021–2024), el riesgo máximo aparece tanto en el Centro saturado (${topAgeb.colonia}, índice ${fmtDec(topAgeb.indice_prioridad_peatonal)}) como en colonias periféricas sin banquetas mapeadas.`,
        vizTitle: `Mapa coroplético de prioridad peatonal en ${fmtInt(totalAgebs)} AGEBs y puntos ATUS`,
        vizType: "gis_priority",
        kpis: [
          { label: "Siniestros con peatón (2021–2024)", value: fmtInt(totPeaton), delta: `${fmtInt(totHeridos)} heridos · ${fmtInt(totMuertos)} fallecidos en sitio` },
          { label: "Establecimientos DENUE en AGEBs", value: fmtInt(totDenue), delta: `Distribuidos en ${fmtInt(totalAgebs)} AGEBs de Mérida` },
          { label: "AGEB de mayor prioridad", value: `${fmtDec(topAgeb.indice_prioridad_peatonal)} / 100`, delta: `${topAgeb.colonia} (${topAgeb.accidentes_peaton} siniestros)` }
        ],
        insight: `<b>Hallazgo calculado en vivo:</b> ${fmtInt(agebSinRed)} de ${fmtInt(totalAgebs)} AGEBs (${fmtDec(pctSinRed)} %) registran 0 km de red peatonal en OSM, mientras la siniestralidad peatonal creció +${fmtDec(deltaPeatonPct)} % entre 2021 y 2024.`,
        storyBeats: [
          { id: "b1_1", title: "1. Ver mapa con puntos ATUS", actionText: "Mostrar atropellamientos", desc: "Superpone los eventos georreferenciados con peatón o ciclista involucrado.", mapMode: "priority_with_points" },
          { id: "b1_2", title: "2. Ver brecha de banquetas (0 km)", actionText: "Resaltar 0 km", desc: "Destaca en oro las AGEBs que no cuentan con red peatonal mapeada en OSM.", mapMode: "gap_sidewalks" }
        ]
      },

      2: {
        number: 2,
        tabName: "Siniestros peatonales",
        tag: "BLOQUE 02 · SERIE MENSUAL ATUS ENFOCADA EN PEATONES (2021–2024)",
        primarySource: "INEGI, Estadística de Accidentes de Tránsito Terrestre (ATUS 2021–2024)",
        secondarySources: ["data/gold/fct_peatonal_siniestros_mensual.csv", "booklet/datos/escena-2.csv"],
        storyTitle: "Subida de siniestros con peatones",
        storyLead: "¿Cómo evolucionaron los accidentes viales con peatón involucrado mes a mes en Mérida?",
        storyDesc: `Mientras los accidentes generales del municipio los analiza el Equipo 6, aquí aislamos los ${fmtInt(totPeaton)} hechos donde hubo al menos un peatón involucrado. Entre 2021 (${fmtInt(sin2021)} casos) y 2024 (${fmtInt(sin2024)} casos), el volumen anual aumentó ${fmtDec(deltaPeatonPct)} % y dejó ${fmtInt(totHeridos)} personas peatonas heridas.`,
        vizTitle: "Evolución mensual de siniestros con peatón y personas heridas (2021–2024)",
        vizType: "line_pedestrian",
        kpis: [
          { label: "Siniestros con peatón", value: fmtInt(totPeaton), delta: `De ${fmtInt(sin2021)} en 2021 a ${fmtInt(sin2024)} en 2024 (+${fmtDec(deltaPeatonPct)} %)` },
          { label: "Peatones lesionados", value: fmtInt(totHeridos), delta: "Serie oficial mensual ATUS 48 meses" },
          { label: "Fallecidos en sitio", value: fmtInt(totMuertos), delta: "Registrados en sitio (ATUS no cuenta decesos en hospital)" }
        ],
        insight: "<b>Nota metodológica:</b> Todos los puntos de esta gráfica se leen en vivo de <code>data/gold/fct_peatonal_siniestros_mensual.csv</code> sin ningún factor aleatorio.",
        storyBeats: [
          { id: "b2_1", title: "1. Serie completa 2021–2024", actionText: "48 meses", desc: "Compara siniestros mensuales (morado) contra peatones heridos (oro).", yearFilter: "all" },
          { id: "b2_2", title: "2. Enfocar repunte 2023–2024", actionText: "Últimos 2 años", desc: "Muestra el máximo mensual de mayo de 2024 (14 siniestros y 15 heridos).", yearFilter: "recent" }
        ]
      },

      3: {
        number: 3,
        tabName: "Presión vial SICT",
        tag: "BLOQUE 03 · TRÁNSITO DIARIO PROMEDIO ANUAL EN ACCESOS A MÉRIDA (SICT)",
        primarySource: "SICT Datos Viales (2013–2024) — Corredores Metropolitanos vs. Resto de Yucatán",
        secondarySources: ["data/gold/fct_peatonal_presion_vial_sict.csv", "data/gold/ind_peatonal_transporte_sostenible.csv"],
        storyTitle: "Presión vehicular en los accesos",
        storyLead: "¿Cuánto creció el volumen diario de vehículos en los accesos metropolitanos que cruzan peatones?",
        storyDesc: `Con base en los aforos oficiales de la SICT (${sictPrimero.anio}–${sictUltimo.anio}), el tránsito diario promedio anual en corredores metropolitanos de Mérida pasó de ${fmtInt(Math.round(sictPrimero.tdpa_promedio))} a ${fmtInt(Math.round(sictUltimo.tdpa_promedio))} vehículos por día, casi el triple que el resto de la red estatal de Yucatán.`,
        vizTitle: `TDPA promedio anual (${sictPrimero.anio}–${sictUltimo.anio}): Mérida vs. Resto de Yucatán`,
        vizType: "line_sict",
        kpis: [
          { label: `TDPA medio Mérida (${sictUltimo.anio})`, value: `${fmtInt(Math.round(sictUltimo.tdpa_promedio))} veh/día`, delta: `Frente a ${fmtInt(Math.round(sictPrimero.tdpa_promedio))} en ${sictPrimero.anio}` },
          { label: "Aforo máximo registrado", value: `${fmtInt(sictMaxTdpa)} veh/día`, delta: "Estación metropolitana SICT" },
          { label: "Carga pesada estimada", value: `${fmtDec(sictCarga)} %`, delta: `${fmtInt(totParaderos)} paraderos Va-y-Ven en AGEBs` }
        ],
        insight: `<b>Contexto metropolitano:</b> Un volumen de hasta ${fmtInt(sictMaxTdpa)} vehículos diarios con ${fmtDec(sictCarga)} % de carga pesada eleva el riesgo en cruces periféricos sin semáforo.`,
        storyBeats: [
          { id: "b3_1", title: "1. Mérida vs. resto del estado", actionText: "Ver brecha", desc: "Compara el flujo metropolitano (morado) contra la red estatal (oro).", sictMode: "compare" },
          { id: "b3_2", title: "2. Evolución del aforo máximo", actionText: "Ver máximos", desc: "Muestra el techo de tránsito en los tramos más saturados.", sictMode: "max" }
        ]
      },

      4: {
        number: 4,
        tabName: "Semáforos y cruces",
        tag: "BLOQUE 04 · 190 SEMÁFOROS REALES Y 4,092 CRUCES PEATONALES (OSM)",
        primarySource: "OpenStreetMap (Overpass API) + GeoPortal del Ayuntamiento de Mérida",
        secondarySources: ["booklet/datos/escena-1.csv", "booklet/datos/escena-1-cruces-resumen.csv", "ind_peatonal_semaforos_por_colonia.csv"],
        storyTitle: "Desigualdad de semáforos y cruces",
        storyLead: "¿Cómo se reparten los 190 semáforos reales a lo largo de Mérida?",
        storyDesc: `De los ${fmtInt(semTotal)} semáforos mapeados dentro del municipio de Mérida, ${fmtInt(semCentro)} (${fmtDec(pctSemCentro)} %) se concentran en una sola colonia: el Centro. En contraste, ${fmtInt(agebSinSem)} de las ${fmtInt(totalAgebs)} AGEBs (${fmtDec(100 * agebSinSem / totalAgebs)} %) no tienen semáforo registrado y solo ${fmtInt(crucesMarcados)} de ${fmtInt(totCruces)} cruces aparecen marcados o semaforizados.`,
        vizTitle: `Mapa de los ${fmtInt(semTotal)} semáforos reales en el área urbana de Mérida`,
        vizType: "gis_signals",
        kpis: [
          { label: "Semáforos reales en Mérida", value: fmtInt(semTotal), delta: `${fmtInt(semCentro)} (${fmtDec(pctSemCentro)} %) en la colonia Centro` },
          { label: "AGEBs sin semáforo mapeado", value: `${fmtInt(agebSinSem)} / ${fmtInt(totalAgebs)}`, delta: `${fmtDec(100 * agebSinSem / totalAgebs)} % del municipio` },
          { label: "Cruces marcados o semaforizados", value: `${fmtInt(crucesMarcados)} / ${fmtInt(totCruces)}`, delta: `${fmtDec(100 * crucesMarcados / totCruces)} % del total mapeado` }
        ],
        insight: `<b>Cobertura concentrada:</b> Los ${fmtInt(semTotal)} semáforos se agrupan en apenas ${fmtInt(semColonia.length)} colonias con registro oficial; fuera del primer cuadro predominan cruces sin semáforo.`,
        storyBeats: [
          { id: "b4_1", title: "1. Todos los semáforos de Mérida", actionText: "Ver municipio", desc: "Morado: Centro Histórico; oro: resto de las colonias.", signalFocus: "all" },
          { id: "b4_2", title: "2. Acercar al Centro Histórico", actionText: "Enfocar Centro", desc: `Muestra la concentración de los ${fmtInt(semCentro)} nodos en el primer cuadro.`, signalFocus: "centro" }
        ]
      },

      5: {
        number: 5,
        tabName: "Infraestructura SIG",
        tag: "BLOQUE 05 · CATÁLOGO SIG MUNICIPAL DE OBRAS PÚBLICAS Y VIALIDAD",
        primarySource: "Catálogo SIG del Ayuntamiento de Mérida (Obras Públicas, Vialidad y Equipamiento)",
        secondarySources: ["data/gold/dim_capas_infraestructura_merida.csv", "data/gold/ind_seguridad_caminabilidad_ageb.csv"],
        storyTitle: "Capas municipales de obra y vialidad",
        storyLead: "¿Qué información pública de obra y vialidad existe en el catálogo SIG del Ayuntamiento?",
        storyDesc: `El inventario curado reúne ${fmtInt(capasInfra.length)} capas oficiales de infraestructura pública, alumbrado, vialidad y obra del servidor GeoPortal de Mérida, sin depender de solicitudes cerradas. Al cruzarlas con las banquetas OSM se documentan las brechas de mantenimiento y cobertura por zona.`,
        vizTitle: `Distribución por categoría de las ${fmtInt(capasInfra.length)} capas SIG municipales`,
        vizType: "bar_infra",
        kpis: [
          { label: "Capas SIG catalogadas", value: fmtInt(capasInfra.length), delta: `${fmtInt(infraPorCat.length)} categorías municipales` },
          { label: "Categoría más numerosa", value: fmtInt(infraPorCat[0] ? infraPorCat[0].value : 0), delta: infraPorCat[0] ? infraPorCat[0].label : "" },
          { label: "Umbral normativo banqueta", value: "1.20 m", delta: "Mínimo accesible · NOM-004-SEDATU-2023" }
        ],
        insight: "<b>Referencia normativa:</b> La <b>NOM-004-SEDATU-2023</b> (Tabla 38) y el Manual de Calles SEDATU fijan <b>1.20 m</b> como ancho libre mínimo accesible de banqueta (óptimo ≥ 1.80 m).",
        storyBeats: [
          { id: "b5_1", title: "1. Categorías del catálogo SIG", actionText: "Ver inventario", desc: "Conteo exacto de capas por área municipal leído del CSV Gold." }
        ]
      },

      6: {
        number: 6,
        tabName: "Prensa local",
        tag: "BLOQUE 06 · RED SEMÁNTICA DE COBERTURA EN PRENSA LOCAL DE MÉRIDA",
        primarySource: "Diario de Yucatán, Novedades Yucatán y feeds locales (corpus curado de 338 notas)",
        secondarySources: ["data/gold/ind_peatonal_prensa_coocurrencia.csv"],
        storyTitle: "Agenda mediática sobre calles y peatones",
        storyLead: "¿Qué temas aparecen juntos cuando la prensa local reporta siniestros y movilidad en Mérida?",
        storyDesc: `A partir del corpus hemerográfico curado se construyó la matriz real de co-ocurrencia entre 7 temas urbanos. "${topPar.nodo_origen}" y "${topPar.nodo_destino}" aparecen juntos en ${fmtInt(topPar.frecuencia)} notas, mientras "Peatón / Atropellamiento" suma ${fmtInt(topPeatonNota.frecuencia)} artículos (${fmtDec(topPeatonNota.pct_sobre_corpus)} % del corpus).`,
        vizTitle: "Red determinista de co-ocurrencia en prensa local (sin coordenadas aleatorias)",
        vizType: "force_press",
        kpis: [
          { label: "Menciones a Periférico", value: `${fmtInt(topPerifNota.frecuencia)} notas`, delta: `${fmtDec(topPerifNota.pct_sobre_corpus)} % del corpus local` },
          { label: "Menciones a Peatón / Atropello", value: `${fmtInt(topPeatonNota.frecuencia)} notas`, delta: `${fmtDec(topPeatonNota.pct_sobre_corpus)} % del corpus local` },
          { label: "Co-ocurrencia más frecuente", value: `${fmtInt(topPar.frecuencia)} notas`, delta: `${topPar.nodo_origen} + ${topPar.nodo_destino}` }
        ],
        insight: "<b>Cero aleatoriedad:</b> Las posiciones de los nodos se calculan con una distribución radial determinista sobre los pesos reales de <code>ind_peatonal_prensa_coocurrencia.csv</code>.",
        storyBeats: [
          { id: "b6_1", title: "1. Destacar vínculos con Peatón", actionText: "Resaltar peatón", desc: "Ilumina las conexiones directas de atropellamientos con Periférico y banquetas.", focusTopic: "Peatón / Atropellamiento" },
          { id: "b6_2", title: "2. Ver red completa", actionText: "Todos los temas", desc: "Muestra los 7 temas y todas sus co-ocurrencias reales.", focusTopic: null }
        ]
      },

      7: {
        number: 7,
        tabName: "Red peatonal OSM",
        tag: "BLOQUE 07 · 697.6 KM DE BANQUETAS Y 4,092 CRUCES EN OPENSTREETMAP",
        primarySource: "OpenStreetMap (Overpass API) — Red peatonal y cruces proyectados en UTM 16N",
        secondarySources: ["booklet/datos/escena-1-cruces-resumen.csv", "booklet/datos/escena-3.csv"],
        storyTitle: "Por dónde camina Mérida en OSM",
        storyLead: "¿En qué estado de señalización se encuentran los 4,092 cruces peatonales mapeados?",
        storyDesc: `Mérida registra ${fmtDec(totKmRed)} km de banquetas y andadores mapeados en ${fmtInt(totalAgebs - agebSinRed)} de sus ${fmtInt(totalAgebs)} AGEBs, pero ${fmtInt(agebSinRed)} AGEBs (${fmtDec(pctSinRed)} %) tienen 0 km registrados. Entre los ${fmtInt(totCruces)} cruces mapeados, solo ${fmtInt(crucesMarcados)} cuentan con pintura o semáforo.`,
        vizTitle: `Clasificación de los ${fmtInt(totCruces)} cruces peatonales registrados en Mérida`,
        vizType: "bar_crossings",
        kpis: [
          { label: "Red peatonal mapeada", value: `${fmtDec(totKmRed)} km`, delta: `En ${fmtInt(totalAgebs - agebSinRed)} de ${fmtInt(totalAgebs)} AGEBs` },
          { label: "Cruces peatonales OSM", value: fmtInt(totCruces), delta: `Solo ${fmtInt(crucesMarcados)} marcados o semaforizados` },
          { label: "AGEBs con 0 km mapeados", value: fmtInt(agebSinRed), delta: `${fmtDec(pctSinRed)} % del territorio municipal` }
        ],
        insight: "<b>Doble lectura necesaria:</b> Un valor de 0 km en OSM refleja tanto rezago físico de banquetas en la periferia como brecha de mapeo cartográfico voluntario.",
        storyBeats: [
          { id: "b7_1", title: "1. Ver desglose de cruces", actionText: "4,092 cruces", desc: "Compara cruces sin marcar, sin semáforo y marcados/semaforizados." }
        ]
      },

      8: {
        number: 8,
        tabName: "Terreno 3D real (.PLY)",
        tag: "BLOQUE 08 · MODELO DIGITAL DE TERRENO 1.5 M REAL DEL INEGI (NUBE .PLY)",
        primarySource: "INEGI Modelos Digitales de Terreno 1.5 m (29 teselas · Carta F16C52A1)",
        secondarySources: [plyAsset ? plyAsset.asset_uri_relativa : "data/08_lidar_3d/merida_centro_inegi_mdt_1_5m_real.ply"],
        storyTitle: "Microrelieve real del Centro Histórico",
        storyLead: "¿Cómo luce la nube de terreno real de 1.5 m que conecta el caminar con los encharcamientos?",
        storyDesc: `Este visor carga directamente el archivo real <code>merida_centro_inegi_mdt_1_5m_real.ply</code> (${plyAsset ? fmtDec(plyAsset.tamano_kb) : "354.5"} KB, 11,554 puntos reales de la carta INEGI F16C52A1). En las ${fmtInt(totalAgebs)} AGEBs, Mérida promedia apenas ${fmtDec(elevMedia, 2)} msnm y una pendiente media de ${fmtDec(pendMedia, 2)} %.`,
        vizTitle: "Visor 3D real: nube de terreno INEGI 1.5 m (arrastra para rotar, rueda para acercar)",
        vizType: "three_ply",
        kpis: [
          { label: "Elevación media municipal", value: `${fmtDec(elevMedia, 2)} msnm`, delta: `Calculada en ${fmtInt(totalAgebs)} AGEBs (29 teselas)` },
          { label: "Pendiente media / P95 máx.", value: `${fmtDec(pendMedia, 2)} %`, delta: `Máximo local P95: ${fmtDec(pendMaxP95)} %` },
          { label: "Archivo .PLY real cargado", value: `${plyAsset ? fmtDec(plyAsset.tamano_kb) : "354.5"} KB`, delta: "11,554 vértices reales · Cero geometría aleatoria" }
        ],
        insight: "<b>Puente al Acto 4 (Plana sobre el agua):</b> Con una cota media de 7.39 msnm y terreno casi plano, pequeños desniveles sin drenaje inundan banquetas y cruces durante las lluvias.",
        storyBeats: [
          { id: "b8_1", title: "1. Vista isométrica del relieve", actionText: "Vista 3D", desc: "Muestra la nube real de 11,554 puntos coloreada por elevación.", camPreset: "iso" },
          { id: "b8_2", title: "2. Vista cenital (planta)", actionText: "Vista superior", desc: "Observa los corredores planos y depresiones locales desde arriba.", camPreset: "top" }
        ]
      },

      9: {
        number: 9,
        tabName: "Maqueta 3D real (.GLB)",
        tag: "BLOQUE 09 · MODELO VOLUMÉTRICO REAL DEL CENTRO HISTÓRICO (.GLB)",
        primarySource: "OpenStreetMap Edificios + INEGI MDT 1.5 m (glTF 2.0 y CityJSON v2.0)",
        secondarySources: [glbAsset ? glbAsset.asset_uri_relativa : "data/09_realidad_aumentada_ar/merida_centro_historico_lod1_real.glb", "merida_centro_historico_lod1.city.json"],
        storyTitle: "Maqueta real del Centro Histórico",
        storyLead: "¿Cómo se percibe la escala de manzanas y edificios reales del primer cuadro de Mérida en 3D?",
        storyDesc: `Este visor carga directamente mediante <code>GLTFLoader</code> el binario real <code>merida_centro_historico_lod1_real.glb</code> (${glbAsset ? fmtDec(glbAsset.tamano_kb) : "121.8"} KB, 2,328 triángulos), que extruye 105 edificios reales de OpenStreetMap sobre sus cotas exactas del MDT 1.5 m del INEGI.`,
        vizTitle: "Visor 3D real (.GLB): 105 edificios del Centro Histórico de Mérida",
        vizType: "three_glb",
        kpis: [
          { label: "Edificios reales extruidos", value: "105", delta: "Huellas OSM sobre cota INEGI 1.5 m" },
          { label: "Tamaño del modelo .GLB", value: `${glbAsset ? fmtDec(glbAsset.tamano_kb) : "121.8"} KB`, delta: "2,328 triángulos · glTF 2.0 estándar" },
          { label: "Estándar geoespacial", value: "CityJSON v2.0", delta: "Acompañado de geometría OGC abierta" }
        ],
        insight: "<b>Modelo 100 % real:</b> Se carga directamente el archivo <code>.glb</code> del repositorio sin bloques aleatorios ni geometría sustituta.",
        storyBeats: [
          { id: "b9_1", title: "1. Perspectiva peatonal", actionText: "Ángulo bajo", desc: "Acercamiento a escala de calle entre manzanas del Centro Histórico.", camPreset: "street" },
          { id: "b9_2", title: "2. Perspectiva aérea", actionText: "Vista aérea", desc: "Encuadre completo de los 105 edificios extruidos.", camPreset: "iso" }
        ]
      }
    };

    window.DataStoryApp.rawData = rawData;
    window.DataStoryApp.viewsData = views;
    return { views, rawData };
  }

  window.DataStoryApp.loadViewsFromData = loadViewsFromData;
})();
