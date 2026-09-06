import { useCallback, useState } from 'react'
import { getEffectiveProgress, markLessonComplete } from '../data/services/progressService.js'

export function useProgress(userId, courseId) {
  const [progress, setProgress] = useState(() => getEffectiveProgress(userId, courseId))

  const completeLesson = useCallback(
    (lessonId, nextLessonId) => {
      const updated = markLessonComplete(userId, courseId, lessonId, nextLessonId)
      setProgress(updated)
      return updated
    },
    [userId, courseId]
  )

  return { progress, completeLesson }
}
