/**
 * Fetch all collections from a STAC API root.
 * @param {string} stacUrl
 * @param {AbortSignal} [signal]
 */
export async function getCollections(stacUrl, signal) {
  const url = joinUrl(stacUrl, 'collections')
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching collections`)
  const data = await res.json()
  return data.collections
}

/**
 * Search STAC items.
 * @param {string} stacUrl
 * @param {object} body
 * @param {AbortSignal} [signal]
 */
export async function searchItems(stacUrl, body, signal) {
  const url = joinUrl(stacUrl, 'search')
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} searching items`)
  return res.json()
}

/**
 * Attaches an `assetsByVariable` index to each item for fast lookup.
 * Mutates the array in place.
 * @param {Array} items
 */
export function normalizeAssets(items) {
  items.forEach(item => {
    const assetsByVariable = {}
    Object.values(item.assets).forEach(asset => {
      assetsByVariable[asset.variable] = asset
    })
    item.assetsByVariable = assetsByVariable
  })
}

function joinUrl(base, path) {
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`
}
