const DEFAULT_RENDER = {
  colormap: "viridis",
  rescale: null,
  resampling: "nearest"
}

export function getRenderConfig(item, variable) {

  const render = item.properties?.renders?.[variable]

  if (!render) {
    return DEFAULT_RENDER
  }

  return {
    colormap: render.colormap_name || DEFAULT_RENDER.colormap,
    rescale: render.rescale?.[0] || DEFAULT_RENDER.rescale,
    resampling: render.resampling || DEFAULT_RENDER.resampling
  }
}
