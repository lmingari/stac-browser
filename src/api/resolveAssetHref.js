import { stacUrl } from "../signals/store"

export function resolveAssetHref(asset) {

  if (!asset?.href) return null

  const href = asset.href
  const base = stacUrl.value

  if (href.startsWith("http://") || href.startsWith("https://")) return href
  if (href.startsWith("/")) return new URL(href, base).href

  return new URL(href, base + "/").href
}
