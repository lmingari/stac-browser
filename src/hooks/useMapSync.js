import { effect } from "@preact/signals"
import { stacUrl, selectedItem, selectedAsset, logScale } from "../signals/store"
import { zoomToBBox }      from "../map/zoomToBBox"
import { drawGeometry }    from "../map/drawGeometry"
import { updateRaster }    from "../map/rasterLayer"
import { getRenderConfig } from "../map/renderConfig"
import { resolveAssetHref } from "../api/resolveUrl"

/**
 * Binds the OpenLayers map instance to the global signals.
 * Call once after the map is created; returns a dispose function.
 *
 * @param {import("ol/Map").default} map
 * @param {import("ol/source/Vector").default} footprintSource
 * @returns {function} dispose — call on cleanup to unsubscribe
 */
export function useMapSync(map, footprintSource) {
  let rasterLayer   = null
  let currentItemId = null

  const dispose = effect(() => {
    const asset = selectedAsset.value
    const item  = selectedItem.value

    if (!asset || !item) return

    if (item.id !== currentItemId) {
      zoomToBBox(map, item.bbox)
      drawGeometry(footprintSource, item.geometry)
      currentItemId = item.id
    }

    const url    = resolveAssetHref(stacUrl.value, asset)
    const render = getRenderConfig(item, asset.variable, logScale.value)
    rasterLayer  = updateRaster(map, url, rasterLayer, render)
  })

  return dispose
}
