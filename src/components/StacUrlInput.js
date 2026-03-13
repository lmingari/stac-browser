import { getCollections } from "../api/stacClient"
import { setState } from "../state/store"

export function StacUrlInput(container) {

  container.classList.add("stac-url-input")

  // Row: input + button
  const row = document.createElement("div")
  row.className = "stac-url-row"

  const input = document.createElement("input")
  input.placeholder = "https://your-stac-api.com"
  input.value = "http://localhost"

  const button = document.createElement("button")
  button.textContent = "Load"
  button.className = "btn-primary"

  row.appendChild(input)
  row.appendChild(button)

  // Status line
  const status = document.createElement("span")
  status.className = "status"

  container.appendChild(row)
  container.appendChild(status)

  button.addEventListener("click", async () => {

    const url = input.value.trim()
    if (!url) return

    button.textContent = "Loading…"
    button.disabled = true
    status.textContent = ""
    status.className = "status"

    try {

      const collections = await getCollections(url)

      setState("stacUrl", url)
      setState("collections", collections)

      status.textContent = `✓ ${collections.length} collection${collections.length !== 1 ? "s" : ""} loaded`
      status.className = "status ok"

    } catch (err) {

      console.error(err)
      status.textContent = "✕ Failed to connect"
      status.className = "status err"

    } finally {

      button.textContent = "Load"
      button.disabled = false

    }

  })

  // Allow Enter key
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") button.click()
  })

}
