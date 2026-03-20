import { selectedCollection, selectedSimulation, selectedStartTime, stacUrl } from "../../signals/store"
import { searchItems } from "../../api"
import { useFetchOptions } from "../../hooks"
import { BaseSelector } from "./BaseSelector"

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

  return (
    <BaseSelector
      label="Start Time"
      placeholder="Select start time"
      value={selectedStartTime.value}
      onChange={v => selectedStartTime.value = v}
      disabled={!selectedSimulation.value || loading.value}
      loading={loading.value}
      error={error.value}
      options={options.value}
    />
  )
}
