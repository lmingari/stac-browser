import { state, setState } from "../state/store"

export function StepNavigator(container) {

  if (!container) return

  const prevBtn = container.querySelector(".step-prev")
  const nextBtn = container.querySelector(".step-next")
  const label = container.querySelector(".step-label")

  let sequence = []
  let index = -1
  let variable = null

  document.addEventListener("selectedAssetChanged", rebuild)
  document.addEventListener("selectedItemChanged", syncIndex)

  prevBtn.onclick = () => {
    if (!sequence.length) return

    index = (index - 1 + sequence.length) % sequence.length
    setState("selectedItem", sequence[index])
  }

  nextBtn.onclick = () => {
    if (!sequence.length) return

    index = (index + 1) % sequence.length
    setState("selectedItem", sequence[index])
  }

  function rebuild() {

    const asset = state.selectedAsset

    if (!asset) {
      sequence = []
      index = -1
      label.textContent = ""
      return
    }

    variable = asset.variable

    sequence = state.items.filter(
      item => item.assetsByVariable?.[variable]
    )

    syncIndex()

  }

  function syncIndex() {

    const item = state.selectedItem

    if (!item || !sequence.length) {
      label.textContent = ""
      return
    }

    const i = sequence.findIndex(e => e.id === item.id)

    if (i >= 0) {
      index = i
    }

    updateLabel()

  }

  function updateLabel() {

    const asset = state.selectedAsset

    if (!asset) {
      label.textContent = ""
      return
    }

    label.textContent = `Step ${asset.step}`

  }

}
