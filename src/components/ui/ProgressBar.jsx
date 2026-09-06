export function ProgressBar({ percent, label, className = '' }) {
  const clamped = Math.max(0, Math.min(100, percent))
  return (
    <div className={className}>
      {label && (
        <div className="flex items-center justify-between mb-1.5 text-caption text-ink-soft">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full rounded-full bg-surface-2 overflow-hidden"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
