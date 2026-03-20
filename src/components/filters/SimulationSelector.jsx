import { selectedCollection, selectedSimulation, stacUrl } from "../../signals/store"
import { searchItems } from "../../api"
import { useFetchOptions } from "../../hooks"
import { BaseSelector } from "./BaseSelector"

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

  return (
    <BaseSelector
      label="Simulation"
      placeholder="Select simulation"
      value={selectedSimulation.value}
      onChange={v => selectedSimulation.value = v}
      disabled={!selectedCollection.value || loading.value}
      loading={loading.value}
      error={error.value}
      options={options.value}
    />
  )
}
