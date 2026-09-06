import { Link } from 'react-router-dom'
import { Card } from '../ui/Card.jsx'
import { Button } from '../ui/Button.jsx'
import { Icon } from '../ui/Icon.jsx'

export function TrackCard({ track }) {
  return (
    <Card hoverable className="flex flex-col p-6 gap-4">
      <span className="inline-flex items-center gap-2 text-caption font-medium text-accent-strong uppercase tracking-wide">
        <Icon name="compass" size={14} /> {track.category}
      </span>
      <h3 className="text-heading-2 font-display font-semibold text-ink">{track.title}</h3>
      <p className="text-body text-ink-soft">{track.subtitle}</p>
      <p className="text-body-sm font-medium text-proof">{track.heroStat}</p>
      <Button as={Link} to={`/tracks/${track.slug}`} variant="ghost" size="md" className="mt-2 self-start">
        View track <Icon name="arrowRight" size={16} />
      </Button>
    </Card>
  )
}
