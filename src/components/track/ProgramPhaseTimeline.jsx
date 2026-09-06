import { getCoursesByIds } from '../../data/fixtures/courses.js'
import { Icon } from '../ui/Icon.jsx'

export function ProgramPhaseTimeline({ phases }) {
  return (
    <ol className="flex flex-col gap-6">
      {phases.map((phase, index) => {
        const phaseCourses = getCoursesByIds(phase.courseIds)
        return (
          <li key={phase.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="h-9 w-9 rounded-full bg-ink text-paper flex items-center justify-center text-body-sm font-semibold shrink-0">
                {index + 1}
              </span>
              {index < phases.length - 1 && <span className="w-px flex-1 bg-border mt-1" />}
            </div>
            <div className="pb-6">
              <h3 className="text-body-lg font-semibold text-ink">{phase.title}</h3>
              {phaseCourses.length > 0 ? (
                <ul className="mt-2 flex flex-col gap-1.5">
                  {phaseCourses.map((c) => (
                    <li key={c.id} className="flex items-center gap-2 text-body-sm text-ink-soft">
                      <Icon name="layers" size={14} /> {c.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-body-sm text-ink-soft">Guided project work with instructor review</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
