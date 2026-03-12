import { state } from "../state/store"

export function resolveAssetHref(asset) {

  if (!asset || !asset.href) return null

  const href = asset.href

  // already absolute
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href
  }

  // STAC asset paths -> served by COG server
  if (href.startsWith("/")) {
    return new URL(href, state.stacUrl).href
  }

  // fallback
  return new URL(href, state.stacUrl + "/").href

}

