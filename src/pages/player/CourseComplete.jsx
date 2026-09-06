import { useParams, Navigate, Link } from 'react-router-dom'
import { getCourseById } from '../../data/fixtures/courses.js'
import { getCertificatesForUser } from '../../data/fixtures/certificates.js'
import { useAuth } from '../../hooks/useAuth.js'
import { Button } from '../../components/ui/Button.jsx'
import { Icon } from '../../components/ui/Icon.jsx'

export function CourseComplete() {
  const { courseId } = useParams()
  const { user } = useAuth()
  const course = getCourseById(courseId)

  if (!course) return <Navigate to="/dashboard/my-learning" replace />

  const existingCert = getCertificatesForUser(user.id).find((c) => c.itemId === courseId)

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center flex flex-col items-center gap-5">
      <span className="h-20 w-20 rounded-full bg-proof-soft text-proof flex items-center justify-center">
        <Icon name="award" size={36} />
      </span>
      <h1 className="text-display-lg font-display font-semibold text-ink">Course complete</h1>
      <p className="text-body-lg text-ink-soft">
        You finished <strong className="text-ink">{course.title}</strong>. That's real, verifiable progress.
      </p>
      <div className="flex gap-3">
        <Button as={Link} to="/dashboard/my-learning" variant="ghost" size="lg">
          Back to My Learning
        </Button>
        <Button as={Link} to={`/certificates/${existingCert?.id ?? 'cert-1'}`} variant="accent" size="lg">
          View certificate
        </Button>
      </div>
    </div>
  )
}
