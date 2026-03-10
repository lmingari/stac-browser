export async function getCollections(stacUrl) {
  const res = await fetch(`${stacUrl}/collections`)
  const data = await res.json()
  return data.collections
}

export async function searchItems(stacUrl, body) {

  const res = await fetch(`${stacUrl}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })

  return res.json()
}
