import "ol/ol.css"
import "./styles/base.css"
import "./styles/layout.css"
import "./styles/filters.css"
import "./styles/catalogue.css"
import "./styles/items.css"
import "./styles/assets.css"
import "./styles/navigator.css"
import "./styles/map.css"

import { render } from "preact"
import { App } from "./components/layout"

render(<App />, document.getElementById("root"))
