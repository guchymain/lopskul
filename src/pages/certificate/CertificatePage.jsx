import { useParams, Navigate, Link } from 'react-router-dom'
import { getCertificateById } from '../../data/fixtures/certificates.js'
import { getCourseById } from '../../data/fixtures/courses.js'
import { getUserById } from '../../data/fixtures/users.js'
import { Button } from '../../components/ui/Button.jsx'
import { Card } from '../../components/ui/Card.jsx'
import { Icon } from '../../components/ui/Icon.jsx'

export function CertificatePage() {
  const { certId } = useParams()
  const cert = getCertificateById(certId)

  if (!cert) return <Navigate to="/dashboard" replace />

  const course = getCourseById(cert.itemId)
  const learner = getUserById(cert.userId)
  const verifyUrl = `/certificates/${cert.verifyCode}/verify`

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Card className="p-10 border-2 border-ink flex flex-col items-center text-center gap-5">
        <Icon name="award" size={40} className="text-accent" />
        <p className="text-caption uppercase tracking-[0.2em] text-ink-soft">Certificate of Completion</p>
        <h1 className="text-display-lg font-display font-semibold text-ink">{course?.title}</h1>
        <p className="text-body text-ink-soft">
          Awarded to <span className="text-ink font-medium">{learner?.name}</span> on{' '}
          {new Date(cert.issuedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {cert.skillsVerified.map((skill) => (
            <span key={skill} className="rounded-full bg-proof-soft text-proof px-3 py-1.5 text-body-sm">{skill}</span>
          ))}
        </div>
        <p className="text-caption text-ink-soft pt-4 border-t border-border w-full">
          Verification code: <span className="font-mono">{cert.verifyCode}</span>
        </p>
      </Card>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <Button variant="ghost" size="md">
          <Icon name="download" size={16} /> Download PDF
        </Button>
        <Button variant="primary" size="md">
          <Icon name="upload" size={16} /> Share to LinkedIn
        </Button>
        <Button as={Link} to={verifyUrl} variant="subtle" size="md">
          View public verification page
        </Button>
      </div>
    </div>
  )
}
