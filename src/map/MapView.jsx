import { useEffect, useRef } from "preact/hooks"
import { effect } from "@preact/signals"
import Map from "ol/Map"
import View from "ol/View"
import { fromLonLat } from "ol/proj"

import { selectedItem, selectedAsset, logScale } from "../signals/store"
import { createBaseLayer } from "./baseLayer"
import { createFootprintLayer } from "./footprintLayer"
import { zoomToBBox } from "./zoomToBBox"
import { drawGeometry } from "./drawGeometry"
import { updateRaster } from "./rasterLayer"
import { getRenderConfig } from "./renderConfig"
import { resolveAssetHref } from "../api/resolveAssetHref"

export function MapView() {

  const containerRef = useRef(null)

  useEffect(() => {

    const { layer: footprintLayer, source: footprintSource } = createFootprintLayer()

    const map = new Map({
      target: containerRef.current,
      layers: [createBaseLayer(), footprintLayer],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2
      })
    })

    let rasterLayer  = null
    let currentItemId = null

    // React to signal changes
    const dispose = effect(() => {
      const asset = selectedAsset.value
      const item  = selectedItem.value

      if (!asset || !item) return

      if (item.id !== currentItemId) {
        zoomToBBox(map, item.bbox)
        drawGeometry(footprintSource, item.geometry)
        currentItemId = item.id
      }

      const url    = resolveAssetHref(asset)
      const render = getRenderConfig(item, asset.variable, logScale.value)
      rasterLayer  = updateRaster(map, url, rasterLayer, render)
    })

    return () => {
      dispose()
      map.setTarget(null)
    }

  }, [])

  return <div ref={containerRef} id="map" />
}
