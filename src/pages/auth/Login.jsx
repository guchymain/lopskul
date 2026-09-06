import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../../components/ui/Button.jsx'
import { Input } from '../../components/ui/Input.jsx'
import { Card } from '../../components/ui/Card.jsx'
import { useAuth } from '../../hooks/useAuth.js'

export function Login() {
  const { loginAsLearnerDemo, loginAsInstructorDemo, loginAsAdminDemo } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const from = location.state?.from ?? '/dashboard'

  function handleSubmit(e) {
    e.preventDefault()
    loginAsLearnerDemo()
    navigate(from, { replace: true })
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Card className="p-8 flex flex-col gap-6">
        <div>
          <h1 className="text-heading-1 font-display font-semibold text-ink">Welcome back</h1>
          <p className="text-body-sm text-ink-soft mt-1">Log in to continue your learning.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input id="email" type="email" label="Email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          <Input id="password" type="password" label="Password" required placeholder="••••••••" />
          <Button type="submit" variant="accent" size="lg">Log in</Button>
        </form>
        <div className="flex flex-col gap-2 pt-2 border-t border-border">
          <p className="text-caption text-ink-soft text-center">Prototype demo accounts (no password needed)</p>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="ghost" size="sm" onClick={() => { loginAsLearnerDemo(); navigate('/dashboard') }}>Learner</Button>
            <Button variant="ghost" size="sm" onClick={() => { loginAsInstructorDemo(); navigate('/instructor') }}>Instructor</Button>
            <Button variant="ghost" size="sm" onClick={() => { loginAsAdminDemo(); navigate('/admin') }}>Admin</Button>
          </div>
        </div>
        <p className="text-body-sm text-ink-soft text-center">
          New here? <Link to="/signup" className="text-accent-strong font-medium hover:underline">Create an account</Link>
        </p>
      </Card>
    </div>
  )
}
