import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon.jsx'

export function CurriculumSidebar({ course, currentLessonId, completedLessonIds, className = '' }) {
  return (
    <nav className={`flex flex-col gap-4 ${className}`} aria-label="Course curriculum">
      {course.curriculum.map((section) => (
        <div key={section.id}>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-ink-soft px-2 mb-1">
            {section.title}
          </h3>
          <ul className="flex flex-col gap-0.5">
            {section.lessons.map((lesson) => {
              const active = lesson.id === currentLessonId
              const done = completedLessonIds.includes(lesson.id)
              return (
                <li key={lesson.id}>
                  <Link
                    to={`/learn/${course.id}/${lesson.id}`}
                    className={`flex items-center gap-2.5 rounded-card px-2 py-2 text-body-sm transition-colors ${
                      active ? 'bg-surface-2 text-ink font-medium' : 'text-ink-soft hover:bg-surface-1 hover:text-ink'
                    }`}
                  >
                    <Icon
                      name={done ? 'check' : lesson.type === 'video' ? 'play' : 'layers'}
                      size={15}
                      className={done ? 'text-proof' : ''}
                    />
                    <span className="flex-1 line-clamp-1">{lesson.title}</span>
                    <span className="text-caption text-ink-soft shrink-0">{lesson.durationMin}m</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
