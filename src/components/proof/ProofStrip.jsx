import { OutcomeStat } from './OutcomeStat.jsx'

export function ProofStrip({ stats, className = '' }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 ${className}`}>
      {stats.map((stat) => (
        <OutcomeStat key={stat.label} value={stat.value} label={stat.label} />
      ))}
    </div>
  )
}
