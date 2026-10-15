import { Link, Outlet } from 'react-router-dom'
import { IntroMusic } from './IntroMusic'
import './layout.css'

export function Layout() {
  return (
    <div className="shell">
      <IntroMusic />
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Samira Piano home">
          <img
            src="/logo.png?v=2"
            alt="Samira Piano"
            className="brand-logo"
            width={140}
            height={140}
          />
        </Link>
        <nav className="site-nav" aria-label="Main">
          <Link to="/course">Course</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Samira Piano — Foundations. Study first. Test second.</p>
      </footer>
    </div>
  )
}
