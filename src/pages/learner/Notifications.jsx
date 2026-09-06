import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth.js'
import { getNotificationsForUser } from '../../data/fixtures/notifications.js'
import { Tabs } from '../../components/ui/Tabs.jsx'
import { Icon } from '../../components/ui/Icon.jsx'
import { Button } from '../../components/ui/Button.jsx'

const typeIcon = { progress: 'spark', cohort: 'clock', community: 'message', certificate: 'award' }

function groupByDay(items) {
  const groups = {}
  for (const item of items) {
    const day = new Date(item.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })
    groups[day] = groups[day] || []
    groups[day].push(item)
  }
  return groups
}

export function Notifications() {
  const { user } = useAuth()
  const [items, setItems] = useState(() => getNotificationsForUser(user.id))
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? items : items.filter((n) => (filter === 'unread' ? !n.read : n.type === filter))
  const grouped = groupByDay(filtered)

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="px-4 sm:px-6 py-8 max-w-[720px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-heading-1 font-display font-semibold text-ink">Notifications</h1>
        <Button variant="ghost" size="sm" onClick={markAllRead}>Mark all read</Button>
      </div>
      <Tabs
        tabs={[
          { value: 'all', label: 'All' },
          { value: 'unread', label: 'Unread' },
          { value: 'progress', label: 'Progress' },
          { value: 'cohort', label: 'Cohort' },
          { value: 'community', label: 'Community' },
        ]}
        active={filter}
        onChange={setFilter}
        className="mb-6"
      />

      {Object.entries(grouped).length === 0 ? (
        <p className="text-body-sm text-ink-soft text-center py-16">Nothing here.</p>
      ) : (
        Object.entries(grouped).map(([day, dayItems]) => (
          <div key={day} className="mb-6">
            <h2 className="text-caption font-semibold uppercase tracking-wide text-ink-soft mb-2">{day}</h2>
            <div className="flex flex-col divide-y divide-border border border-border rounded-card overflow-hidden">
              {dayItems.map((n) => (
                <div key={n.id} className={`flex items-start gap-3 p-4 ${!n.read ? 'bg-accent-soft/40' : 'bg-surface-0'}`}>
                  <span className="h-9 w-9 rounded-full bg-surface-2 text-ink-soft flex items-center justify-center shrink-0">
                    <Icon name={typeIcon[n.type] ?? 'bell'} size={16} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-medium text-ink">{n.title}</p>
                    <p className="text-body-sm text-ink-soft">{n.body}</p>
                  </div>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-accent shrink-0 mt-1.5" aria-label="Unread" />}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
