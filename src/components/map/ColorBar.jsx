import { computed } from "@preact/signals"
import { selectedItem, selectedAsset, logScale } from "../../signals/store"
import { getRenderConfig, getColormap } from "../../map"

export function ColorBar() {
  const asset = selectedAsset.value
  const item  = selectedItem.value
  if (!item || !asset) return null

  const render = getRenderConfig(item, asset.variable)
  if (!render.rescale) return null

  const [min, max] = render.rescale
  const colors     = getColormap(render.colormap, 256, 1)
  const gradient   = colors.map(([r, g, b]) => `rgb(${r},${g},${b})`).join(",")
  const log        = logScale.value
  const label      = asset.label ?? asset.title ?? asset.variable
  const unit       = asset.unit ?? null

  const ticks = log
    ? logTicks(min, max)
    : linTicks(min, max)

  return (
    <div class="colorbar">
      <div class="colorbar-title">{label}</div>
      <div class="colorbar-bar" style={{ background: `linear-gradient(to right, ${gradient})` }} />
      <div class="colorbar-ticks">
        {ticks.map(({ value, pct }) => (
          <span key={value} class="colorbar-tick" style={{ left: `${pct}%` }}>
            {formatValue(value)}
          </span>
        ))}
      </div>
      {unit && <div class="colorbar-unit">{unit}</div>}
    </div>
  )
}

export function ColorBarVertical() {
  const asset = selectedAsset.value
  const item  = selectedItem.value
  if (!item || !asset) return null

  const render = getRenderConfig(item, asset.variable)
  if (!render.rescale) return null

  const [min, max] = render.rescale
  const colors     = getColormap(render.colormap, 256, 1)
  const gradient   = [...colors].reverse().map(([r, g, b]) => `rgb(${r},${g},${b})`).join(",")

  return (
    <div class="colorbar-v">
      <span class="colorbar-v-max">{formatValue(max)}</span>
      <div class="colorbar-v-bar" style={{ background: `linear-gradient(to bottom, ${gradient})` }} />
      <span class="colorbar-v-min">{formatValue(min)}</span>
    </div>
  )
}

function linTicks(min, max, n = 5) {
  return Array.from({ length: n }, (_, i) => {
    const value = min + (i / (n - 1)) * (max - min)
    const pct   = (i / (n - 1)) * 100
    return { value, pct }
  })
}

function logTicks(min, max, n = 5) {
  const logMin = Math.log10(Math.max(min, 1e-10))
  const logMax = Math.log10(Math.max(max, 1e-10))
  return Array.from({ length: n }, (_, i) => {
    const t     = i / (n - 1)
    const value = Math.pow(10, logMin + t * (logMax - logMin))
    return { value, pct: t * 100 }
  })
}

function formatValue(v) {
  if (Math.abs(v) >= 1000 || (Math.abs(v) < 0.01 && v !== 0)) {
    return v.toExponential(1)
  }
  return parseFloat(v.toPrecision(3)).toString()
}
