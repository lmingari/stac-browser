import { useSignal } from "@preact/signals"
import { useRef } from "preact/hooks"

import { CollectionSelector, SimulationSelector, StartTimeSelector, KeywordFilter } from "../filters"
import { MapView, ColorBarVertical }                                 from "../map"
import { PanelToggle, StepNavigator }                                from "../layout"
import { StacUrlInput }                                              from "../catalogue/StacUrlInput"
import { ItemBrowser }                                               from "../items/ItemBrowser"
import { AssetList }                                                 from "../assets/AssetList"
import { selectedItem }                                              from "../../signals/store"

const TABS = [
  { id: "Catalogue", label: <><i class="fa-solid fa-link"></i> Catalogue</> },
  { id: "Filters",   label: <><i class="fa-solid fa-sliders"></i> Filters</> },
  { id: "Items",     label: <><i class="fa-solid fa-layer-group"></i> Items</> },
]

export function App() {
  const browserRef = useRef(null)
  const activeTab  = useSignal("Catalogue")
  const hasItem    = selectedItem.value !== null

  return (
    <div id="app">
      <div class="panel browser" ref={browserRef}>

        <div class="browser-header">
          <h1><i class="fa-solid fa-volcano"></i> STAC Browser</h1>
        </div>

        <div class="browser-tabs">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              class={`browser-tab ${activeTab.value === id ? "active" : ""}`}
              onClick={() => activeTab.value = id}
            >
              {label}
            </button>
          ))}
        </div>

        <div class="tab-content">

          <div class={`tab-pane ${activeTab.value === "Catalogue" ? "" : "hidden"}`}>
            <StacUrlInput />
          </div>
  
          <div class={`tab-pane ${activeTab.value === "Filters" ? "" : "hidden"}`}>
            <CollectionSelector />
            <SimulationSelector />
            <StartTimeSelector />
            <KeywordFilter />
          </div>
  
          <div class={`items-split ${activeTab.value === "Items" ? "" : "hidden"}`}>
            <div class="items-section">
              <div class="section-label">Items</div>
              <div class="section-scroll">
                <ItemBrowser />
              </div>
            </div>
            {hasItem && (
              <div class="assets-section">
                <div class="section-label">Assets</div>
                <div class="section-scroll">
                  <AssetList />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <PanelToggle browserRef={browserRef} />

      <div class="panel map">
        <MapView />
        <ColorBarVertical />
        <StepNavigator />
      </div>
    </div>
  )
}
