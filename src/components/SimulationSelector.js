import { state, setState } from "../state/store"
import { searchItems } from "../api/stacClient"

export function SimulationSelector(container) {

  const label = document.createElement("label")
  label.textContent = "Simulation"

  const select = document.createElement("select")
  select.disabled = true

  container.appendChild(label)
  container.appendChild(select)

  select.addEventListener("change", (e) => {
    setState("selectedSimulation", e.target.value)
  })

  document.addEventListener("selectedCollectionChanged", async () => {

    if (!state.selectedCollection) {
      select.innerHTML = `<option>Select simulation</option>`
      select.disabled = true
      return
    }

    // reset UI
    select.disabled = true
    select.innerHTML = `<option>Loading simulations...</option>`

    try {

      const result = await searchItems(state.stacUrl, {
        collections: [state.selectedCollection],
        limit: 100
      })

      const simulations = [...new Set(
        result.features.map(f => f.properties["simulation"])
      )]

      select.innerHTML = `
        <option value="">Select simulation</option>
        ${simulations.map(e => `<option value="${e}">${e}</option>`).join("")}
      `

      select.value = ""
      select.disabled = false

    } catch (err) {

      console.error(err)

      select.innerHTML = `<option>Failed to load simulationss</option>`
      select.disabled = true

    }

  })

}
