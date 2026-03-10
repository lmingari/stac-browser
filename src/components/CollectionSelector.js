import { state, setState } from "../state/store"

export function CollectionSelector(container) {

  const label = document.createElement("label")
  label.textContent = "Collection"

  const select = document.createElement("select")

  container.appendChild(label)
  container.appendChild(select)

  select.addEventListener("change", (e) => {
    setState("selectedCollection", e.target.value)
  })

  document.addEventListener("collectionsChanged", () => {

    const collections = state.collections

    select.innerHTML = `
      <option value="">Select collection</option>
      ${collections.map(c =>
        `<option value="${c.id}">
          ${c.title ?? c.id}
         </option>`
      ).join("")}
    `
  })

}
