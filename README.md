# STAC Forecast Browser

A lightweight web application to browse **STAC collections and forecast datasets**, search items, and visualize raster assets on an interactive map.

The application is built with:

* **Vite** (development server and bundler)
* **Vanilla JavaScript**
* **OpenLayers** for map visualization
* A **STAC API** backend

The interface allows users to:

* Select a **collection**
* Select an **event**
* Select a **forecast start time**
* Browse **forecast steps**
* Display **COG raster assets** on a map

---

# Requirements

* **Node.js ≥ 18**
* **npm ≥ 9**

Check your versions:

```
node --version
npm --version
```

---

# Installation

Clone the repository:

```
git clone <repository-url>
cd <repository-folder>
```

Install dependencies:

```
npm install
```

---

# Running the development server

Start the Vite development server:

```
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

Vite will automatically reload the page when source files change.

---

# Build for production

Create an optimized build:

```
npm run build
```

The build output will be generated in:

```
dist/
```

To preview the production build locally:

```
npm run preview
```

---

# Project structure

```
.
├── index.html
├── package.json
├── package-lock.json
├── public/
└── src/
    ├── api/
    │   ├── resolveAssetHref.js
    │   └── stacClient.js
    │
    ├── components/
    │   ├── AssetList.js
    │   ├── CollectionSelector.js
    │   ├── EventSelector.js
    │   ├── ItemBrowser.js
    │   ├── StacUrlInput.js
    │   ├── StartTimeSelector.js
    │   └── StepNavigator.js
    │
    ├── map/
    │   ├── baseLayer.js
    │   ├── drawGeometry.js
    │   ├── footprintLayer.js
    │   ├── MapView.js
    │   ├── rasterLayer.js
    │   └── zoomToBBox.js
    │
    ├── state/
    │   └── store.js
    │
    ├── main.js
    └── styles.css
```

---

# Application architecture

The application follows a simple **modular architecture**:

```
UI Components
      ↓
Global State (store.js)
      ↓
Map Rendering (OpenLayers)
```

### Components

* **CollectionSelector** – select STAC collection
* **EventSelector** – select event
* **StartTimeSelector** – select forecast start time
* **ItemBrowser** – browse forecast steps
* **AssetList** – select variable (asset)
* **StepNavigator** – navigate forecast steps

### Map

`MapView` displays:

* Item footprints
* Raster assets (COG) using **GeoTIFF source**

### State management

All components communicate through a **central store (`store.js`)**.

State changes emit events such as:

```
selectedCollectionChanged
selectedItemChanged
selectedAssetChanged
```

This keeps the components loosely coupled.

---

# STAC API configuration

The application expects a STAC API server.

The URL can be configured through the UI or in the state:

```
state.stacUrl
```

Raster assets are resolved through:

```
state.cogUrl
```

Example:

```
STAC API   → http://localhost:8081
COG server → http://localhost:8083
```

---

# Development notes

### Do not commit

The following directories/files should not be included in the repository:

```
node_modules/
dist/
.DS_Store
.vscode/
*.bak
```

---

# License

Add your project license here.

