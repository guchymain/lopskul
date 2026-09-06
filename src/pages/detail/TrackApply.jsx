import { useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { getTrackBySlug } from '../../data/fixtures/tracks.js'
import { StepProgressDots } from '../../components/forms/StepProgressDots.jsx'
import { Card } from '../../components/ui/Card.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Select, Checkbox } from '../../components/ui/Input.jsx'

export function TrackApply() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const track = getTrackBySlug(slug)
  const [step, setStep] = useState(0)
  const [checks, setChecks] = useState({})

  if (!track) return <Navigate to="/tracks" replace />

  const steps = ['Availability', 'Experience', 'Motivation']

  function toggle(key) {
    setChecks((c) => ({ ...c, [key]: !c[key] }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    navigate(`/checkout/track/${track.id}`)
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <Card className="p-8 flex flex-col gap-6">
        <div>
          <p className="text-caption font-semibold uppercase tracking-wide text-accent-strong mb-2">Applying to</p>
          <h1 className="text-heading-1 font-display font-semibold text-ink">{track.title}</h1>
        </div>
        <StepProgressDots steps={steps.length} current={step} />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {step === 0 && (
            <>
              <Select id="hours" label={`Can you commit ~${track.cohort.weeklyCommitmentHours} hrs/week?`} required>
                <option value="yes">Yes, comfortably</option>
                <option value="tight">It'll be tight, but yes</option>
                <option value="no">Not currently</option>
              </Select>
              <Select id="start" label="Preferred start" required>
                <option value="next">Next cohort ({new Date(track.cohort.nextStart).toLocaleDateString()})</option>
                <option value="later">A later cohort</option>
              </Select>
            </>
          )}
          {step === 1 && (
            <div className="flex flex-col gap-2">
              <p className="text-body-sm font-medium text-ink mb-1">Which of these describe you?</p>
              {track.eligibility.map((item) => (
                <Checkbox key={item} id={item} label={item} checked={Boolean(checks[item])} onChange={() => toggle(item)} />
              ))}
            </div>
          )}
          {step === 2 && (
            <label htmlFor="motivation" className="flex flex-col gap-1.5">
              <span className="text-body-sm font-medium text-ink">Why this track, why now?</span>
              <textarea
                id="motivation"
                required
                rows={5}
                placeholder="A couple of sentences is plenty."
                className="rounded-card border border-border bg-surface-0 px-3.5 py-2.5 text-body-sm focus:border-accent resize-none"
              />
            </label>
          )}

          <div className="flex justify-between pt-2">
            <Button type="button" variant="ghost" size="md" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button type="button" variant="accent" size="md" onClick={() => setStep((s) => s + 1)}>
                Continue
              </Button>
            ) : (
              <Button type="submit" variant="accent" size="md">
                Continue to payment
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
