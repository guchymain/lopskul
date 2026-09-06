import { useParams, Navigate } from 'react-router-dom'
import { getInstructorByHandle } from '../../data/fixtures/instructors.js'
import { courses } from '../../data/fixtures/courses.js'
import { CourseCard } from '../../components/course/CourseCard.jsx'
import { ProofBadge } from '../../components/proof/ProofBadge.jsx'
import { Icon } from '../../components/ui/Icon.jsx'

export function InstructorProfile() {
  const { handle } = useParams()
  const instructor = getInstructorByHandle(handle)

  if (!instructor) return <Navigate to="/courses" replace />

  const instructorCourses = courses.filter((c) => c.instructorId === instructor.id)

  return (
    <div className="mx-auto max-w-[1000px] px-4 sm:px-6 py-16">
      <div className="flex items-center gap-5 mb-6">
        <span className="h-20 w-20 rounded-full bg-accent-soft text-accent-strong flex items-center justify-center text-heading-1 font-semibold shrink-0">
          {instructor.avatarInitials}
        </span>
        <div>
          <h1 className="text-heading-1 font-display font-semibold text-ink">{instructor.name}</h1>
          <p className="text-body text-ink-soft">{instructor.title}</p>
        </div>
      </div>
      <p className="text-body text-ink-soft max-w-2xl mb-4">{instructor.bio}</p>
      <div className="flex items-center gap-5 text-body-sm text-ink-soft mb-6">
        <span className="flex items-center gap-1.5"><Icon name="star" size={14} className="text-accent" /> {instructor.rating}</span>
        <span className="flex items-center gap-1.5"><Icon name="user" size={14} /> {instructor.studentsCount.toLocaleString()} students</span>
        <span className="flex items-center gap-1.5"><Icon name="layers" size={14} /> {instructor.coursesCount} courses</span>
      </div>
      <ProofBadge className="mb-10">{instructor.proofBadge}</ProofBadge>

      <h2 className="text-heading-2 font-display font-semibold text-ink mb-4">Courses by {instructor.name.split(' ')[0]}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructorCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
