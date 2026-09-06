import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { fetchTrackBySlug } from '../../data/services/courseService.js'
import { CohortCountdownBanner } from '../../components/track/CohortCountdownBanner.jsx'
import { ProgramPhaseTimeline } from '../../components/track/ProgramPhaseTimeline.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Icon } from '../../components/ui/Icon.jsx'
import { Card } from '../../components/ui/Card.jsx'

export function TrackDetail() {
  const { slug } = useParams()
  const [track, setTrack] = useState(undefined)

  useEffect(() => {
    let active = true
    fetchTrackBySlug(slug).then((data) => active && setTrack(data))
    return () => {
      active = false
    }
  }, [slug])

  useEffect(() => {
    if (track) document.title = `${track.title} — Ledger`
  }, [track])

  if (track === null) return <Navigate to="/tracks" replace />
  if (track === undefined) {
    return <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-24 text-center text-ink-soft">Loading track…</div>
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-10">
      <nav className="text-caption text-ink-soft mb-4" aria-label="Breadcrumb">
        <Link to="/tracks" className="hover:text-ink">Career tracks</Link>
      </nav>

      <div className="grid lg:grid-cols-[1fr_340px] gap-10">
        <div className="flex flex-col gap-10 min-w-0">
          <header className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-wide text-accent-strong">
              <Icon name="compass" size={14} /> {track.category} career track
            </span>
            <h1 className="text-display-lg font-display font-semibold text-ink">{track.title}</h1>
            <p className="text-body-lg text-ink-soft">{track.subtitle}</p>
          </header>

          <CohortCountdownBanner cohort={track.cohort} />

          <section aria-labelledby="outcomes-heading">
            <h2 id="outcomes-heading" className="text-heading-2 font-display font-semibold text-ink mb-4">Outcomes</h2>
            <div className="grid grid-cols-3 gap-4">
              {track.outcomeStats.map((stat) => (
                <div key={stat.label} className="text-center border border-border rounded-card p-4">
                  <p className="text-heading-1 font-display font-semibold text-ink">{stat.value}</p>
                  <p className="text-caption text-ink-soft mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="phases-heading">
            <h2 id="phases-heading" className="text-heading-2 font-display font-semibold text-ink mb-4">Program structure</h2>
            <ProgramPhaseTimeline phases={track.phases} />
          </section>

          <section aria-labelledby="eligibility-heading">
            <h2 id="eligibility-heading" className="text-heading-2 font-display font-semibold text-ink mb-4">Is this for you?</h2>
            <ul className="flex flex-col gap-2.5">
              {track.eligibility.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-body-sm text-ink">
                  <Icon name="check" size={16} className="text-proof shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="p-5 flex flex-col gap-4">
            <div className="relative h-36 rounded-card overflow-hidden">
              <img src={track.image} alt={track.title} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-display-lg font-display font-semibold text-ink">${track.price.deposit}</p>
              <p className="text-body-sm text-ink-soft">deposit to reserve your seat · ${track.price.full} total</p>
            </div>
            <Button as={Link} to={`/tracks/${track.slug}/apply`} variant="accent" size="lg">
              Apply now
            </Button>
            <p className="text-caption text-ink-soft text-center">
              {track.price.sponsorshipAvailable ? 'Sponsorship available — ' : ''}
              <Link to="/pricing" className="text-accent-strong hover:underline">see pricing details</Link>
            </p>
            <ul className="flex flex-col gap-2.5 text-body-sm text-ink-soft pt-3 border-t border-border">
              <li className="flex items-center gap-2"><Icon name="clock" size={16} /> ~{track.cohort.weeklyCommitmentHours} hrs/week</li>
              <li className="flex items-center gap-2"><Icon name="user" size={16} /> {track.cohort.seatsRemaining} seats left</li>
              <li className="flex items-center gap-2"><Icon name="award" size={16} /> Program certificate</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
