import { Link } from 'react-router-dom'
import { Card } from '../ui/Card.jsx'
import { ProofBadge } from '../proof/ProofBadge.jsx'
import { Icon } from '../ui/Icon.jsx'

export function InstructorBioCard({ instructor }) {
  return (
    <Card className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="h-14 w-14 rounded-full bg-accent-soft text-accent-strong flex items-center justify-center text-heading-3 font-semibold shrink-0">
          {instructor.avatarInitials}
        </span>
        <div>
          <Link to={`/instructors/${instructor.handle}`} className="text-body-lg font-semibold text-ink hover:text-accent-strong">
            {instructor.name}
          </Link>
          <p className="text-body-sm text-ink-soft">{instructor.title}</p>
        </div>
      </div>
      <p className="text-body-sm text-ink-soft">{instructor.bio}</p>
      <div className="flex items-center gap-4 text-body-sm text-ink-soft">
        <span className="flex items-center gap-1.5">
          <Icon name="star" size={14} className="text-accent" /> {instructor.rating}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="user" size={14} /> {instructor.studentsCount.toLocaleString()} students
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="layers" size={14} /> {instructor.coursesCount} courses
        </span>
      </div>
      <ProofBadge>{instructor.proofBadge}</ProofBadge>
    </Card>
  )
}
