import { useSignal } from "@preact/signals"
import { batch } from "@preact/signals"
import { getCollections } from "../api/stacClient"
import { normalizeUrl } from "../api/resolveUrl"
import { stacUrl, collections, selectedCollection } from "../signals/store"

export function StacUrlInput() {

  const inputVal = useSignal("https://fall3d-forecast.geo3bcn.csic.es")
  const status   = useSignal(null)  // null | { ok: bool, msg: string }
  const loading  = useSignal(false)

  async function load() {
    const url = normalizeUrl(inputVal.value)
    if (!url) return

    loading.value = true
    status.value  = null

    try {
      const result = await getCollections(url)
      batch(() => {
        stacUrl.value            = url
        collections.value        = result
        selectedCollection.value = null  // cascade in store resets all downstream
      })
      status.value = { ok: true, msg: `✓ ${result.length} collection${result.length !== 1 ? "s" : ""} loaded` }
    } catch (err) {
      console.error(err)
      status.value = { ok: false, msg: "✕ Failed to connect" }
    } finally {
      loading.value = false
    }
  }

  return (
    <div class="stac-url-input">
      <div class="stac-url-row">
        <input
          value={inputVal.value}
          onInput={e => inputVal.value = e.target.value}
          onKeyDown={e => e.key === "Enter" && load()}
          placeholder="https://your-stac-api.com"
        />
        <button class="btn-primary" onClick={load} disabled={loading.value}>
          {loading.value ? "Loading…" : "Load"}
        </button>
      </div>
      {status.value && (
        <span class={`status ${status.value.ok ? "ok" : "err"}`}>
          {status.value.msg}
        </span>
      )}
    </div>
  )
}
