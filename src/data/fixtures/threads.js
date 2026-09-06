export const threads = [
  {
    id: 'th-1',
    title: 'Best way to practice window functions?',
    scope: 'course',
    scopeId: 'c-1',
    authorId: 'u-learner-1',
    createdAt: '2026-09-03T09:00:00Z',
    tags: ['SQL'],
    replies: [
      {
        id: 'r-1',
        authorId: 'ins-1',
        body: 'Rebuild the cohort-retention query from Lesson 2 using RANK, then DENSE_RANK, and diff the outputs row by row — that’s where it clicks.',
        createdAt: '2026-09-04T11:00:00Z',
      },
    ],
  },
  {
    id: 'th-2',
    title: 'Cohort kickoff: introduce yourself here',
    scope: 'cohort',
    scopeId: 't-1',
    authorId: 'ins-1',
    createdAt: '2026-08-21T09:00:00Z',
    tags: ['Cohort'],
    replies: [
      {
        id: 'r-2',
        authorId: 'u-learner-1',
        body: 'Hi all — coming from a customer support background, hoping to move into analytics. Excited (and a little nervous)!',
        createdAt: '2026-08-21T12:00:00Z',
      },
    ],
  },
  {
    id: 'th-3',
    title: 'Design tokens: per-brand or per-theme first?',
    scope: 'course',
    scopeId: 'c-3',
    authorId: 'u-learner-1',
    createdAt: '2026-08-28T15:00:00Z',
    tags: ['Design Systems'],
    replies: [],
  },
]

export function getThreadsByScope(scope, scopeId) {
  return threads.filter((t) => t.scope === scope && t.scopeId === scopeId)
}

export function getThreadById(id) {
  return threads.find((t) => t.id === id)
}
