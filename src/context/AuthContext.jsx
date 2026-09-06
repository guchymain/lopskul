import { createContext, useCallback, useMemo, useState } from 'react'
import { users } from '../data/fixtures/users.js'

export const AuthContext = createContext(null)

const STORAGE_KEY = 'ledger:current-user-id'

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY)
    } catch {
      return null
    }
  })

  const user = useMemo(() => users.find((u) => u.id === userId) ?? null, [userId])

  const login = useCallback((id) => {
    setUserId(id)
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      // ignore
    }
  }, [])

  const loginAsLearnerDemo = useCallback(() => login('u-learner-1'), [login])
  const loginAsInstructorDemo = useCallback(() => login('u-instructor-1'), [login])
  const loginAsAdminDemo = useCallback(() => login('u-admin-1'), [login])

  const logout = useCallback(() => {
    setUserId(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      role: user?.role ?? 'guest',
      isAuthenticated: Boolean(user),
      login,
      loginAsLearnerDemo,
      loginAsInstructorDemo,
      loginAsAdminDemo,
      logout,
    }),
    [user, login, loginAsLearnerDemo, loginAsInstructorDemo, loginAsAdminDemo, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
