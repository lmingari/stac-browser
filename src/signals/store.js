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
export const selectedKeyword    = signal(null)

export const logScale           = signal(false)
export const rasterVisible      = signal(true)

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
    selectedKeyword.value = null
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

export const filteredItems = computed(() => {
  const key = selectedKeyword.value
  if (!key) return items.value
  return items.value.filter(i =>
    (i.properties["keywords"] ?? []).join("/") === key
  )
})

export const itemKeywords = computed(() => {
  const seen = new Set()
  const groups = []
  items.value.forEach(i => {
    const kw = i.properties["keywords"]
    if (!Array.isArray(kw) || !kw.length) return
    const key = kw.join("/")
    if (!seen.has(key)) {
      seen.add(key)
      groups.push({ key, keywords: kw })
    }
  })
  return groups
})
