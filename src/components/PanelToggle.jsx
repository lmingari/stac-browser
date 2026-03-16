import { useSignal } from "@preact/signals"

export function PanelToggle({ browserRef }) {

  const collapsed = useSignal(false)

  function toggle() {
    collapsed.value = !collapsed.value
    browserRef.current?.classList.toggle("collapsed", collapsed.value)
  }

  return (
    <button class="panel-toggle" onClick={toggle} title="Toggle panel">
      {collapsed.value ? "›" : "‹"}
    </button>
  )
}
