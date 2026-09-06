import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { getCourseById } from '../../data/fixtures/courses.js'
import { Card } from '../../components/ui/Card.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Checkbox } from '../../components/ui/Input.jsx'
import { Icon } from '../../components/ui/Icon.jsx'

const rubric = [
  'Analysis answers a clearly stated business question',
  'Data cleaning steps are documented',
  'At least one visualization supports the conclusion',
  'Recommendation is specific and actionable',
]

export function ProjectSubmission() {
  const { courseId } = useParams()
  const course = getCourseById(courseId)
  const [submitted, setSubmitted] = useState(false)
  const [checked, setChecked] = useState({})

  if (!course) return <Navigate to="/dashboard/my-learning" replace />

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Link to={`/learn/${course.id}/${course.curriculum[0].lessons[0].id}`} className="text-body-sm text-ink-soft hover:text-ink mb-4 inline-block">
        ← Back to course
      </Link>
      <h1 className="text-heading-1 font-display font-semibold text-ink mb-2">Capstone project</h1>
      <p className="text-body text-ink-soft mb-8">{course.title}</p>

      {submitted ? (
        <Card className="p-8 flex flex-col items-center gap-4 text-center">
          <span className="h-14 w-14 rounded-full bg-proof-soft text-proof flex items-center justify-center">
            <Icon name="check" size={26} />
          </span>
          <h2 className="text-heading-2 font-display font-semibold text-ink">Submitted for review</h2>
          <p className="text-body-sm text-ink-soft max-w-sm">
            Two peers and your instructor will review this within 5 days. You'll get feedback in your notifications.
          </p>
          <div className="w-full border-t border-border pt-4 mt-2 text-left">
            <h3 className="text-body-sm font-semibold text-ink mb-2">Review queue</h3>
            <div className="flex items-center gap-3 text-body-sm text-ink-soft">
              <span className="h-8 w-8 rounded-full bg-surface-2 flex items-center justify-center text-caption">?</span>
              Waiting for a peer reviewer to pick this up
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6 flex flex-col gap-6">
          <div>
            <h2 className="text-body-lg font-semibold text-ink mb-3">Self-check rubric</h2>
            <div className="flex flex-col gap-2">
              {rubric.map((item) => (
                <Checkbox
                  key={item}
                  id={item}
                  label={item}
                  checked={Boolean(checked[item])}
                  onChange={() => setChecked((c) => ({ ...c, [item]: !c[item] }))}
                />
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="submission-link" className="flex flex-col gap-1.5">
              <span className="text-body-sm font-medium text-ink">Link to your work</span>
              <input
                id="submission-link"
                type="url"
                required
                placeholder="https://github.com/you/capstone"
                className="rounded-card border border-border bg-surface-0 px-3.5 py-2.5 text-body-sm focus:border-accent"
              />
            </label>
            <label htmlFor="submission-notes" className="flex flex-col gap-1.5">
              <span className="text-body-sm font-medium text-ink">Anything reviewers should know?</span>
              <textarea
                id="submission-notes"
                rows={4}
                placeholder="Optional context about your approach or constraints."
                className="rounded-card border border-border bg-surface-0 px-3.5 py-2.5 text-body-sm focus:border-accent resize-none"
              />
            </label>
            <Button type="submit" variant="accent" size="lg">Submit for review</Button>
          </form>
        </Card>
      )}
    </div>
  )
}
