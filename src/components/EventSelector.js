import { state, setState } from "../state/store"
import { searchItems } from "../api/stacClient"

export function EventSelector(container) {

  const label = document.createElement("label")
  label.textContent = "Event"

  const select = document.createElement("select")
  select.disabled = true

  container.appendChild(label)
  container.appendChild(select)

  select.addEventListener("change", (e) => {
    setState("selectedEvent", e.target.value)
  })

  document.addEventListener("selectedCollectionChanged", async () => {

    if (!state.selectedCollection) {
      select.innerHTML = `<option>Select event</option>`
      select.disabled = true
      return
    }

    // reset UI
    select.disabled = true
    select.innerHTML = `<option>Loading events...</option>`

    try {

      const result = await searchItems(state.stacUrl, {
        collections: [state.selectedCollection],
        limit: 100
      })

      const events = [...new Set(
        result.features.map(f => f.properties["event:name"])
      )]

      select.innerHTML = `
        <option value="">Select event</option>
        ${events.map(e => `<option value="${e}">${e}</option>`).join("")}
      `

      select.value = ""
      select.disabled = false

    } catch (err) {

      console.error(err)

      select.innerHTML = `<option>Failed to load events</option>`
      select.disabled = true

    }

  })

}
