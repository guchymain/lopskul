import { Checkbox } from '../ui/Input.jsx'
import { Icon } from '../ui/Icon.jsx'

const levels = ['Beginner', 'Intermediate', 'Advanced']
const formats = [
  { value: 'self-paced', label: 'Self-paced' },
  { value: 'cohort', label: 'Cohort' },
]

export function FacetSidebar({ categories, filters, onChange, className = '' }) {
  function update(patch) {
    onChange({ ...filters, ...patch })
  }

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-body-sm font-semibold text-ink">
          <Icon name="filter" size={16} /> Filters
        </h2>
        <button
          onClick={() => onChange({})}
          className="text-caption text-accent-strong hover:underline"
        >
          Clear all
        </button>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-body-sm font-medium text-ink mb-1">Category</legend>
        {categories.map((cat) => (
          <Checkbox
            key={cat}
            id={`cat-${cat}`}
            label={cat}
            checked={filters.category === cat}
            onChange={() => update({ category: filters.category === cat ? undefined : cat })}
          />
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-body-sm font-medium text-ink mb-1">Level</legend>
        {levels.map((lvl) => (
          <Checkbox
            key={lvl}
            id={`lvl-${lvl}`}
            label={lvl}
            checked={filters.level === lvl}
            onChange={() => update({ level: filters.level === lvl ? undefined : lvl })}
          />
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-body-sm font-medium text-ink mb-1">Format</legend>
        {formats.map((f) => (
          <Checkbox
            key={f.value}
            id={`fmt-${f.value}`}
            label={f.label}
            checked={filters.format === f.value}
            onChange={() => update({ format: filters.format === f.value ? undefined : f.value })}
          />
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-body-sm font-medium text-ink mb-1">Price</legend>
        <Checkbox
          id="price-free"
          label="Free only"
          checked={filters.priceMax === 0}
          onChange={() => update({ priceMax: filters.priceMax === 0 ? undefined : 0 })}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-body-sm font-medium text-ink mb-1">Accessibility</legend>
        <Checkbox
          id="captions-only"
          label="Captions available"
          checked={Boolean(filters.captionsOnly)}
          onChange={() => update({ captionsOnly: !filters.captionsOnly })}
        />
      </fieldset>
    </div>
  )
}
