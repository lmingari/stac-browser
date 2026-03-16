import { computed } from "@preact/signals"
import { items, selectedItem, selectedAsset } from "../signals/store"

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
    <div class="step-nav">
      <button class="step-prev" onClick={prev}>‹</button>
      <span class="step-label">Step {asset.step}</span>
      <button class="step-next" onClick={next}>›</button>
    </div>
  )
}
