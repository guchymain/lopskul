import { courses, getCourseBySlug, categories } from '../fixtures/courses.js'
import { tracks, getTrackBySlug } from '../fixtures/tracks.js'

// Every export here returns a Promise so pages already use await/loading
// states — this is the seam where a real API replaces the mock layer.
const LATENCY_MS = 150

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS))
}

export function listCourses(filters = {}) {
  let result = [...courses]
  if (filters.category) result = result.filter((c) => c.category === filters.category)
  if (filters.level) result = result.filter((c) => c.level === filters.level)
  if (filters.format) result = result.filter((c) => c.format === filters.format)
  if (filters.priceMax != null) result = result.filter((c) => c.price <= filters.priceMax)
  if (filters.captionsOnly) result = result.filter((c) => c.captionsAvailable)
  if (filters.query) {
    const q = filters.query.toLowerCase()
    result = result.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    )
  }
  if (filters.sort === 'rating') result.sort((a, b) => b.rating - a.rating)
  else if (filters.sort === 'popular') result.sort((a, b) => b.studentsCount - a.studentsCount)
  else if (filters.sort === 'price-low') result.sort((a, b) => a.price - b.price)
  else if (filters.sort === 'price-high') result.sort((a, b) => b.price - a.price)
  return delay(result)
}

export function fetchCourseBySlug(slug) {
  return delay(getCourseBySlug(slug) ?? null)
}

export function listCategories() {
  return delay(categories)
}

export function listTracks() {
  return delay(tracks)
}

export function fetchTrackBySlug(slug) {
  return delay(getTrackBySlug(slug) ?? null)
}

export function relatedCourses(course, limit = 4) {
  const related = courses.filter((c) => c.id !== course.id && c.category === course.category)
  return delay(related.slice(0, limit))
}
