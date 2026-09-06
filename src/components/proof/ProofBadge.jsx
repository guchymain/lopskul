import { Icon } from '../ui/Icon.jsx'

export function ProofBadge({ children, className = '' }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-card bg-proof-soft text-proof px-3 py-2 text-body-sm font-medium ${className}`}
    >
      <Icon name="shield" size={16} />
      {children}
    </div>
  )
}
