import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Icon } from '../components/ui/Icon.jsx'
import { useAuth } from '../hooks/useAuth.js'

const links = [
  { to: '/admin', label: 'Overview', icon: 'chart' },
  { to: '/admin/users', label: 'Users', icon: 'user' },
  { to: '/admin/courses', label: 'Course moderation', icon: 'shield' },
  { to: '/admin/payments', label: 'Payments', icon: 'trend' },
  { to: '/admin/support', label: 'Support queue', icon: 'message' },
]

function sidebarLinkClass({ isActive }) {
  return `flex items-center gap-3 rounded-card px-3 py-2.5 text-body-sm font-medium transition-colors ${
    isActive ? 'bg-surface-2 text-ink' : 'text-ink-soft hover:bg-surface-1 hover:text-ink'
  }`
}

export function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-paper text-ink flex">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-surface-1 p-4">
        <Link to="/" className="flex items-center gap-2 text-heading-3 font-display font-semibold px-2 mb-1">
          <span className="h-7 w-7 rounded-md bg-ink text-paper flex items-center justify-center text-body-sm">L</span>
          Ledger
        </Link>
        <p className="px-2 mb-6 text-caption text-ink-soft uppercase tracking-wide">Admin console</p>
        <nav className="flex flex-col gap-1 flex-1" aria-label="Admin navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end className={sidebarLinkClass}>
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
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="text-caption text-ink-soft hover:text-ink"
            >
              Log out
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between border-b border-border bg-paper px-4 h-14">
          <Link to="/" className="font-display font-semibold text-heading-3">Ledger · Admin</Link>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
