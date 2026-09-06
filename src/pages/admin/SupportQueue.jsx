import { useState } from 'react'
import { Card } from '../../components/ui/Card.jsx'
import { Badge } from '../../components/ui/Badge.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Icon } from '../../components/ui/Icon.jsx'

const initialTickets = [
  { id: 'tk-1', subject: 'Video won\'t load on lesson 3', learner: 'Ivy T.', priority: 'medium', status: 'open' },
  { id: 'tk-2', subject: 'Refund request for Backend Systems', learner: 'Femi A.', priority: 'high', status: 'open' },
  { id: 'tk-3', subject: 'Reported comment in community thread', learner: 'Anonymous', priority: 'high', status: 'open' },
]

const priorityTone = { high: 'danger', medium: 'warning', low: 'neutral' }

export function SupportQueue() {
  const [tickets, setTickets] = useState(initialTickets)

  function resolveTicket(id) {
    setTickets((t) => t.map((ticket) => (ticket.id === id ? { ...ticket, status: 'resolved' } : ticket)))
  }

  return (
    <div className="px-4 sm:px-6 py-8 max-w-[900px] mx-auto">
      <h1 className="text-heading-1 font-display font-semibold text-ink mb-6">Support & reported content</h1>
      <div className="flex flex-col gap-3">
        {tickets.map((t) => (
          <Card key={t.id} className="p-4 flex items-center gap-4">
            <span className="h-10 w-10 rounded-full bg-surface-2 text-ink-soft flex items-center justify-center shrink-0">
              <Icon name="message" size={16} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-medium text-ink">{t.subject}</p>
              <p className="text-caption text-ink-soft">From {t.learner}</p>
            </div>
            <Badge tone={priorityTone[t.priority]}>{t.priority}</Badge>
            <Badge tone={t.status === 'resolved' ? 'success' : 'neutral'}>{t.status}</Badge>
            {t.status === 'open' && (
              <Button variant="primary" size="sm" onClick={() => resolveTicket(t.id)}>Resolve</Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
