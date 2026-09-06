const variants = {
  primary: 'bg-ink text-paper hover:bg-ink-soft',
  accent: 'bg-accent text-white hover:bg-accent-strong',
  ghost: 'bg-transparent text-ink border border-border hover:bg-surface-1',
  subtle: 'bg-surface-1 text-ink hover:bg-surface-2',
  danger: 'bg-danger text-white hover:opacity-90',
}

const sizes = {
  sm: 'text-body-sm px-3 py-1.5 gap-1.5',
  md: 'text-body px-4 py-2.5 gap-2',
  lg: 'text-body-lg px-6 py-3 gap-2',
}

export function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center rounded-card font-medium transition-colors duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  )
}
