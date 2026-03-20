import { selectedCollection, selectedSimulation, selectedStartTime, stacUrl } from "../../signals/store"
import { searchItems } from "../../api/stacClient"
import { useFetchOptions } from "../../hooks/useFetchOptions"

export function StartTimeSelector() {
  const { options, loading, error } = useFetchOptions((signal) => {
    const simulation = selectedSimulation.value
    const collection = selectedCollection.value
    if (!simulation || !collection) return null

    return searchItems(stacUrl.value, {
      collections: [collection],
      query: { "simulation": { eq: simulation } },
      limit: 100
    }, signal).then(result =>
      [...new Set(result.features.map(f => f.properties["forecast:start_time"]).filter(Boolean))]
    )
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
