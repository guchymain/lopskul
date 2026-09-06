import { Link } from 'react-router-dom'
import { Card } from '../ui/Card.jsx'
import { ProgressBar } from '../ui/ProgressBar.jsx'
import { Button } from '../ui/Button.jsx'
import { Icon } from '../ui/Icon.jsx'

export function ContinueLearningRail({ items }) {
  if (items.length === 0) {
    return (
      <Card className="p-8 text-center flex flex-col items-center gap-3">
        <Icon name="compass" size={28} className="text-ink-soft" />
        <p className="text-body text-ink-soft">No courses in progress yet.</p>
        <Button as={Link} to="/courses" variant="accent" size="sm">
          Browse courses
        </Button>
      </Card>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(({ course, percent, nextLessonId }) => (
        <Card key={course.id} hoverable className="p-4 flex flex-col gap-3">
          <div className="h-24 rounded-card bg-surface-2 overflow-hidden">
            <img src={course.image} alt={course.title} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <h3 className="text-body font-semibold text-ink leading-snug">{course.title}</h3>
          <ProgressBar percent={percent} />
          <Button
            as={Link}
            to={`/learn/${course.id}/${nextLessonId ?? course.curriculum[0].lessons[0].id}`}
            variant="subtle"
            size="sm"
          >
            {percent === 0 ? 'Start' : 'Resume'}
          </Button>
        </Card>
      ))}
    </div>
  )
}
