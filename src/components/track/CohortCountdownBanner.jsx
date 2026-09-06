import { Icon } from '../ui/Icon.jsx'

function daysUntil(dateString) {
  const diff = new Date(dateString).getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function CohortCountdownBanner({ cohort, className = '' }) {
  const days = daysUntil(cohort.nextStart)
  const seatsPercent = Math.round((cohort.seatsRemaining / cohort.seatsTotal) * 100)

  return (
    <div className={`rounded-card bg-ink text-paper p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between ${className}`}>
      <div className="flex items-center gap-3">
        <Icon name="clock" size={22} className="text-accent" />
        <div>
          <p className="text-body-lg font-semibold">Next cohort starts in {days} days</p>
          <p className="text-body-sm text-paper/70">
            {cohort.seatsRemaining} of {cohort.seatsTotal} seats remaining
            {seatsPercent <= 30 && ' — filling quickly'}
          </p>
        </div>
      </div>
      <div className="text-body-sm text-paper/70">~{cohort.weeklyCommitmentHours} hrs/week commitment</div>
    </div>
  )
}
