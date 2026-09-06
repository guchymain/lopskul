import { useState } from 'react'
import { Link } from 'react-router-dom'
import { threads } from '../../data/fixtures/threads.js'
import { getUserById } from '../../data/fixtures/users.js'
import { getInstructorById } from '../../data/fixtures/instructors.js'
import { Tabs } from '../../components/ui/Tabs.jsx'
import { Card } from '../../components/ui/Card.jsx'
import { Icon } from '../../components/ui/Icon.jsx'
import { Badge } from '../../components/ui/Badge.jsx'

function authorName(authorId) {
  return getUserById(authorId)?.name ?? getInstructorById(authorId)?.name ?? 'Ledger member'
}

export function CommunityHome() {
  const [scope, setScope] = useState('all')
  const filtered = scope === 'all' ? threads : threads.filter((t) => t.scope === scope)

  return (
    <div className="mx-auto max-w-[860px] px-4 sm:px-6 py-12">
      <h1 className="text-display-lg font-display font-semibold text-ink mb-2">Community</h1>
      <p className="text-body text-ink-soft mb-6">Ask questions, share progress, and learn alongside peers.</p>

      <Tabs
        tabs={[
          { value: 'all', label: 'All' },
          { value: 'course', label: 'Course discussions' },
          { value: 'cohort', label: 'Cohort channels' },
        ]}
        active={scope}
        onChange={setScope}
        className="mb-6"
      />

      <div className="flex flex-col gap-3">
        {filtered.map((thread) => (
          <Card key={thread.id} hoverable className="p-4">
            <Link to={`/community/${thread.id}`} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                {thread.tags.map((tag) => (
                  <Badge key={tag} tone="neutral">{tag}</Badge>
                ))}
                {thread.scope === 'cohort' && <Badge tone="accent">Cohort</Badge>}
              </div>
              <h2 className="text-body-lg font-semibold text-ink">{thread.title}</h2>
              <p className="text-caption text-ink-soft flex items-center gap-1.5">
                <Icon name="user" size={13} /> {authorName(thread.authorId)} · {thread.replies.length} replies
              </p>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
