import { useEffect, useRef } from "preact/hooks"
import Map from "ol/Map"
import View from "ol/View"
import { fromLonLat } from "ol/proj"

import { createBaseLayer }      from "./baseLayer"
import { createFootprintLayer } from "./footprintLayer"
import { useMapSync }           from "../hooks/useMapSync"

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

    const dispose = useMapSync(map, footprintSource)

    return () => {
      dispose()
      map.setTarget(null)
    }
  }, [])

  return <div ref={containerRef} id="map" />
}
