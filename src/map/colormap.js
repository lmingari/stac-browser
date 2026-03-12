import colormap from "colormap"

export function buildColorRamp(name, min, max, steps = 16) {

  const reversed = name?.endsWith("_r")
  const cmap = reversed ? name.slice(0, -2) : name

  let colors

  try {

    colors = colormap({
      colormap: cmap || "viridis",
      nshades: steps,
      format: "rgba",
      alpha: 0.75
    })

  } catch {

    console.warn(`Unknown colormap "${name}", using viridis`)

    colors = colormap({
      colormap: "yiorrd",
      nshades: steps,
      format: "rgba",
      alpha: 0.75
    })
  }

  if (reversed) colors.reverse()

  const ramp = []

  for (let i = 0; i < colors.length; i++) {

    const t = i / (colors.length - 1)
    const value = min + t * (max - min)

    ramp.push(value)
    ramp.push(colors[i])
  }

  return ramp
}
