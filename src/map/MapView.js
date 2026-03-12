import Map from "ol/Map"
import View from "ol/View"
import { fromLonLat } from "ol/proj"

import { state } from "../state/store"

import { createBaseLayer } from "./baseLayer"
import { createFootprintLayer } from "./footprintLayer"
import { zoomToBBox } from "./zoomToBBox"
import { drawGeometry } from "./drawGeometry"
import { updateRaster } from "./rasterLayer"
import { getRenderConfig } from "./renderConfig"

import { resolveAssetHref } from "../api/resolveAssetHref"

export function MapView(container) {

  if (!container) return

  let rasterLayer = null
  let currentItemId = null

  const { layer: footprintLayer, source: footprintSource } =
    createFootprintLayer()

  const map = new Map({
    target: container,
    layers: [
      createBaseLayer(),
      footprintLayer
    ],
    view: new View({
      center: fromLonLat([0, 0]),
      zoom: 2
    })
  })

  document.addEventListener("selectedItemChanged", update)
  document.addEventListener("selectedAssetChanged", update)

  function update() {

    const asset = state.selectedAsset
    const item = state.selectedItem

    if (!asset || !item) return

    if (item.id !== currentItemId) {

      zoomToBBox(map, item.bbox)
      drawGeometry(footprintSource, item.geometry)

      currentItemId = item.id

    }

    const url = resolveAssetHref(asset)

    const render = getRenderConfig(item, asset.variable)

    rasterLayer = updateRaster(map, url, rasterLayer, render)

  }

}
