export const certificates = [
  {
    id: 'cert-1',
    userId: 'u-learner-1',
    itemType: 'course',
    itemId: 'c-2',
    issuedAt: '2026-08-15',
    verifyCode: 'LGR-9K3X-AI01',
    skillsVerified: ['Prompt design', 'AI tool selection', 'Output verification'],
  },
]

export function getCertificateById(id) {
  return certificates.find((c) => c.id === id)
}

export function getCertificateByVerifyCode(code) {
  return certificates.find((c) => c.verifyCode === code)
}

export function getCertificatesForUser(userId) {
  return certificates.filter((c) => c.userId === userId)
}
