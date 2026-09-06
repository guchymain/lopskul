export const progressRecords = [
  {
    userId: 'u-learner-1',
    courseId: 'c-1',
    completedLessonIds: ['l-1-1', 'l-1-2', 'l-1-3', 'l-2-1'],
    currentLessonId: 'l-2-2',
    lastActivity: '2026-09-05',
  },
  {
    userId: 'u-learner-1',
    courseId: 'c-2',
    completedLessonIds: ['l-1-1', 'l-1-2', 'l-2-1', 'l-2-2', 'l-2-3'],
    currentLessonId: null,
    lastActivity: '2026-08-15',
  },
]

export function getProgress(userId, courseId) {
  return progressRecords.find((p) => p.userId === userId && p.courseId === courseId)
}

export function totalLessonCount(course) {
  return course.curriculum.reduce((sum, section) => sum + section.lessons.length, 0)
}

export function completionPercent(course, progress) {
  const total = totalLessonCount(course)
  if (!total) return 0
  const done = progress?.completedLessonIds?.length ?? 0
  return Math.round((done / total) * 100)
}
