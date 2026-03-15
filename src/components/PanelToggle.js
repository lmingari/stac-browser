export function PanelToggle(browser) {

  const button = document.createElement("button")
  button.className = "panel-toggle"
  button.textContent = "‹"

  document.getElementById("app").appendChild(button)

  button.addEventListener("click", () => {
    browser.classList.toggle("collapsed")
    button.textContent = browser.classList.contains("collapsed") ? "›" : "‹"
  })

}
