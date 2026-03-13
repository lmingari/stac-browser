/**
 * colormap.js — self-contained colormap module
 *
 * Replaces the `colormap` npm dependency.
 * Each colormap is defined as a list of [r, g, b] control points
 * evenly spaced over [0, 1], interpolated on demand.
 *
 * Available colormaps:
 *   viridis, plasma, inferno, magma, cividis
 *   RdYlBu, RdYlGn, RdBu, Spectral
 *   coolwarm, bwr
 *   Blues, Greens, Reds, Oranges, Purples, Greys
 *   YlOrRd, YlGnBu, PuBuGn
 *   jet, turbo, rainbow
 *
 * Append "_r" to any name to reverse it, e.g. "viridis_r"
 */

const COLORMAPS = {

  // Perceptually uniform (Matplotlib)
  viridis: [
    [68,  1, 84], [72, 40,120], [62, 83,160], [49,104,142],
    [38,130,142], [31,158,137], [53,183,121], [110,206, 88],
    [181,222, 43], [253,231, 37]
  ],

  plasma: [
    [ 13,  8,135], [ 75,  3,161], [125,  3,168], [168, 34,150],
    [203, 70,121], [229,107, 93], [248,148, 65], [253,195, 40],
    [240,249, 33]
  ],

  inferno: [
    [  0,  0,  4], [ 31, 12, 72], [ 85, 15,109], [136, 34,106],
    [186, 54, 85], [227, 89, 51], [249,140, 10], [252,202, 38],
    [252,255,164]
  ],

  magma: [
    [  0,  0,  4], [ 28, 16, 68], [ 79, 18,123], [129, 37,129],
    [181, 54,122], [229, 80,100], [251,135, 97], [254,194,135],
    [252,253,191]
  ],

  cividis: [
    [  0, 32, 76], [  0, 56,110], [  0, 80,128], [ 25,103,138],
    [ 71,126,142], [114,150,143], [158,175,137], [203,201,126],
    [253,231, 37]
  ],

  // Diverging
  RdYlBu: [
    [165,  0, 38], [215, 48, 39], [244,109, 67], [253,174, 97],
    [254,224,144], [255,255,191], [224,243,248], [171,217,233],
    [116,173,209], [ 69,117,180], [ 49, 54,149]
  ],

  RdYlGn: [
    [165,  0, 38], [215, 48, 39], [244,109, 67], [253,174, 97],
    [254,224,139], [255,255,191], [217,239,139], [166,217,106],
    [102,189, 99], [ 26,152, 80], [  0,104, 55]
  ],

  RdBu: [
    [103,  0, 31], [178, 24, 43], [214, 96, 77], [244,165,130],
    [253,219,199], [247,247,247], [209,229,240], [146,197,222],
    [ 67,147,195], [ 33,102,172], [  5, 48, 97]
  ],

  Spectral: [
    [158,  1, 66], [213, 62, 79], [244,109, 67], [253,174, 97],
    [254,224,139], [255,255,191], [230,245,152], [171,221,164],
    [102,194,165], [ 50,136,189], [ 94, 79,162]
  ],

  coolwarm: [
    [ 59, 76,192], [ 90,120,214], [126,161,230], [163,196,244],
    [198,222,249], [220,220,220], [246,196,182], [239,155,132],
    [220,109, 87], [192, 63, 52], [180,  4, 38]
  ],

  bwr: [
    [  0,  0,255], [ 64, 64,255], [128,128,255], [191,191,255],
    [220,220,255], [255,255,255], [255,220,220], [255,191,191],
    [255,128,128], [255, 64, 64], [255,  0,  0]
  ],

  // Sequential single-hue
  Blues: [
    [247,251,255], [222,235,247], [198,219,239], [158,202,225],
    [107,174,214], [ 66,146,198], [ 33,113,181], [  8, 81,156],
    [  8, 48,107]
  ],

  Greens: [
    [247,252,245], [229,245,224], [199,233,192], [161,217,155],
    [116,196,118], [ 65,171, 93], [ 35,139, 69], [  0,109, 44],
    [  0, 68, 27]
  ],

  Reds: [
    [255,245,240], [254,224,210], [252,187,161], [252,146,114],
    [251,106, 74], [239, 59, 44], [203, 24, 29], [165, 15, 21],
    [103,  0, 13]
  ],

  Oranges: [
    [255,245,235], [254,230,206], [253,208,162], [253,174,107],
    [253,141, 60], [241,105, 19], [217, 72,  1], [166, 54,  3],
    [127, 39,  4]
  ],

  Purples: [
    [252,251,253], [239,237,245], [218,218,235], [188,189,220],
    [158,154,200], [128,125,186], [106, 81,163], [ 84, 39,143],
    [ 63,  0,125]
  ],

  Greys: [
    [255,255,255], [240,240,240], [217,217,217], [189,189,189],
    [150,150,150], [115,115,115], [ 82, 82, 82], [ 37, 37, 37],
    [  0,  0,  0]
  ],

  // Multi-hue sequential
  YlOrRd: [
    [255,255,204], [255,237,160], [254,217,118], [254,178, 76],
    [253,141, 60], [252, 78, 42], [227, 26, 28], [189,  0, 38],
    [128,  0, 38]
  ],

  YlGnBu: [
    [255,255,217], [237,248,177], [199,233,180], [127,205,187],
    [ 65,182,196], [ 29,145,192], [ 34, 94,168], [ 37, 52,148],
    [  8, 29, 88]
  ],

  PuBuGn: [
    [255,247,251], [236,226,240], [208,209,230], [166,189,219],
    [103,169,207], [ 54,144,192], [  2,129,138], [  1,108, 89],
    [  1, 70, 54]
  ],

  // Misc
  jet: [
    [  0,  0,143], [  0,  0,255], [  0,127,255], [  0,255,255],
    [127,255,127], [255,255,  0], [255,127,  0], [255,  0,  0],
    [127,  0,  0]
  ],

  turbo: [
    [ 48, 18, 59], [ 70, 96,209], [ 32,185,215], [ 78,232,130],
    [186,250, 50], [249,184, 26], [238, 94, 19], [177, 26, 12],
    [122,  4,  3]
  ],

  rainbow: [
    [128,  0,255], [  0,  0,255], [  0,255,255], [  0,255,  0],
    [255,255,  0], [255,128,  0], [255,  0,  0]
  ],

}

