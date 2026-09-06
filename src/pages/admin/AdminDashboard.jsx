import { Card } from '../../components/ui/Card.jsx'
import { chartSeries } from '../../design/tokens.js'
import { courses } from '../../data/fixtures/courses.js'
import { tracks } from '../../data/fixtures/tracks.js'

const metrics = [
  { label: 'Monthly active learners', value: '84.2K' },
  { label: 'GMV (30 days)', value: '$412K' },
  { label: 'Avg. completion rate', value: '61%' },
  { label: 'Learner NPS', value: '58' },
]

const growth = [30, 42, 38, 51, 58, 64, 72]

export function AdminDashboard() {
  return (
    <div className="px-4 sm:px-6 py-8 max-w-[1100px] mx-auto flex flex-col gap-8">
      <h1 className="text-heading-1 font-display font-semibold text-ink">Platform overview</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m) => (
          <Card key={m.label} className="p-5">
            <p className="text-caption text-ink-soft mb-1">{m.label}</p>
            <p className="text-heading-1 font-display font-semibold text-ink">{m.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <p className="text-body-sm font-semibold text-ink mb-4">Learner growth (last 7 weeks)</p>
        <div className="flex items-end gap-2 h-32">
          {growth.map((v, i) => (
            <div key={i} className="flex-1 rounded-t-md" style={{ height: `${v}%`, backgroundColor: chartSeries[1] }} />
          ))}
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-5">
        <Card className="p-5">
          <p className="text-body-sm font-semibold text-ink mb-2">Catalog</p>
          <p className="text-body-sm text-ink-soft">{courses.length} published courses</p>
          <p className="text-body-sm text-ink-soft">{tracks.length} career tracks</p>
        </Card>
        <Card className="p-5">
          <p className="text-body-sm font-semibold text-ink mb-2">Queues needing attention</p>
          <p className="text-body-sm text-ink-soft">3 courses pending review</p>
          <p className="text-body-sm text-ink-soft">2 support tickets open</p>
        </Card>
      </div>
    </div>
  )
}
