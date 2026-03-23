import GeoTIFF from "ol/source/GeoTIFF"
import WebGLTileLayer from "ol/layer/WebGLTile"

import { buildColorRamp } from "./colormap.js"

export function updateRaster(map, url, previousLayer, render, extent) {

  if (!url) return previousLayer

  const source = new GeoTIFF({
    normalize: render.rescale ? false : true,
    interpolate: true,
    sources: [{ url, bands: [1] }]
  })

  const layerOptions = { source, extent }

  if (render.rescale) {

    const [min, max] = render.rescale

    const ramp = buildColorRamp(render.colormap, min, max, 16, render.log)

    layerOptions.style = {
      color: [
        "case",

        ["<", ["band",1], min],
        [0,0,0,0],

        [
            "interpolate",
            ["linear"],
            ["band", 1],
            ...ramp
        ]
      ]
    }
  }

  const newLayer = new WebGLTileLayer(layerOptions)

  if (previousLayer) {
    map.removeLayer(previousLayer)
  }

  map.addLayer(newLayer)

  return newLayer
}
