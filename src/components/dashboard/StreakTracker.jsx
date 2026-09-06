import { Icon } from '../ui/Icon.jsx'
import { Card } from '../ui/Card.jsx'

export function StreakTracker({ days }) {
  const week = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const activeCount = Math.min(days, 7)

  return (
    <Card className="p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Icon name="spark" size={18} className="text-accent" />
        <p className="text-body font-semibold text-ink">{days}-day streak</p>
      </div>
      <div className="flex gap-1.5">
        {week.map((day, i) => (
          <div
            key={i}
            className={`flex-1 h-8 rounded-md flex items-center justify-center text-caption font-medium ${
              i < activeCount ? 'bg-accent text-white' : 'bg-surface-2 text-ink-soft'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <p className="text-caption text-ink-soft">Keep learning today to extend your streak.</p>
    </Card>
  )
}
