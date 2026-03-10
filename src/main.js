import "ol/ol.css"
import "./styles.css"

import { StacUrlInput } from "./components/StacUrlInput"
import { CollectionSelector } from "./components/CollectionSelector"
import { EventSelector } from "./components/EventSelector"
import { StartTimeSelector } from "./components/StartTimeSelector"
import { ItemBrowser } from "./components/ItemBrowser"
import { AssetList } from "./components/AssetList"

import { MapView } from "./map/MapView"
import { StepNavigator } from "./components/StepNavigator"

StacUrlInput(document.getElementById("stac-url"))
CollectionSelector(document.getElementById("collection"))
EventSelector(document.getElementById("event"))
StartTimeSelector(document.getElementById("start-time"))
ItemBrowser(document.getElementById("items"))
AssetList(document.getElementById("assets"))

MapView(document.getElementById("map"))
StepNavigator(document.getElementById("step-nav"))
