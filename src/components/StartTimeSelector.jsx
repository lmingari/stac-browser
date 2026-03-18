import { useSignal, useSignalEffect } from "@preact/signals"
import { selectedCollection, selectedSimulation, selectedStartTime, stacUrl } from "../signals/store"
import { searchItems } from "../api/stacClient"

export function StartTimeSelector() {

  const options = useSignal([])
  const loading = useSignal(false)
  const error   = useSignal(false)

  useSignalEffect(() => {
    const simulation = selectedSimulation.value
    const collection = selectedCollection.value

    options.value = []
    error.value   = false

    if (!simulation || !collection) return

    loading.value = true

    searchItems(stacUrl.value, {
      collections: [collection],
      query: { "simulation": { eq: simulation } },
      limit: 100
    })
      .then(result => {
        options.value = [...new Set(
          result.features.map(f => f.properties["forecast:start_time"]).filter(Boolean)
        )]
      })
      .catch(err => {
        console.error(err)
        error.value = true
      })
      .finally(() => {
        loading.value = false
      })
  })

  const disabled = !selectedSimulation.value || loading.value

  return (
    <div>
      <label>Start Time</label>
      <select
        value={selectedStartTime.value ?? ""}
        onChange={e => selectedStartTime.value = e.target.value || null}
        disabled={disabled}
      >
        <option value="">
          {loading.value ? "Loading…" : error.value ? "Failed to load" : "Select start time"}
        </option>
        {options.value.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  )
}
