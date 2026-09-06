import { Link } from 'react-router-dom'
import { Button } from '../ui/Button.jsx'
import { Card } from '../ui/Card.jsx'
import { Icon } from '../ui/Icon.jsx'
import { totalLessonCount } from '../../data/fixtures/progress.js'

export function StickyEnrollCard({ course, isEnrolled, onToggleWishlist, wishlisted }) {
  const lessonCount = totalLessonCount(course)

  return (
    <Card className="p-5 flex flex-col gap-4 lg:sticky lg:top-24">
      <div className="h-32 rounded-card bg-surface-2 flex items-center justify-center text-ink-soft">
        <Icon name="play" size={32} />
      </div>
      <p className="text-display-lg font-display font-semibold text-ink">
        {course.price === 0 ? 'Free' : `$${course.price}`}
      </p>
      {isEnrolled ? (
        <Button as={Link} to={`/learn/${course.id}/${course.curriculum[0].lessons[0].id}`} variant="accent" size="lg">
          Continue learning
        </Button>
      ) : (
        <Button as={Link} to={`/checkout/course/${course.id}`} variant="accent" size="lg">
          Enroll now
        </Button>
      )}
      <Button variant="ghost" size="md" onClick={onToggleWishlist}>
        <Icon name="star" size={16} className={wishlisted ? 'text-accent' : ''} />
        {wishlisted ? 'Saved to wishlist' : 'Add to wishlist'}
      </Button>
      <ul className="flex flex-col gap-2.5 text-body-sm text-ink-soft pt-2 border-t border-border">
        <li className="flex items-center gap-2">
          <Icon name="clock" size={16} /> {course.durationHours} hours total
        </li>
        <li className="flex items-center gap-2">
          <Icon name="layers" size={16} /> {lessonCount} lessons
        </li>
        <li className="flex items-center gap-2">
          <Icon name="check" size={16} /> Full lifetime access
        </li>
        {course.captionsAvailable && (
          <li className="flex items-center gap-2">
            <Icon name="message" size={16} /> Captions available
          </li>
        )}
        <li className="flex items-center gap-2">
          <Icon name="award" size={16} /> Certificate on completion
        </li>
      </ul>
    </Card>
  )
}
