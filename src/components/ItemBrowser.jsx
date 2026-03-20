import { useSignal, useSignalEffect } from "@preact/signals"
import { useRef, useEffect } from "preact/hooks"
import { selectedCollection, selectedSimulation, selectedStartTime, selectedItem, items, itemGroups, stacUrl } from "../signals/store"
import { searchItems, normalizeAssets } from "../api/stacClient"

export function ItemBrowser() {

  const loading = useSignal(false)
  const error   = useSignal(false)

  useSignalEffect(() => {
    const startTime  = selectedStartTime.value
    const collection = selectedCollection.value
    const simulation = selectedSimulation.value

    items.value = []
    error.value = false

    if (!startTime || !collection || !simulation) return

    const controller = new AbortController()
    loading.value = true

    searchItems(stacUrl.value, {
      collections: [collection],
      query: {
        "simulation": { eq: simulation },
        "forecast:start_time": { eq: startTime }
      },
      limit: 100
    }, controller.signal)
      .then(result => {
        const fetched = result.features
        fetched.sort((a, b) =>
          (a.properties["forecast:step"] ?? 0) - (b.properties["forecast:step"] ?? 0)
        )
        normalizeAssets(fetched)
        items.value = fetched
      })
      .catch(err => {
        if (err.name === "AbortError") return
        console.error(err)
        error.value = true
      })
      .finally(() => { loading.value = false })

    return () => controller.abort()
  })

  if (loading.value) return <div class="state-msg">Loading items…</div>
  if (error.value)   return <div class="state-msg">Failed to load items</div>
  if (!items.value.length) return null

  const groups = itemGroups.value

  // If only one group, skip tabs and show flat list
  if (groups.length === 1) {
    return <ItemList items={groups[0].items} />
  }

  return <TabbedItemBrowser groups={groups} />
}

function TabbedItemBrowser({ groups }) {
  const activeGroup = useSignal(groups[0]?.keyword ?? null)

  // Keep active tab valid if groups change
  const active = groups.find(g => g.keyword === activeGroup.value) ?? groups[0]

  return (
    <div class="item-browser">
      <div class="item-tabs">
        {groups.map(({ keyword, items: groupItems }) => (
          <button
            key={keyword}
            class={`item-tab ${activeGroup.value === keyword ? "active" : ""}`}
            onClick={() => activeGroup.value = keyword}
          >
            {keyword}
            <span class="item-tab-count">{groupItems.length}</span>
          </button>
        ))}
      </div>
      {active && <ItemList items={active.items} />}
    </div>
  )
}

function ItemList({ items: listItems }) {
  return (
    <div class="item-list">
      {listItems.map(item => (
        <ItemRow key={item.id} item={item} />
      ))}
    </div>
  )
}

function ItemRow({ item }) {
  const isSelected = selectedItem.value?.id === item.id
  const rowRef = useRef(null)

  useEffect(() => {
    if (isSelected && rowRef.current) {
      rowRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" })
    }
  }, [isSelected])

  const step       = item.properties["forecast:step"]
  const validTime  = item.properties["forecast:valid_time"]

  // Format valid time to be compact: "2024-01-15 06:00" instead of full ISO
  const label = validTime
    ? validTime.replace("T", " ").replace(/:00\.000Z$/, "").replace("Z", "")
    : item.id

  return (
    <label ref={rowRef} class={`item-row ${isSelected ? "active" : ""}`}>
      <input
        type="radio"
        name="item"
        checked={isSelected}
        onChange={() => selectedItem.value = item}
      />
      <span class="item-row-label">{label}</span>
      {step != null && <span class="item-row-step">{step}</span>}
    </label>
  )
}