// ── Interpolation ──────────────────────────────────────────────────────────

function lerp(a, b, t) {
  return a + (b - a) * t
}

function sampleColormap(stops, t) {
  const n = stops.length - 1
  const scaled = Math.max(0, Math.min(1, t)) * n
  const lo = Math.floor(scaled)
  const hi = Math.min(lo + 1, n)
  const f = scaled - lo
  return [
    Math.round(lerp(stops[lo][0], stops[hi][0], f)),
    Math.round(lerp(stops[lo][1], stops[hi][1], f)),
    Math.round(lerp(stops[lo][2], stops[hi][2], f)),
  ]
}

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Generate N evenly-spaced RGBA samples from a named colormap.
 *
 * @param {string}  name    Colormap name, optionally suffixed with "_r" to reverse
 * @param {number}  nshades Number of samples
 * @param {number}  alpha   Alpha 0–1 (default 0.75)
 * @returns {Array<[r, g, b, a]>}
 */
export function getColormap(name = "viridis", nshades = 16, alpha = 0.75) {

  const reversed = name.endsWith("_r")
  const key = reversed ? name.slice(0, -2) : name
  let stops = COLORMAPS[key]

  if (!stops) {
    console.warn(`Unknown colormap "${name}", falling back to viridis`)
    stops = COLORMAPS.viridis
  }

  const result = []

  for (let i = 0; i < nshades; i++) {
    let t = i / (nshades - 1)
    if (reversed) t = 1 - t
    const [r, g, b] = sampleColormap(stops, t)
    result.push([r, g, b, alpha])
  }

  return result
}

/**
 * List all available colormap names.
 * @returns {string[]}
 */
export function listColormaps() {
  return Object.keys(COLORMAPS)
}

/**
 * Build a color ramp for OpenLayers WebGL style.
 * Returns interleaved [value, color, value, color, ...] array.
 *
 * @param {string}  name   Colormap name (supports "_r" suffix)
 * @param {number}  min    Data minimum
 * @param {number}  max    Data maximum
 * @param {number}  steps  Number of steps (default 16)
 * @returns {Array}
 */
export function buildColorRamp(name, min, max, steps = 16) {

  const colors = getColormap(name ?? "viridis", steps, 0.75)
  const ramp = []

  for (let i = 0; i < colors.length; i++) {
    const t = i / (colors.length - 1)
    const value = min + t * (max - min)
    ramp.push(value)
    ramp.push(colors[i])
  }

  return ramp
}
