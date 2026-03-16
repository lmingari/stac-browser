import { collections, selectedCollection } from "../signals/store"

export function CollectionSelector() {
  return (
    <div>
      <label>Collection</label>
      <select
        value={selectedCollection.value ?? ""}
        onChange={e => selectedCollection.value = e.target.value || null}
        disabled={!collections.value.length}
      >
        <option value="">Select collection</option>
        {collections.value.map(c => (
          <option key={c.id} value={c.id}>{c.title ?? c.id}</option>
        ))}
      </select>
    </div>
  )
}
