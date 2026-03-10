import { state, setState } from "../state/store"
import { searchItems } from "../api/stacClient"

export function ItemBrowser(container) {

  const list = document.createElement("div")
  list.className = "item-list"

  container.appendChild(list)

  document.addEventListener("selectedStartTimeChanged", async () => {

    setState("items", [])

    if (!state.selectedStartTime) {
      list.innerHTML = ""
      return
    }

    list.innerHTML = "Loading items..."

    try {

      const result = await searchItems(state.stacUrl, {

        collections: [state.selectedCollection],

        query: {
          "event:name": { eq: state.selectedEvent },
          "forecast:start_time": { eq: state.selectedStartTime }
        },

        limit: 100
      })

      const items = result.features

      if (!items.length) {
        list.innerHTML = "No items found"
        return
      }

      items.sort((a, b) => {
        const stepA = a.properties["forecast:step"] ?? 0
        const stepB = b.properties["forecast:step"] ?? 0
        return stepA - stepB
      })

      normalizeAssets(items)

      setState("items", items)

      const radiosByItemId = {}

      list.innerHTML = ""

      items.forEach(item => {

        const card = document.createElement("label")
        card.className = "item-card"

        /* ---------- radio ---------- */

        const radio = document.createElement("input")
        radio.type = "radio"
        radio.name = "item"

        radio.addEventListener("change", () => {
          setState("selectedItem", item)
        })

        radiosByItemId[item.id] = radio

        document.addEventListener("selectedItemChanged", () => {

          const item = state.selectedItem
          if (!item) return

          const radio = radiosByItemId[item.id]

          if (radio) {
            radio.checked = true
          }

        })

        /* ---------- header ---------- */

        const header = document.createElement("div")
        header.className = "item-header"

        const valid = document.createElement("span")
        valid.className = "item-valid"
        valid.textContent = item.properties["forecast:valid_time"]
          ? `Valid: ${item.properties["forecast:valid_time"]}`
          : ""

        const stepValue = item.properties["forecast:step"]
        const step = document.createElement("span")
        step.className = "item-step"

        step.textContent =
          stepValue !== undefined && stepValue !== null
            ? `Step ${stepValue}`
            : ""

        header.appendChild(valid)
        header.appendChild(step)

        /* ---------- body ---------- */

        const body = document.createElement("div")
        body.className = "item-body"

        const created = document.createElement("div")
        created.className = "item-created"
        created.textContent = item.properties["created"]
          ? `Created: ${item.properties["created"]}`
          : ""

        const id = document.createElement("div")
        id.className = "item-id"
        id.textContent = `ID: ${item.id}`

        body.appendChild(created)
        body.appendChild(id)

        /* ---------- assemble ---------- */

        card.appendChild(radio)
        card.appendChild(header)
        card.appendChild(body)

        list.appendChild(card)
 

//      const row = document.createElement("label")
//      row.className = "item-row"
//
//      const radio = document.createElement("input")
//      radio.type = "radio"
//      radio.name = "item-selection"
//
//      const text = document.createElement("div")
//      text.className = "item-text"
//
//      const valid = document.createElement("div")
//      valid.className = "item-valid"
//      valid.textContent =
//        `Step ${item.properties["forecast:step"]} • Valid: ${formatDate(item.properties["forecast:valid_time"])}`
//
//      const meta = document.createElement("div")
//      meta.className = "item-meta"
//      meta.textContent =
//        `ID: ${item.id}`
//
//      text.appendChild(valid)
//      text.appendChild(meta)
//
//      radio.addEventListener("change", () => {
//        setState("selectedItem", item)
//      })
//
//      row.appendChild(radio)
//      row.appendChild(text)
//
//          list.appendChild(row)

      })

    } catch (err) {

      console.error(err)
      list.innerHTML = "Failed to load items"

    }

  })

}

function formatDate(iso) {

  const d = new Date(iso)

  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC"
  }) + "Z"

}

function normalizeAssets(items) {

  items.forEach(item => {

    const assetsByKey = {}

    Object.values(item.assets).forEach(asset => {
      assetsByKey[asset.key] = asset
    })

    item.assetsByKey = assetsByKey

  })

}
