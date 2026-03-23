import { effect } from "@preact/signals"
import { stacUrl, selectedItem, selectedAsset, logScale, rasterVisible } from "../signals/store"
import { zoomToBBox, bboxToExtent, drawGeometry, updateRaster, getRenderConfig } from "../map"
import { resolveAssetHref } from "../api"

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
  let currentExtent = null

  const dispose = effect(() => {
    const asset  = selectedAsset.value
    const item   = selectedItem.value
    const log    = logScale.value
    const base   = stacUrl.value

    if (!asset || !item) return

    if (item.id !== currentItemId) {
      currentExtent = bboxToExtent(item.bbox)
      zoomToBBox(map, currentExtent)
      drawGeometry(footprintSource, item.geometry)
      currentItemId = item.id
    }

    const url    = resolveAssetHref(base, asset)
    const render = { ...getRenderConfig(item, asset.variable), log }
    rasterLayer = updateRaster(map, url, rasterLayer, render, currentExtent)
  })

  const disposeVisibility = effect(() => {
      const visible = rasterVisible.value
      if (rasterLayer) rasterLayer.setVisible(visible)
  })

   return () => {
     dispose()
     disposeVisibility()
   }
}
