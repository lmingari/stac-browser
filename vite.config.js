import { defineConfig } from "vite"
import preact from "@preact/preset-vite"

export default defineConfig({
  base: "/fall3d-viewer/",
  publicDir: "static",
  plugins: [preact()]
})
