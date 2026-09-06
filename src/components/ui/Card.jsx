export function Card({ className = '', hoverable = false, children, ...rest }) {
  return (
    <div
      className={`bg-surface-0 border border-border rounded-card ${
        hoverable ? 'transition-shadow duration-200 hover:shadow-lg' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
