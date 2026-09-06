import { useParams, Link } from 'react-router-dom'
import { courses } from '../../data/fixtures/courses.js'
import { CourseCard } from '../../components/course/CourseCard.jsx'
import { Button } from '../../components/ui/Button.jsx'

export function CategoryPage() {
  const { slug } = useParams()
  const label = decodeURIComponent(slug).replace(/-/g, ' ')
  const matches = courses.filter((c) => c.category.toLowerCase() === label.toLowerCase())

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16">
      <h1 className="text-display-lg font-display font-semibold text-ink capitalize mb-8">{label}</h1>
      {matches.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-body text-ink-soft mb-4">No courses found in this category yet.</p>
          <Button as={Link} to="/courses" variant="accent" size="md">
            Browse all courses
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {matches.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}
