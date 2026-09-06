import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { getInstructorById } from '../../data/fixtures/instructors.js'
import { courses } from '../../data/fixtures/courses.js'
import { Card } from '../../components/ui/Card.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Badge } from '../../components/ui/Badge.jsx'
import { Icon } from '../../components/ui/Icon.jsx'

export function InstructorCourses() {
  const { user } = useAuth()
  const instructor = getInstructorById(user?.instructorId ?? 'ins-1')
  const myCourses = courses.filter((c) => c.instructorId === instructor.id)

  return (
    <div className="px-4 sm:px-6 py-8 max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-heading-1 font-display font-semibold text-ink">Your courses</h1>
        <Button as={Link} to="/instructor/courses/new" variant="accent" size="md">
          <Icon name="spark" size={16} /> New course
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {myCourses.map((course) => (
          <Card key={course.id} className="p-4 flex items-center gap-4">
            <span className="h-12 w-12 rounded-card bg-surface-2 text-ink-soft flex items-center justify-center shrink-0">
              <Icon name={course.accentIcon} size={20} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-body font-semibold text-ink truncate">{course.title}</p>
              <p className="text-caption text-ink-soft">{course.studentsCount.toLocaleString()} students · {course.rating}★</p>
            </div>
            <Badge tone="success">Published</Badge>
            <div className="flex gap-2 shrink-0">
              <Button as={Link} to={`/instructor/courses/${course.id}/edit`} variant="ghost" size="sm">Edit</Button>
              <Button as={Link} to={`/instructor/courses/${course.id}/students`} variant="ghost" size="sm">Students</Button>
              <Button as={Link} to={`/instructor/courses/${course.id}/qna`} variant="ghost" size="sm">Q&A</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
