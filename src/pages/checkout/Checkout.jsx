import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCourseById } from '../../data/fixtures/courses.js'
import { getTrackById } from '../../data/fixtures/tracks.js'
import { Card } from '../../components/ui/Card.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Input, Select } from '../../components/ui/Input.jsx'
import { Icon } from '../../components/ui/Icon.jsx'
import { useAuth } from '../../hooks/useAuth.js'

export function Checkout() {
  const { itemType, itemId } = useParams()
  const { isAuthenticated, loginAsLearnerDemo } = useAuth()
  const navigate = useNavigate()
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [placing, setPlacing] = useState(false)
  const [done, setDone] = useState(false)

  const item = itemType === 'track' ? getTrackById(itemId) : getCourseById(itemId)
  const basePrice = itemType === 'track' ? item?.price.deposit : item?.price
  const discount = promoApplied ? Math.round(basePrice * 0.2) : 0
  const total = Math.max(0, (basePrice ?? 0) - discount)

  useEffect(() => {
    document.title = 'Checkout — Ledger'
  }, [])

  if (!item) {
    return <div className="mx-auto max-w-xl px-4 py-24 text-center text-ink-soft">We couldn't find that item.</div>
  }

  function handlePlaceOrder(e) {
    e.preventDefault()
    if (!isAuthenticated) loginAsLearnerDemo()
    setPlacing(true)
    setTimeout(() => {
      setPlacing(false)
      setDone(true)
    }, 700)
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center flex flex-col items-center gap-4">
        <span className="h-14 w-14 rounded-full bg-proof-soft text-proof flex items-center justify-center">
          <Icon name="check" size={28} />
        </span>
        <h1 className="text-heading-1 font-display font-semibold text-ink">You're in!</h1>
        <p className="text-body text-ink-soft">
          {itemType === 'track'
            ? `Your seat in ${item.title} is reserved. We'll email you closer to the cohort start date.`
            : `${item.title} has been added to your learning. Let's set a weekly pace.`}
        </p>
        <Button
          variant="accent"
          size="lg"
          onClick={() => navigate(itemType === 'track' ? '/dashboard' : '/signup/onboarding')}
        >
          {itemType === 'track' ? 'Go to dashboard' : 'Set my learning goal'}
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-heading-1 font-display font-semibold text-ink mb-8">Checkout</h1>
      <div className="grid md:grid-cols-[1fr_320px] gap-8">
        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6">
          <Card className="p-5 flex flex-col gap-4">
            <h2 className="text-body-lg font-semibold text-ink">Payment method</h2>
            <Select id="payment-method" label="Method" defaultValue="card">
              <option value="card">Credit or debit card</option>
              <option value="mobile-money">Mobile money</option>
              <option value="bank-transfer">Bank transfer</option>
            </Select>
            <Input id="card-number" label="Card number" placeholder="4242 4242 4242 4242" required />
            <div className="grid grid-cols-2 gap-4">
              <Input id="expiry" label="Expiry" placeholder="MM/YY" required />
              <Input id="cvc" label="CVC" placeholder="123" required />
            </div>
          </Card>

          {itemType === 'track' && (
            <Card className="p-5 flex items-start gap-3 bg-accent-soft border-none">
              <Icon name="clock" size={18} className="text-accent-strong shrink-0 mt-0.5" />
              <p className="text-body-sm text-ink">
                This reserves your seat with a deposit. The remaining balance is due before your cohort start date on{' '}
                {new Date(item.cohort.nextStart).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}.
              </p>
            </Card>
          )}

          <Button type="submit" variant="accent" size="lg" disabled={placing}>
            {placing ? 'Placing order…' : `Pay $${total}`}
          </Button>
        </form>

        <Card className="p-5 flex flex-col gap-4 h-fit">
          <h2 className="text-body-lg font-semibold text-ink">Order summary</h2>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-body-sm font-medium text-ink">{item.title}</p>
              <p className="text-caption text-ink-soft">{itemType === 'track' ? 'Career track — deposit' : 'Self-paced course'}</p>
            </div>
            <p className="text-body-sm text-ink">${basePrice}</p>
          </div>
          {!promoApplied ? (
            <div className="flex gap-2">
              <Input id="promo" placeholder="Promo code" value={promo} onChange={(e) => setPromo(e.target.value)} className="flex-1" />
              <Button type="button" variant="ghost" size="md" onClick={() => promo && setPromoApplied(true)}>
                Apply
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between text-body-sm text-proof">
              <span>Promo "{promo}" applied</span>
              <span>−${discount}</span>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-border pt-3 text-body font-semibold text-ink">
            <span>Total due today</span>
            <span>${total}</span>
          </div>
        </Card>
      </div>

      <p className="text-caption text-ink-soft mt-6 text-center">
        This is a prototype checkout — no real payment is processed. <Link to="/pricing" className="text-accent-strong hover:underline">View pricing</Link>
      </p>
    </div>
  )
}
