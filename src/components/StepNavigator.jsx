import { computed } from "@preact/signals"
import { items, selectedItem, selectedAsset, logScale } from "../signals/store"

// Sequence of items sharing the same variable AND keywords as the selected item
const sequence = computed(() => {
  const asset = selectedAsset.value
  const item  = selectedItem.value

  if (!asset || !item) return []

  const variable = asset.variable
  const keywords = item.properties["keywords"] ?? []

  return items.value.filter(i =>
    i.assetsByVariable?.[variable] &&
    keywords.every(k => (i.properties["keywords"] ?? []).includes(k))
  )
})

const currentIndex = computed(() => {
  const item = selectedItem.value
  if (!item) return -1
  return sequence.value.findIndex(i => i.id === item.id)
})

export function StepNavigator() {

  const seq   = sequence.value
  const index = currentIndex.value
  const asset = selectedAsset.value

  if (!asset || !seq.length) return null

  function prev() {
    const i = (index - 1 + seq.length) % seq.length
    selectedItem.value = seq[i]
  }

  function next() {
    const i = (index + 1) % seq.length
    selectedItem.value = seq[i]
  }

  return (
    <div className="step-nav">
      <div className="step-nav-buttons">
        <button className="step-prev" onClick={prev}>‹</button>
        <span className="step-label">Step {asset.step}</span>
        <button className="step-next" onClick={next}>›</button>
      </div>
      <label className="step-nav-log">
        <input
          type="checkbox"
          checked={logScale.value}
          onChange={e => logScale.value = e.target.checked}
        />
        Log scale
      </label>
    </div>
  )
}
