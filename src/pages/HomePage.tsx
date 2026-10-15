import { Link } from 'react-router-dom'
import { COURSE_SUBTITLE, COURSE_TITLE } from '../data/course'
import './home.css'

export function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <img
          src="/logo.png?v=2"
          alt="Samira Piano"
          className="hero-logo"
          width={220}
          height={248}
        />
        <p className="hero-kicker">{COURSE_TITLE}</p>
        <h1 className="hero-title">Hear and understand how music is built</h1>
        <p className="hero-lead">
          {COURSE_SUBTITLE}. Study each lesson first — then lock it in with a
          separate test. All nine modules are open.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/course">
            Start the course
          </Link>
        </div>
      </section>
    </div>
  )
}
