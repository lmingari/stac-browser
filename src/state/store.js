export const state = {
  stacUrl: null,
  cogUrl: "http://localhost:8083",

  collections: [],
  items: [],

  selectedCollection: null,
  selectedEvent: null,
  selectedStartTime: null,
  selectedItem: null,
  selectedAsset: null
}

const DEBUG = true

const dependencies = {
  selectedCollection: ["selectedEvent", "selectedStartTime", "selectedItem", "selectedAsset"],
  selectedEvent: ["selectedStartTime", "selectedItem", "selectedAsset"],
  selectedStartTime: ["selectedItem", "selectedAsset"],
  selectedItem: ["selectedAsset"]
}

function emit(key, value) {

  if (DEBUG) {
    console.log(`EVENT → ${key}Changed`, value)
  }

  document.dispatchEvent(
    new CustomEvent(`${key}Changed`, { detail: value })
  )
}

function resetDependents(key) {

  const deps = dependencies[key] || []

  deps.forEach(dep => {

    if (state[dep] !== null) {

      state[dep] = null
      emit(dep, null)

    }

  })
}

export function setState(key, value) {

  if (state[key] === value) return

  if (DEBUG) {
    console.log(`SET ${key}`, value)
  }

  /* ======================================
     SPECIAL LOGIC: preserve asset on item change
  ====================================== */

  if (key === "selectedItem") {

    const oldAsset = state.selectedAsset
    const newItem = value

    if (oldAsset && newItem?.assetsByKey) {

      const matchingAsset = newItem.assetsByKey[oldAsset.key]

      if (matchingAsset) {

        state.selectedItem = newItem
        emit("selectedItem", newItem)

        state.selectedAsset = matchingAsset
        emit("selectedAsset", matchingAsset)

        return

      }

    }

  }

  /* ====================================== */

  state[key] = value
  emit(key, value)

  resetDependents(key)

}
