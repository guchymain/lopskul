import { useParams, Link } from 'react-router-dom'
import { getCourseById } from '../../data/fixtures/courses.js'
import { Card } from '../../components/ui/Card.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { ProgressBar } from '../../components/ui/ProgressBar.jsx'

const mockRoster = [
  { name: 'Grace M.', percent: 100 },
  { name: 'Femi A.', percent: 72 },
  { name: 'Ivy T.', percent: 45 },
  { name: 'Kelechi U.', percent: 90 },
  { name: 'Noah B.', percent: 15 },
]

export function StudentManagement() {
  const { id } = useParams()
  const course = getCourseById(id)

  return (
    <div className="px-4 sm:px-6 py-8 max-w-[900px] mx-auto">
      <Link to="/instructor/courses" className="text-body-sm text-ink-soft hover:text-ink mb-4 inline-block">← Back to courses</Link>
      <h1 className="text-heading-1 font-display font-semibold text-ink mb-1">Students</h1>
      <p className="text-body-sm text-ink-soft mb-6">{course?.title}</p>

      <div className="flex flex-col gap-3">
        {mockRoster.map((student) => (
          <Card key={student.name} className="p-4 flex items-center gap-4">
            <span className="h-10 w-10 rounded-full bg-accent-soft text-accent-strong flex items-center justify-center text-body-sm font-semibold shrink-0">
              {student.name.split(' ').map((n) => n[0]).join('')}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-medium text-ink">{student.name}</p>
              <ProgressBar percent={student.percent} className="mt-1.5 max-w-xs" />
            </div>
            <Button variant="ghost" size="sm">Message</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
