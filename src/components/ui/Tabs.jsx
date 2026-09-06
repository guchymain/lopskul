export function Tabs({ tabs, active, onChange, className = '' }) {
  return (
    <div role="tablist" className={`flex gap-1 border-b border-border overflow-x-auto ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.value === active
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={`whitespace-nowrap px-4 py-2.5 text-body-sm font-medium border-b-2 transition-colors ${
              isActive
                ? 'border-accent text-ink'
                : 'border-transparent text-ink-soft hover:text-ink'
            }`}
          >
            {tab.label}
            {tab.count != null && <span className="ml-1.5 text-caption text-ink-soft">({tab.count})</span>}
          </button>
        )
      })}
    </div>
  )
}
