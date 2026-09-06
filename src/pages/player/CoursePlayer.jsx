import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom'
import { getCourseById as getCourse } from '../../data/fixtures/courses.js'
import { totalLessonCount } from '../../data/fixtures/progress.js'
import { getQuizzesForCourse } from '../../data/fixtures/quizzes.js'
import { getThreadsByScope } from '../../data/fixtures/threads.js'
import { useAuth } from '../../hooks/useAuth.js'
import { useProgress } from '../../hooks/useProgress.js'
import { VideoPlayer } from '../../components/player/VideoPlayer.jsx'
import { CurriculumSidebar } from '../../components/player/CurriculumSidebar.jsx'
import { NotesPanel } from '../../components/player/NotesPanel.jsx'
import { Tabs } from '../../components/ui/Tabs.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Icon } from '../../components/ui/Icon.jsx'
import { ProgressRing } from '../../components/ui/ProgressRing.jsx'

function flattenLessons(course) {
  return course.curriculum.flatMap((section) => section.lessons)
}

export function CoursePlayer() {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const course = getCourse(courseId)
  const { progress, completeLesson } = useProgress(user.id, courseId)
  const [tab, setTab] = useState('notes')

  useEffect(() => {
    if (course) document.title = `${course.title} — Ledger`
  }, [course])

  if (!course) return <Navigate to="/dashboard/my-learning" replace />

  const lessons = useMemo(() => flattenLessons(course), [course])
  const lesson = lessons.find((l) => l.id === lessonId)
  if (!lesson) return <Navigate to={`/learn/${course.id}/${lessons[0].id}`} replace />

  const currentIndex = lessons.findIndex((l) => l.id === lessonId)
  const nextLesson = lessons[currentIndex + 1]
  const prevLesson = lessons[currentIndex - 1]
  const completed = progress.completedLessonIds.includes(lessonId)
  const total = totalLessonCount(course)
  const percent = Math.round((progress.completedLessonIds.length / total) * 100)
  const quizzes = getQuizzesForCourse(course.id)
  const threads = getThreadsByScope('course', course.id)

  function handleMarkComplete() {
    completeLesson(lessonId, nextLesson?.id ?? null)
  }

  function handleContinue() {
    if (!completed) completeLesson(lessonId, nextLesson?.id ?? null)
    if (nextLesson) {
      navigate(`/learn/${course.id}/${nextLesson.id}`)
    } else if (quizzes.length > 0) {
      navigate(`/learn/${course.id}/quiz/${quizzes[0].id}`)
    } else {
      navigate(`/learn/${course.id}/complete`)
    }
  }

  return (
    <div className="grid lg:grid-cols-[280px_1fr_300px] min-h-screen">
      <aside className="hidden lg:block border-r border-border p-4 overflow-y-auto">
        <Link to="/dashboard/my-learning" className="flex items-center gap-1.5 text-body-sm text-ink-soft hover:text-ink mb-4">
          <Icon name="chevronRight" size={14} className="rotate-180" /> Back to My Learning
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <ProgressRing percent={percent} size={44} strokeWidth={5} />
          <div>
            <p className="text-body-sm font-medium text-ink line-clamp-1">{course.title}</p>
            <p className="text-caption text-ink-soft">{progress.completedLessonIds.length}/{total} lessons</p>
          </div>
        </div>
        <CurriculumSidebar course={course} currentLessonId={lessonId} completedLessonIds={progress.completedLessonIds} />
      </aside>

      <main className="flex flex-col gap-6 p-4 sm:p-6 min-w-0">
        <VideoPlayer lessonTitle={lesson.title} videoUrl={lesson.videoUrl} onMarkComplete={handleMarkComplete} completed={completed} />
        <div>
          <h1 className="text-heading-2 font-display font-semibold text-ink">{lesson.title}</h1>
          <p className="text-body-sm text-ink-soft mt-1">{lesson.durationMin} minutes · {lesson.type}</p>
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="md"
            onClick={() => prevLesson && navigate(`/learn/${course.id}/${prevLesson.id}`)}
            disabled={!prevLesson}
          >
            <Icon name="chevronRight" size={16} className="rotate-180" /> Previous
          </Button>
          <Button variant="accent" size="md" onClick={handleContinue}>
            {nextLesson ? 'Next lesson' : quizzes.length > 0 ? 'Take the quiz' : 'Finish course'}
            <Icon name="chevronRight" size={16} />
          </Button>
        </div>

        <Tabs
          tabs={[
            { value: 'notes', label: 'Notes' },
            { value: 'resources', label: 'Resources' },
            { value: 'discussion', label: 'Discussion', count: threads.length },
          ]}
          active={tab}
          onChange={setTab}
        />
        <div className="lg:hidden">
          {tab === 'notes' && <NotesPanel lessonId={lessonId} />}
        </div>
        {tab === 'resources' && (
          <p className="text-body-sm text-ink-soft">No downloadable resources for this lesson.</p>
        )}
        {tab === 'discussion' && (
          <div className="flex flex-col gap-3">
            {threads.length === 0 ? (
              <p className="text-body-sm text-ink-soft">No discussion yet for this course. <Link to="/community" className="text-accent-strong hover:underline">Start one</Link>.</p>
            ) : (
              threads.map((t) => (
                <Link key={t.id} to={`/community/${t.id}`} className="rounded-card border border-border p-3 hover:bg-surface-1">
                  <p className="text-body-sm font-medium text-ink">{t.title}</p>
                  <p className="text-caption text-ink-soft">{t.replies.length} replies</p>
                </Link>
              ))
            )}
          </div>
        )}
      </main>

      <aside className="hidden lg:block border-l border-border p-4">
        <NotesPanel lessonId={lessonId} />
      </aside>
    </div>
  )
}
