import { collections, selectedCollection } from "../../signals/store"
import { BaseSelector } from "./BaseSelector"

export function CollectionSelector() {
  return (
    <BaseSelector
      label="Collection"
      placeholder="Select collection"
      value={selectedCollection.value}
      onChange={v => selectedCollection.value = v}
      disabled={!collections.value.length}
      options={collections.value}
      getKey={c => c.id}
      getLabel={c => c.title ?? c.id}
    />
  )
}
