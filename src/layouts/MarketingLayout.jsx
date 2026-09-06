import { Link, NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Icon } from '../components/ui/Icon.jsx'
import { Button } from '../components/ui/Button.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useTheme } from '../hooks/useTheme.js'

const navLinks = [
  { to: '/courses', label: 'Courses' },
  { to: '/tracks', label: 'Tracks' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/community', label: 'Community' },
]

function navLinkClass({ isActive }) {
  return `text-body-sm font-medium transition-colors ${
    isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
  }`
}

export function MarketingLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, role } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const dashboardHref = role === 'instructor' ? '/instructor' : role === 'admin' ? '/admin' : '/dashboard'

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-paper/90 backdrop-blur">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-heading-3 font-display font-semibold">
              <span className="h-7 w-7 rounded-md bg-ink text-paper flex items-center justify-center text-body-sm">
                L
              </span>
              Ledger
            </Link>
            <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={navLinkClass}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-full text-ink-soft hover:text-ink hover:bg-surface-1 transition-colors"
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
            </button>
            {isAuthenticated ? (
              <Button as={Link} to={dashboardHref} variant="subtle" size="sm">
                Go to dashboard
              </Button>
            ) : (
              <>
                <Button as={Link} to="/login" variant="ghost" size="sm">
                  Log in
                </Button>
                <Button as={Link} to="/signup" variant="accent" size="sm">
                  Get started
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-ink"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-paper px-4 py-4 flex flex-col gap-4">
            <nav className="flex flex-col gap-3" aria-label="Primary mobile">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              {isAuthenticated ? (
                <Button as={Link} to={dashboardHref} variant="subtle" size="sm">
                  Go to dashboard
                </Button>
              ) : (
                <>
                  <Button as={Link} to="/login" variant="ghost" size="sm">
                    Log in
                  </Button>
                  <Button as={Link} to="/signup" variant="accent" size="sm">
                    Get started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-surface-1">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-heading-3 font-display font-semibold mb-3">
              <span className="h-7 w-7 rounded-md bg-ink text-paper flex items-center justify-center text-body-sm">
                L
              </span>
              Ledger
            </div>
            <p className="text-body-sm text-ink-soft max-w-xs">
              Verified progress as the currency of trust. Learn, prove it, advance.
            </p>
          </div>
          <div>
            <h3 className="text-body-sm font-semibold text-ink mb-3">Learn</h3>
            <ul className="flex flex-col gap-2 text-body-sm text-ink-soft">
              <li><Link to="/courses" className="hover:text-ink">Browse courses</Link></li>
              <li><Link to="/tracks" className="hover:text-ink">Career tracks</Link></li>
              <li><Link to="/pricing" className="hover:text-ink">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-body-sm font-semibold text-ink mb-3">Teach</h3>
            <ul className="flex flex-col gap-2 text-body-sm text-ink-soft">
              <li><Link to="/teach/apply" className="hover:text-ink">Become an instructor</Link></li>
              <li><Link to="/community" className="hover:text-ink">Community</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-body-sm font-semibold text-ink mb-3">Company</h3>
            <ul className="flex flex-col gap-2 text-body-sm text-ink-soft">
              <li><Link to="/certificates/cert-1/verify" className="hover:text-ink">Verify a certificate</Link></li>
              <li><a href="#main-content" className="hover:text-ink">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-caption text-ink-soft">
          © 2026 Ledger. A design study — not a real company.
        </div>
      </footer>
    </div>
  )
}
