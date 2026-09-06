import { getCourseById } from '../fixtures/courses.js'
import { getProgress, totalLessonCount, completionPercent } from '../fixtures/progress.js'

const STORAGE_KEY = 'ledger:progress-overrides'

function loadOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveOverrides(overrides) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
  } catch {
    // storage unavailable (private mode, etc.) — progress just won't persist
  }
}

function overrideKey(userId, courseId) {
  return `${userId}::${courseId}`
}

export function getEffectiveProgress(userId, courseId) {
  const base = getProgress(userId, courseId) ?? { userId, courseId, completedLessonIds: [], currentLessonId: null }
  const overrides = loadOverrides()
  const override = overrides[overrideKey(userId, courseId)]
  if (!override) return base
  return { ...base, completedLessonIds: override.completedLessonIds, currentLessonId: override.currentLessonId }
}

export function markLessonComplete(userId, courseId, lessonId, nextLessonId) {
  const current = getEffectiveProgress(userId, courseId)
  const completedLessonIds = current.completedLessonIds.includes(lessonId)
    ? current.completedLessonIds
    : [...current.completedLessonIds, lessonId]
  const overrides = loadOverrides()
  overrides[overrideKey(userId, courseId)] = {
    completedLessonIds,
    currentLessonId: nextLessonId ?? null,
  }
  saveOverrides(overrides)
  return { ...current, completedLessonIds, currentLessonId: nextLessonId ?? null }
}

export function courseCompletionSummary(userId, courseId) {
  const course = getCourseById(courseId)
  const progress = getEffectiveProgress(userId, courseId)
  return {
    course,
    progress,
    percent: completionPercent(course, progress),
    total: totalLessonCount(course),
    done: progress.completedLessonIds.length,
  }
}
