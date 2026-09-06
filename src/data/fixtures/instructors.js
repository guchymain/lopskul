export const instructors = [
  {
    id: 'ins-1',
    handle: 'amaraokoye',
    name: 'Amara Okoye',
    title: 'Lead Data Scientist, ex-Flutterwave',
    avatarInitials: 'AO',
    bio: 'Amara has spent nine years building fraud-detection and pricing models across fintech. She teaches the way she wishes she’d been taught: with real production data, not toy datasets.',
    rating: 4.9,
    studentsCount: 18400,
    coursesCount: 3,
    proofBadge: '92% of graduates ship a portfolio project within 30 days',
  },
  {
    id: 'ins-2',
    handle: 'davidchen',
    name: 'David Chen',
    title: 'Senior Product Designer, Notion alum',
    avatarInitials: 'DC',
    bio: 'David led design systems at two Series-C startups before turning to teaching full time. He obsesses over the gap between "looks done" and "is actually usable."',
    rating: 4.8,
    studentsCount: 12100,
    coursesCount: 2,
    proofBadge: '4.8/5 average project review score',
  },
  {
    id: 'ins-3',
    handle: 'zainabmusa',
    name: 'Zainab Musa',
    title: 'Engineering Manager, Andela network',
    avatarInitials: 'ZM',
    bio: 'Zainab has mentored over 400 junior engineers through structured code review. Her courses are built around the review checklist she uses with her own team.',
    rating: 4.9,
    studentsCount: 26800,
    coursesCount: 4,
    proofBadge: '81% of learners land a technical interview within 90 days',
  },
  {
    id: 'ins-4',
    handle: 'tomasrivera',
    name: 'Tomas Rivera',
    title: 'Growth Marketing Lead, ex-Paystack',
    avatarInitials: 'TR',
    bio: 'Tomas built the acquisition engine for two African fintechs from zero to seven figures in monthly signups. He teaches marketing as a measurement discipline, not a vibe.',
    rating: 4.7,
    studentsCount: 9600,
    coursesCount: 2,
    proofBadge: '3.2x average campaign ROI reported by learners',
  },
]

export function getInstructorById(id) {
  return instructors.find((i) => i.id === id)
}

export function getInstructorByHandle(handle) {
  return instructors.find((i) => i.handle === handle)
}
