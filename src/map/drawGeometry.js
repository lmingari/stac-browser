import GeoJSON from "ol/format/GeoJSON"

export function drawGeometry(source, geometry) {

  source.clear()

  if (!geometry) return

  const feature = new GeoJSON().readFeature({
    type: "Feature",
    geometry
  },{
    featureProjection: "EPSG:3857"
  })

  source.addFeature(feature)

}
