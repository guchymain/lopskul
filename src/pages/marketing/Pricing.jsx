import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button.jsx'
import { Card } from '../../components/ui/Card.jsx'
import { Badge } from '../../components/ui/Badge.jsx'
import { Icon } from '../../components/ui/Icon.jsx'

const regions = [
  { code: 'standard', label: 'Standard pricing', multiplier: 1 },
  { code: 'regional', label: 'Regional pricing (auto-detected)', multiplier: 0.4 },
]

const plans = [
  {
    id: 'course',
    name: 'Single course',
    description: 'Buy one self-paced course, keep it for life.',
    price: 49,
    unit: '/ course',
    features: ['Lifetime access', 'Certificate on completion', 'Community access for that course'],
  },
  {
    id: 'track',
    name: 'Career track',
    description: 'Full guided program with a cohort and project review.',
    price: 25,
    unit: '/ month deposit, then $220–300 total',
    features: ['Cohort start date', 'Peer + instructor project review', 'Program certificate', 'Live sessions'],
    highlighted: true,
  },
  {
    id: 'unlimited',
    name: 'Unlimited learning',
    description: 'Subscription access to every self-paced course.',
    price: 29,
    unit: '/ month',
    features: ['All self-paced courses', 'Cancel anytime', 'New releases included'],
  },
]

export function Pricing() {
  const [region, setRegion] = useState('standard')
  const multiplier = regions.find((r) => r.code === region).multiplier

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-display-lg font-display font-semibold text-ink">Pricing that meets you where you are</h1>
        <p className="text-body-lg text-ink-soft mt-3">
          Transparent plans, regional pricing, and need-based sponsorships — cost shouldn't decide who gets to
          learn.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-card border border-border p-1 bg-surface-1">
          {regions.map((r) => (
            <button
              key={r.code}
              onClick={() => setRegion(r.code)}
              className={`px-4 py-2 rounded-card text-body-sm font-medium transition-colors ${
                region === r.code ? 'bg-surface-0 text-ink shadow-sm' : 'text-ink-soft'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`p-6 flex flex-col gap-4 ${plan.highlighted ? 'border-accent border-2' : ''}`}
          >
            {plan.highlighted && <Badge tone="accent" className="self-start">Most transformative</Badge>}
            <h2 className="text-heading-2 font-display font-semibold text-ink">{plan.name}</h2>
            <p className="text-body-sm text-ink-soft">{plan.description}</p>
            <p className="text-display-lg font-display font-semibold text-ink">
              ${Math.round(plan.price * multiplier)}
              <span className="text-body-sm text-ink-soft font-sans"> {plan.unit}</span>
            </p>
            <ul className="flex flex-col gap-2 text-body-sm text-ink-soft">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Icon name="check" size={15} className="text-proof shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Button
              as={Link}
              to={plan.id === 'track' ? '/tracks' : '/courses'}
              variant={plan.highlighted ? 'accent' : 'ghost'}
              size="md"
              className="mt-auto"
            >
              {plan.id === 'track' ? 'Explore tracks' : 'Browse courses'}
            </Button>
          </Card>
        ))}
      </div>

      <Card className="mt-12 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-proof-soft border-none">
        <div>
          <h2 className="text-heading-2 font-display font-semibold text-ink mb-2">Need-based sponsorship</h2>
          <p className="text-body text-ink-soft max-w-xl">
            Career tracks reserve seats for learners who couldn't otherwise afford the program. Sponsorship covers
            up to 100% of tuition based on demonstrated need.
          </p>
        </div>
        <Button variant="primary" size="lg" className="shrink-0">
          Check sponsorship eligibility
        </Button>
      </Card>
    </div>
  )
}
