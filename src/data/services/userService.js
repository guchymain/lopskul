import { getUserById } from '../fixtures/users.js'
import { getEnrollmentsForUser } from '../fixtures/enrollments.js'
import { getNotificationsForUser } from '../fixtures/notifications.js'
import { getCertificatesForUser } from '../fixtures/certificates.js'

const LATENCY_MS = 120

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS))
}

export function fetchUser(id) {
  return delay(getUserById(id) ?? null)
}

export function fetchEnrollments(userId) {
  return delay(getEnrollmentsForUser(userId))
}

export function fetchNotifications(userId) {
  return delay(getNotificationsForUser(userId))
}

export function fetchCertificates(userId) {
  return delay(getCertificatesForUser(userId))
}
