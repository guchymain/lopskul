export const enrollments = [
  {
    id: 'en-1',
    userId: 'u-learner-1',
    itemType: 'course',
    itemId: 'c-1',
    enrolledAt: '2026-08-10',
    status: 'in_progress',
  },
  {
    id: 'en-2',
    userId: 'u-learner-1',
    itemType: 'course',
    itemId: 'c-2',
    enrolledAt: '2026-07-01',
    status: 'completed',
  },
  {
    id: 'en-3',
    userId: 'u-learner-1',
    itemType: 'track',
    itemId: 't-1',
    enrolledAt: '2026-08-20',
    status: 'pre_cohort',
  },
]

export function getEnrollmentsForUser(userId) {
  return enrollments.filter((e) => e.userId === userId)
}
