-- ============================================================================
-- DATA MART 04: SENTIR LA CALLE (SEGURIDAD, ACCESIBILIDAD Y CONFORT PEATONAL)
-- Compatible con Supabase (PostgreSQL 15+ y extensión PostGIS)
-- Grano territorial estándar del grupo: cvegeo (AGEB 13 dígitos, EPSG:4326)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE SCHEMA IF NOT EXISTS dm04_sentir_la_calle;

CREATE TABLE IF NOT EXISTS dm04_sentir_la_calle.dim_ageb_merida (
    cvegeo VARCHAR(13) PRIMARY KEY,
    cve_ent VARCHAR(2) NOT NULL,
    cve_mun VARCHAR(3) NOT NULL,
    cve_loc VARCHAR(4) NOT NULL,
    cve_ageb VARCHAR(4) NOT NULL,
    tipo_ageb VARCHAR(10) NOT NULL,
    pob_total INTEGER NOT NULL DEFAULT 0,
    pob_masculina INTEGER NOT NULL DEFAULT 0,
    pob_femenina INTEGER NOT NULL DEFAULT 0,
    total_viviendas_habitadas INTEGER NOT NULL DEFAULT 0,
    area_km2 NUMERIC(10,4) NOT NULL,
    centroide_lat DOUBLE PRECISION,
    centroide_lon DOUBLE PRECISION,
    geom GEOMETRY(MultiPolygon, 4326)
);

CREATE INDEX IF NOT EXISTS idx_dm04_dim_ageb_geom
    ON dm04_sentir_la_calle.dim_ageb_merida USING GIST (geom);

CREATE TABLE IF NOT EXISTS dm04_sentir_la_calle.fact_caminabilidad_seguridad_ageb (
    cvegeo VARCHAR(13) PRIMARY KEY REFERENCES dm04_sentir_la_calle.dim_ageb_merida(cvegeo),
    establecimientos_denue INTEGER NOT NULL DEFAULT 0,
    comercios_alimentos_servicios INTEGER NOT NULL DEFAULT 0,
    accidentes_totales INTEGER NOT NULL DEFAULT 0,
    accidentes_peaton INTEGER NOT NULL DEFAULT 0,
    accidentes_ciclista INTEGER NOT NULL DEFAULT 0,
    peatones_heridos INTEGER NOT NULL DEFAULT 0,
    peatones_muertos INTEGER NOT NULL DEFAULT 0,
    paraderos_vayven INTEGER NOT NULL DEFAULT 0,
    semaforos_osm INTEGER NOT NULL DEFAULT 0,
    equipamiento_urbano_osm INTEGER NOT NULL DEFAULT 0,
    cruces_peatonales_osm INTEGER NOT NULL DEFAULT 0,
    cruces_con_guia_tactil INTEGER NOT NULL DEFAULT 0,
    longitud_red_peatonal_km NUMERIC(10,3) NOT NULL DEFAULT 0,
    elev_media_msnm NUMERIC(8,2),
    pendiente_media_pct NUMERIC(8,2),
    pendiente_p95_pct NUMERIC(8,2),
    tasa_siniestros_peaton_1k_hab NUMERIC(10,3),
    indice_prioridad_peatonal_0_100 NUMERIC(6,2) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS dm04_sentir_la_calle.fact_siniestros_serie_mensual (
    periodo VARCHAR(7) PRIMARY KEY,
    anio INTEGER NOT NULL,
    mes INTEGER NOT NULL,
    total_accidentes INTEGER NOT NULL,
    accidentes_peaton INTEGER NOT NULL,
    accidentes_ciclista INTEGER NOT NULL,
    peatones_heridos INTEGER NOT NULL,
    peatones_muertos INTEGER NOT NULL,
    total_heridos INTEGER NOT NULL,
    total_muertos INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS dm04_sentir_la_calle.spatial_asset_catalog (
    clave_activo VARCHAR(80) PRIMARY KEY,
    subtema VARCHAR(40) NOT NULL,
    ruta_archivo TEXT NOT NULL,
    formato VARCHAR(20) NOT NULL,
    tamano_kb NUMERIC(12,2) NOT NULL,
    n_registros INTEGER NOT NULL,
    granularidad VARCHAR(80) NOT NULL,
    cobertura_temporal VARCHAR(60) NOT NULL,
    crs VARCHAR(60) NOT NULL,
    unidad VARCHAR(80) NOT NULL,
    fuente_origen TEXT NOT NULL,
    url_origen TEXT NOT NULL,
    licencia VARCHAR(120) NOT NULL,
    responsable VARCHAR(80) NOT NULL,
    sha256 CHAR(64) NOT NULL,
    generado_utc TIMESTAMPTZ NOT NULL
);
