import GeoTIFF from "ol/source/GeoTIFF"
import WebGLTileLayer from "ol/layer/WebGLTile"

let currentUrl = null

export function updateRaster(map, url, previousLayer) {

  if (!url) return previousLayer

  if (url === currentUrl) return previousLayer

  currentUrl = url

  const source = new GeoTIFF({
    normalize: false,
    sources: [
      { url: url, bands: [1] }
    ]
  })

  const layer = new WebGLTileLayer({
    source,
    style: {
      color: [
        "interpolate",
        ["linear"],
        ["band", 1],

        0,   [0, 0, 0, 0],
        0.1, [0, 0, 255, 1],
        1,   [0, 255, 255, 1],
        10,  [255, 255, 0, 1],
        50,  [255, 165, 0, 1],
        100, [255, 0, 0, 1]
      ]
    }
  })

  if (previousLayer) {
    map.removeLayer(previousLayer)
  }

  map.addLayer(layer)

  return layer
}
