import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FacetSidebar } from '../../components/forms/FacetSidebar.jsx'
import { CourseCard } from '../../components/course/CourseCard.jsx'
import { Select } from '../../components/ui/Input.jsx'
import { Icon } from '../../components/ui/Icon.jsx'
import { Badge } from '../../components/ui/Badge.jsx'
import { listCourses, listCategories } from '../../data/services/courseService.js'

export function CourseDiscovery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  const filters = {
    category: searchParams.get('category') || undefined,
    level: searchParams.get('level') || undefined,
    format: searchParams.get('format') || undefined,
    priceMax: searchParams.get('priceMax') != null ? Number(searchParams.get('priceMax')) : undefined,
    captionsOnly: searchParams.get('captionsOnly') === 'true' || undefined,
    sort: searchParams.get('sort') || 'popular',
    query: searchParams.get('q') || undefined,
  }

  useEffect(() => {
    listCategories().then(setCategories)
  }, [])

  useEffect(() => {
    setLoading(true)
    listCourses(filters).then((data) => {
      setResults(data)
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  function updateFilters(next) {
    const params = new URLSearchParams()
    Object.entries(next).forEach(([key, value]) => {
      if (value !== undefined && value !== '') params.set(key, value)
    })
    setSearchParams(params)
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    updateFilters({ ...filters, query })
  }

  const activeChips = Object.entries(filters).filter(
    ([key, value]) => value !== undefined && key !== 'sort' && key !== 'query'
  )

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-display-lg font-display font-semibold text-ink mb-4">Browse courses</h1>
        <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
          <Icon name="search" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, skills, topics…"
            aria-label="Search courses"
            className="w-full rounded-card border border-border bg-surface-0 pl-10 pr-4 py-3 text-body focus:border-accent"
          />
        </form>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <FacetSidebar categories={categories} filters={filters} onChange={updateFilters} className="hidden lg:flex" />

        <div>
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <p className="text-body-sm text-ink-soft">{loading ? 'Searching…' : `${results.length} courses`}</p>
            <Select
              id="sort"
              value={filters.sort}
              onChange={(e) => updateFilters({ ...filters, sort: e.target.value })}
              className="w-auto"
            >
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </Select>
          </div>

          {activeChips.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeChips.map(([key, value]) => (
                <Badge key={key} tone="accent" className="cursor-pointer" onClick={() => updateFilters({ ...filters, [key]: undefined })}>
                  {String(value)} <Icon name="close" size={12} />
                </Badge>
              ))}
            </div>
          )}

          {!loading && results.length === 0 ? (
            <p className="text-body text-ink-soft py-16 text-center">No courses match those filters yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {results.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
