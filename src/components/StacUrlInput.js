import { getCollections } from "../api/stacClient"
import { setState } from "../state/store"

export function StacUrlInput(container) {

  const input = document.createElement("input")
  input.placeholder = "Enter STAC API URL"
  input.value = "http://localhost:8081"

  const button = document.createElement("button")
  button.textContent = "Load"

  const status = document.createElement("span")
  status.style.marginLeft = "10px"

  container.appendChild(input)
  container.appendChild(button)
  container.appendChild(status)

  button.addEventListener("click", async () => {

    const url = input.value.trim()

    if (!url) return

    status.textContent = "Loading collections..."

    try {

      const collections = await getCollections(url)

      setState("stacUrl", url)
      setState("collections", collections)

      status.textContent = `Loaded ${collections.length} collections`

    } catch (err) {

      console.error(err)
      status.textContent = "Failed to load STAC"

    }

  })

}
