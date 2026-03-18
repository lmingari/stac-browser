import { useRef } from "preact/hooks"

import { StacUrlInput }       from "./StacUrlInput"
import { CollectionSelector } from "./CollectionSelector"
import { SimulationSelector } from "./SimulationSelector"
import { StartTimeSelector }  from "./StartTimeSelector"
import { ItemBrowser }        from "./ItemBrowser"
import { AssetList }          from "./AssetList"
import { PanelToggle }        from "./PanelToggle"
import { StepNavigator }      from "./StepNavigator"
import { MapView }            from "../map/MapView"

export function App() {

  const browserRef = useRef(null)

  return (
    <div id="app">

      <div class="panel browser" ref={browserRef}>
        <div class="browser-header">
          <div class="browser-wordmark">
            <div class="browser-wordmark-icon">🛰</div>
            <h1>STAC Browser</h1>
          </div>
          <div class="browser-subtitle">COG Visualiser</div>
        </div>

        <div class="browser-scroll">

          <div class="section">
            <h3>Catalogue</h3>
            <StacUrlInput />
          </div>

          <div class="section">
            <h3>Filters</h3>
            <CollectionSelector />
            <SimulationSelector />
            <StartTimeSelector />
          </div>

          <div class="section">
            <h3>Items</h3>
            <ItemBrowser />
          </div>

          <div class="section">
            <h3>Assets</h3>
            <AssetList />
          </div>

        </div>
      </div>

      <PanelToggle browserRef={browserRef} />

      <div class="panel map">
        <MapView />
        <StepNavigator />
      </div>

    </div>
  )
}
