import { CourseCard } from './CourseCard.jsx'

export function RelatedCoursesCarousel({ courses }) {
  if (courses.length === 0) return null
  return (
    <div className="flex gap-5 overflow-x-auto pb-2 -mx-1 px-1">
      {courses.map((course) => (
        <div key={course.id} className="min-w-[260px] max-w-[260px] shrink-0">
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  )
}
