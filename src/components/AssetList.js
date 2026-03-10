import { state, setState } from "../state/store"
import { resolveAssetHref } from "../api/resolveAssetHref"

export function AssetList(container) {

  const list = document.createElement("div")
  list.className = "asset-list"

  container.appendChild(list)

  document.addEventListener("selectedItemChanged", render)

  function render() {

    const item = state.selectedItem

    if (!item) {
      list.innerHTML = ""
      return
    }

    const assets = Object.entries(item.assets)

    if (!assets.length) {
      list.innerHTML = "No assets"
      return
    }

    list.innerHTML = ""

    assets.forEach(([key, asset]) => {

      const card = document.createElement("label")
      card.className = "asset-card"

      /* ---------- radio ---------- */

      const radio = document.createElement("input")
      radio.type = "radio"
      radio.name = "asset"

      if (state.selectedAsset?.key === asset.key) {
        radio.checked = true
      }

      radio.addEventListener("change", () => {
        setState("selectedAsset", asset)
      })

      /* ---------- header ---------- */

      const header = document.createElement("div")
      header.className = "asset-header"

      const title = document.createElement("span")
      title.className = "asset-title"
      title.textContent = asset.title || asset.key

      const step = document.createElement("span")
      step.className = "asset-step"
      step.textContent = asset.step ? `Step ${asset.step}` : ""

      header.appendChild(title)
      header.appendChild(step)

      /* ---------- body ---------- */

      const body = document.createElement("div")
      body.className = "asset-body"

      const label = document.createElement("div")
      label.className = "asset-label"
      label.textContent = asset.label || ""

      const unit = document.createElement("div")
      unit.className = "asset-unit"
      unit.textContent = asset.unit ? `Units: ${asset.unit}` : ""

      const time = document.createElement("div")
      time.className = "asset-time"
      time.textContent = asset.created ? `Created: ${asset.created}` : ""

      body.appendChild(label)
      body.appendChild(unit)
      body.appendChild(time)

      /* ---------- download ---------- */

      const assetUrl = resolveAssetHref(asset)

      const download = document.createElement("a")
      download.className = "btn btn-download"
      download.href = assetUrl
      download.download = ""
      download.textContent = "⬇"

      /* ---------- assemble ---------- */

      card.appendChild(radio)
      card.appendChild(header)
      card.appendChild(body)
      card.appendChild(download)

      list.appendChild(card)

    })

  }

}
