import { transformExtent } from "ol/proj"

export function zoomToBBox(map, extent) {
  map.getView().fit(extent, {
    padding: [40,40,40,40],
    duration: 600
  })

}

export function bboxToExtent(bbox) {
  return transformExtent(bbox, "EPSG:4326", "EPSG:3857")
}
