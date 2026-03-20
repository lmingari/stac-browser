export function BaseSelector({ label, value, onChange, disabled, loading, error, placeholder, options }) {
  return (
    <div>
      <label>{label}</label>
      <select value={value ?? ""} onChange={e => onChange(e.target.value || null)} disabled={disabled}>
        <option value="">
          {loading ? "Loading…" : error ? "Failed to load" : placeholder}
        </option>
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}
