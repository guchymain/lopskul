import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { fetchCourseBySlug, relatedCourses } from '../../data/services/courseService.js'
import { getInstructorById } from '../../data/fixtures/instructors.js'
import { getEnrollmentsForUser } from '../../data/fixtures/enrollments.js'
import { StickyEnrollCard } from '../../components/course/StickyEnrollCard.jsx'
import { CurriculumAccordion } from '../../components/course/CurriculumAccordion.jsx'
import { InstructorBioCard } from '../../components/course/InstructorBioCard.jsx'
import { RelatedCoursesCarousel } from '../../components/course/RelatedCoursesCarousel.jsx'
import { Badge } from '../../components/ui/Badge.jsx'
import { Icon } from '../../components/ui/Icon.jsx'
import { useAuth } from '../../hooks/useAuth.js'

const sampleReviews = [
  { id: 1, author: 'Kelechi U.', rating: 5, body: 'The SQL section alone was worth the price. Real datasets, real messiness.' },
  { id: 2, author: 'Priya S.', rating: 4, body: 'Clear pacing. Wish there were a couple more practice sets in the pandas section.' },
  { id: 3, author: 'Noah B.', rating: 5, body: 'First course that actually explained window functions in a way that stuck.' },
]

const sampleQuestions = [
  { id: 1, author: 'Femi A.', question: 'Do I need to know Python before starting?', answer: 'No — the Python section starts from basics assuming only spreadsheet familiarity.' },
  { id: 2, author: 'Ivy T.', question: 'Is the capstone dataset the same for everyone?', answer: 'Everyone gets the same base dataset, but you choose the business question you analyze.' },
]

export function CourseDetail() {
  const { slug } = useParams()
  const { user, isAuthenticated } = useAuth()
  const [course, setCourse] = useState(undefined)
  const [related, setRelated] = useState([])
  const [wishlisted, setWishlisted] = useState(false)

  useEffect(() => {
    let active = true
    fetchCourseBySlug(slug).then((data) => {
      if (!active) return
      setCourse(data)
      if (data) relatedCourses(data).then(setRelated)
    })
    return () => {
      active = false
    }
  }, [slug])

  useEffect(() => {
    if (course) document.title = `${course.title} — Ledger`
  }, [course])

  if (course === null) return <Navigate to="/courses" replace />
  if (course === undefined) {
    return <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-24 text-center text-ink-soft">Loading course…</div>
  }

  const instructor = getInstructorById(course.instructorId)
  const isEnrolled = isAuthenticated && getEnrollmentsForUser(user.id).some((e) => e.itemType === 'course' && e.itemId === course.id)
  const ratingCounts = [72, 18, 6, 3, 1]

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-10">
      <nav className="text-caption text-ink-soft mb-4" aria-label="Breadcrumb">
        <Link to="/courses" className="hover:text-ink">Courses</Link> /{' '}
        <Link to={`/categories/${course.category}`} className="hover:text-ink">{course.category}</Link>
      </nav>

      <div className="grid lg:grid-cols-[1fr_340px] gap-10">
        <div className="flex flex-col gap-10 min-w-0">
          <header className="flex flex-col gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge tone="neutral">{course.level}</Badge>
              <Badge tone="neutral">{course.format === 'cohort' ? 'Cohort' : 'Self-paced'}</Badge>
              {course.captionsAvailable && <Badge tone="neutral">Captions</Badge>}
            </div>
            <h1 className="text-display-lg font-display font-semibold text-ink">{course.title}</h1>
            <p className="text-body-lg text-ink-soft">{course.subtitle}</p>
            <div className="flex items-center gap-4 text-body-sm text-ink-soft flex-wrap">
              <span className="flex items-center gap-1.5">
                <Icon name="star" size={15} className="text-accent" /> {course.rating} ({course.reviewCount.toLocaleString()} reviews)
              </span>
              <span>{course.studentsCount.toLocaleString()} students</span>
              <span>{course.language}</span>
            </div>
          </header>

          <section aria-labelledby="outcome-heading" className="rounded-card bg-proof-soft p-5">
            <h2 id="outcome-heading" className="sr-only">Outcome</h2>
            <p className="flex items-center gap-2 text-body font-medium text-proof">
              <Icon name="shield" size={18} /> {course.outcomeStat}
            </p>
          </section>

          <section aria-labelledby="learn-heading">
            <h2 id="learn-heading" className="text-heading-2 font-display font-semibold text-ink mb-4">What you'll learn</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {course.whatYoullLearn.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-body-sm text-ink">
                  <Icon name="check" size={16} className="text-proof shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="curriculum-heading">
            <h2 id="curriculum-heading" className="text-heading-2 font-display font-semibold text-ink mb-4">Curriculum</h2>
            <CurriculumAccordion curriculum={course.curriculum} />
          </section>

          <section aria-labelledby="requirements-heading">
            <h2 id="requirements-heading" className="text-heading-2 font-display font-semibold text-ink mb-4">Requirements</h2>
            <ul className="flex flex-col gap-2">
              {course.requirements.map((req) => (
                <li key={req} className="flex items-center gap-2.5 text-body-sm text-ink-soft">
                  <Icon name="chevronRight" size={14} /> {req}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="instructor-heading">
            <h2 id="instructor-heading" className="text-heading-2 font-display font-semibold text-ink mb-4">Your instructor</h2>
            <InstructorBioCard instructor={instructor} />
          </section>

          <section aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className="text-heading-2 font-display font-semibold text-ink mb-4">Ratings & reviews</h2>
            <div className="grid sm:grid-cols-[200px_1fr] gap-6 mb-6">
              <div className="text-center sm:text-left">
                <p className="text-display-lg font-display font-semibold text-ink">{course.rating}</p>
                <p className="text-body-sm text-ink-soft">{course.reviewCount.toLocaleString()} ratings</p>
              </div>
              <div className="flex flex-col gap-1.5 justify-center">
                {[5, 4, 3, 2, 1].map((stars, i) => (
                  <div key={stars} className="flex items-center gap-2 text-caption text-ink-soft">
                    <span className="w-8">{stars}★</span>
                    <div className="flex-1 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${ratingCounts[i]}%` }} />
                    </div>
                    <span className="w-8 text-right">{ratingCounts[i]}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {sampleReviews.map((review) => (
                <div key={review.id} className="border-t border-border pt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-body-sm font-medium text-ink">{review.author}</p>
                    <span className="flex items-center gap-0.5 text-caption text-accent">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Icon key={i} name="star" size={12} />
                      ))}
                    </span>
                  </div>
                  <p className="text-body-sm text-ink-soft">{review.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="qna-heading">
            <h2 id="qna-heading" className="text-heading-2 font-display font-semibold text-ink mb-4">Questions & answers</h2>
            <div className="flex flex-col gap-5">
              {sampleQuestions.map((q) => (
                <div key={q.id} className="border border-border rounded-card p-4">
                  <p className="text-body-sm font-medium text-ink mb-1">Q: {q.question}</p>
                  <p className="text-body-sm text-ink-soft">A: {q.answer} — <span className="text-caption">asked by {q.author}</span></p>
                </div>
              ))}
            </div>
          </section>

          {related.length > 0 && (
            <section aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-heading-2 font-display font-semibold text-ink mb-4">Students also explored</h2>
              <RelatedCoursesCarousel courses={related} />
            </section>
          )}
        </div>

        <div>
          <StickyEnrollCard
            course={course}
            isEnrolled={isEnrolled}
            wishlisted={wishlisted}
            onToggleWishlist={() => setWishlisted((w) => !w)}
          />
        </div>
      </div>
    </div>
  )
}
