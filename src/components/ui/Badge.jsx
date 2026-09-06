const tones = {
  neutral: 'bg-surface-2 text-ink-soft',
  accent: 'bg-accent-soft text-accent-strong',
  proof: 'bg-proof-soft text-proof',
  success: 'bg-proof-soft text-success',
  warning: 'bg-accent-soft text-warning',
  danger: 'bg-danger/10 text-danger',
}

export function Badge({ tone = 'neutral', className = '', children, ...rest }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-caption font-medium ${tones[tone]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  )
}
