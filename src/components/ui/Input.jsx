export function Input({ label, id, hint, className = '', ...rest }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      {label && <span className="text-body-sm font-medium text-ink">{label}</span>}
      <input
        id={id}
        className={`rounded-card border border-border bg-surface-0 px-3.5 py-2.5 text-body text-ink placeholder:text-ink-soft/60 focus:border-accent transition-colors ${className}`}
        {...rest}
      />
      {hint && <span className="text-caption text-ink-soft">{hint}</span>}
    </label>
  )
}

export function Select({ label, id, className = '', children, ...rest }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      {label && <span className="text-body-sm font-medium text-ink">{label}</span>}
      <select
        id={id}
        className={`rounded-card border border-border bg-surface-0 px-3.5 py-2.5 text-body text-ink focus:border-accent transition-colors ${className}`}
        {...rest}
      >
        {children}
      </select>
    </label>
  )
}

export function Checkbox({ label, id, className = '', ...rest }) {
  return (
    <label htmlFor={id} className={`flex items-center gap-2.5 text-body-sm text-ink cursor-pointer ${className}`}>
      <input id={id} type="checkbox" className="h-4 w-4 rounded accent-accent border-border" {...rest} />
      {label}
    </label>
  )
}
