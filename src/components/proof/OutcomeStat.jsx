export function OutcomeStat({ value, label, className = '' }) {
  return (
    <div className={className}>
      <p className="font-display text-display-lg text-ink">{value}</p>
      <p className="text-body-sm text-ink-soft mt-1">{label}</p>
    </div>
  )
}
