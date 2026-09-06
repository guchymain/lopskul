export const tracks = [
  {
    id: 't-1',
    slug: 'data-and-ai-career-track',
    title: 'Data & AI Career Track',
    subtitle: 'A 16-week guided path from spreadsheets to a portfolio hiring managers trust.',
    category: 'Data & AI',
    heroStat: '78% job-outcome rate within 6 months of graduating',
    courseIds: ['c-1', 'c-2'],
    phases: [
      { id: 'p-1', title: 'Foundations', courseIds: ['c-2'] },
      { id: 'p-2', title: 'Core Analytics', courseIds: ['c-1'] },
      { id: 'p-3', title: 'Capstone & Interview Prep', courseIds: [] },
    ],
    cohort: {
      nextStart: '2026-10-06',
      seatsTotal: 60,
      seatsRemaining: 14,
      weeklyCommitmentHours: 10,
    },
    outcomeStats: [
      { label: 'Graduates', value: '4,900+' },
      { label: 'Job-outcome rate', value: '78%' },
      { label: 'Avg. salary lift', value: '+34%' },
    ],
    eligibility: [
      'Comfortable using a computer daily',
      'Can commit ~10 hrs/week for 16 weeks',
      'No prior coding experience required',
    ],
    price: { deposit: 25, full: 250, currency: 'USD', sponsorshipAvailable: true },
  },
  {
    id: 't-2',
    slug: 'product-design-career-track',
    title: 'Product Design Career Track',
    subtitle: 'A 12-week studio-style program ending in a reviewed, shippable portfolio.',
    category: 'Design',
    heroStat: '65% portfolio-ready rate at graduation',
    courseIds: ['c-3', 'c-4'],
    phases: [
      { id: 'p-1', title: 'Craft Foundations', courseIds: ['c-4'] },
      { id: 'p-2', title: 'Systems Thinking', courseIds: ['c-3'] },
      { id: 'p-3', title: 'Portfolio Studio', courseIds: [] },
    ],
    cohort: {
      nextStart: '2026-10-20',
      seatsTotal: 40,
      seatsRemaining: 9,
      weeklyCommitmentHours: 8,
    },
    outcomeStats: [
      { label: 'Graduates', value: '2,100+' },
      { label: 'Portfolio-ready rate', value: '65%' },
      { label: 'Avg. time to first client', value: '5 weeks' },
    ],
    eligibility: ['Basic Figma familiarity helpful, not required', 'Can commit ~8 hrs/week for 12 weeks'],
    price: { deposit: 25, full: 220, currency: 'USD', sponsorshipAvailable: true },
  },
  {
    id: 't-3',
    slug: 'software-engineering-career-track',
    title: 'Software Engineering Career Track',
    subtitle: 'A 20-week intensive covering backend systems, review craft, and interview readiness.',
    category: 'Engineering',
    heroStat: '81% land a technical interview within 90 days of graduating',
    courseIds: ['c-5', 'c-6'],
    phases: [
      { id: 'p-1', title: 'Backend Foundations', courseIds: ['c-5'] },
      { id: 'p-2', title: 'Team Practice', courseIds: ['c-6'] },
      { id: 'p-3', title: 'Systems Capstone', courseIds: [] },
    ],
    cohort: {
      nextStart: '2026-11-03',
      seatsTotal: 50,
      seatsRemaining: 22,
      weeklyCommitmentHours: 12,
    },
    outcomeStats: [
      { label: 'Graduates', value: '6,700+' },
      { label: 'Interview rate (90 days)', value: '81%' },
      { label: 'Avg. salary lift', value: '+41%' },
    ],
    eligibility: ['Comfortable with JavaScript basics', 'Can commit ~12 hrs/week for 20 weeks'],
    price: { deposit: 25, full: 300, currency: 'USD', sponsorshipAvailable: true },
  },
]

export function getTrackBySlug(slug) {
  return tracks.find((t) => t.slug === slug)
}

export function getTrackById(id) {
  return tracks.find((t) => t.id === id)
}
