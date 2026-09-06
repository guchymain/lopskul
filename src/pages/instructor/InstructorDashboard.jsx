import { courses } from '../../data/fixtures/courses.js'
import { useAuth } from '../../hooks/useAuth.js'
import { getInstructorById } from '../../data/fixtures/instructors.js'
import { Card } from '../../components/ui/Card.jsx'
import { Icon } from '../../components/ui/Icon.jsx'
import { chartSeries } from '../../design/tokens.js'

export function InstructorDashboard() {
  const { user } = useAuth()
  const instructor = getInstructorById(user?.instructorId ?? 'ins-1')
  const myCourses = courses.filter((c) => c.instructorId === instructor.id)
  const totalStudents = myCourses.reduce((sum, c) => sum + c.studentsCount, 0)
  const totalRevenue = myCourses.reduce((sum, c) => sum + c.price * Math.round(c.studentsCount * 0.02), 0)
  const trend = [40, 55, 48, 62, 58, 74, 80]

  return (
    <div className="px-4 sm:px-6 py-8 max-w-[1100px] mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-heading-1 font-display font-semibold text-ink">Welcome back, {instructor.name.split(' ')[0]}</h1>
        <p className="text-body text-ink-soft mt-1">Here's how your courses are performing.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <Card className="p-5">
          <p className="text-caption text-ink-soft mb-1">Total students</p>
          <p className="text-heading-1 font-display font-semibold text-ink">{totalStudents.toLocaleString()}</p>
        </Card>
        <Card className="p-5">
          <p className="text-caption text-ink-soft mb-1">Est. lifetime earnings</p>
          <p className="text-heading-1 font-display font-semibold text-ink">${totalRevenue.toLocaleString()}</p>
        </Card>
        <Card className="p-5">
          <p className="text-caption text-ink-soft mb-1">Avg. rating</p>
          <p className="text-heading-1 font-display font-semibold text-ink flex items-center gap-1.5">
            <Icon name="star" size={22} className="text-accent" /> {instructor.rating}
          </p>
        </Card>
      </div>

      <Card className="p-5">
        <p className="text-body-sm font-semibold text-ink mb-4">Enrollment trend (last 7 weeks)</p>
        <div className="flex items-end gap-2 h-32">
          {trend.map((v, i) => (
            <div key={i} className="flex-1 rounded-t-md" style={{ height: `${v}%`, backgroundColor: chartSeries[0] }} />
          ))}
        </div>
      </Card>

      <div>
        <h2 className="text-heading-2 font-display font-semibold text-ink mb-4">Course health</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-body-sm border-collapse">
            <thead>
              <tr className="text-left text-ink-soft border-b border-border">
                <th className="py-2 pr-4 font-medium">Course</th>
                <th className="py-2 pr-4 font-medium">Students</th>
                <th className="py-2 pr-4 font-medium">Rating</th>
                <th className="py-2 pr-4 font-medium">Completion</th>
              </tr>
            </thead>
            <tbody>
              {myCourses.map((c) => (
                <tr key={c.id} className="border-b border-border">
                  <td className="py-3 pr-4 text-ink font-medium">{c.title}</td>
                  <td className="py-3 pr-4 text-ink-soft">{c.studentsCount.toLocaleString()}</td>
                  <td className="py-3 pr-4 text-ink-soft">{c.rating}</td>
                  <td className="py-3 pr-4 text-ink-soft">{Math.round(40 + c.rating * 10)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
