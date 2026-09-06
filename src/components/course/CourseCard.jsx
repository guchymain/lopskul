import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon.jsx'
import { Badge } from '../ui/Badge.jsx'
import { Card } from '../ui/Card.jsx'
import { getInstructorById } from '../../data/fixtures/instructors.js'

export function CourseCard({ course }) {
  const instructor = getInstructorById(course.instructorId)

  return (
    <Card hoverable className="flex flex-col overflow-hidden group">
      <Link to={`/courses/${course.slug}`} className="flex flex-col h-full focus:outline-none">
        <div className="h-36 bg-surface-2 flex items-center justify-center text-ink-soft group-hover:text-accent transition-colors">
          <Icon name={course.accentIcon} size={36} strokeWidth={1.25} />
        </div>
        <div className="flex flex-col gap-2 p-4 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge tone="neutral">{course.level}</Badge>
            {course.format === 'cohort' && <Badge tone="accent">Cohort</Badge>}
            {course.price === 0 && <Badge tone="success">Free</Badge>}
          </div>
          <h3 className="text-body-lg font-semibold text-ink leading-snug group-hover:text-accent-strong transition-colors">
            {course.title}
          </h3>
          <p className="text-body-sm text-ink-soft line-clamp-2">{course.subtitle}</p>
          <p className="text-caption text-ink-soft mt-auto">{instructor?.name}</p>
          <div className="flex items-center justify-between pt-2 border-t border-border mt-1">
            <span className="flex items-center gap-1 text-body-sm text-ink">
              <Icon name="star" size={14} className="text-accent" />
              {course.rating}
              <span className="text-ink-soft">({course.reviewCount.toLocaleString()})</span>
            </span>
            <span className="text-body font-semibold text-ink">
              {course.price === 0 ? 'Free' : `$${course.price}`}
            </span>
          </div>
        </div>
      </Link>
    </Card>
  )
}
