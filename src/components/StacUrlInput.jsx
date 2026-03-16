import { useSignal } from "@preact/signals"
import { getCollections } from "../api/stacClient"
import { stacUrl, collections, selectedCollection, selectedSimulation, selectedStartTime, selectedItem, selectedAsset } from "../signals/store"
import { batch } from "@preact/signals"

export function StacUrlInput() {

  const inputVal = useSignal("http://localhost")
  const status   = useSignal(null)  // null | { ok: bool, msg: string }
  const loading  = useSignal(false)

  async function load() {
    const url = inputVal.value.trim()
    if (!url) return

    loading.value = true
    status.value  = null

    try {
      const result = await getCollections(url)
      batch(() => {
        stacUrl.value     = url
        collections.value = result
        selectedCollection.value = null
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
