import { signal, computed, effect, batch } from "@preact/signals"

// ── Raw signals ────────────────────────────────────────────────────────────

export const stacUrl            = signal(null)
export const collections        = signal([])
export const items              = signal([])

export const selectedCollection = signal(null)
export const selectedSimulation = signal(null)
export const selectedStartTime  = signal(null)
export const selectedItem       = signal(null)
export const selectedAsset      = signal(null)

// ── Cascade resets ─────────────────────────────────────────────────────────
// When a parent changes, reset all downstream selections.

effect(() => {
  selectedCollection.value  // subscribe
  batch(() => {
    selectedSimulation.value = null
    selectedStartTime.value  = null
    selectedItem.value       = null
    selectedAsset.value      = null
  })
})

effect(() => {
  selectedSimulation.value  // subscribe
  batch(() => {
    selectedStartTime.value = null
    selectedItem.value      = null
    selectedAsset.value     = null
  })
})

effect(() => {
  selectedStartTime.value  // subscribe
  batch(() => {
    selectedItem.value  = null
    selectedAsset.value = null
  })
})

// ── Special logic: preserve asset across item changes ──────────────────────

effect(() => {
  const item  = selectedItem.value
  const asset = selectedAsset.value

  if (!item || !asset) return

  const match = item.assetsByVariable?.[asset.variable]

  if (match && match !== asset) {
    selectedAsset.value = match
  }
})

// ── Computed ───────────────────────────────────────────────────────────────

export const itemGroups = computed(() => {
  return groupByKeywords(items.value)
})

// ── Helpers ────────────────────────────────────────────────────────────────

function groupByKeywords(allItems) {
  const map = new Map()

  allItems.forEach(item => {
    const keywords = item.properties["keywords"]
    const keys = (Array.isArray(keywords) && keywords.length)
      ? keywords
      : ["Other"]

    keys.forEach(key => {
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(item)
    })
  })

  return Array.from(map.entries()).map(([keyword, items]) => ({ keyword, items }))
}
