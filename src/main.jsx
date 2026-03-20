import "ol/ol.css"
import "./styles/base.css"
import "./styles/components.css"
import "./styles/map.css"

import { render } from "preact"
import { App } from "./components/App"

render(<App />, document.getElementById("root"))
