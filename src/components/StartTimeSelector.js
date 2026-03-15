import { state, setState } from "../state/store"
import { searchItems } from "../api/stacClient"

export function StartTimeSelector(container) {

  const label = document.createElement("label")
  label.textContent = "Start Time"

  const select = document.createElement("select")
  select.disabled = true

  container.appendChild(label)
  container.appendChild(select)

  select.addEventListener("change", (e) => {
    setState("selectedStartTime", e.target.value)
  })

  document.addEventListener("selectedSimulationChanged", async () => {

    if (!state.selectedSimulation) {
      select.innerHTML = `<option>Select start time</option>`
      select.disabled = true
      return
    }

    // reset UI
    select.disabled = true
    select.innerHTML = `<option>Loading start times...</option>`

    try {

      const result = await searchItems(state.stacUrl, {
        collections: [state.selectedCollection],
        query: {
          "simulation": { eq: state.selectedSimulation }
        },
        limit: 100
      })

      const startTimes = [...new Set(
        result.features.map(
          f => f.properties["forecast:start_time"]
        )
      )]

      select.innerHTML = `
        <option value="">Select start time</option>
        ${startTimes.map(t =>
          `<option value="${t}">${t}</option>`
        ).join("")}
      `

      select.value = ""
      select.disabled = false

    } catch (err) {

      console.error(err)

      select.innerHTML = `<option>Failed to load start times</option>`
      select.disabled = true

    }

  })

}
