import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button.jsx'
import { Input } from '../../components/ui/Input.jsx'
import { Card } from '../../components/ui/Card.jsx'
import { useAuth } from '../../hooks/useAuth.js'

export function Signup() {
  const { loginAsLearnerDemo } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    loginAsLearnerDemo()
    navigate('/signup/onboarding')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Card className="p-8 flex flex-col gap-6">
        <div>
          <h1 className="text-heading-1 font-display font-semibold text-ink">Create your account</h1>
          <p className="text-body-sm text-ink-soft mt-1">Takes less than a minute — no credit card required.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input id="name" label="Full name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" />
          <Input id="email" type="email" label="Email" required placeholder="you@example.com" />
          <Input id="password" type="password" label="Password" required placeholder="At least 8 characters" />
          <Button type="submit" variant="accent" size="lg">Create account</Button>
        </form>
        <p className="text-body-sm text-ink-soft text-center">
          Already have an account? <Link to="/login" className="text-accent-strong font-medium hover:underline">Log in</Link>
        </p>
      </Card>
    </div>
  )
}
