export function BaseSelector({ label, value, onChange, disabled, loading, error, placeholder, options, getKey, getLabel }) {
  const key   = getKey   ?? (o => o)
  const label_ = getLabel ?? (o => o)
  return (
    <div>
      <label>{label}</label>
      <select value={value ?? ""} onChange={e => onChange(e.target.value || null)} disabled={disabled}>
        <option value="">
          {loading ? "Loading…" : error ? "Failed to load" : placeholder}
        </option>
        {options.map(o => (
          <option key={key(o)} value={key(o)}>{label_(o)}</option>
        ))}
      </select>
    </div>
  )
}
