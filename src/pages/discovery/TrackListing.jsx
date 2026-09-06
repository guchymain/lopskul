import { TrackCard } from '../../components/track/TrackCard.jsx'
import { tracks } from '../../data/fixtures/tracks.js'

export function TrackListing() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16">
      <div className="max-w-2xl mb-10">
        <h1 className="text-display-lg font-display font-semibold text-ink">Career tracks</h1>
        <p className="text-body-lg text-ink-soft mt-3">
          Cohort-based programs that combine structured coursework, peer accountability, and reviewed projects — for
          learners who want a guided path, not just a course list.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  )
}
