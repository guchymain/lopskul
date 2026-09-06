import { Fragment, useState } from 'react'
import { Card } from '../../components/ui/Card.jsx'
import { Checkbox } from '../../components/ui/Input.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { useTheme } from '../../hooks/useTheme.js'

const notificationTypes = [
  { id: 'progress', label: 'Streaks and progress nudges' },
  { id: 'cohort', label: 'Cohort and live session updates' },
  { id: 'community', label: 'Replies to your discussions' },
  { id: 'certificate', label: 'Certificate and milestone alerts' },
  { id: 'marketing', label: 'New course and track announcements' },
]

export function Settings() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [prefs, setPrefs] = useState({
    progress: { inApp: true, email: true },
    cohort: { inApp: true, email: true },
    community: { inApp: true, email: false },
    certificate: { inApp: true, email: true },
    marketing: { inApp: false, email: false },
  })

  function toggle(id, channel) {
    setPrefs((p) => ({ ...p, [id]: { ...p[id], [channel]: !p[id][channel] } }))
  }

  return (
    <div className="px-4 sm:px-6 py-8 max-w-[720px] mx-auto flex flex-col gap-8">
      <h1 className="text-heading-1 font-display font-semibold text-ink">Settings</h1>

      <Card className="p-6 flex flex-col gap-3">
        <h2 className="text-body-lg font-semibold text-ink">Appearance</h2>
        <Checkbox id="dark-mode" label="Dark mode" checked={theme === 'dark'} onChange={toggleTheme} />
      </Card>

      <Card className="p-6 flex flex-col gap-4">
        <h2 className="text-body-lg font-semibold text-ink">Notification preferences</h2>
        <div className="grid grid-cols-[1fr_70px_70px] gap-y-3 items-center text-body-sm">
          <span className="text-ink-soft font-medium">Type</span>
          <span className="text-ink-soft font-medium text-center">In-app</span>
          <span className="text-ink-soft font-medium text-center">Email</span>
          {notificationTypes.map((type) => (
            <Fragment key={type.id}>
              <span className="text-ink">{type.label}</span>
              <span className="flex justify-center">
                <input type="checkbox" className="h-4 w-4 accent-accent" checked={prefs[type.id].inApp} onChange={() => toggle(type.id, 'inApp')} aria-label={`${type.label} in-app`} />
              </span>
              <span className="flex justify-center">
                <input type="checkbox" className="h-4 w-4 accent-accent" checked={prefs[type.id].email} onChange={() => toggle(type.id, 'email')} aria-label={`${type.label} email`} />
              </span>
            </Fragment>
          ))}
        </div>
      </Card>

      <Card className="p-6 flex flex-col gap-3">
        <h2 className="text-body-lg font-semibold text-ink">Billing</h2>
        <p className="text-body-sm text-ink-soft">Signed in as {user.email}</p>
        <div className="flex items-center justify-between border-t border-border pt-3 text-body-sm">
          <span className="text-ink">AI Career Essentials — Free</span>
          <span className="text-ink-soft">Jul 1, 2026</span>
        </div>
        <div className="flex items-center justify-between text-body-sm">
          <span className="text-ink">Practical Data Analytics — $49</span>
          <span className="text-ink-soft">Aug 10, 2026</span>
        </div>
        <Button variant="ghost" size="sm" className="self-start">Download all receipts</Button>
      </Card>
    </div>
  )
}
