import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepProgressDots } from '../../components/forms/StepProgressDots.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Card } from '../../components/ui/Card.jsx'
import { Icon } from '../../components/ui/Icon.jsx'

const goals = [
  { id: 'switch-career', label: 'Switch careers entirely', icon: 'compass' },
  { id: 'upskill', label: 'Upskill in my current role', icon: 'trend' },
  { id: 'explore', label: 'Explore, no fixed goal yet', icon: 'spark' },
]

const levels = ['Just starting out', 'Some experience', 'Experienced, going deeper']
const paces = [
  { hours: 3, label: 'Light — 3 hrs/week' },
  { hours: 6, label: 'Steady — 6 hrs/week' },
  { hours: 10, label: 'Intensive — 10+ hrs/week' },
]

export function OnboardingWizard() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState(null)
  const [level, setLevel] = useState(null)
  const [pace, setPace] = useState(null)

  const steps = [
    {
      title: "What's your goal?",
      body: (
        <div className="grid gap-3">
          {goals.map((g) => (
            <button
              key={g.id}
              onClick={() => setGoal(g.id)}
              className={`flex items-center gap-3 rounded-card border p-4 text-left transition-colors ${
                goal === g.id ? 'border-accent bg-accent-soft' : 'border-border hover:bg-surface-1'
              }`}
            >
              <Icon name={g.icon} size={20} className="text-accent-strong" />
              <span className="text-body font-medium text-ink">{g.label}</span>
            </button>
          ))}
        </div>
      ),
      canContinue: Boolean(goal),
    },
    {
      title: 'Where are you starting from?',
      body: (
        <div className="grid gap-3">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`rounded-card border p-4 text-left text-body font-medium text-ink transition-colors ${
                level === lvl ? 'border-accent bg-accent-soft' : 'border-border hover:bg-surface-1'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      ),
      canContinue: Boolean(level),
    },
    {
      title: 'How much time can you commit weekly?',
      body: (
        <div className="grid gap-3">
          {paces.map((p) => (
            <button
              key={p.hours}
              onClick={() => setPace(p.hours)}
              className={`rounded-card border p-4 text-left text-body font-medium text-ink transition-colors ${
                pace === p.hours ? 'border-accent bg-accent-soft' : 'border-border hover:bg-surface-1'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      ),
      canContinue: Boolean(pace),
    },
  ]

  const current = steps[step]
  const isLast = step === steps.length - 1

  function handleContinue() {
    if (isLast) {
      navigate('/dashboard')
    } else {
      setStep((s) => s + 1)
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <Card className="p-8 flex flex-col gap-6">
        <StepProgressDots steps={steps.length} current={step} />
        <h1 className="text-heading-1 font-display font-semibold text-ink">{current.title}</h1>
        {current.body}
        <div className="flex justify-between pt-2">
          <Button variant="ghost" size="md" onClick={() => (step === 0 ? navigate('/dashboard') : setStep((s) => s - 1))}>
            {step === 0 ? 'Skip for now' : 'Back'}
          </Button>
          <Button variant="accent" size="md" onClick={handleContinue} disabled={!current.canContinue}>
            {isLast ? 'Go to dashboard' : 'Continue'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
