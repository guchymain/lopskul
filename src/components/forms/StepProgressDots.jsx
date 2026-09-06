export function StepProgressDots({ steps, current }) {
  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={steps}>
      {Array.from({ length: steps }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === current ? 'w-8 bg-accent' : i < current ? 'w-4 bg-accent/50' : 'w-4 bg-surface-2'
          }`}
        />
      ))}
    </div>
  )
}
