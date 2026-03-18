import { useSignal, useSignalEffect } from "@preact/signals"
import { selectedCollection, selectedSimulation, stacUrl } from "../signals/store"
import { searchItems } from "../api/stacClient"

export function SimulationSelector() {

  const options = useSignal([])
  const loading = useSignal(false)
  const error   = useSignal(false)

  useSignalEffect(() => {
    const collection = selectedCollection.value

    options.value = []
    error.value   = false

    if (!collection) return

    loading.value = true

    searchItems(stacUrl.value, {
      collections: [collection],
      limit: 100
    })
      .then(result => {
        options.value = [...new Set(
          result.features.map(f => f.properties["simulation"]).filter(Boolean)
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
