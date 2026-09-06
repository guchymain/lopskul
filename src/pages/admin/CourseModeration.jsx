import { useState } from 'react'
import { courses } from '../../data/fixtures/courses.js'
import { Card } from '../../components/ui/Card.jsx'
import { Badge } from '../../components/ui/Badge.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Icon } from '../../components/ui/Icon.jsx'

const pendingCourses = [
  { id: 'p-1', title: 'Kubernetes for Application Teams', instructor: 'Zainab Musa', submittedAt: '2026-09-04' },
  { id: 'p-2', title: 'Copywriting That Converts', instructor: 'Tomas Rivera', submittedAt: '2026-09-05' },
  { id: 'p-3', title: 'Figma to Production Handoff', instructor: 'David Chen', submittedAt: '2026-09-06' },
]

export function CourseModeration() {
  const [queue, setQueue] = useState(pendingCourses)

  function resolve(id) {
    setQueue((q) => q.filter((c) => c.id !== id))
  }

  return (
    <div className="px-4 sm:px-6 py-8 max-w-[1000px] mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-heading-1 font-display font-semibold text-ink mb-1">Course moderation</h1>
        <p className="text-body-sm text-ink-soft">{queue.length} courses awaiting review</p>
      </div>

      <div className="flex flex-col gap-3">
        {queue.map((c) => (
          <Card key={c.id} className="p-4 flex items-center gap-4">
            <span className="h-11 w-11 rounded-card bg-surface-2 text-ink-soft flex items-center justify-center shrink-0">
              <Icon name="layers" size={18} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-medium text-ink">{c.title}</p>
              <p className="text-caption text-ink-soft">By {c.instructor} · Submitted {new Date(c.submittedAt).toLocaleDateString()}</p>
            </div>
            <Badge tone="warning">Pending</Badge>
            <div className="flex gap-2 shrink-0">
              <Button variant="ghost" size="sm">Preview</Button>
              <Button variant="danger" size="sm" onClick={() => resolve(c.id)}>Reject</Button>
              <Button variant="primary" size="sm" onClick={() => resolve(c.id)}>Approve</Button>
            </div>
          </Card>
        ))}
        {queue.length === 0 && <p className="text-body-sm text-ink-soft text-center py-10">Queue is clear.</p>}
      </div>

      <div>
        <h2 className="text-heading-2 font-display font-semibold text-ink mb-4">Published catalog</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {courses.slice(0, 6).map((c) => (
            <Card key={c.id} className="p-3 flex items-center justify-between gap-3">
              <p className="text-body-sm text-ink truncate">{c.title}</p>
              <Badge tone="success">Live</Badge>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
