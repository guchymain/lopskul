import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { getEnrollmentsForUser } from '../../data/fixtures/enrollments.js'
import { courseCompletionSummary } from '../../data/services/progressService.js'
import { Tabs } from '../../components/ui/Tabs.jsx'
import { Card } from '../../components/ui/Card.jsx'
import { ProgressBar } from '../../components/ui/ProgressBar.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Icon } from '../../components/ui/Icon.jsx'

const tabs = [
  { value: 'all', label: 'All' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'wishlist', label: 'Wishlist' },
  { value: 'archived', label: 'Archived' },
]

export function MyLearning() {
  const { user } = useAuth()
  const [active, setActive] = useState('all')

  const courseEnrollments = getEnrollmentsForUser(user.id).filter((e) => e.itemType === 'course')
  const items = courseEnrollments.map((e) => ({
    enrollment: e,
    ...courseCompletionSummary(user.id, e.itemId),
  }))

  const filtered = items.filter((item) => {
    if (active === 'all') return true
    if (active === 'completed') return item.percent === 100
    if (active === 'in_progress') return item.percent > 0 && item.percent < 100
    if (active === 'wishlist' || active === 'archived') return false
    return true
  })

  return (
    <div className="px-4 sm:px-6 py-8 max-w-[1100px] mx-auto">
      <h1 className="text-heading-1 font-display font-semibold text-ink mb-6">My Learning</h1>
      <Tabs
        tabs={tabs.map((t) => ({ ...t, count: t.value === 'all' ? items.length : undefined }))}
        active={active}
        onChange={setActive}
        className="mb-6"
      />

      {filtered.length === 0 ? (
        <Card className="p-10 text-center flex flex-col items-center gap-3">
          <Icon name="layers" size={26} className="text-ink-soft" />
          <p className="text-body text-ink-soft">Nothing here yet.</p>
          <Button as={Link} to="/courses" variant="accent" size="sm">Browse courses</Button>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(({ course, percent, progress }) => (
            <Card key={course.id} className="p-4 flex flex-col gap-3">
              <div className="h-24 rounded-card bg-surface-2 flex items-center justify-center text-ink-soft">
                <Icon name={course.accentIcon} size={26} />
              </div>
              <h3 className="text-body font-semibold text-ink leading-snug">{course.title}</h3>
              <ProgressBar percent={percent} label={percent === 100 ? 'Completed' : 'Progress'} />
              <Button
                as={Link}
                to={
                  percent === 100
                    ? `/learn/${course.id}/complete`
                    : `/learn/${course.id}/${progress.currentLessonId ?? course.curriculum[0].lessons[0].id}`
                }
                variant="subtle"
                size="sm"
              >
                {percent === 100 ? 'Review' : percent === 0 ? 'Start' : 'Resume'}
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
