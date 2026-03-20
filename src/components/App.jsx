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
import { selectedItem }       from "../signals/store"

export function App() {

  const browserRef = useRef(null)
  const hasItem    = selectedItem.value !== null

  return (
    <div id="app">

      <div class="panel browser" ref={browserRef}>
        <div class="browser-header">
          <h1><i class="fa-solid fa-volcano"></i> STAC Browser</h1>
        </div>

        {/* Top: filters — always visible, no scroll */}
        <div class="browser-top">
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
        </div>

        {/* Bottom: items + assets split — fills remaining height */}
        <div class={`browser-bottom ${hasItem ? "has-asset" : ""}`}>
          <div class="browser-pane pane-items">
            <div class="pane-label">Items</div>
            <div class="pane-scroll">
              <ItemBrowser />
            </div>
          </div>

          {hasItem && (
            <div class="browser-pane pane-assets">
              <div class="pane-label">Assets</div>
              <div class="pane-scroll">
                <AssetList />
              </div>
            </div>
          )}
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
