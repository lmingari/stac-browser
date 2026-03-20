import { itemKeywords, selectedKeyword } from "../../signals/store"

export function KeywordFilter() {
  const keywords = itemKeywords.value
  if (!keywords.length) return null

  return (
    <div>
      <label>Group</label>
      <div class="keyword-tabs">
        <button
          class={`keyword-tab ${!selectedKeyword.value ? "active" : ""}`}
          onClick={() => selectedKeyword.value = null}
        >
          All
        </button>
        {keywords.map(({ key, keywords: kw }) => (
          <button
            key={key}
            class={`keyword-tab ${selectedKeyword.value === key ? "active" : ""}`}
            onClick={() => selectedKeyword.value = key}
          >
            {kw.join("/")}
          </button>
        ))}
      </div>
    </div>
  )
}
