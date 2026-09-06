import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { getEnrollmentsForUser } from '../../data/fixtures/enrollments.js'
import { getCourseById, courses } from '../../data/fixtures/courses.js'
import { getTrackById } from '../../data/fixtures/tracks.js'
import { getCertificatesForUser } from '../../data/fixtures/certificates.js'
import { getEffectiveProgress, courseCompletionSummary } from '../../data/services/progressService.js'
import { ContinueLearningRail } from '../../components/dashboard/ContinueLearningRail.jsx'
import { StreakTracker } from '../../components/dashboard/StreakTracker.jsx'
import { CourseCard } from '../../components/course/CourseCard.jsx'
import { CohortCountdownBanner } from '../../components/track/CohortCountdownBanner.jsx'
import { Card } from '../../components/ui/Card.jsx'
import { Icon } from '../../components/ui/Icon.jsx'
import { Button } from '../../components/ui/Button.jsx'

export function Dashboard() {
  const { user } = useAuth()

  useEffect(() => {
    document.title = 'Dashboard — Ledger'
  }, [])

  const enrollments = getEnrollmentsForUser(user.id)
  const courseEnrollments = enrollments.filter((e) => e.itemType === 'course')
  const trackEnrollments = enrollments.filter((e) => e.itemType === 'track')
  const certificates = getCertificatesForUser(user.id)

  const inProgress = courseEnrollments
    .map((e) => {
      const summary = courseCompletionSummary(user.id, e.itemId)
      return { course: summary.course, percent: summary.percent, nextLessonId: summary.progress.currentLessonId }
    })
    .filter((item) => item.percent < 100)

  const enrolledIds = new Set(courseEnrollments.map((e) => e.itemId))
  const recommended = courses.filter((c) => !enrolledIds.has(c.id)).slice(0, 3)

  return (
    <div className="px-4 sm:px-6 py-8 max-w-[1100px] mx-auto flex flex-col gap-10">
      <div>
        <h1 className="text-heading-1 font-display font-semibold text-ink">Welcome back, {user.name.split(' ')[0]}</h1>
        <p className="text-body text-ink-soft mt-1">Here's where you left off.</p>
      </div>

      {trackEnrollments.map((e) => {
        const track = getTrackById(e.itemId)
        if (!track) return null
        return (
          <div key={e.id}>
            <CohortCountdownBanner cohort={track.cohort} />
          </div>
        )
      })}

      <div className="grid lg:grid-cols-[1fr_280px] gap-8">
        <section>
          <h2 className="text-heading-2 font-display font-semibold text-ink mb-4">Continue learning</h2>
          <ContinueLearningRail items={inProgress} />
        </section>
        <StreakTracker days={user.streakDays} />
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading-2 font-display font-semibold text-ink">Recommended for you</h2>
          <Link to="/courses" className="text-body-sm font-medium text-accent-strong hover:underline">Browse all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommended.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-heading-2 font-display font-semibold text-ink mb-4">Your certificates</h2>
        {certificates.length === 0 ? (
          <Card className="p-6 text-body-sm text-ink-soft">Complete a course to earn your first certificate.</Card>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {certificates.map((cert) => {
              const course = getCourseById(cert.itemId)
              return (
                <Card key={cert.id} className="p-4 flex items-center gap-4">
                  <span className="h-11 w-11 rounded-full bg-proof-soft text-proof flex items-center justify-center shrink-0">
                    <Icon name="award" size={20} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-medium text-ink truncate">{course?.title}</p>
                    <p className="text-caption text-ink-soft">Issued {new Date(cert.issuedAt).toLocaleDateString()}</p>
                  </div>
                  <Button as={Link} to={`/certificates/${cert.id}`} variant="ghost" size="sm">View</Button>
                </Card>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
