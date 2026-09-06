import { useParams } from 'react-router-dom'
import { getCertificateByVerifyCode, getCertificateById } from '../../data/fixtures/certificates.js'
import { getCourseById } from '../../data/fixtures/courses.js'
import { getUserById } from '../../data/fixtures/users.js'
import { Card } from '../../components/ui/Card.jsx'
import { Icon } from '../../components/ui/Icon.jsx'

export function CertificateVerify() {
  const { certId } = useParams()
  const cert = getCertificateByVerifyCode(certId) ?? getCertificateById(certId)

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <div className="flex items-center gap-2 mb-6 justify-center">
        <Icon name="shield" size={20} className="text-proof" />
        <p className="text-body-sm font-medium text-proof">Ledger Certificate Verification</p>
      </div>
      {!cert ? (
        <Card className="p-8 text-center">
          <p className="text-body text-ink-soft">No certificate found for this code.</p>
        </Card>
      ) : (
        <Card className="p-8 flex flex-col gap-3 text-center">
          <Icon name="check" size={32} className="text-proof mx-auto" />
          <h1 className="text-heading-2 font-display font-semibold text-ink">This certificate is valid</h1>
          <p className="text-body text-ink-soft">
            {getUserById(cert.userId)?.name} completed{' '}
            <strong className="text-ink">{getCourseById(cert.itemId)?.title}</strong> on{' '}
            {new Date(cert.issuedAt).toLocaleDateString()}.
          </p>
          <p className="text-caption text-ink-soft pt-3 border-t border-border">Code: {cert.verifyCode}</p>
        </Card>
      )}
    </div>
  )
}
