export const users = [
  {
    id: 'u-learner-1',
    role: 'learner',
    name: 'Tosin Kazeem',
    email: 'tosinkazeem77@gmail.com',
    avatarInitials: 'TK',
    goal: 'Switch into a data analytics role',
    weeklyPaceHours: 6,
    streakDays: 4,
    joinedAt: '2026-06-02',
  },
  {
    id: 'u-instructor-1',
    role: 'instructor',
    name: 'Amara Okoye',
    email: 'amara@ledger.example',
    avatarInitials: 'AO',
    instructorId: 'ins-1',
  },
  {
    id: 'u-admin-1',
    role: 'admin',
    name: 'Priya Nair',
    email: 'priya@ledger.example',
    avatarInitials: 'PN',
  },
]

export function getUserById(id) {
  return users.find((u) => u.id === id)
}
