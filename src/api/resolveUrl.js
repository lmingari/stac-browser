export function resolveAssetHref(base,asset) {

  if (!asset?.href) return null

  const href = asset.href

  if (href.startsWith("http://") || href.startsWith("https://")) return href
  if (href.startsWith("/")) return new URL(href, base).href

  return new URL(href, base + "/").href
}

export function normalizeUrl(input) {
  const url = new URL(input);
  url.pathname = url.pathname.replace(/\/+$/, '') || '/';
  return url.toString();
}
