export async function getCollections(stacUrl) {
  const url = joinUrl(stacUrl, 'collections');
  const res = await fetch(url);
  const data = await res.json()
  return data.collections
}

export async function searchItems(stacUrl, body) {
  const url = joinUrl(stacUrl, 'search');
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })

  return res.json()
}

function joinUrl(base, path) {
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}
