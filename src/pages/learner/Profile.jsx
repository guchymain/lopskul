import { useAuth } from '../../hooks/useAuth.js'
import { Card } from '../../components/ui/Card.jsx'
import { Input } from '../../components/ui/Input.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { getCertificatesForUser } from '../../data/fixtures/certificates.js'
import { getCourseById } from '../../data/fixtures/courses.js'
import { Icon } from '../../components/ui/Icon.jsx'

export function Profile() {
  const { user } = useAuth()
  const certificates = getCertificatesForUser(user.id)

  return (
    <div className="px-4 sm:px-6 py-8 max-w-[720px] mx-auto flex flex-col gap-8">
      <h1 className="text-heading-1 font-display font-semibold text-ink">Your profile</h1>

      <Card className="p-6 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <span className="h-16 w-16 rounded-full bg-accent-soft text-accent-strong flex items-center justify-center text-heading-2 font-semibold">
            {user.avatarInitials}
          </span>
          <Button variant="ghost" size="sm">Change photo</Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input id="name" label="Full name" defaultValue={user.name} />
          <Input id="email" label="Email" defaultValue={user.email} type="email" />
        </div>
        <Input id="goal" label="Learning goal" defaultValue={user.goal} />
        <Button variant="primary" size="md" className="self-start">Save changes</Button>
      </Card>

      <div>
        <h2 className="text-heading-3 font-display font-semibold text-ink mb-3">Verified skills</h2>
        {certificates.length === 0 ? (
          <p className="text-body-sm text-ink-soft">No verified skills yet — complete a course to add one.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {certificates.flatMap((c) => c.skillsVerified).map((skill) => (
              <span key={skill} className="inline-flex items-center gap-1.5 rounded-full bg-proof-soft text-proof px-3 py-1.5 text-body-sm">
                <Icon name="shield" size={14} /> {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
