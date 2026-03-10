import { transformExtent } from "ol/proj"

export function zoomToBBox(map, bbox) {

  const extent = transformExtent(
    bbox,
    "EPSG:4326",
    "EPSG:3857"
  )

  map.getView().fit(extent, {
    padding: [40,40,40,40],
    duration: 600
  })

}
