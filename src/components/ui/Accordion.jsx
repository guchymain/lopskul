import { useState } from 'react'
import { Icon } from './Icon.jsx'

export function AccordionItem({ id, title, subtitle, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = `accordion-panel-${id}`
  const buttonId = `accordion-button-${id}`

  return (
    <div className="border border-border rounded-card overflow-hidden bg-surface-0">
      <h3>
        <button
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left hover:bg-surface-1 transition-colors"
        >
          <span className="flex flex-col">
            <span className="text-body font-medium text-ink">{title}</span>
            {subtitle && <span className="text-caption text-ink-soft">{subtitle}</span>}
          </span>
          <Icon
            name="chevronDown"
            size={18}
            className={`shrink-0 text-ink-soft transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="border-t border-border px-4 py-3"
      >
        {children}
      </div>
    </div>
  )
}

export function Accordion({ children, className = '' }) {
  return <div className={`flex flex-col gap-3 ${className}`}>{children}</div>
}
