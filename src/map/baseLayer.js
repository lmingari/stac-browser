import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import XYZ from "ol/source/XYZ"

const BASEMAPS = {
  osm: {
    source: () => new OSM(),
  },
  "carto-dark": {
    source: () => new XYZ({
      url: "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
      attributions: "© OpenStreetMap contributors © CARTO"
    })
  },
  "carto-light": {
    source: () => new XYZ({
      url: "https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      attributions: "© OpenStreetMap contributors © CARTO"
    })
  },
  "esri-satellite": {
    source: () => new XYZ({
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attributions: "© Esri"
    })
  },
  "stamen-toner": {
    source: () => new XYZ({
      url: "https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}@2x.png",
      attributions: "© Stamen Design © OpenStreetMap contributors"
    })
  },
}

export function createBaseLayer(name = "carto-light") {

  if (!BASEMAPS[name]) {
    console.warn(`Unknown basemap "${name}", falling back to carto-light`)
  }

  const config = BASEMAPS[name] ?? BASEMAPS["carto-light"]

  return new TileLayer({ source: config.source() })

}

export function listBasemaps() {
  return Object.keys(BASEMAPS)
}
