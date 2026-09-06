export const notifications = [
  {
    id: 'n-1',
    userId: 'u-learner-1',
    type: 'progress',
    title: 'You’re on a 4-day streak',
    body: 'Keep it going — one more lesson today keeps your streak alive.',
    createdAt: '2026-09-06T08:00:00Z',
    read: false,
  },
  {
    id: 'n-2',
    userId: 'u-learner-1',
    type: 'cohort',
    title: 'Data & AI Career Track starts in 30 days',
    body: 'Prep materials for Phase 1 are now unlocked in your dashboard.',
    createdAt: '2026-09-05T10:00:00Z',
    read: false,
  },
  {
    id: 'n-3',
    userId: 'u-learner-1',
    type: 'community',
    title: 'New reply in "Best way to practice window functions?"',
    body: 'Amara Okoye replied to a thread you posted in.',
    createdAt: '2026-09-04T14:30:00Z',
    read: true,
  },
  {
    id: 'n-4',
    userId: 'u-learner-1',
    type: 'certificate',
    title: 'Certificate ready: AI Career Essentials',
    body: 'Your certificate has been issued and is ready to share.',
    createdAt: '2026-08-15T09:00:00Z',
    read: true,
  },
]

export function getNotificationsForUser(userId) {
  return notifications
    .filter((n) => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}
