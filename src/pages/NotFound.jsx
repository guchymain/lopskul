import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button.jsx'

export function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center flex flex-col items-center gap-4">
      <p className="text-display-lg font-display font-semibold text-ink">404</p>
      <p className="text-body text-ink-soft">We couldn't find that page.</p>
      <Button as={Link} to="/" variant="accent" size="md">Back to home</Button>
    </div>
  )
}
