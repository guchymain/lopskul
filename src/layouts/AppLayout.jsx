import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Icon } from '../components/ui/Icon.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useTheme } from '../hooks/useTheme.js'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: 'chart' },
  { to: '/dashboard/my-learning', label: 'My Learning', icon: 'layers' },
  { to: '/community', label: 'Community', icon: 'message' },
  { to: '/notifications', label: 'Notifications', icon: 'bell' },
  { to: '/settings', label: 'Settings', icon: 'user' },
]

function sidebarLinkClass({ isActive }) {
  return `flex items-center gap-3 rounded-card px-3 py-2.5 text-body-sm font-medium transition-colors ${
    isActive ? 'bg-surface-2 text-ink' : 'text-ink-soft hover:bg-surface-1 hover:text-ink'
  }`
}

function tabLinkClass({ isActive }) {
  return `flex flex-1 flex-col items-center gap-1 py-2 text-caption font-medium ${
    isActive ? 'text-accent' : 'text-ink-soft'
  }`
}

export function AppLayout() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex">
      <a href="#app-main" className="skip-link">
        Skip to content
      </a>

      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-surface-1 p-4">
        <Link to="/" className="flex items-center gap-2 text-heading-3 font-display font-semibold px-2 mb-6">
          <span className="h-7 w-7 rounded-md bg-ink text-paper flex items-center justify-center text-body-sm">
            L
          </span>
          Ledger
        </Link>
        <nav className="flex flex-col gap-1 flex-1" aria-label="App navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/dashboard'} className={sidebarLinkClass}>
              <Icon name={link.icon} size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-border pt-4 flex items-center gap-3 px-2">
          <span className="h-9 w-9 rounded-full bg-accent-soft text-accent-strong flex items-center justify-center text-body-sm font-semibold">
            {user?.avatarInitials ?? '—'}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-body-sm font-medium text-ink truncate">{user?.name ?? 'Guest'}</p>
            <button onClick={handleLogout} className="text-caption text-ink-soft hover:text-ink">
              Log out
            </button>
          </div>
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-1.5 rounded-full text-ink-soft hover:text-ink hover:bg-surface-2"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b border-border bg-paper/90 backdrop-blur px-4 h-14">
          <Link to="/" className="flex items-center gap-2 font-display font-semibold text-heading-3">
            <span className="h-6 w-6 rounded-md bg-ink text-paper flex items-center justify-center text-caption">
              L
            </span>
            Ledger
          </Link>
          <div className="relative">
            <button
              onClick={() => setAvatarMenuOpen((o) => !o)}
              aria-label="Account menu"
              aria-expanded={avatarMenuOpen}
              className="h-8 w-8 rounded-full bg-accent-soft text-accent-strong flex items-center justify-center text-caption font-semibold"
            >
              {user?.avatarInitials ?? '—'}
            </button>
            {avatarMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-card border border-border bg-surface-0 shadow-lg py-1">
                <button
                  onClick={toggleTheme}
                  className="w-full text-left px-3 py-2 text-body-sm text-ink hover:bg-surface-1"
                >
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-body-sm text-ink hover:bg-surface-1"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </header>

        <main id="app-main" className="flex-1 pb-20 lg:pb-0">
          <Outlet />
        </main>

        <nav
          className="lg:hidden fixed bottom-0 inset-x-0 z-30 flex border-t border-border bg-surface-0/95 backdrop-blur"
          aria-label="App navigation mobile"
        >
          {links.slice(0, 4).map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/dashboard'} className={tabLinkClass}>
              <Icon name={link.icon} size={20} />
              {link.label.split(' ')[0]}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
