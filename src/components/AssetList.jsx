import { selectedItem, selectedAsset } from "../signals/store"
import { resolveAssetHref } from "../api/resolveAssetHref"

export function AssetList() {

  const item = selectedItem.value

  if (!item) return null

  const assets = Object.entries(item.assets)

  if (!assets.length) return <div class="state-msg">No assets</div>

  return (
    <div class="asset-list">
      {assets.map(([key, asset]) => (
        <AssetCard key={key} assetKey={key} asset={asset} />
      ))}
    </div>
  )
}

function AssetCard({ assetKey, asset }) {

  const isSelected = selectedAsset.value?.variable === asset.variable
  const assetUrl   = resolveAssetHref(asset)

  return (
    <label class="asset-card">
      <input
        type="radio"
        name="asset"
        checked={isSelected}
        onChange={() => selectedAsset.value = asset}
      />
      <div class="asset-header">
        <span class="asset-title">{asset.title || assetKey}</span>
        {asset.step && <span class="asset-step">Step {asset.step}</span>}
      </div>
      <div class="asset-body">
        {asset.label && <div class="asset-label">{asset.label}</div>}
        {asset.unit  && <div class="asset-unit">Units: {asset.unit}</div>}
        {asset.created && <div class="asset-time">Created: {asset.created}</div>}
      </div>
      {assetUrl && (
        <a class="btn btn-download" href={assetUrl} download>⬇</a>
      )}
    </label>
  )
}
