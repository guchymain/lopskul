import { Accordion, AccordionItem } from '../ui/Accordion.jsx'
import { Icon } from '../ui/Icon.jsx'

export function CurriculumAccordion({ curriculum, completedLessonIds = [] }) {
  return (
    <Accordion>
      {curriculum.map((section, index) => (
        <AccordionItem
          key={section.id}
          id={section.id}
          defaultOpen={index === 0}
          title={section.title}
          subtitle={`${section.lessons.length} lessons`}
        >
          <ul className="flex flex-col divide-y divide-border -mx-4">
            {section.lessons.map((lesson) => {
              const done = completedLessonIds.includes(lesson.id)
              return (
                <li key={lesson.id} className="flex items-center gap-3 px-4 py-2.5 text-body-sm">
                  <Icon
                    name={done ? 'check' : lesson.type === 'video' ? 'play' : 'layers'}
                    size={16}
                    className={done ? 'text-proof' : 'text-ink-soft'}
                  />
                  <span className={`flex-1 ${done ? 'text-ink-soft line-through' : 'text-ink'}`}>{lesson.title}</span>
                  {lesson.freePreview && <span className="text-caption text-accent-strong">Preview</span>}
                  <span className="text-caption text-ink-soft w-10 text-right">{lesson.durationMin}m</span>
                </li>
              )
            })}
          </ul>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
