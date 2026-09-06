import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button.jsx'
import { Icon } from '../../components/ui/Icon.jsx'
import { Badge } from '../../components/ui/Badge.jsx'
import { ProofStrip } from '../../components/proof/ProofStrip.jsx'
import { TrackCard } from '../../components/track/TrackCard.jsx'
import { CourseCard } from '../../components/course/CourseCard.jsx'
import { tracks } from '../../data/fixtures/tracks.js'
import { courses, getCourseById } from '../../data/fixtures/courses.js'
import { getInstructorById } from '../../data/fixtures/instructors.js'

const STORY_VIDEO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'

const platformStats = [
  { label: 'Learners worldwide', value: '210K+' },
  { label: 'Verified completions', value: '96K+' },
  { label: 'Reported job-outcome rate', value: '74%' },
  { label: 'Employer partners', value: '340+' },
]

export function Landing() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [heroPlaying, setHeroPlaying] = useState(false)
  const [storyPlaying, setStoryPlaying] = useState(false)
  const featuredInstructor = getInstructorById('ins-3')
  const featuredCourse = getCourseById('c-5')

  useEffect(() => {
    document.title = 'Ledger — Learn. Prove it. Advance.'
  }, [])

  function handleSubscribe(e) {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
  }

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <Badge tone="accent" className="self-start">New cohorts open for October</Badge>
          <h1 className="font-display text-display-xl font-semibold text-ink">
            Skills you can prove. Careers you can build.
          </h1>
          <p className="text-body-lg text-ink-soft max-w-lg">
            Ledger pairs rigorous, self-paced courses with guided career tracks — and backs every certificate with
            real completion and outcome data, not just a rating.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button as={Link} to="/courses" variant="accent" size="lg">
              Browse courses <Icon name="arrowRight" size={18} />
            </Button>
            <Button as={Link} to="/tracks" variant="ghost" size="lg">
              Explore career tracks
            </Button>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {['AO', 'DC', 'ZM', 'TR'].map((initials) => (
                <span
                  key={initials}
                  className="h-9 w-9 rounded-full bg-accent-soft text-accent-strong border-2 border-paper flex items-center justify-center text-caption font-semibold"
                >
                  {initials}
                </span>
              ))}
            </div>
            <p className="text-body-sm text-ink-soft">Joined by learners from 140+ countries</p>
          </div>
        </div>
        <div className="rounded-card overflow-hidden bg-ink text-paper relative aspect-[4/3]">
          {heroPlaying ? (
            <video src={STORY_VIDEO} controls autoPlay className="h-full w-full object-cover" />
          ) : (
            <button
              onClick={() => setHeroPlaying(true)}
              className="absolute inset-0 group text-left"
              aria-label="Play learner story video"
            >
              <img
                src={courses[0].image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-90"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-ink/90 via-ink/30 to-transparent p-6 gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper/90 text-ink transition-transform group-hover:scale-110">
                  <Icon name="play" size={24} />
                </span>
                <p className="text-body text-center text-paper/90 max-w-xs">
                  "I went from customer support to a data analytics role in five months. The proof-of-work
                  portfolio is what got me the interview."
                </p>
                <p className="text-body-sm text-paper/60">Grace M. — Track graduate, now Data Analyst</p>
              </span>
            </button>
          )}
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-y border-border bg-surface-1">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-12">
          <ProofStrip stats={platformStats} />
        </div>
      </section>

      {/* Career tracks */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h2 className="text-heading-1 font-display font-semibold text-ink">Career tracks</h2>
            <p className="text-body text-ink-soft mt-2 max-w-xl">
              Structured, cohort-based programs that take you from foundational skills to a portfolio hiring
              managers trust.
            </p>
          </div>
          <Link to="/tracks" className="text-body-sm font-medium text-accent-strong hover:underline whitespace-nowrap">
            View all tracks
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      {/* Transformation story */}
      <section className="bg-surface-1 border-y border-border">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-card bg-surface-0 border border-border aspect-video overflow-hidden relative">
            {storyPlaying ? (
              <video src={STORY_VIDEO} controls autoPlay className="h-full w-full object-cover" />
            ) : (
              <button
                onClick={() => setStoryPlaying(true)}
                className="absolute inset-0 group flex items-center justify-center"
                aria-label="Play featured lesson preview"
              >
                <img
                  src={featuredCourse.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink/60 text-paper backdrop-blur transition-transform group-hover:scale-110">
                    <Icon name="play" size={32} />
                  </span>
                </span>
              </button>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-caption font-semibold uppercase tracking-wide text-accent-strong">
              Transformation in action
            </span>
            <blockquote className="text-heading-2 font-display text-ink leading-snug">
              "{featuredInstructor.proofBadge}."
            </blockquote>
            <p className="text-body-sm text-ink-soft">
              {featuredInstructor.name} · {featuredInstructor.title}
            </p>
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <h2 className="text-heading-1 font-display font-semibold text-ink">Popular self-paced courses</h2>
          <Link to="/courses" className="text-body-sm font-medium text-accent-strong hover:underline whitespace-nowrap">
            Browse all courses
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.slice(0, 4).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Sponsorship / accessibility */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 pb-20">
        <div className="rounded-card bg-ink text-paper p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-heading-1 font-display font-semibold mb-3">Global quality, accessible pricing</h2>
            <p className="text-body text-paper/70">
              Regional pricing and need-based sponsorships mean cost is never the reason a committed learner can't
              start a track.
            </p>
          </div>
          <Button as={Link} to="/pricing" variant="accent" size="lg" className="shrink-0">
            See pricing & sponsorships
          </Button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-heading-2 font-display font-semibold text-ink">Stay in the loop</h2>
            <p className="text-body-sm text-ink-soft mt-1">New tracks, cohort openings, and learning tips — monthly.</p>
          </div>
          {subscribed ? (
            <p className="text-body-sm text-proof font-medium">You're subscribed. Welcome aboard.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="flex-1 md:w-64 rounded-card border border-border bg-surface-0 px-3.5 py-2.5 text-body-sm focus:border-accent"
              />
              <Button type="submit" variant="primary" size="md">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
