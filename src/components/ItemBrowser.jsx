import { useSignal, useSignalEffect } from "@preact/signals"
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

  return (
    <div class="item-list">
      {itemGroups.value.map(({ keyword, items: groupItems }) => (
        <ItemGroup key={keyword} keyword={keyword} items={groupItems} />
      ))}
    </div>
  )
}

function ItemGroup({ keyword, items: groupItems }) {

  const collapsed = useSignal(false)

  return (
    <div class="item-group">
      <button
        class="item-group-header"
        onClick={() => collapsed.value = !collapsed.value}
      >
        <span class="item-group-label">{keyword}</span>
        <span class="item-group-count">{groupItems.length}</span>
        <span class="item-group-arrow">{collapsed.value ? "▸" : "▾"}</span>
      </button>
      {!collapsed.value && (
        <div class="item-group-body">
          {groupItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

function ItemCard({ item }) {

  const isSelected = selectedItem.value?.id === item.id
  const stepValue  = item.properties["forecast:step"]

  function select() {
    selectedItem.value = item
  }

  return (
    <label class="item-card">
      <input
        type="radio"
        name="item"
        checked={isSelected}
        onChange={select}
      />
      <div class="item-header">
        <span class="item-valid">
          {item.properties["forecast:valid_time"]
            ? `Valid: ${item.properties["forecast:valid_time"]}`
            : ""}
        </span>
        {stepValue != null && (
          <span class="item-step">Step {stepValue}</span>
        )}
      </div>
      <div class="item-body">
        {item.properties["created"] && (
          <div class="item-created">Created: {item.properties["created"]}</div>
        )}
        <div class="item-id">ID: {item.id}</div>
      </div>
    </label>
  )
}


