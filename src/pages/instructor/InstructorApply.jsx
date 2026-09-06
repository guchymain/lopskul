import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../components/ui/Card.jsx'
import { Input, Select } from '../../components/ui/Input.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Icon } from '../../components/ui/Icon.jsx'
import { useAuth } from '../../hooks/useAuth.js'

export function InstructorApply() {
  const navigate = useNavigate()
  const { loginAsInstructorDemo } = useAuth()
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center flex flex-col items-center gap-4">
        <span className="h-14 w-14 rounded-full bg-proof-soft text-proof flex items-center justify-center">
          <Icon name="check" size={26} />
        </span>
        <h1 className="text-heading-1 font-display font-semibold text-ink">Application received</h1>
        <p className="text-body text-ink-soft">We review applications within 5 business days. In the meantime, take a look at the instructor studio.</p>
        <Button variant="accent" size="lg" onClick={() => { loginAsInstructorDemo(); navigate('/instructor') }}>
          Preview instructor studio (demo)
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <Card className="p-8 flex flex-col gap-6">
        <div>
          <h1 className="text-heading-1 font-display font-semibold text-ink">Teach on Ledger</h1>
          <p className="text-body-sm text-ink-soft mt-1">Tell us about your expertise. We review every application.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input id="name" label="Full name" required />
          <Input id="email" type="email" label="Email" required />
          <Select id="category" label="Primary subject area" required>
            <option>Data & AI</option>
            <option>Design</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Entrepreneurship</option>
          </Select>
          <label htmlFor="experience" className="flex flex-col gap-1.5">
            <span className="text-body-sm font-medium text-ink">Relevant experience</span>
            <textarea id="experience" required rows={4} className="rounded-card border border-border bg-surface-0 px-3.5 py-2.5 text-body-sm focus:border-accent resize-none" placeholder="What have you built, shipped, or led?" />
          </label>
          <Button type="submit" variant="accent" size="lg">Submit application</Button>
        </form>
      </Card>
    </div>
  )
}
