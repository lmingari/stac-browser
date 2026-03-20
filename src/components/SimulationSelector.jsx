import { selectedCollection, selectedSimulation, stacUrl } from "../signals/store"
import { searchItems } from "../api/stacClient"
import { useFetchOptions } from "../hooks/useFetchOptions"

export function SimulationSelector() {
  const { options, loading, error } = useFetchOptions((signal) => {
    const collection = selectedCollection.value
    if (!collection) return null

    return searchItems(stacUrl.value, {
      collections: [collection],
      limit: 100
    }, signal).then(result =>
      [...new Set(result.features.map(f => f.properties["simulation"]).filter(Boolean))]
    )
  })

  const disabled = !selectedCollection.value || loading.value

  return (
    <div>
      <label>Simulation</label>
      <select
        value={selectedSimulation.value ?? ""}
        onChange={e => selectedSimulation.value = e.target.value || null}
        disabled={disabled}
      >
        <option value="">
          {loading.value ? "Loading…" : error.value ? "Failed to load" : "Select simulation"}
        </option>
        {options.value.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  )
}
