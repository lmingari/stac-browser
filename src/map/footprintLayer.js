import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"

import Style from "ol/style/Style"
import Stroke from "ol/style/Stroke"
import Fill from "ol/style/Fill"

export function createFootprintLayer() {

  const source = new VectorSource()

  const layer = new VectorLayer({
    source,
    style: new Style({
      stroke: new Stroke({
        color: "#ff0000",
        width: 2
      }),
      fill: new Fill({
        color: "rgba(255,0,0,0.05)"
      })
    })
  })

  return { layer, source }

}
